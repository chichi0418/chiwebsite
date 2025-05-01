<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
error_reporting(E_ALL);    // 顯示所有錯誤
ini_set('display_errors', 1);   // 在頁面顯示錯誤
session_start();

include('includes/db.php'); // 包含資料庫連接

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        // 檢查用戶是否存在
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // 如果找到了使用者，驗證密碼
        if ($user && password_verify($password, $user['password'])) {

            // 給 session username 讓他可以在 game.php 取得用戶資訊
            $_SESSION['username'] = $_POST['username'];

            // 登入成功，跳轉至 game.php
            header("Location: game.php");
            exit(); // 確保程式在這裡停止執行，防止後續程式繼續執行
        } else {
            $message = "<div class='error'>Invalid username or password.</div>";
        }
    } catch (PDOException $e) {
        $message = "<div class='error'>Database error: " . $e->getMessage() . "</div>";
    }
}
?>

<!-- 登入表單 -->
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HW5_112550081_許秉棋</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        h1 {
            color: #333;
            margin-bottom: 20px;
        }

        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #4CAF50;
            border: none;
            border-radius: 5px;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #0056b3;
        }

        .error {
            color: #f44336;
            margin-top: 10px;
        }

        a {
            text-decoration: none;
        }

        .back-btn {
            display: inline-block;
            margin-top: 20px;
            font-size: 16px;
            color: #007BFF;
        }

        .back-btn:hover {
            text-decoration: underline;
        }

        .message {
            margin-bottom: 20px; /* 設定訊息區塊的間距，防止與表單重疊 */
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>登入</h1>
        
        <!-- 顯示錯誤或成功訊息 -->
        <div class="message">
            <?php if (isset($message)) echo $message; ?>
        </div>

        <form method="POST">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>

        <br>
        <a href="register.php" class="back-btn">還沒有帳號？註冊</a>
    </div>
</body>
</html>
