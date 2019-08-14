-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Aug 13, 2019 at 10:40 PM
-- Server version: 5.7.22
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ShortifyDB`
--
CREATE DATABASE IF NOT EXISTS `ShortifyDB` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ShortifyDB`;

-- --------------------------------------------------------

--
-- Table structure for table `URLs`
--

CREATE TABLE `URLs` (
  `Id` int(11) NOT NULL,
  `RealURL` varchar(150) NOT NULL,
  `ShortURL` varchar(150) NOT NULL,
  `Hash` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `URLs`
--
ALTER TABLE `URLs`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Hash` (`Hash`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `URLs`
--
ALTER TABLE `URLs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
