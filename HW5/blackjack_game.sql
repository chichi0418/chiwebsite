-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:8890
-- 產生時間： 2024-12-08 04:39:03
-- 伺服器版本： 5.7.24
-- PHP 版本： 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `blackjack_game`
--

-- --------------------------------------------------------

--
-- 資料表結構 `game_history`
--

CREATE TABLE `game_history` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `round` int(11) NOT NULL,
  `player_hand` text NOT NULL,
  `dealer_hand` text NOT NULL,
  `result` varchar(50) NOT NULL,
  `bet` int(11) NOT NULL,
  `remaining_chips` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `chips` int(11) NOT NULL DEFAULT '1000',
  `game_data` text,
  `rounds` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `chips`, `game_data`, `rounds`, `created_at`) VALUES
(1, '0000', '$2y$10$/lfITfNfrvQvbfpZsKy8l.xQegHfkEkC6YknzqiUzTs1ZXEQppU2W', 60, '[{\"playerHand\":[{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"3\"}],\"dealerHand\":[{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"8\"}],\"result\":\"\\u4f60\\u8f38\\u4e86\\uff01\",\"bet\":1,\"remainingChips\":91,\"round\":1},{\"playerHand\":[{\"suit\":\"diamonds\",\"value\":\"jack\"},{\"suit\":\"spades\",\"value\":\"ace\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"queen\"}],\"dealerHand\":[{\"suit\":\"spades\",\"value\":\"king\"},{\"suit\":\"hearts\",\"value\":\"7\"}],\"result\":\"\\u7206\\u724c\\uff01\\u4f60\\u8f38\\u4e86\\u3002\",\"bet\":1,\"remainingChips\":90,\"round\":2},{\"playerHand\":[{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"queen\"}],\"dealerHand\":[{\"suit\":\"diamonds\",\"value\":\"ace\"},{\"suit\":\"hearts\",\"value\":\"king\"}],\"result\":\"\\u4f60\\u8f38\\u4e86\\uff01\",\"bet\":10,\"remainingChips\":80,\"round\":3},{\"playerHand\":[{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"queen\"},{\"suit\":\"hearts\",\"value\":\"jack\"}],\"dealerHand\":[{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"6\"}],\"result\":\"\\u7206\\u724c\\uff01\\u4f60\\u8f38\\u4e86\\u3002\",\"bet\":10,\"remainingChips\":70,\"round\":4},{\"playerHand\":[{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"10\"}],\"dealerHand\":[{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"king\"}],\"result\":\"\\u4f60\\u8f38\\u4e86\\uff01\",\"bet\":10,\"remainingChips\":60,\"round\":5}]', 5, '2024-12-06 22:11:47'),
(2, '1234', '$2y$10$J3Ebz9HxCfqGQW7caVycrui.JodY2LhR23C3JIzp1tXYE6BOYOY36', 0, '[{\"playerHand\":[{\"suit\":\"clubs\",\"value\":\"king\"},{\"suit\":\"clubs\",\"value\":\"9\"}],\"dealerHand\":[{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"queen\"},{\"suit\":\"hearts\",\"value\":\"5\"}],\"result\":\"\\u5e73\\u5c40\\uff01\",\"bet\":1,\"remainingChips\":100,\"round\":1},{\"playerHand\":[{\"suit\":\"hearts\",\"value\":\"queen\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"}],\"dealerHand\":[{\"suit\":\"diamonds\",\"value\":\"jack\"},{\"suit\":\"clubs\",\"value\":\"jack\"}],\"result\":\"\\u5e73\\u5c40\\uff01\",\"bet\":4,\"remainingChips\":100,\"round\":2},{\"playerHand\":[{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"9\"}],\"dealerHand\":[{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"king\"},{\"suit\":\"diamonds\",\"value\":\"10\"}],\"result\":\"\\u838a\\u5bb6\\u7206\\u724c\\uff0c\\u4f60\\u8d0f\\u4e86\\uff01\",\"bet\":6,\"remainingChips\":106,\"round\":3},{\"playerHand\":[{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"queen\"},{\"suit\":\"spades\",\"value\":\"8\"}],\"dealerHand\":[{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"6\"}],\"result\":\"\\u7206\\u724c\\uff01\\u4f60\\u8f38\\u4e86\\u3002\",\"bet\":4,\"remainingChips\":102,\"round\":4},{\"playerHand\":[{\"suit\":\"diamonds\",\"value\":\"queen\"},{\"suit\":\"hearts\",\"value\":\"9\"}],\"dealerHand\":[{\"suit\":\"hearts\",\"value\":\"jack\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"6\"}],\"result\":\"\\u4f60\\u8f38\\u4e86\\uff01\",\"bet\":5,\"remainingChips\":97,\"round\":5},{\"playerHand\":[{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"10\"}],\"dealerHand\":[{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"8\"}],\"result\":\"\\u7206\\u724c\\uff01\\u4f60\\u8f38\\u4e86\\u3002\",\"bet\":86,\"remainingChips\":0,\"round\":6}]', 6, '2024-12-08 12:35:39');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `game_history`
--
ALTER TABLE `game_history`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `game_history`
--
ALTER TABLE `game_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
