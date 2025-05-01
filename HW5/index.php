<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
// 顯示所有錯誤
error_reporting(E_ALL);    
ini_set('display_errors', 1);   
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HW5_112550081_許秉棋</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }

        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

    <h1>歡迎來到21點遊戲世界</h1>
    <p>請點擊下方按鈕來進入登入頁面。</p>

    <!-- 開始遊戲的按鈕，點擊後跳轉至 login.php -->
    <a href="login.php"><button>登入頁面</button></a>

</body>
</html>
