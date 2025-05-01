// <!-- 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6 -->

// Game variables
let deck = [];
let playerHand = [];
let dealerHand = [];
let currentBet = 0;
let gameHistory = [];
let forceDealerWin = false; // 初始為不強制莊家勝出
let dealervalue;

// 讀取 Cookie 函數
function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

// 更新 Cookie 函數
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));  // 設定過期時間
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toUTCString() + ";path=/";
}

// 初始化遊戲
function initGame() {
    document.getElementById('game-container').innerHTML = '';
    createLayout();
    updateChipCount();
    
    //let username = getCookie('username');
    let chips = getCookie('chips');
    let playerChips = parseInt(chips);  // 轉換為數字
    let gameDatacook = JSON.parse(getCookie('game_history'));  // 預設為空陣列|| '[]'

    // 這裡會由 PHP 傳遞過來的資料來設定玩家籌碼數量
    if (typeof playerChips !== 'undefined') {
        playerChips = parseInt(playerChips);
    }
    playerChips = parseInt(playerChips);
    updateChipCount();
}

// 顯示遊戲歷史
function displayGameHistory() {
    const tableBody = document.querySelector("#gameHistoryTable tbody");
    // const historyContainer = document.getElementById('history-container'); // 不使用時可以移除
    const gameHistoryTable = document.getElementById('gameHistoryTable'); // 確保有此元素

    // 清空表格內容，以避免重複顯示
    tableBody.innerHTML = "";

    // 發送 AJAX 請求從資料庫獲取遊戲歷史
    fetch('get_game_history.php')
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error('獲取遊戲歷史失敗:', data.message);
                // 在界面上顯示錯誤訊息
                const errorRow = document.createElement("tr");
                const errorCell = document.createElement("td");
                errorCell.colSpan = 6; // 根據表格的列數調整
                errorCell.textContent = "無法獲取遊戲歷史資料。";
                errorCell.style.textAlign = "center";
                errorRow.appendChild(errorCell);
                tableBody.appendChild(errorRow);
                return;
            }

            const gameHistory = data.gameHistory;

            if (gameHistory.length === 0) {
                // 如果沒有遊戲歷史，顯示提示訊息
                const noDataRow = document.createElement("tr");
                const noDataCell = document.createElement("td");
                noDataCell.colSpan = 6; // 根據表格的列數調整
                noDataCell.textContent = "目前沒有遊戲歷史資料。";
                noDataCell.style.textAlign = "center";
                noDataRow.appendChild(noDataCell);
                tableBody.appendChild(noDataRow);
                return;
            }

            // 填充遊戲歷史
            gameHistory.forEach((game, index) => {
                const row = document.createElement("tr");

                // 遊戲回合
                const roundCell = document.createElement("td");
                roundCell.textContent = `回合 ${index + 1}`;
                row.appendChild(roundCell);

                // 玩家手牌
                const playerHandCell = document.createElement("td");
                try {
                    let playerHand = JSON.parse(game.playerHand);
                    if (Array.isArray(playerHand)) {
                        // 生成卡片圖像
                        playerHandCell.innerHTML = playerHand.map(card => {
                            // 將 card.value 和 card.suit 轉換為小寫並使用下劃線連接
                            const value = card.value.toLowerCase();
                            const suit = card.suit.toLowerCase();
                            const imageName = `${value}_of_${suit}.png`;
                            return `<img src="images/${imageName}" alt="${card.value} of ${card.suit}" class="card-image">`;
                        }).join(' ');
                    } else {
                        playerHandCell.textContent = "無手牌資料";
                    }
                } catch (e) {
                    console.error("無法解析 playerHand:", e);
                    playerHandCell.textContent = "無手牌資料";
                }
                row.appendChild(playerHandCell);

                // 莊家手牌
                const dealerHandCell = document.createElement("td");
                try {
                    let dealerHand = JSON.parse(game.dealerHand);
                    if (Array.isArray(dealerHand)) {
                        // 生成卡片圖像
                        dealerHandCell.innerHTML = dealerHand.map(card => {
                            const value = card.value.toLowerCase();
                            const suit = card.suit.toLowerCase();
                            const imageName = `${value}_of_${suit}.png`;
                            return `<img src="images/${imageName}" alt="${card.value} of ${card.suit}" class="card-image">`;
                        }).join(' ');
                    } else {
                        dealerHandCell.textContent = "無手牌資料";
                    }
                } catch (e) {
                    console.error("無法解析 dealerHand:", e);
                    dealerHandCell.textContent = "無手牌資料";
                }
                row.appendChild(dealerHandCell);

                // 結果
                const resultCell = document.createElement("td");
                resultCell.textContent = game.result || "尚未結束";
                row.appendChild(resultCell);

                // 賭注
                const betCell = document.createElement("td");
                betCell.textContent = game.bet;
                row.appendChild(betCell);

                // 剩餘籌碼
                const remainingChipsCell = document.createElement("td");
                remainingChipsCell.textContent = game.remainingChips;
                row.appendChild(remainingChipsCell);

                // 將行加入表格
                tableBody.appendChild(row);
            });

            // 檢查是否已經有清除按鈕，如果沒有，則創建並添加
            const existingButton = document.getElementById('clear-history-button');
            if (!existingButton) {
                const clearButton = document.createElement('button');
                clearButton.textContent = 'Clear Game History';
                clearButton.id = 'clear-history-button';
                clearButton.onclick = clearGameHistory;

                // 確保將按鈕添加到 history-container 中
                gameHistoryTable.appendChild(clearButton);
            }

            // 顯示 history-container
            gameHistoryTable.style.display = 'block';
        })
        .catch(error => {
            console.error('獲取遊戲歷史s時發生錯誤:', error);
            // 在界面上顯示錯誤訊息
            const errorRow = document.createElement("tr");
            const errorCell = document.createElement("td");
            errorCell.colSpan = 6; // 根據表格的列數調整
            errorCell.textContent = "獲取遊戲歷s史時發生錯誤。";
            errorCell.style.textAlign = "center";
            errorRow.appendChild(errorCell);
            tableBody.appendChild(errorRow);
        });
}



