<?php
// <!-- 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6 -->

// 包含資料庫連接檔案
include('includes/db.php'); // 確保路徑正確並包含 db.php 檔案
error_reporting(E_ALL);    
ini_set('display_errors', 1); 

// 開始 session
session_start();

// 函數：將資料庫資料存到 cookie
function saveUserDataToCookie($userData) {
    $cookieData = [
        'username' => $userData['username'],
        'chips' => $userData['chips'],
        'game_data' => $userData['game_data'],
        'rounds' => $userData['rounds']
    ];
    
    // 將資料轉換為 JSON 並設定 cookie（有效期為 24 小時）
    setcookie('user_game_data', json_encode($cookieData), time() + 86400, '/');
}

// 函數：將遊戲結果存到 cookie
function saveGameResultToCookie($gameResult) {
    // 先獲取現有的 cookie 資料（如果存在）
    $existingData = isset($_COOKIE['game_history']) ? json_decode($_COOKIE['game_history'], true) : [];
    
    // 添加新的遊戲結果
    $existingData[] = [
        'round' => $gameResult['round'],
        'playerHand' => $gameResult['playerHand'],
        'dealerHand' => $gameResult['dealerHand'],
        'result' => $gameResult['result'],
        'bet' => $gameResult['bet'],
        'remainingChips' => $gameResult['remainingChips'],
        'timestamp' => time()
    ];
    
    // 限制歷史記錄數量（例如只保留最近 10 筆）
    if (count($existingData) > 10) {
        array_shift($existingData);
    }
    
    // 設定 cookie（有效期為 24 小時）
    setcookie('game_history', json_encode($existingData), time() + 86400, '/');
}

// 從 session 中取得玩家ID (也可說是username)
$user_id = $_SESSION['username'] ?? null;

// 確保玩家已經登入
if (!$user_id) {
    header("Location: login.php");
    exit();
}

// 使用 PDO 查詢玩家資料
try {
    // 查詢玩家資料
    $query = "SELECT * FROM users WHERE username = :user_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    // 取得查詢結果
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        saveUserDataToCookie($user);

        // 初始化遊戲狀態
        if (!isset($_SESSION['game'])) {
            $_SESSION['game'] = [
                'deck' => createDeck(),
                'playerHand' => [],
                'dealerHand' => [],
                'currentBet' => 0,
                'playerChips' => $user['chips'],
                'gameHistory' => json_decode($user['game_data'], true) ?: [],
                'forceDealerWin' => false,
                'message' => '',
                'currentRound' => count(json_decode($user['game_data'], true)) + 1, // 初始化回合數
                'dealerRevealed' => false // 初始化 dealerRevealed
            ];
        } else {
            // 只有在 currentBet 為 0 時才更新 playerChips
            if ($_SESSION['game']['currentBet'] == 0) {
                $_SESSION['game']['playerChips'] = $user['chips'];
            }
            $_SESSION['game']['gameHistory'] = json_decode($user['game_data'], true) ?: [];
            $_SESSION['game']['currentRound'] = count($_SESSION['game']['gameHistory']) + 1; // 更新回合數
        }
    } else {
        // 如果找不到用戶資料，重新導向到登入頁面
        header("Location: login.php");
        exit();
    }
} catch (PDOException $e) {
    // 處理資料庫錯誤
    echo "資料庫錯誤: " . $e->getMessage();
    exit();
}

// 生成 CSRF 令牌
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// 處理表單提交
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 驗證 CSRF 令牌
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['game']['message'] = '無效的表單提交。';
        header("Location: game.php");
        exit();
    }

    if (isset($_POST['action'])) {
        handleAction($_POST['action']);
    }
}

// 函數：創建一副標準的52張牌
function createDeck() {
    $deck = [];
    $suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    $values = [
        'ace', '2', '3', '4', '5', '6', '7',
        '8', '9', '10', 'jack', 'queen', 'king'
    ];
    foreach ($suits as $suit) {
        foreach ($values as $value) {
            $deck[] = ['suit' => $suit, 'value' => $value];
        }
    }
    // 洗牌
    shuffle($deck);
    return $deck;
}

