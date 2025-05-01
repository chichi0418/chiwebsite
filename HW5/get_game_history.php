<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
// get_game_history.php

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

try {
    // Prepare the SQL statement
    $stmt = $pdo->prepare("SELECT game_data FROM users WHERE username = :user_id LIMIT 1");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
    $stmt->execute();

    // Fetch the result
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        // Decode the JSON game data
        $game_data = json_decode($row['game_data'], true);

        // Ensure 'gameHistory' exists and is an array
        if (isset($game_data['gameHistory']) && is_array($game_data['gameHistory'])) {
            $gameHistory = $game_data['gameHistory'];
        } else {
            $gameHistory = [];
        }

        // Respond with success and the game history
        echo json_encode(['success' => true, 'gameHistory' => $gameHistory]);
    } else {
        // No game history found; return empty array
        echo json_encode(['success' => true, 'gameHistory' => []]);
    }
} catch (PDOException $e) {
    // Handle any PDO exceptions
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
