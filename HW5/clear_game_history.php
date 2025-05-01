<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
// clear_game_history.php

// 包含資料庫連接檔案
include('includes/db.php'); // 確保這個路徑正確

// 開始 session
session_start();

// 確保玩家已經登入
if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

$user_id = $_SESSION['username'];

try {
    // 將 game_data 設定為空的 gameHistory
    $emptyGameHistory = json_encode(['gameHistory' => []]);

    // 更新資料庫中的遊戲歷史
    $query = "UPDATE users SET game_data = :game_data WHERE username = :user_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':game_data', $emptyGameHistory, PDO::PARAM_STR);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => '遊戲歷史已清除。']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => '資料庫錯誤: ' . $e->getMessage()]);
}
?>