// 函數：處理玩家動作
function handleAction($action) {
    switch ($action) {
        case 'start':
            startGame();
            break;
        case 'hit':
            playerHit();
            break;
        case 'stand':
            playerStand();
            break;
        case 'double':
            playerDouble();
            break;
        case 'all_in':
            playerAllIn();
            break;
        case 'force_dealer_win':
            forceDealerWin();
            break;
        case 'add_chips':
            addChips();
            break;
        case 'reduce_chips':
            reduceChips();
            break;
        case 'clear_history':
            clearGameHistory();
            break;
        default:
            $_SESSION['game']['message'] = '無效的操作。';
    }
}

// 函數：開始新遊戲（處理下注）
function startGame() {
    // 檢查是否有提交的下注金額
    if (!isset($_POST['bet_amount']) || !is_numeric($_POST['bet_amount'])) {
        $_SESSION['game']['message'] = '請輸入有效的下注金額。';
        return;
    }

    $betAmount = (int)$_POST['bet_amount'];

    // 驗證下注金額
    if ($betAmount <= 0) {
        $_SESSION['game']['message'] = '下注金額必須大於0。';
        return;
    }

    if ($betAmount > $_SESSION['game']['playerChips']) {
        $_SESSION['game']['message'] = '下注金額超過您的可用籌碼。';
        return;
    }

    // 扣除下注金額
    $_SESSION['game']['playerChips'] -= $betAmount;
    $_SESSION['game']['currentBet'] = $betAmount;

    // 初始化牌堆並發牌
    $_SESSION['game']['deck'] = createDeck();
    $_SESSION['game']['playerHand'] = [drawCard(), drawCard()];
    $_SESSION['game']['dealerHand'] = [drawCard(), drawCard()];
    $_SESSION['game']['forceDealerWin'] = false;
    $_SESSION['game']['currentRound'] = count($_SESSION['game']['gameHistory']) + 1;

    // 初始化 dealerRevealed 為 false
    //$_SESSION['game']['dealerRevealed'] = false;

    $_SESSION['game']['message'] = '已下注並發牌。請選擇您的操作。';

    // 保存籌碼變更到資料庫
    saveChips();
}

// 函數：抽一張牌
function drawCard() {
    if (empty($_SESSION['game']['deck'])) {
        $_SESSION['game']['deck'] = createDeck();
    }
    return array_pop($_SESSION['game']['deck']);
}

// 函數：玩家選擇要牌1
function playerHit() {
    $_SESSION['game']['playerHand'][] = drawCard();
    if (calculateHandValue($_SESSION['game']['playerHand']) > 21) {
        $_SESSION['game']['message'] = '爆牌！你輸了。';
        endGame();
    }
}

// 函數：玩家選擇停牌
function playerStand() {
    // 揭示莊家手牌
    $_SESSION['game']['dealerRevealed'] = true;
    dealerPlay();
    determineWinner();
}

// 函數：玩家選擇加倍
function playerDouble() {
    if ($_SESSION['game']['currentBet'] == 0) {
        // 如果尚未下注，提示玩家先下注
        $_SESSION['game']['message'] = '請先下注再加倍。';
        return;
    }

    if ($_SESSION['game']['playerChips'] < $_SESSION['game']['currentBet']) {
        $_SESSION['game']['message'] = '籌碼不足，無法加倍。';
        return;
    }

    $_SESSION['game']['playerChips'] -= $_SESSION['game']['currentBet'];
    $_SESSION['game']['currentBet'] *= 2;
    $_SESSION['game']['playerHand'][] = drawCard();

    if (calculateHandValue($_SESSION['game']['playerHand']) > 21) {
        $_SESSION['game']['message'] = '爆牌！你輸了。';
        endGame();
    } else {
        // 揭示莊家手牌
        $_SESSION['game']['dealerRevealed'] = true;
        dealerPlay();
        determineWinner();
    }

    // 保存籌碼變更到資料庫
    saveChips();
}

// 函數：玩家選擇全押
function playerAllIn() {
    if ($_SESSION['game']['playerChips'] <= 0) {
        $_SESSION['game']['message'] = '你沒有籌碼可全押。';
        return;
    }

    $_SESSION['game']['currentBet'] = $_SESSION['game']['playerChips'];
    $_SESSION['game']['playerChips'] = 0;
    $_SESSION['game']['playerHand'][] = drawCard();

    if (calculateHandValue($_SESSION['game']['playerHand']) > 21) {
        $_SESSION['game']['message'] = '爆牌！你輸了。';
        endGame();
    } else {
        // 揭示莊家手牌
        $_SESSION['game']['dealerRevealed'] = true;
        dealerPlay();
        determineWinner();
    }

    // 保存籌碼變更到資料庫
    saveChips();
}

