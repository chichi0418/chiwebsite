<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
// 包含資料庫連接檔案
include('includes/db.php'); // Make sure this path is correct and includes the db.php file
error_reporting(E_ALL);    
ini_set('display_errors', 1); 

// 開始 session
session_start();
// 從 session 中取得玩家ID (也可說是username)
$user_id = $_SESSION['username'];

// 確保玩家已經登入
if (!isset($user_id)) {
    header("Location: login.php");
    exit();
}

// 使用 PDO 查詢玩家資料
try {
    // 查詢玩家資料
    $query = "SELECT * FROM users WHERE username = :user_id";
    $stmt = $pdo->prepare($query);  // 使用 $pdo 來準備查詢
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    // 取得查詢結果
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $username = $user['username'];
        $chips = $user['chips'];
        $game_data = $user['game_data']; // 這裡你可以根據需要擴展遊戲數據
        $game_history = json_decode($game_data, true); // 假設遊戲歷史是 JSON 格式儲存

        // 儲存玩家資料到 cookie (有效期設定為 7 天)
        setcookie('username', $username, time() + (7 * 24 * 60 * 60), "/"); // 7 天有效期
        setcookie('chips', $chips, time() + (7 * 24 * 60 * 60), "/"); // 7 天有效期
        setcookie('game_history', json_encode($game_history), time() + (7 * 24 * 60 * 60), "/"); // 儲存遊戲歷史

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

// 關閉資料庫連線（PDO 使用完畢後會自動關閉）
// 返回遊戲歷史資料
// header('Content-Type: application/json');
// echo json_encode($game_history);

?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game3</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js"></script>
</head>
<body>
    <!-- 顯示用戶名稱和登出按鈕 -->
    <div id="user-info">
        <span>你好，<?php echo $username; ?>!</span>
        <a href="login.php"><button>登出 (Logout)</button></a>
    </div>

    <div id="game-container"></div>
    <script>

        function updatePlayerChips(chips) {
            // 發送 AJAX 請求將新的 chips 數量存回資料庫
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'update_chips.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // 如果更新成功，顯示伺服器回應
                    console.log(xhr.responseText);
                }
            };

            // 發送 AJAX 請求，傳遞新的 chips 數量
            xhr.send('chips=' + encodeURIComponent(chips));
        }

        // 儲存遊戲歷史到資料庫
        function saveGameHistory(message) {
            // 先讀取現有的遊戲歷史資料
            let oldgameHistory = getCookie('game_history');
            if (oldgameHistory) {
                // 如果 Cookie 中有資料，轉換為 JSON
                oldgameHistory = JSON.parse(oldgameHistory);

                // 確保資料是陣列型別
                if (!Array.isArray(oldgameHistory)) {
                    gameHistory = [];  // 如果不是陣列，初始化為空陣列
                }
            } else {
                // 如果沒有遊戲歷史資料，初始化為空陣列
                gameHistory = [];
            }

            // 轉換新的遊戲回合資料
            const gameData = {
                playerHand: JSON.stringify(playerHand),  // 將手牌轉換為 JSON 字串
                dealerHand: JSON.stringify(dealerHand),
                result: message,
                bet: currentBet,
                remainingChips: playerChips
            };
            
            // 更新遊戲歷史紀錄
            oldgameHistory.push(gameData);
            
            // 儲存更新後的遊戲歷史資料到 Cookie
            setCookie('game_history', JSON.stringify(oldgameHistory), 7);  // 7 天有效期

            // 發送 AJAX 請求將遊戲歷史存入資料庫
            fetch('save_game_history.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameHistory: oldgameHistory
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Game history saved successfully.');
                } else {
                    console.error('Failed to save game history.');
                }
            })
            .catch(error => console.error('Error saving game history:', error));
        }


        // 假設 playerChips 是從 PHP 傳遞來的變數
        let playerChips = <?php echo $chips; ?>;
        let gameData = <?php echo json_encode($game_history); ?>;
        
        // 初始化遊戲並在遊戲結束後更新玩家的籌碼數量
        initGame();

        // 假設在遊戲中，玩家進行某些操作後會改變 chips
        // 例如，當玩家結束遊戲並需要更新 chips 時
        //playerChips = 1000; // 假設更新後的 chips 是 1000

        // 更新資料庫中的 chips
        updatePlayerChips(playerChips);
        
    </script>
    <style>
        /* 置中表格 */
        #gameHistoryTable {
            display: flex;
            justify-content: center;  /* 水平居中 */
            align-items: center;      /* 垂直居中 (可選) */
            height: 100vh;            /* 視窗高度 */
        }

        /* 顯示登出按鈕和歡迎訊息在右上角 */
        #user-info {
            position: fixed;
            top: 10px;
            right: 5px;
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
    </style>

    <!-- <div id="history-container" style="display:none;"> -->
        <table id="gameHistoryTable" style="display:none;">
            <thead>
                <tr>
                    <th>回合</th>
                    <th>玩家手牌</th>
                    <th>莊家手牌</th>
                    <th>結果</th>
                    <th>賭注</th>
                    <th>剩餘籌碼</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    <!-- </div> -->
</body>
</html>

<!-- 剩下歷史資料讀寫 cookie/sql 跟外觀 -->