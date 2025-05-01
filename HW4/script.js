/*<!--
112550081 許秉棋 第4次作業 11/17
112550081 PING CHI HSU The Fourth Homework 11/17
-->*/

// Game variables
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerChips = 100;
let currentBet = 0;
let gameHistory = [];

// Load game history from localStorage
if (localStorage.getItem('gameHistory')) {
    gameHistory = JSON.parse(localStorage.getItem('gameHistory'));
}

// Initialize the game
function initGame() {
    document.getElementById('game-container').innerHTML = '';
    createLayout();
    updateChipCount();
    if (sessionStorage.getItem('playerChips')) {
        playerChips = parseInt(sessionStorage.getItem('playerChips'));
    } else {
        sessionStorage.setItem('playerChips', playerChips);
    }
    updateChipCount();
}

// Create game layout dynamically
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
    allInButton.textContent = 'All-In \n(全部籌碼)';
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

// Update chip count display
function updateChipCount() {
    document.getElementById('chip-count').textContent = ` Chips (你的籌碼): ${playerChips}`;
    sessionStorage.setItem('playerChips', playerChips);
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
    while (dealerValue < 17) {
        dealerHand.push(drawCard());
        displayHands(true);
        await delay(1000); // 延遲1秒
        dealerValue = calculateBestHandValue(dealerHand);
    }
    determineWinner();
}

// Determine the winner
function determineWinner() {
    const playerValue = calculateBestHandValue(playerHand);
    const dealerValue = calculateBestHandValue(dealerHand);
    let message='';
    let chipChange = 0;

    if (dealerValue > 21 || playerValue > dealerValue) {
        chipChange = currentBet; // won: get double currentbet back 
        playerChips += currentBet * 2;
        updateChipCount();
        endGame(`You win! (+${chipChange})`);
    } else if (playerValue < dealerValue) {
        chipChange = -currentBet;
        endGame(`You lose. (${chipChange})`);
    } else {
        chipChange = 0;
        playerChips += currentBet;
        updateChipCount();
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

// Toggle game history visibility
function toggleGameHistory() {
    const historyContainer = document.getElementById('history-container');
    if (historyContainer.style.display === 'none') {
        historyContainer.style.display = 'block';
        createResultsTable();
    } else {
        historyContainer.style.display = 'none';
    }
}

// End the game
function endGame(message) {
    // Use setTimeout to ensure UI updates before displaying message
    setTimeout(() => {
        displayMessage(message);
        saveGameHistory(message);

        // Reset buttons and inputs
        document.getElementById('bet-input').style.display = 'inline-block';
        document.getElementById('bet-button').style.display = 'inline-block';
        document.getElementById('all-in-button').style.display = 'inline-block'; // 顯示 All-In 按鈕
        document.getElementById('hit-button').style.display = 'none';
        document.getElementById('stand-button').style.display = 'none';
        document.getElementById('double-button').style.display = 'none';

        if (playerChips <= 0) {
            displayMessage('You have lost all your chips! Starting over with 100 chips.');
            sessionStorage.removeItem('playerChips');
            playerChips = 100;
            updateChipCount();
        }
    }, 100);
}

// Save game history to localStorage
function saveGameHistory(result) {
    const gameData = {
        playerHand: [...playerHand], // Save the card objects
        dealerHand: [...dealerHand],
        result: result,
        bet: currentBet,
        remainingChips: playerChips
    };
    gameHistory.push(gameData);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

// Create results table
function createResultsTable() {
    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    table.id = 'results-table';
    const headerRow = document.createElement('tr');
    ['Player Hand', 'Dealer Hand', 'Result', 'Bet', 'Remaining Chips'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    gameHistory.forEach(game => {
        const row = document.createElement('tr');

        // Player Hand cell
        const playerHandCell = document.createElement('td');
        game.playerHand.forEach(card => {
            const cardDiv = createCardDiv(card, false, true); // Small size
            playerHandCell.appendChild(cardDiv);
        });
        row.appendChild(playerHandCell);

        // Dealer Hand cell
        const dealerHandCell = document.createElement('td');
        game.dealerHand.forEach(card => {
            const cardDiv = createCardDiv(card, false, true); // Small size
            dealerHandCell.appendChild(cardDiv);
        });
        row.appendChild(dealerHandCell);

        // Result cell
        const resultCell = document.createElement('td');
        resultCell.textContent = game.result;
        row.appendChild(resultCell);

        // Bet cell
        const betCell = document.createElement('td');
        betCell.textContent = game.bet;
        row.appendChild(betCell);

        // Remaining Chips cell
        const chipsCell = document.createElement('td');
        chipsCell.textContent = game.remainingChips;
        row.appendChild(chipsCell);

        table.appendChild(row);
    });
    historyContainer.appendChild(table);

    // Add Clear Game History button inside history container
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Game History';
    clearButton.id = 'clear-history-button';
    clearButton.onclick = clearGameHistory;
    historyContainer.appendChild(clearButton);
}

// Clear game history
function clearGameHistory() {
    if (confirm('Are you sure you want to clear the game history?')) {
        gameHistory = [];
        localStorage.removeItem('gameHistory');
        createResultsTable();
        displayMessage('Game history has been cleared.');
    }
}

// Start the game when the page loads
window.onload = initGame;

