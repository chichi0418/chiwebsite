<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
error_reporting(E_ALL);    // 顯示所有錯誤
ini_set('display_errors', 1);   // 在頁面顯示錯誤

include('includes/db.php'); // 包含資料庫連接

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    try {
        // 檢查用戶是否已經存在
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $message = "<div class='error'>Username already taken.</div>";
        } else {
            // 插入新用戶，並設置初始值：chips = 100, rounds = 0, game_data = NULL
            $stmt = $pdo->prepare("
                INSERT INTO users (username, password, chips, game_data, rounds)
                VALUES (:username, :password, 100, NULL, 0)
            ");
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
            $stmt->execute();
            $message = "<div class='success'>Registration successful!</div>";
        }
    } catch (PDOException $e) {
        $message = "<div class='error'>Database error: " . $e->getMessage() . "</div>";
    }
}
?>

<!-- 註冊表單 -->
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

        .register-container {
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
            background-color: #007BFF;
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

        .success {
            color: #4CAF50;
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
            margin-bottom: 20px; /* 確保訊息與表單間有適當的間距 */
        }
    </style>
</head>
<body>
    <div class="register-container">
        <h1>註冊</h1>
        
        <!-- 顯示錯誤或成功訊息 -->
        <div class="message">
            <?php if (isset($message)) echo $message; ?>
        </div>

        <form method="POST">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Register</button>
        </form>

        <br>
        <a href="login.php" class="back-btn">返回登入頁面</a>
    </div>
</body>
</html>