// 清除遊戲歷史
function clearGameHistory() {
    if (confirm('Are you sure you want to clear the game history?')) {
        // 發送 AJAX 請求到伺服器端清除遊戲歷史
        fetch('clear_game_history.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clear: true }) // 可選的請求主體，根據需要調整
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('遊戲歷史已清除。');
                // 清空客戶端的顯示
                const tableBody = document.querySelector("#gameHistoryTable tbody");
                tableBody.innerHTML = "";

                // 顯示無資料提示
                const noDataRow = document.createElement("tr");
                const noDataCell = document.createElement("td");
                noDataCell.colSpan = 6; // 根據表格的列數調整
                noDataCell.textContent = "目前沒有遊戲歷史資料。";
                noDataCell.style.textAlign = "center";
                noDataRow.appendChild(noDataCell);
                tableBody.appendChild(noDataRow);

                // 如果存在清除按鈕以外的提示訊息，可以顯示通知
                displayMessage('Game history has been cleared.');

                // 可選：更新客戶端的 cookies 或其他儲存的資料
                 setCookie('game_history', JSON.stringify([]), 7);  // 清空遊戲歷史的 Cookie

            } else {
                console.error('清除遊戲歷史失敗:', data.message);
                alert('清除遊戲歷史失敗: ' + (data.message || '未知錯誤'));
            }
        })
        .catch(error => {
            console.error('清除遊戲歷史時發生錯誤:', error);
            alert('清除遊戲歷史時發生錯誤。');
        });
    }
}

// Toggle game history visibility
function toggleGameHistory() {
    const historyContainer = document.getElementById('history-container');
    const table = document.getElementById('gameHistoryTable');
    // 檢查 table 是否顯示
    if (table.style.display === 'none' || table.style.display === '') {
        // 顯示遊戲紀錄
        table.style.display = 'block';
        displayGameHistory();
    } else {
        // 隱藏遊戲紀錄
        table.style.display = 'none';
    }
}