// 函數：莊家強制勝出（作弊功能）
function forceDealerWin() {
    $_SESSION['game']['forceDealerWin'] = true;
    $_SESSION['game']['dealerRevealed'] = true; // 揭示莊家手牌
    $_SESSION['game']['message'] = '莊家被強制設為勝利。';
    dealerPlay();
    determineWinner();
}

// 函數：莊家行動
function dealerPlay() {
    $dealerValue = calculateHandValue($_SESSION['game']['dealerHand']);
    $playerValue = calculateHandValue($_SESSION['game']['playerHand']);

    if ($_SESSION['game']['forceDealerWin']) {
        // re
        while ($dealerValue <= $playerValue || $dealerValue > 21) {
            $_SESSION['game']['dealerHand'][2] = drawCard();
            $_SESSION['game']['dealerRevealed'] = true;  // show dealaers card
            $dealerValue = calculateHandValue($_SESSION['game']['dealerHand']);
        }
    } else {
        // 正常莊家行動：抽牌直到 >=17
        while ($dealerValue < 17) {
            $_SESSION['game']['dealerHand'][] = drawCard();
            $dealerValue = calculateHandValue($_SESSION['game']['dealerHand']);
        }
    }
}

// 函數：計算手牌點數
function calculateHandValue($hand) {
    $values = [0];
    foreach ($hand as $card) {
        $cardValues = [];
        if (in_array($card['value'], ['jack', 'queen', 'king'])) {
            $cardValues = [10];
        } elseif ($card['value'] === 'ace') {
            $cardValues = [1, 11];
        } else {
            $cardValues = [(int)$card['value']];
        }
        $temp = [];
        foreach ($values as $val) {
            foreach ($cardValues as $cVal) {
                $temp[] = $val + $cVal;
            }
        }
        $values = array_unique($temp);
    }
    $valid = array_filter($values, function($val) {
        return $val <= 21;
    });
    return empty($valid) ? min($values) : max($valid);
}

// 函數：確定勝負
function determineWinner() {
    $playerValue = calculateHandValue($_SESSION['game']['playerHand']);
    $dealerValue = calculateHandValue($_SESSION['game']['dealerHand']);
    $_SESSION['game']['dealerRevealed'] = true; // 揭示莊家手牌
    if ($playerValue > 21) {
        $_SESSION['game']['message'] = '你爆牌了，輸了！';
        endGame();
        return;
    }

    if ($dealerValue > 21) {
        $_SESSION['game']['message'] = '莊家爆牌，你贏了！';
        $_SESSION['game']['playerChips'] += $_SESSION['game']['currentBet'] * 2;
        endGame();
        return;
    }

    if ($playerValue > $dealerValue) {
        $_SESSION['game']['message'] = '你贏了！';
        $_SESSION['game']['playerChips'] += $_SESSION['game']['currentBet'] * 2;
    } elseif ($playerValue < $dealerValue) {
        $_SESSION['game']['message'] = '你輸了！';
    } else {
        $_SESSION['game']['message'] = '平局！';
        $_SESSION['game']['playerChips'] += $_SESSION['game']['currentBet'];
    }

    endGame();

    // 保存籌碼變更到資料庫
    saveChips();
}

// 函數：結束遊戲，保存歷史
function endGame() {
    $game = [
        'playerHand' => $_SESSION['game']['playerHand'],
        'dealerHand' => $_SESSION['game']['dealerHand'],
        'result' => $_SESSION['game']['message'],
        'bet' => $_SESSION['game']['currentBet'],
        'remainingChips' => $_SESSION['game']['playerChips'],
        'round' => $_SESSION['game']['currentRound']
    ];

    // 保存遊戲歷史到 session
    $_SESSION['game']['gameHistory'][] = $game;

    // 更新資料庫中的 game_data 和 chips
    saveGameHistory($game);

    // 保存遊戲結果到 cookie
    saveGameResultToCookie($game);

    // 重置當前遊戲
    $_SESSION['game']['currentBet'] = 0;
    $_SESSION['game']['playerHand'] = [];
    $_SESSION['game']['dealerHand'] = [];
    $_SESSION['game']['forceDealerWin'] = false;
    $_SESSION['game']['dealerRevealed'] = false; // 重置 dealerRevealed
    $_SESSION['game']['currentRound'] += 1;
}

