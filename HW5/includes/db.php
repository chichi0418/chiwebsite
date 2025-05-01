<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
$servername = "127.0.0.1";  // 使用 127.0.0.1 而非 localhost
$username = "root";  // MAMP 預設使用者名稱
$password = "root";  // MAMP 預設密碼
$dbname = "blackjack_game";  // 你的資料庫名稱

// 使用 PDO 連接 MySQL
try {
    // 建立 PDO 物件連接
    $pdo = new PDO("mysql:host=$servername;port=8890;dbname=$dbname", $username, $password);
    // 設置 PDO 錯誤模式
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // 如果成功，顯示訊息
    // echo "連接成功！";  // 如果沒有問題，這行可以刪除
} catch (PDOException $e) {
    // 如果連接失敗，顯示錯誤訊息
    echo "連接失敗: " . $e->getMessage();
}
?>