function createLayout() {
    const container = document.getElementById('game-container');

    // Player and dealer hands
    const dealerArea = document.createElement('div');
    dealerArea.id = 'dealer-hand';
    container.appendChild(dealerArea);

    const playerArea = document.createElement('div');
    playerArea.id = 'player-hand';
    container.appendChild(playerArea);

    // Result message area
    const resultMessage = document.createElement('div');
    resultMessage.id = 'result-message';
    container.appendChild(resultMessage);

    // Action buttons
    const actions = document.createElement('div');
    actions.id = 'actions';

    const hitButton = document.createElement('button');
    hitButton.textContent = 'Hit(要牌)';
    hitButton.id = 'hit-button';
    hitButton.onclick = playerHit;
    hitButton.style.display = 'none'; // Hide initially
    actions.appendChild(hitButton);

    const standButton = document.createElement('button');
    standButton.textContent = 'Stand(停牌)';
    standButton.id = 'stand-button';
    standButton.onclick = playerStand;
    standButton.style.display = 'none'; // Hide initially
    actions.appendChild(standButton);

    // New Double button
    const doubleButton = document.createElement('button');
    doubleButton.textContent = 'Double(加倍下注)';
    doubleButton.id = 'double-button';
    doubleButton.onclick = playerDouble;
    doubleButton.style.display = 'none'; // Hide initially
    actions.appendChild(doubleButton);

    container.appendChild(actions);

    // Chip count display
    const chipCount = document.createElement('div');
    chipCount.id = 'chip-count';
    chipCount.textContent = `Chips (你的籌碼): ${playerChips}`;
    container.appendChild(chipCount);

    // Bet input
    const betInput = document.createElement('input');
    betInput.type = 'number';
    betInput.id = 'bet-input';
    betInput.placeholder = 'Enter your bet. Good luck.';
    container.appendChild(betInput);

    // Bet button
    const betButton = document.createElement('button');
    betButton.textContent = 'Place Bet (下注)';
    betButton.id = 'bet-button';
    betButton.onclick = placeBet;
    container.appendChild(betButton);

    // 新增 All-In 按鈕
    const allInButton = document.createElement('button');
    allInButton.textContent = 'All-In (全部籌碼)';
    allInButton.id = 'all-in-button';
    allInButton.onclick = allIn;
    container.appendChild(allInButton);

    // Utility buttons (Add Chips, View Game History)
    const utilityButtons = document.createElement('div');
    utilityButtons.id = 'utility-buttons';

    // 增加籌碼按鈕
    const signalButton = document.createElement('button');
    signalButton.textContent = 'Add Chips (增加籌碼)';
    signalButton.id = 'signal-button';
    signalButton.onclick = signal;
    utilityButtons.appendChild(signalButton);

    // 減少籌碼按鈕
    const reduceButton = document.createElement('button');
    reduceButton.textContent = 'Reduce Chips (減少籌碼)';
    reduceButton.id = 'reduce-button';
    reduceButton.onclick = reduceChips;
    utilityButtons.appendChild(reduceButton);

    // 新增 "莊家贏" 按鈕
    const dealerWinButton = document.createElement('button');
    dealerWinButton.textContent = 'Dealer Wins (莊家贏)';
    dealerWinButton.id = 'dealer-win-button';
    dealerWinButton.onclick = dealerWins;
    dealerWinButton.style.display = 'none'; // Hide initially
    utilityButtons.appendChild(dealerWinButton);

    // 創建查看遊戲歷史的按鈕 
    const historyButton = document.createElement('button');
    historyButton.textContent = 'View Game History (遊戲紀錄)';
    historyButton.id = 'history-button';
    historyButton.onclick = toggleGameHistory;
    utilityButtons.appendChild(historyButton);

    container.appendChild(utilityButtons);

    // Game history container (hidden by default)
    const historyContainer = document.createElement('div');
    historyContainer.id = 'history-container';
    historyContainer.style.display = 'none'; // Hidden initially
    container.appendChild(historyContainer);
}

// Dealer Wins 函數
async function dealerWins() {
    // 設置強制莊家勝出
    forceDealerWin = true;
    document.getElementById('dealer-win-button').style.display = 'none'; 

    // 設定遊戲結果訊息
    const resultMessage = document.getElementById('result-message');
    resultMessage.textContent = '使用作弊按鈕，莊家會贏！';

    // // 隱藏玩家操作按鈕
    // document.getElementById('hit-button').style.display = 'none';
    // document.getElementById('stand-button').style.display = 'none';
    // document.getElementById('double-button').style.display = 'none';
    // document.getElementById('dealer-win-button').style.display = 'none';

    // // 調用 dealerPlay 以執行莊家的動作
    // await dealerPlay();
    // // 記錄遊戲結果並結束遊戲
    // endGame('Dealer wins');
}

