<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
// 包含資料庫連接檔案
include('includes/db.php'); // 確保此路徑正確，並包含 db.php 檔案
session_start();

// 確保玩家已經登入
if (!isset($_SESSION['username'])) {
    echo "Not logged in";
    exit();
}

$user_id = $_SESSION['username']; // 取得 session 中的 username
$new_chips = isset($_POST['chips']) ? intval($_POST['chips']) : 0; // 接收 AJAX 傳來的籌碼數量

// 使用 PDO 更新玩家的籌碼數量
try {
    $query = "UPDATE users SET chips = :chips WHERE username = :username";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':chips', $new_chips, PDO::PARAM_INT);
    $stmt->bindParam(':username', $user_id, PDO::PARAM_STR);  // 根據 username 更新
    $stmt->execute();

    // 如果更新成功，回傳成功訊息
    echo "Chips updated successfully!";
} catch (PDOException $e) {
    // 處理資料庫錯誤
    echo "Database error: " . $e->getMessage();
}
?>
