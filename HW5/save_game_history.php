<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
// save_game_history.php

// Include database connection file
include('includes/db.php'); // Ensure this path is correct

// Start session
session_start();

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

$user_id = $_SESSION['username']; // Assuming 'username' is unique and stored in session

// Get the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate the input
if (!isset($data['gameHistory']) || !is_array($data['gameHistory'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid game history data.']);
    exit();
}

$gameHistoryArray = $data['gameHistory'];

// Encode the game history with 'gameHistory' key
$gameHistoryJson = json_encode(['gameHistory' => $gameHistoryArray]);

try {
    // Prepare the SQL statement
    $stmt = $pdo->prepare("UPDATE users SET game_data = :game_data WHERE username = :user_id");
    $stmt->bindParam(':game_data', $gameHistoryJson, PDO::PARAM_STR);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
    $stmt->execute();

    // Respond with success
    echo json_encode(['success' => true, 'message' => 'Game history saved successfully.']);
} catch (PDOException $e) {
    // Handle any PDO exceptions
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