// 更新籌碼顯示
function updateChipCount() {
    document.getElementById('chip-count').textContent = `Chips (你的籌碼): ${playerChips}`;
}

// Place bet function
function placeBet() {
    const bet = parseInt(document.getElementById('bet-input').value);
    if (bet > playerChips || bet <= 0 || isNaN(bet)) {
        displayMessage('Invalid bet amount.');
        return;
    }
    currentBet = bet;
    playerChips -= bet;
    updateChipCount();

    // Hide the Bet input, Place Bet button, and All-In button
    document.getElementById('bet-input').style.display = 'none';
    document.getElementById('bet-input').value = "";
    document.getElementById('bet-button').style.display = 'none';
    document.getElementById('all-in-button').style.display = 'none'; // 隱藏 All-In 按鈕

    // Hide previous result message
    displayMessage('');

    // Show the Hit, Stand, and Double buttons
    document.getElementById('hit-button').style.display = 'inline-block';
    document.getElementById('stand-button').style.display = 'inline-block';

    startGame();
}

// 添加 All-In 功能
function allIn() {
    // 自動在 bet input 中填入所有籌碼數量
    const betInput = document.getElementById('bet-input');
    betInput.value = playerChips;
    
    // 執行下注
    placeBet();
}


// Start the game
function startGame() {
    createDeck();
    shuffleDeck();
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    displayHands();
    checkForBlackjack();

    // Show the Double button if the player has enough chips
    if (playerChips >= currentBet) {
        document.getElementById('double-button').style.display = 'inline-block';
    } else {
        document.getElementById('double-button').style.display = 'none';
    }

    //show dealerwin button
    document.getElementById('dealer-win-button').style.display = 'inline-block';
}

