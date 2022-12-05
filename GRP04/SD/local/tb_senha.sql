-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09-Nov-2022 às 17:08
-- Versão do servidor: 10.4.25-MariaDB
-- versão do PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_sd`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_senha`
--

CREATE TABLE `tb_senha` (
  `numero` varchar(11) NOT NULL,
  `tipo` enum('SG','SE','SP') NOT NULL,
  `data_hora_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_hora_atendimento` timestamp NULL DEFAULT NULL,
  `guiche_atendimento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_senha`
--

INSERT INTO `tb_senha` (`numero`, `tipo`, `data_hora_criacao`, `data_hora_atendimento`, `guiche_atendimento`) VALUES
('221101SE1', 'SE', '2022-11-01 12:28:52', '2022-11-01 16:34:13', 2),
('221101SE2', 'SE', '2022-11-01 12:40:57', '2022-11-01 16:43:00', 1),
('221101SE3', 'SE', '2022-11-01 13:37:05', '2022-11-01 17:37:15', 2),
('221101SE4', 'SE', '2022-11-01 14:13:27', '2022-11-01 18:13:34', 2),
('221101SG1', 'SG', '2022-11-01 12:28:47', '2022-11-01 16:34:25', 2),
('221101SG2', 'SG', '2022-11-01 12:40:53', '2022-11-01 16:43:05', 2),
('221101SG3', 'SG', '2022-11-01 12:44:52', '2022-11-01 16:45:02', 1),
('221101SG4', 'SG', '2022-11-01 12:44:54', '2022-11-01 16:45:07', 2),
('221101SG5', 'SG', '2022-11-01 12:44:57', '2022-11-01 16:45:10', 3),
('221101SG6', 'SG', '2022-11-01 13:37:07', '2022-11-01 17:37:17', 1),
('221101SP1', 'SP', '2022-11-01 12:28:57', '2022-11-01 16:33:45', 2),
('221101SP2', 'SP', '2022-11-01 12:41:01', '2022-11-01 16:41:53', 3),
('221101SP3', 'SP', '2022-11-01 13:37:02', '2022-11-01 17:37:11', 3),
('221101SP4', 'SP', '2022-11-01 14:13:25', '2022-11-01 18:13:30', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_senha`
--
ALTER TABLE `tb_senha`
  ADD PRIMARY KEY (`numero`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