// 函數：儲存遊戲歷史到資料庫
function saveGameHistory($game) {
    global $pdo;

    $user_id = $_SESSION['username'];  // 使用 session 中的 user_id

    // 取得目前的 gameHistory
    $gameHistory = $_SESSION['game']['gameHistory'];

    // 更新 game_data
    $gameDataJson = json_encode($gameHistory);

    // 更新使用者的 chips 和 game_data
    try {
        $query = "UPDATE users SET chips = :chips, game_data = :game_data, rounds = :rounds WHERE username = :id";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':chips' => $_SESSION['game']['playerChips'],
            ':game_data' => $gameDataJson,
            ':rounds' => count($gameHistory),
            ':id' => $user_id
        ]);

    } catch (PDOException $e) {
        // 處理資料庫錯誤
        $_SESSION['game']['message'] = '儲存遊戲歷史時發生錯誤。';
    }
}

// 函數：清除遊戲歷史
function clearGameHistory() {
    global $pdo;
    $user_id = $_SESSION['username'];

    try {
        // 清空 users 表中的 game_data 和 rounds
        $query = "UPDATE users SET game_data = :game_data, rounds = 0 WHERE username = :id";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':game_data' => json_encode([]),
            ':id' => $user_id
        ]);

        // 清空 game_history 表中的相關紀錄
        $deleteQuery = "DELETE FROM game_history WHERE username = :user_id";
        $deleteStmt = $pdo->prepare($deleteQuery);
        $deleteStmt->execute([':user_id' => $user_id]);

        // 清空 session 中的 gameHistory
        $_SESSION['game']['gameHistory'] = [];
        $_SESSION['game']['message'] = '遊戲歷史已清除。';
        $_SESSION['game']['currentRound'] = 1;
    } catch (PDOException $e) {
        $_SESSION['game']['message'] = '無法清除遊戲歷史。';
    }
}

// 函數：增加籌碼
function addChips() {
    if (isset($_POST['add_amount'])) {
        $amount = (int)$_POST['add_amount'];
        if ($amount > 0) {
            $_SESSION['game']['playerChips'] += $amount;
            $_SESSION['game']['message'] = "增加了 {$amount} 籌碼。";
            saveChips();
        } else {
            $_SESSION['game']['message'] = "無效的金額。";
        }
    }
}

// 函數：減少籌碼
function reduceChips() {
    if (isset($_POST['reduce_amount'])) {
        $amount = (int)$_POST['reduce_amount'];
        if ($amount > 0 && $amount <= $_SESSION['game']['playerChips']) {
            $_SESSION['game']['playerChips'] -= $amount;
            $_SESSION['game']['message'] = "減少了 {$amount} 籌碼。";
            saveChips();
        } else {
            $_SESSION['game']['message'] = "無效的金額或籌碼不足。";
        }
    }
}

