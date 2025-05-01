<?php
// 112550081 許秉棋 第5次作業 12/6
// 112550081 PING CHI HSU The Fifth Homework 12/6
session_start();
include('includes/db.php');

if (isset($_SESSION['user_id'])) {
    $player_id = $_SESSION['user_id'];

    $stmt = $conn->prepare("SELECT * FROM game_records WHERE player_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $player_id);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        echo "<pre>" . json_encode(json_decode($row['game_data']), JSON_PRETTY_PRINT) . "</pre>";
    }
} else {
    echo "User not logged in.";
}
?>