// Create a standard 52-card deck
function createDeck() {
    deck = [];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = [
        'ace', '2', '3', '4', '5', '6', '7',
        '8', '9', '10', 'jack', 'queen', 'king'
    ];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

// Shuffle the deck
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Draw a card from the deck
function drawCard() {
    return deck.pop();
}

// Calculate all possible hand values
function calculateHandValues(hand) {
    let values = [0];
    for (let card of hand) {
        let cardValues = [];
        if (card.value === 'jack' || card.value === 'queen' || card.value === 'king') {
            cardValues = [10];
        } else if (card.value === 'ace') {
            cardValues = [1, 11];
        } else {
            cardValues = [parseInt(card.value)];
        }
        let tempValues = [];
        for (let val of values) {
            for (let cVal of cardValues) {
                tempValues.push(val + cVal);
            }
        }
        values = tempValues;
    }
    // Remove duplicates and sort
    values = [...new Set(values)].sort((a, b) => a - b);
    return values;
}

// Display player and dealer hands
function displayHands(showDealerCards = false) {
    const playerArea = document.getElementById('player-hand');
    playerArea.innerHTML = '';

    // Calculate player hand values
    const playerValues = calculateHandValues(playerHand);
    const playerHeader = document.createElement('h2');
    playerHeader.textContent = `Your Hand (${formatHandValues(playerValues)})`;
    playerArea.appendChild(playerHeader);

    playerHand.forEach(card => {
        const cardDiv = createCardDiv(card);
        playerArea.appendChild(cardDiv);
    });

    const dealerArea = document.getElementById('dealer-hand');
    dealerArea.innerHTML = '';

    // Calculate dealer hand values
    const dealerValues = calculateHandValues(dealerHand);

    const dealerHeader = document.createElement('h2');
    if (showDealerCards) {
        dealerHeader.textContent = `Dealer's Hand (${formatHandValues(dealerValues)})`;
    } else {
        const firstCardValue = getCardValue(dealerHand[0]);
        dealerHeader.textContent = `Dealer's Hand (${firstCardValue} + ?)`;
    }
    dealerArea.appendChild(dealerHeader);

    dealerHand.forEach((card, index) => {
        const hidden = !showDealerCards && index === 1;
        const cardDiv = createCardDiv(card, hidden);
        dealerArea.appendChild(cardDiv);
    });
}

// Helper function to format hand values
function formatHandValues(values) {
    // Remove values over 21
    const validValues = values.filter(val => val <= 21);
    if (validValues.length === 0) {
        validValues.push(Math.min(...values));
    }
    return validValues.join(' or ');
}

// Get card value for display
function getCardValue(card) {
    if (card.value === 'jack' || card.value === 'queen' || card.value === 'king') {
        return '10';
    } else if (card.value === 'ace') {
        return '1 or 11';
    } else {
        return card.value;
    }
}

// Create a card div element
function createCardDiv(card, hidden = false, small = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    if (small) {
        cardDiv.classList.add('small-card');
    }
    if (!hidden) {
        cardDiv.style.backgroundImage = `url('images/${card.value}_of_${card.suit}.png')`;
    } else {
        cardDiv.style.backgroundImage = `url('images/back.png')`;
    }
    return cardDiv;
}

// Calculate best hand value (<=21)
function calculateBestHandValue(hand) {
    const values = calculateHandValues(hand);
    const validValues = values.filter(val => val <= 21);
    if (validValues.length > 0) {
        return Math.max(...validValues);
    } else {
        return Math.min(...values);
    }
}

// Check for blackjack on initial deal
function checkForBlackjack() {
    const playerValue = calculateBestHandValue(playerHand);
    const dealerValue = calculateBestHandValue(dealerHand);
    if (playerValue === 21) {
        displayHands(true); // Reveal dealer's cards
        if (dealerValue === 21) {
            playerChips += currentBet; // return borginal bet back
            updateChipCount();
            endGame('Push (Tie). (+0)');
        } else {
            const blackjackWin = currentBet * 1.5; // Blackjack pays 3:2
            playerChips += currentBet + blackjackWin;
            updateChipCount();
            endGame(`Blackjack! You win. (+${blackjackWin})`);
        }
    }
}

// Delay function to pause execution for given milliseconds
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Player chooses to hit
async function playerHit() {
    playerHand.push(drawCard());
    displayHands();
    // Hide the Double button
    document.getElementById('double-button').style.display = 'none';
    const playerValue = calculateBestHandValue(playerHand);
    if (playerValue > 21) {
        document.getElementById('hit-button').style.display = 'none';
        document.getElementById('stand-button').style.display = 'none';
        
        displayHands(true); // Reveal dealer's cards
        // Use setTimeout to ensure UI updates before displaying message
        setTimeout(() => {
            endGame(`Bust! You lose. (-${currentBet})`);
        }, 1000); // 延遲1秒
    }
}

// Player chooses to stand
async function playerStand() {
    // Hide the Double button
    document.getElementById('hit-button').style.display = 'none';
    document.getElementById('stand-button').style.display = 'none';
    document.getElementById('double-button').style.display = 'none';

    await dealerPlay(); // 等待莊家完成動作
}

// Player chooses to double
async function playerDouble() {
    if (playerChips < currentBet) {
        displayMessage('Not enough chips to double.');
        return;
    }
    // Deduct the additional bet
    playerChips -= currentBet;
    currentBet *= 2;
    updateChipCount();

    // Hide action buttons
    document.getElementById('hit-button').style.display = 'none';
    document.getElementById('stand-button').style.display = 'none';
    document.getElementById('double-button').style.display = 'none';

    // Player takes one more card
    playerHand.push(drawCard());
    displayHands();

    const playerValue = calculateBestHandValue(playerHand);
    if (playerValue > 21) {
        document.getElementById('hit-button').style.display = 'none';
        document.getElementById('stand-button').style.display = 'none';
        
        displayHands(true); // Reveal dealer's cards
        setTimeout(() => {
            endGame(`Bust! You lose. (-${currentBet})`);
        }, 1000); // 延遲1秒
    } else {
        // Proceed to dealer's turn
        await dealerPlay(); // 等待莊家完成動作
    }
}

// Dealer's turn
async function dealerPlay() {
    // Reveal dealer's hidden card
    displayHands(true);
    await delay(1000); // 延遲1秒

    let dealerValue = calculateBestHandValue(dealerHand);
    const playerValue = calculateBestHandValue(playerHand);

    if (forceDealerWin) {
        // 強制莊家勝出：持續抽牌直到 dealerValue > playerValue 且 <= 21
        if(dealerValue < 11 ) {
            dealerHand.push(drawCard());
            dealerValue = calculateBestHandValue(dealerHand);

            while(dealerValue >21){
                dealerHand.push(drawCard());
                dealerValue = calculateBestHandValue(dealerHand);
                dealerHand.pop();
            }
            
        }
            
        while (dealerValue <= playerValue || dealerValue > 21) {
            dealerHand.push(drawCard());
            displayHands(true);
            await delay(1000); // 延遲1秒
            dealerValue = calculateBestHandValue(dealerHand);
            console.log(dealerValue);
            if(dealerValue == 21) break;
            
            dealerHand.pop();
        }
    } else {
        // 正常莊家行為：抽牌直到 dealerValue >= 17
        while (dealerValue < 17) {
            dealerHand.push(drawCard());
            displayHands(true);
            await delay(1000); // 延遲1秒
            dealerValue = calculateBestHandValue(dealerHand);
        }
    }
    console.log(dealerValue);
    determineWinner();
}

// Determine the winner
function determineWinner() {
    // 重置強制莊家勝出變數
    forceDealerWin = false;

    const playerValue = calculateBestHandValue(playerHand);
    let dealerValue = calculateBestHandValue(dealerHand);
    let chipChange = 0;
    console.log(dealerValue);
    if (dealerValue > 21 || playerValue > dealerValue) {
        chipChange = currentBet; // 玩家贏得賭注
        playerChips += currentBet * 2;
        updateChipCount();
        endGame(`You win! (+${chipChange})`);
    } else if(playerValue < dealerValue) {
        chipChange = -currentBet;
        updateChipCount();
        endGame(`You lose. (${chipChange})`);
    } else {
        chipChange = 0;
        // Push (Tie)
        endGame('Push (Tie). (+0)');
    }
}

// Signal function to add additional chips
function signal() {
    const additionalChips = parseInt(prompt('Enter amount of chips to add:'));
    if (additionalChips <= 0 || isNaN(additionalChips)) {
        displayMessage('Invalid amount.');
        return;
    }
    playerChips += additionalChips;
    updateChipCount();
    displayMessage(`You have added ${additionalChips} chips.`);
}

// 減少籌碼 功能
function reduceChips() {
    const reduceAmount = parseInt(prompt('Enter amount of chips to reduce:'));
    if (reduceAmount <= 0 || isNaN(reduceAmount)) {
        displayMessage('Invalid amount.');
        return;
    }

    if (reduceAmount > playerChips) {
        displayMessage('Cannot reduce more chips than you have.');
        return;
    }

    playerChips -= reduceAmount;
    updateChipCount();
    displayMessage(`You have reduced ${reduceAmount} chips.`);

    // 如果玩家的籌碼降到0或以下，重置為100
    if (playerChips <= 0) {
        displayMessage('You have no chips left! Starting over with 100 chips.');
        sessionStorage.removeItem('playerChips');
        playerChips = 100;
        updateChipCount();
    }
}

// Function to display messages on the page
function displayMessage(message) {
    const resultMessage = document.getElementById('result-message');
    resultMessage.textContent = message;
}


// // End the game
function endGame(message) {
    // Use setTimeout to ensure UI updates before displaying message
    setTimeout(() => {
        displayMessage(message);

        // Reset buttons and inputs
        document.getElementById('bet-input').style.display = 'inline-block';
        document.getElementById('bet-button').style.display = 'inline-block';
        document.getElementById('all-in-button').style.display = 'inline-block'; // 顯示 All-In 按鈕
        document.getElementById('hit-button').style.display = 'none';
        document.getElementById('stand-button').style.display = 'none';
        document.getElementById('double-button').style.display = 'none';

        // 如果玩家的籌碼為 0，重設為 100
        if (playerChips <= 0) {
            displayMessage('You have lost all your chips! Starting over with 100 chips.');
            sessionStorage.removeItem('playerChips');
            playerChips = 100;
            updateChipCount();
        }

        // 更新玩家籌碼
        updatePlayerChips(playerChips);
        saveGameHistory(message);

    }, 100);
}

// Start the game when the page loads
window.onload = initGame;