// 函數：保存籌碼到資料庫
function saveChips() {
    global $pdo;
    $user_id = $_SESSION['username'];

    try {
        $query = "UPDATE users SET chips = :chips WHERE username = :id";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':chips' => $_SESSION['game']['playerChips'],
            ':id' => $user_id
        ]);
    } catch (PDOException $e) {
        $_SESSION['game']['message'] = '更新籌碼時發生錯誤。';
    }
}
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HW5_112550081_許秉棋</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* 置中表格 */
        #gameHistoryTable {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        #gameHistoryTable th, #gameHistoryTable td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        #gameHistoryTable th {
            background-color: gray;
        }

        /* 顯示登出按鈕和歡迎訊息在右上角 */
        #user-info {
            position: fixed;
            top: 10px;
            right: 10px;
            font-size: 16px;
        }

        #user-info button {
            margin-left: 10px;
            padding: 5px 10px; /* 減少 padding 來縮小按鈕 */
            font-size: 16px; /* 減少字體大小 */
            background-color: #f44336; /* 紅色按鈕 */
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px; /* 讓按鈕的邊角圓潤一些 */
        }

        #user-info button:hover {
            background-color: #d32f2f;
        }

        /* 卡片樣式 */
        .card {
            width: 80px;
            height: 120px;
            background-size: cover;
            display: inline-block;
            margin: 5px;
        }

        /* 其他樣式 */
        #game-container {
            max-width: 800px;
            margin: 100px auto;
            text-align: center;
        }

        #player-hand, #dealer-hand {
            margin: 20px 0;
        }

        #actions button, #utility-buttons button {
            padding: 10px 20px;
            margin: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        #message {
            font-size: 20px;
            margin: 20px 0;
            color: #333;
        }

        #chip-count {
            font-size: 18px;
            margin: 10px 0;
        }

        /* 表單樣式 */
        form {
            display: inline-block;
            margin: 5px;
        }

        /* 顯示表格 */
        #gameHistoryTable.show {
            display: table;
        }

        /* 隱藏表格 */
        #gameHistoryTable {
            display: none;
        }

        /* 下注表單樣式 */
        #bet-section {
            margin: 20px 0;
        }

        #bet-section input[type="number"] {
            padding: 10px;
            font-size: 16px;
            width: 150px;
            margin-right: 10px;
        }

        #bet-section button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <!-- 顯示用戶名稱和登出按鈕 -->
    <div id="user-info">
        <span>你好，<?php echo htmlspecialchars($user['username'] ?? ''); ?>!</span>
        <a href="login.php"><button>登出 (Logout)</button></a>
    </div>

    <div id="game-container">
        <h1>Blackjack 遊戲</h1>

        <!-- 顯示莊家手牌 -->
        <div id="dealer-hand">
            <h2>莊家手牌 (
                <?php 
                    if ($_SESSION['game']['dealerRevealed']) {
                        echo !empty($_SESSION['game']['dealerHand']) ? calculateHandValue($_SESSION['game']['dealerHand'] ?? []) : '???';
                    } else {
                        // 僅顯示第一張牌的點數，第二張牌為隱藏
                        echo !empty($_SESSION['game']['dealerHand']) ? calculateHandValue([$_SESSION['game']['dealerHand'][0]]) . ' + ?' : '???';
                    }
                ?>
            )</h2>
            <?php
                if (!empty($_SESSION['game']['dealerHand'])) {
                    foreach ($_SESSION['game']['dealerHand'] as $index => $card) {
                        if ($_SESSION['game']['dealerRevealed']) {
                            // 揭示所有牌
                            echo "<div class='card' style=\"background-image: url('images/" . htmlspecialchars($card['value']) . "_of_" . htmlspecialchars($card['suit']) . ".png');\"></div>";
                        } else {
                            if ($index == 0) {
                                // 顯示第一張牌
                                echo "<div class='card' style=\"background-image: url('images/" . htmlspecialchars($card['value']) . "_of_" . htmlspecialchars($card['suit']) . ".png');\"></div>";
                            } else {
                                // 隱藏第二張牌
                                echo "<div class='card' style=\"background-image: url('images/back.png');\"></div>";
                            }
                        }
                    }
                } else {
                    // 當沒有牌時，顯示兩張背面牌
                    echo "<div class='card' style=\"background-image: url('images/back.png');\"></div>";
                    echo "<div class='card' style=\"background-image: url('images/back.png');\"></div>";
                }
            ?>
        </div>

        <!-- 顯示玩家手牌 -->
        <div id="player-hand">
            <h2>你的手牌 (<?php echo calculateHandValue($_SESSION['game']['playerHand'] ?? []); ?>)</h2>
            <?php
                if (!empty($_SESSION['game']['playerHand'])) {
                    foreach ($_SESSION['game']['playerHand'] as $card) {
                        echo "<div class='card' style=\"background-image: url('images/" . htmlspecialchars($card['value']) . "_of_" . htmlspecialchars($card['suit']) . ".png');\"></div>";
                    }
                }
            ?>
        </div>

        <!-- 顯示訊息 -->
        <div id="message">
            <?php echo htmlspecialchars($_SESSION['game']['message'] ?? ''); ?>
        </div>
        
        <!-- 顯示籌碼 -->
        <div id="chip-count">
            籌碼: <?php echo htmlspecialchars($_SESSION['game']['playerChips'] ?? 0); ?>
        </div>
        
        <!-- 下注階段：顯示下注表單 -->
        <?php if ($_SESSION['game']['currentBet'] == 0): ?>
            <div id="bet-section">
                <h2>請下注</h2>
                <form method="POST">
                    <input type="hidden" name="action" value="start">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                    <input type="number" name="bet_amount" placeholder="下注金額" min="1" max="<?php echo htmlspecialchars($_SESSION['game']['playerChips']); ?>" required>
                    <button type="submit">下注並開始遊戲</button>
                </form>
            </div>
        <?php else: ?>
            <!-- 操作按鈕 -->
            <div id="actions">
                <form method="POST">
                    <input type="hidden" name="action" value="hit">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                    <button type="submit">要牌 (Hit)</button>
                </form>
                <form method="POST">
                    <input type="hidden" name="action" value="stand">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                    <button type="submit">停牌 (Stand)</button>
                </form>
                <form method="POST">
                    <input type="hidden" name="action" value="double">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                    <button type="submit">加倍 (Double)</button>
                </form>
                <form method="POST">
                    <input type="hidden" name="action" value="all_in">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                    <button type="submit">全押 (All-In)</button>
                </form>
                <form method="POST">
                    <input type="hidden" name="action" value="force_dealer_win">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                    <button type="submit">莊家贏 (Force Dealer Win)</button>
                </form>
            </div>
        <?php endif; ?>

        <!-- 增加或減少籌碼按鈕 -->
        <div id="utility-buttons">
            <form method="POST">
                <input type="hidden" name="action" value="add_chips">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                <input type="number" name="add_amount" placeholder="增加的籌碼" min="1" required>
                <button type="submit">增加籌碼 (Add Chips)</button>
            </form>
            <form method="POST">
                <input type="hidden" name="action" value="reduce_chips">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                <input type="number" name="reduce_amount" placeholder="減少的籌碼" min="1" required>
                <button type="submit">減少籌碼 (Reduce Chips)</button>
            </form>
            <form method="POST">
                <input type="hidden" name="action" value="clear_history">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                <button type="submit">清除遊戲歷史 (Clear History)</button>
            </form>
        </div>

        <!-- 顯示遊戲歷史 -->
        <div id="game-history">
            <h2>遊戲歷史</h2>
            <?php
                if (empty($_SESSION['game']['gameHistory'])) {
                    echo "<p>目前沒有遊戲歷史資料。</p>";
                } else {
                    echo "<table id='gameHistoryTable' class='show'>";
                    echo "<thead><tr><th>回合</th><th>玩家手牌</th><th>莊家手牌</th><th>結果</th><th>賭注</th><th>剩餘籌碼</th></tr></thead><tbody>";
                    foreach ($_SESSION['game']['gameHistory'] as $game) {
                        echo "<tr>";
                        echo "<td>" . htmlspecialchars($game['round'] ?? '') . "</td>";

                        // 玩家手牌
                        $playerHand = $game['playerHand'] ?? [];
                        echo "<td>";
                        foreach ($playerHand as $card) {
                            echo "<div class='card' style=\"background-image: url('images/" . htmlspecialchars($card['value']) . "_of_" . htmlspecialchars($card['suit']) . ".png');\"></div>";
                        }
                        echo "</td>";

                        // 莊家手牌
                        $dealerHand = $game['dealerHand'] ?? [];
                        echo "<td>";
                        foreach ($dealerHand as $card) {
                            echo "<div class='card' style=\"background-image: url('images/" . htmlspecialchars($card['value']) . "_of_" . htmlspecialchars($card['suit']) . ".png');\"></div>";
                        }
                        echo "</td>";

                        echo "<td>" . htmlspecialchars($game['result'] ?? '') . "</td>";
                        echo "<td>" . htmlspecialchars($game['bet'] ?? '') . "</td>";
                        echo "<td>" . htmlspecialchars($game['remainingChips'] ?? '') . "</td>";
                        echo "</tr>";
                    }
                    echo "</tbody></table>";
                }
            ?>
        </div>
    </div>
</body>
</html>