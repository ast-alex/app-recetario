-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-08-2025 a las 00:52:51
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app-receta`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(3, 'Sistema Nervioso'),
(4, 'Aparato digestivo'),
(5, 'Analgésicos y antipiréticos'),
(6, 'Cardiovascular'),
(7, 'Aparato digestivo'),
(8, ' Aparato respiratorio'),
(9, 'Antibióticos'),
(10, 'Diabetes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concentracion`
--

CREATE TABLE `concentracion` (
  `id_concentracion` int(11) NOT NULL,
  `valor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `concentracion`
--

INSERT INTO `concentracion` (`id_concentracion`, `valor`) VALUES
(1, '10mg'),
(2, '20mg'),
(3, '40mg'),
(4, '5ml'),
(5, '10mg'),
(6, '20mg'),
(7, '40mg'),
(8, '500mg'),
(9, '650mg'),
(10, '10ml'),
(11, '400mg'),
(12, '600mg'),
(13, '800mg'),
(14, '5ml'),
(15, '10ml'),
(16, '325mg'),
(17, '500mg'),
(18, '300mg'),
(19, '600mg'),
(20, '75mg'),
(21, '150mg'),
(23, '25ml'),
(24, '50mg'),
(26, '100mg'),
(27, '25ml'),
(28, '5mg'),
(29, '0.5ml'),
(30, '250mg'),
(31, '500mg'),
(32, '5ml'),
(33, '50ml'),
(34, '100ml'),
(36, '25mcg/h'),
(37, '50 mcg/h'),
(38, '50ml'),
(40, '100mcg'),
(41, '200mcg'),
(42, '400mg'),
(43, '600mg'),
(44, '40mg'),
(45, '20mg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familia`
--

CREATE TABLE `familia` (
  `id_familia` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `familia`
--

INSERT INTO `familia` (`id_familia`, `nombre`) VALUES
(3, 'Antidepresivos'),
(4, 'Inhibidores de la bomba de protones'),
(5, 'Antiinflamantorios no esteroideos'),
(6, 'Analgésicos no opioides'),
(7, 'Antitrombóticos'),
(8, 'Antagonistas H2'),
(9, 'Antihistamínicos'),
(10, 'Penicilinas'),
(11, 'Opioides'),
(12, 'Insulinas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forma_farmaceutica`
--

CREATE TABLE `forma_farmaceutica` (
  `id_forma_farmaceutica` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `forma_farmaceutica`
--

INSERT INTO `forma_farmaceutica` (`id_forma_farmaceutica`, `nombre`) VALUES
(1, 'Cápsulas'),
(2, 'Tabletas'),
(3, 'Solución oral'),
(4, 'Cápsulas'),
(5, 'Tabletas'),
(6, 'Cápsulas'),
(7, 'Tabletas'),
(8, 'Inyección'),
(9, 'Cápsulas'),
(10, 'Inyección'),
(11, 'Tabletas'),
(12, 'Suspensión oral'),
(13, 'Tabletas'),
(14, 'Supositorios'),
(15, 'Tabletas'),
(16, 'Cápsulas'),
(17, 'Inyección'),
(18, 'Inyección'),
(19, 'Tabletas'),
(20, 'Cápsulas'),
(21, 'Tabletas'),
(22, 'Jarabe'),
(23, 'Cápsulas'),
(24, 'Tabletas'),
(25, 'Suspensión oral'),
(26, 'Inyección'),
(27, 'Solución inyectable'),
(28, 'Cartucho para pluma'),
(29, 'Parche transdérmico'),
(30, 'Inyección'),
(31, 'Pastillas'),
(32, 'Comprimidos bucales'),
(33, 'Tableta'),
(34, 'Cápsula'),
(35, 'Frasco'),
(36, 'Jarabe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `id_medicamento` int(11) NOT NULL,
  `nombre_generico` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_familia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`id_medicamento`, `nombre_generico`, `estado`, `id_categoria`, `id_familia`) VALUES
(1, 'Fluoxetina', 'activo', 3, 3),
(2, 'Omeprazol', 'activo', 4, 4),
(3, 'Paracetamol', 'activo', 5, 6),
(4, 'Ibuprofeno', 'activo', 5, 6),
(5, 'Aspirina', 'activo', 3, 6),
(6, 'Ranitidina', 'activo', 4, 8),
(7, 'Diclofenac', 'activo', 5, 5),
(8, 'Desloratadina', 'activo', 8, 9),
(9, 'Amoxicilina', 'activo', 9, 10),
(10, 'Insulina Glargina', 'activo', 10, 12),
(11, 'Fentanilo', 'activo', 3, 11),
(13, 'Ibuprofeno cambiar nombre', 'activo', 9, 6),
(14, 'Ibuprofeno cambiar nombre', 'activo', 9, 6),
(15, 'Ibuprofeno cambiar nombre', 'activo', 9, 6),
(19, 'Ibuprofeno cambiar nombre', 'activo', 9, 6),
(20, 'Ibuprofeno cambiar nombre', 'activo', 9, 6),
(21, 'Probando ', 'activo', 3, 3),
(34, 'Medicamento de Prueba', 'activo', 3, 3),
(35, 'Prueba con 2 concentraciones', 'activo', 3, 3),
(36, 'Probandooo', 'activo', 4, 5),
(37, 'Funcionalidad \'P\'', 'activo', 10, 11),
(38, 'Ibu o DIBu', 'activo', 4, 6),
(39, 'Probando', 'activo', 5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento_concentracion`
--

CREATE TABLE `medicamento_concentracion` (
  `id` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `id_concentracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento_concentracion`
--

INSERT INTO `medicamento_concentracion` (`id`, `id_medicamento`, `id_concentracion`) VALUES
(131, 1, 1),
(132, 1, 2),
(133, 1, 3),
(134, 1, 4),
(5, 2, 5),
(6, 2, 6),
(7, 2, 7),
(8, 3, 8),
(9, 3, 9),
(10, 3, 10),
(11, 4, 11),
(12, 4, 12),
(13, 4, 13),
(14, 4, 14),
(15, 4, 15),
(16, 5, 16),
(17, 5, 17),
(18, 5, 18),
(19, 5, 19),
(20, 6, 20),
(21, 6, 21),
(22, 6, 23),
(23, 7, 24),
(24, 7, 26),
(25, 7, 27),
(26, 8, 28),
(27, 8, 29),
(28, 9, 30),
(29, 9, 31),
(30, 9, 32),
(31, 9, 33),
(32, 10, 34),
(33, 11, 36),
(34, 11, 37),
(35, 11, 38),
(36, 11, 40),
(37, 11, 41),
(38, 20, 42),
(39, 20, 43),
(40, 21, 44),
(41, 21, 45),
(42, 36, 14),
(43, 37, 19),
(148, 38, 11),
(149, 38, 12),
(150, 38, 13),
(151, 39, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento_forma_farmaceutica`
--

CREATE TABLE `medicamento_forma_farmaceutica` (
  `id` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `id_forma_farmaceutica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento_forma_farmaceutica`
--

INSERT INTO `medicamento_forma_farmaceutica` (`id`, `id_medicamento`, `id_forma_farmaceutica`) VALUES
(101, 1, 1),
(102, 1, 2),
(103, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 3, 6),
(7, 3, 7),
(8, 3, 8),
(9, 4, 9),
(10, 4, 10),
(11, 4, 11),
(12, 4, 12),
(13, 5, 13),
(14, 5, 14),
(15, 6, 15),
(16, 6, 16),
(17, 6, 17),
(18, 7, 18),
(19, 7, 19),
(20, 7, 20),
(21, 8, 21),
(22, 8, 22),
(23, 9, 23),
(24, 9, 24),
(25, 9, 25),
(26, 9, 26),
(27, 10, 27),
(28, 10, 28),
(29, 11, 29),
(30, 11, 30),
(31, 11, 31),
(32, 11, 32),
(33, 20, 33),
(34, 20, 34),
(35, 21, 35),
(36, 21, 36),
(37, 37, 18),
(113, 38, 7),
(114, 38, 11),
(115, 39, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obrasocial`
--

CREATE TABLE `obrasocial` (
  `id_obra_social` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obrasocial`
--

INSERT INTO `obrasocial` (`id_obra_social`, `nombre`) VALUES
(1, 'Dosep'),
(2, 'Osde'),
(3, 'Femesa'),
(4, 'Medife');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` int(11) NOT NULL,
  `id_plan` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `activo` enum('activo','inactivo') NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `id_plan`, `nombre`, `apellido`, `dni`, `fecha_nacimiento`, `sexo`, `activo`) VALUES
(5, 2, 'Aitor', 'Tilla', '26654448', '1999-09-09', 'M', 'activo'),
(6, 3, 'Diego Armando', 'Maradona', '10101010', '1960-10-30', 'M', 'activo'),
(7, 5, 'Lionel Andres', 'Messi', '28193010', '1987-06-24', 'M', 'activo'),
(8, 6, 'Ines', 'Perada', '23445667', '1999-03-08', 'F', 'inactivo'),
(17, 2, 'Probando', 'AAA', 'asasda', '2025-07-09', 'M', 'inactivo'),
(18, 2, 'Proban2', 'Paciente', '12334', '2008-01-31', 'M', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id_plan` int(11) NOT NULL,
  `id_obra_social` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `cobertura` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`id_plan`, `id_obra_social`, `nombre`, `cobertura`) VALUES
(2, 1, 'AFILIADO', 'Limitado'),
(3, 2, 'OSDE 210', 'Basico'),
(4, 2, 'OSDE 510', 'Completo'),
(5, 3, 'DORADO MAX', 'Completo'),
(6, 4, 'MEDIFE+', 'Moderado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion`
--

CREATE TABLE `prescripcion` (
  `id_prescripcion` int(11) NOT NULL,
  `id_profesional_salud` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `diagnostico` text NOT NULL,
  `fecha_prescripcion` date NOT NULL,
  `vigencia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion`
--

INSERT INTO `prescripcion` (`id_prescripcion`, `id_profesional_salud`, `id_paciente`, `diagnostico`, `fecha_prescripcion`, `vigencia`) VALUES
(59, 11, 7, 'Hipertensión arterial', '2024-06-13', '2024-07-13'),
(60, 7, 5, 'asdasd', '2025-01-08', '2025-01-23'),
(61, 7, 5, 'asadada', '2025-01-26', '2025-01-28'),
(62, 7, 7, 'asdadas', '2001-01-01', '2002-01-01'),
(63, 7, 7, 'Dolor de cabeza pibe', '2025-07-02', '2025-08-02'),
(64, 7, 7, 'Resfrio', '2025-01-01', '2025-08-01'),
(65, 7, 7, 'Resfrio', '2025-01-01', '2025-08-01'),
(66, 7, 7, 'Fiebre', '2025-07-12', '2025-08-12'),
(67, 7, 7, 'fiebre', '2025-07-02', '2025-08-02'),
(68, 7, 7, 'probando', '2001-01-01', '2002-01-01'),
(69, 7, 6, 'Dolor de cabeza', '2025-07-02', '2025-08-02'),
(70, 7, 5, 'Radiografia de cerebro', '2025-07-03', '2025-08-02'),
(71, 7, 5, 'radiografia', '2025-07-03', '2025-08-02'),
(72, 7, 6, 'preobando', '2025-07-04', NULL),
(73, 7, 6, 'probando', '2025-07-04', NULL),
(74, 7, 6, 'probando', '2025-07-04', NULL),
(75, 7, 6, 'probando', '2025-07-04', NULL),
(76, 7, 6, 'Listo', '2025-07-04', NULL),
(77, 7, 6, 'Listo', '2025-07-04', NULL),
(78, 7, 6, 'Ahora si.', '2025-07-04', NULL),
(79, 7, 6, 'Ahora si.', '2025-07-04', NULL),
(80, 7, 6, 'Ahora si.', '2025-07-04', NULL),
(81, 7, 6, 'Probando', '2025-07-04', NULL),
(82, 7, 6, 'Probandooo', '2025-07-04', NULL),
(83, 7, 6, 'ahora si?', '2025-07-04', NULL),
(84, 7, 6, 'ahora si?', '2025-07-04', NULL),
(85, 7, 6, 'ahora si?', '2025-07-04', NULL),
(86, 7, 7, 'Ahora SI', '2025-07-04', NULL),
(87, 7, 7, 'Si ahora...', '2025-07-04', NULL),
(88, 7, 7, 'PProbadno otro', '2025-07-04', NULL),
(89, 7, 6, 'Listo capoo', '2025-07-04', '2025-08-03'),
(90, 7, 6, 'Listo capo segunda', '2025-07-04', '2025-10-02'),
(91, 7, 6, 'Ultima prueba', '2025-07-04', '2025-08-03'),
(92, 7, 6, 'Ultima prueba ....', '2025-07-04', '2025-07-14'),
(93, 7, 6, 'Probando algo', '2025-07-11', '2025-08-10'),
(94, 7, 6, 'assaa', '2025-07-15', '2025-08-14'),
(96, 7, 7, 'Dolor de Cabeza pibe', '2025-07-15', '2025-08-14'),
(97, 7, 7, 'probvando', '2025-07-15', '2025-08-14'),
(100, 7, 8, 'SOludcionado/?', '2025-07-17', '2025-08-16'),
(101, 7, 8, 'Probando', '2025-07-31', '2025-08-30'),
(102, 7, 8, 'Proban2', '2025-07-31', '2025-08-30'),
(103, 7, 6, 'Dolor de Cabeza', '2025-07-31', '2025-08-30'),
(104, 7, 7, 'Proobadno', '2025-08-07', '2025-09-06'),
(105, 7, 6, 'Proban2', '2025-08-07', '2025-09-06'),
(106, 7, 6, 'Preuba', '2025-08-07', '2025-09-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_medicamento`
--

CREATE TABLE `prescripcion_medicamento` (
  `id_prescripcion_medicamento` int(11) NOT NULL,
  `id_prescripcion` int(11) DEFAULT NULL,
  `id_presentacion` int(11) DEFAULT NULL,
  `duracion` varchar(100) NOT NULL,
  `intervalo_administracion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion_medicamento`
--

INSERT INTO `prescripcion_medicamento` (`id_prescripcion_medicamento`, `id_prescripcion`, `id_presentacion`, `duracion`, `intervalo_administracion`) VALUES
(22, 59, 83, '12 dias.', 'Cada 24 horas.'),
(23, 60, 85, '1', '2233'),
(24, 61, 84, '1', 'aasa'),
(25, 62, 84, 'asda', 'sasaddsa'),
(26, 63, 112, '1 semana', 'cada 8hs capo'),
(27, 64, 78, 'Una semana', 'Cada 8hs'),
(28, 65, 78, 'Una semana', 'Cada 8hs'),
(29, 66, 78, 'Hasta que dure', 'Cada 8hs'),
(30, 67, 79, '1ss', 'cada 8hs capo'),
(31, 68, 39, '1', 'cada 8hs capo'),
(32, 69, 40, '3 dias', 'cada 8hs capo'),
(33, 71, 40, '1', 'cada 8hs capo'),
(34, 72, 84, '1', 'cada 8hs capo'),
(35, 73, 84, '1ss', 'cada 8hs capo'),
(36, 74, 84, '1ss', 'cada 8hs capo'),
(37, 75, 84, '1ss', 'cada 8hs capo'),
(38, 76, 39, '3 dias', 'cada 8hs capo'),
(39, 77, 39, '3 dias', 'cada 8hs capo'),
(40, 78, 40, '3 dias', 'cada 8hs capo'),
(41, 79, 40, '3 dias', 'cada 8hs capo'),
(42, 80, 40, '3 dias', 'cada 8hs capo'),
(43, 81, 40, '3 dias', 'cada 8hs capo'),
(44, 82, 40, '3 dias', 'cada 8hs capo'),
(45, 83, 39, '3 dias', 'cada 8hs capo'),
(46, 84, 39, '3 dias', 'cada 8hs capo'),
(47, 85, 39, '3 dias', 'cada 8hs capo'),
(48, 86, 46, '3 dias', 'cada 8hs capo'),
(49, 87, 40, '3 dias', 'cada 8hs capo'),
(50, 88, 40, '3 dias', 'cada 8hs capo'),
(51, 89, 78, '3 dias', 'cada 8hs capo'),
(52, 90, 84, '3 dias', 'cada 8hs capo'),
(53, 93, 79, '3 dias', 'Cada 8hs'),
(54, 93, 79, '3 dias', 'cada 8hs capo'),
(56, 96, 83, '3 dias', 'cada 8hs capo'),
(57, 101, 40, '3 dias', 'cada 8hs capo'),
(58, 103, 39, '3', 'Cada 8 hs');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_prestacion`
--

CREATE TABLE `prescripcion_prestacion` (
  `id_prescripcion_prestacion` int(11) NOT NULL,
  `id_prescripcion` int(11) DEFAULT NULL,
  `id_prestacion` int(11) DEFAULT NULL,
  `observacion` text DEFAULT NULL,
  `resultado` text DEFAULT NULL,
  `indicacion` text DEFAULT NULL,
  `justificacion` text DEFAULT NULL,
  `lado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion_prestacion`
--

INSERT INTO `prescripcion_prestacion` (`id_prescripcion_prestacion`, `id_prescripcion`, `id_prestacion`, `observacion`, `resultado`, `indicacion`, `justificacion`, `lado`) VALUES
(15, 59, 1, 'Ayuno de 12 horas previo.', 'N/A', NULL, NULL, NULL),
(16, 60, 1, 'sas', 'as', NULL, NULL, NULL),
(17, 61, 1, 'dd', 'dd', NULL, NULL, NULL),
(18, 62, 2, 'sada', 'sadasd', NULL, NULL, NULL),
(19, 63, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(20, 64, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(21, 65, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(22, 66, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(23, 67, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(24, 68, 4, 'n/a', 'n/a', NULL, NULL, NULL),
(25, 69, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(26, 70, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(27, 91, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(28, 92, 2, 'n/a', 'n/a', NULL, NULL, NULL),
(29, 94, 1, 'n/a', 'n/a', NULL, NULL, NULL),
(30, 96, 2, 'n/a', 'n/a', 'tomar medicamento', 'n/a', NULL),
(31, 97, 2, 'n/a', 'n/a', 'tomar medicamento', 'n/a', NULL),
(32, 100, 3, 'N/A', 'Paciente evoluciono correctamente', 'tomar medicamento', 'n/a', ''),
(33, 102, 2, 'ok!', 'todo bien!', 'Reposo', 'n/a', ''),
(34, 103, 2, '', '', 'Tomar medicamento', 'n/a', 'n/a'),
(35, 104, 2, 'OK', 'todo bien!', 'tomar medicamento', 'n/a', ''),
(36, 104, 3, '', '', 'tomar medicamento', 'n/a', ''),
(37, 105, 2, 'Ok....', 'todo bien!', 'tomar medicamento', 'n/a', ''),
(38, 105, 4, '', '', 'tomar medicamento', 'n/a', ''),
(39, 105, 5, 'okkk', 'todo bien!', 'tomar medicamento', 'n/a', ''),
(40, 106, 3, '', '', 'tomar medicamento', 'n/a', ''),
(41, 106, 4, 'okk', 'todo bien!', 'ss', 'n/a', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentacion`
--

CREATE TABLE `presentacion` (
  `id_presentacion` int(11) NOT NULL,
  `id_medicamento` int(11) DEFAULT NULL,
  `id_concentracion` int(11) DEFAULT NULL,
  `id_forma_farmaceutica` int(11) DEFAULT NULL,
  `nombre_comercial` varchar(100) DEFAULT NULL,
  `cantidad_unidades` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `presentacion`
--

INSERT INTO `presentacion` (`id_presentacion`, `id_medicamento`, `id_concentracion`, `id_forma_farmaceutica`, `nombre_comercial`, `cantidad_unidades`) VALUES
(39, 1, 1, 1, 'Prozac', 'x8 unidades'),
(40, 1, 2, 2, 'Prozac', 'x12 unidades'),
(41, 1, 3, 2, 'Prozac', 'x14 unidades'),
(42, 1, 4, 3, 'Prozac', 'x3 viales'),
(43, 2, 5, 4, 'Prilosec', 'x6 unidades'),
(44, 2, 6, 5, 'Prilosec', 'x8 unidades'),
(45, 2, 7, 5, 'Prilosec', 'x12 unidades'),
(46, 3, 8, 6, 'Tylenol', 'x8 unidades'),
(47, 3, 9, 7, 'Tylenol', 'x14 unidades'),
(48, 3, 10, 8, 'Tylenol', 'x5 viales'),
(77, 4, 11, 9, 'Advil', 'x6 unidades'),
(78, 4, 12, 11, 'Advil', 'x8 unidades'),
(79, 4, 13, 11, 'Advil', 'x14 unidades'),
(80, 4, 15, 10, 'Advil', 'x4 viales'),
(81, 4, 14, 12, 'Advil', 'x1 frasco'),
(82, 5, 16, 13, 'Bayer', 'x6 unidades'),
(83, 5, 17, 13, 'Bayer', 'x12 unidades'),
(84, 5, 18, 14, 'Bayer', 'x5 unidades'),
(85, 5, 19, 14, 'Bayer', 'x10 unidades'),
(86, 6, 20, 15, 'Zantac', 'x6 unidades'),
(87, 6, 21, 16, 'Zantac', 'x9 unidades'),
(88, 6, 23, 17, 'Zantac', 'x3 viales'),
(89, 7, 24, 19, 'Voltaren', 'x8 unidades'),
(90, 7, 26, 20, 'Voltaren', 'x12 unidades'),
(91, 7, 27, 18, 'Voltaren', 'x7 viales'),
(92, 8, 28, 21, 'Clarinex', 'x10 unidades'),
(93, 8, 29, 22, 'Clarinex', 'x1 frasco'),
(94, 9, 30, 23, 'Amoxil', 'x6 unidades'),
(95, 9, 31, 24, 'Amoxil', 'x12 unidades'),
(96, 9, 32, 25, 'Amoxil', 'x1 frasco'),
(97, 9, 33, 26, 'Amoxil', 'x7 viales'),
(98, 10, 34, 27, 'Lantus', 'x15 viales'),
(99, 10, 34, 28, 'Lantus', 'x10 cartuchos'),
(100, 11, 36, 29, 'Duragesic', 'x5 unidades'),
(101, 11, 37, 29, 'Duragesic', 'x10 unidades'),
(102, 11, 38, 30, 'Duragesic', 'x20 viales'),
(103, 11, 40, 32, 'Duragesic', 'x10 unidades'),
(104, 11, 41, 31, 'Duragesic', 'x14 unidades'),
(112, 19, 4, 2, 'Ibuprofeno 600mg', '20'),
(113, 20, 42, 33, 'Ibuprofeno 400mg', '10'),
(114, 20, 43, 34, 'Ibuprofeno 600mg', '20'),
(115, 21, 44, 35, 'Eso...', '4'),
(122, 34, 19, 19, 'UltimaPrueba????', '20'),
(123, 35, 19, 19, 'UltimaPrueba??', '20'),
(124, 35, 17, 19, 'Pruebax2concentraciones', '20'),
(125, 36, 14, 12, 'VVV', '1'),
(126, 37, 19, 18, 'Presentaciones...', '10'),
(127, 38, 11, 7, 'Aspirina editada OKk', '12'),
(128, 38, 12, 7, 'Aspirineta para editar 2 concentracion,forma', '24'),
(129, 38, 13, 11, 'Aspirina editada', '13'),
(130, 38, 12, 7, 'Aspirineta para editar 3', '36'),
(131, 38, 12, 7, 'Presentacion editada desde el update', '12'),
(141, 39, 1, 2, 'Prueba', '23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestacion`
--

CREATE TABLE `prestacion` (
  `id_prestacion` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestacion`
--

INSERT INTO `prestacion` (`id_prestacion`, `nombre`) VALUES
(1, 'Extracción de sangre'),
(2, 'Consulta médica general'),
(3, 'Ecografía abdominal'),
(4, 'Electrocardiograma (ECG)'),
(5, 'Inyección intramuscular'),
(6, 'Control de presión arterial'),
(7, 'Sutura de herida simple'),
(8, 'Retiro de puntos'),
(9, 'Aplicación de suero endovenoso'),
(10, 'Electroencefalograma (EEG)'),
(11, 'Radiografía de tórax'),
(12, 'Radiografía de miembro inferior'),
(13, 'Radiografía de miembro superior'),
(14, 'Consulta por gastritis o dispepsia'),
(15, 'Control de fiebre o dolor leve'),
(16, 'Control de dolor articular o inflamación'),
(17, 'Consulta preventiva cardiovascular'),
(18, 'Inyección intramuscular de antiinflamatorio'),
(19, 'Consulta por rinitis o alergias estacionales'),
(20, 'Consulta por infección respiratoria'),
(21, 'Aplicación subcutánea de insulina'),
(22, 'Control de dolor crónico o posquirúrgico'),
(23, 'Evaluación visual básica'),
(24, 'Test de agudeza visual'),
(25, 'Derivación a oftalmología especializada'),
(26, 'Análisis de orina'),
(27, 'Evaluación auditiva básica'),
(28, 'Revisión de oídos con otoscopio'),
(29, 'Lavado de oído'),
(30, 'Radiografía de columna vertebral\r\n'),
(31, 'Ecografía obstétrica'),
(32, 'Evaluación post-caída o golpe'),
(33, 'Control de esguince'),
(34, 'Test EcoDoppler'),
(35, 'Inmovilización temporal'),
(36, 'Colocación yeso'),
(37, 'Resonancia magnética'),
(38, 'Colocación Cuello ortopedico'),
(39, 'Consulta psicológica'),
(40, 'Consulta nutricional'),
(41, 'Consulta ginecológica'),
(42, 'Consulta pediátrica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional_salud`
--

CREATE TABLE `profesional_salud` (
  `id_profesional_salud` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `profesion` varchar(100) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `id_refeeps` varchar(50) NOT NULL,
  `fecha_caducidad` date DEFAULT NULL,
  `fecha_registro` date NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesional_salud`
--

INSERT INTO `profesional_salud` (`id_profesional_salud`, `id_usuario`, `nombre`, `apellido`, `dni`, `profesion`, `especialidad`, `domicilio`, `matricula`, `id_refeeps`, `fecha_caducidad`, `fecha_registro`, `id_rol`, `estado`) VALUES
(7, 171, 'Armando', 'Paredes', '11999234', 'Medico', 'Cirujano', 'La Obra 32', '012323', '099992', '2024-12-30', '2024-06-05', 1, 'activo'),
(11, 173, 'Carlos Salvador', 'Bilardo', '15569012', 'Medico', 'Ginecologias', 'Belgrano 332', '001223', '198610', '2024-12-31', '2024-06-05', 1, 'activo'),
(12, 181, 'Juan', 'Pérez', '12345678', 'Médico', 'Cardiología', 'Av. Siempre Viva 742', 'ABC123', 'REF001', '2025-01-31', '2025-01-22', 1, 'activo'),
(13, 182, 'Juan', 'Pérz', '12345678', 'Médico', 'Cardiología', 'Av. Siempre Viva 742', 'ABC123', 'REF009', '2025-01-31', '2025-01-22', 1, 'activo'),
(14, 183, '1', 'Jua', 'Péz', '12345678', 'Médico', 'Cardiología', 'Av. Siempre Viva 742', 'ABC123', '0000-00-00', '2025-01-31', 1, 'activo'),
(15, 185, 'Ju', 'Péz', '12345678', 'Médico', 'Cardiología', 'Av. Siempre Viva 742', 'ABC123', 'REF0011', '2025-01-31', '2025-01-22', 1, 'inactivo'),
(16, 188, 'Ju', 'Péz', '12345678', 'Médico', 'Cardiología', 'Av. Siempre Viva 742', 'ABC123', 'REF0010', '2025-01-31', '2025-01-26', 1, 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`) VALUES
(1, 'profesional'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_rol`, `email`, `password`, `estado`) VALUES
(171, 1, 'drtres@gmail.com', '$2a$10$h/5FiXhI3TxG/wjL04jrVOMT2.Eap07Nbsr3QqeXEV0JpGrPykv..', 'activo'),
(172, 2, 'user@admin.com', '$2a$10$Rcx0.jQYiRu6fvK4V4FeYOIkghuksk3Ywez5s2A1rtaUik1eCa0Kq', 'activo'),
(173, 1, 'carlosbilardo@gmail.com', '$2a$10$wiro.XRyyB5pq/6hPpOQO.NNPyxbaxvMYGOKk3UWjGBPVRzzwMhPy', 'activo'),
(181, 1, 'nuevo_profesional@gmail.com', '$2a$10$/AST7N4Si.sKJcGMC5OJuu0NxCHU5y8f0zuMnrxnNmybt3ihOynt6', 'activo'),
(182, 1, 'nuev_profesional@gmail.com', '$2a$10$wq8m4p.xkhU.AirS8cIWpuRwcQrGxpwuYY0eJjclD9g4AfqNoXrfG', 'activo'),
(183, 1, 'nue_profesional@gmail.com', '$2a$10$vNLxSSDHErOosi0WdSMHkuVj4Mnfgwb5eLP.rI9YsB5atTVSQCu2C', 'activo'),
(185, 1, 'nu_profesional@gmail.com', '$2a$10$X4DKJBaDHKWNWKU9jjPMj.HApVi1jxoRjCHnS8qM8RAiDlbIIeu0O', 'inactivo'),
(186, 2, 'nuevo_admin@gmail.com', '$2a$10$tJNnrv/kuIyPfYwLWlvjwOrnhYqPUQ/VtN5GeVVkMuz6uN7gWUGRC', 'activo'),
(187, 2, 'adminhasheado@gmail.com', '$2a$10$quG8FV/Dby3s345yng4q3..kC1AN7OufvJQovYjlqyHaF5lazDQF6', 'activo'),
(188, 1, 'profesional@gmail.com', '$2a$10$X4gROLU.eSA7EnRwHAVirevnkZg5TVjGNHJt4q9LLK8IPI2t4bAoW', 'inactivo'),
(189, 2, 'adminhasheado22@gmail.com', '$2a$10$BKbHIi9hsoo01kvxJgIkwe9OTEAFX9TKm1CgjWTlPggkOq3BY4pd6', 'activo'),
(192, 2, 'Desde@ElFront.com', '$2a$10$KyoGXVUg1Exi4hSeYajAbeMrVERYA/jIQpvInxFwKOF9n5wsfsiE.', 'activo'),
(193, 2, 'probando@cosas.com', '$2a$10$wRpngMier.GD/NwNCMk3/eZPM3VWvJF3CBshxnCUfG0lTNDyMbh6O', 'activo'),
(194, 2, 'probando@cosas2.com', '$2a$10$yHQ9Wg/CU1wt0KP6rEs8.eFNQAmLQdeQVt1U6huN6GsnHq6O3IyF2', 'activo'),
(195, 2, 'pruebo@cosas.com', '$2a$10$Fbr.T8241aw4HGB.pjjMwOgxiCQwXoPSt.0iOmJ3ohGJMcFxNoItu', 'activo'),
(198, 2, 'prueba@url.com', '$2a$10$SZUTo0ASN/2kbFkvcpOWdOADD1GXnmphlG6m8XiIaprpuEGffjPS.', 'activo'),
(201, 2, 'prueba@script.com', '$2a$10$MoM2/8HUKJ4Bg9Xta3Lkzei7UCqfjKIVzR4uk2wcuy3TvttQmge3e', 'activo'),
(204, 2, 'email@prueba.com', '$2a$10$.TUKmBnRgYXeghBMZbzoQONtBe8k7HlCN6KJTJ88Z4X1HLeiPG8Fi', 'activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `concentracion`
--
ALTER TABLE `concentracion`
  ADD PRIMARY KEY (`id_concentracion`);

--
-- Indices de la tabla `familia`
--
ALTER TABLE `familia`
  ADD PRIMARY KEY (`id_familia`);

--
-- Indices de la tabla `forma_farmaceutica`
--
ALTER TABLE `forma_farmaceutica`
  ADD PRIMARY KEY (`id_forma_farmaceutica`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`id_medicamento`),
  ADD KEY `fk_categoria` (`id_categoria`),
  ADD KEY `fk_familia` (`id_familia`);

--
-- Indices de la tabla `medicamento_concentracion`
--
ALTER TABLE `medicamento_concentracion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_medicamento` (`id_medicamento`,`id_concentracion`),
  ADD KEY `id_concentracion` (`id_concentracion`);

--
-- Indices de la tabla `medicamento_forma_farmaceutica`
--
ALTER TABLE `medicamento_forma_farmaceutica`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_medicamento` (`id_medicamento`,`id_forma_farmaceutica`),
  ADD KEY `id_forma_farmaceutica` (`id_forma_farmaceutica`);

--
-- Indices de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  ADD PRIMARY KEY (`id_obra_social`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `id_plan` (`id_plan`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id_plan`),
  ADD KEY `id_obrasocial` (`id_obra_social`);

--
-- Indices de la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  ADD PRIMARY KEY (`id_prescripcion`),
  ADD KEY `id_profesional_salud` (`id_profesional_salud`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  ADD PRIMARY KEY (`id_prescripcion_medicamento`),
  ADD KEY `id_prescripcion` (`id_prescripcion`),
  ADD KEY `presentacion_id` (`id_presentacion`);

--
-- Indices de la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  ADD PRIMARY KEY (`id_prescripcion_prestacion`),
  ADD KEY `id_prescripcion` (`id_prescripcion`),
  ADD KEY `id_prestacion` (`id_prestacion`);

--
-- Indices de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  ADD PRIMARY KEY (`id_presentacion`),
  ADD KEY `id_medicamento` (`id_medicamento`),
  ADD KEY `id_concentracion` (`id_concentracion`),
  ADD KEY `id_forma_farmaceutica` (`id_forma_farmaceutica`);

--
-- Indices de la tabla `prestacion`
--
ALTER TABLE `prestacion`
  ADD PRIMARY KEY (`id_prestacion`);

--
-- Indices de la tabla `profesional_salud`
--
ALTER TABLE `profesional_salud`
  ADD PRIMARY KEY (`id_profesional_salud`),
  ADD KEY `fk_profesional_salud_usuario` (`id_usuario`),
  ADD KEY `fk_profesional_salud_rol` (`id_rol`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usuario_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `concentracion`
--
ALTER TABLE `concentracion`
  MODIFY `id_concentracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `familia`
--
ALTER TABLE `familia`
  MODIFY `id_familia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `forma_farmaceutica`
--
ALTER TABLE `forma_farmaceutica`
  MODIFY `id_forma_farmaceutica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `id_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `medicamento_concentracion`
--
ALTER TABLE `medicamento_concentracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT de la tabla `medicamento_forma_farmaceutica`
--
ALTER TABLE `medicamento_forma_farmaceutica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  MODIFY `id_obra_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  MODIFY `id_prescripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  MODIFY `id_prescripcion_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  MODIFY `id_prescripcion_prestacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  MODIFY `id_presentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT de la tabla `prestacion`
--
ALTER TABLE `prestacion`
  MODIFY `id_prestacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `profesional_salud`
--
ALTER TABLE `profesional_salud`
  MODIFY `id_profesional_salud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `fk_familia` FOREIGN KEY (`id_familia`) REFERENCES `familia` (`id_familia`);

--
-- Filtros para la tabla `medicamento_concentracion`
--
ALTER TABLE `medicamento_concentracion`
  ADD CONSTRAINT `medicamento_concentracion_ibfk_1` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento` (`id_medicamento`) ON DELETE CASCADE,
  ADD CONSTRAINT `medicamento_concentracion_ibfk_2` FOREIGN KEY (`id_concentracion`) REFERENCES `concentracion` (`id_concentracion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `medicamento_forma_farmaceutica`
--
ALTER TABLE `medicamento_forma_farmaceutica`
  ADD CONSTRAINT `medicamento_forma_farmaceutica_ibfk_1` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento` (`id_medicamento`),
  ADD CONSTRAINT `medicamento_forma_farmaceutica_ibfk_2` FOREIGN KEY (`id_forma_farmaceutica`) REFERENCES `forma_farmaceutica` (`id_forma_farmaceutica`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id_plan`);

--
-- Filtros para la tabla `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`id_obra_social`) REFERENCES `obrasocial` (`id_obra_social`);

--
-- Filtros para la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  ADD CONSTRAINT `prescripcion_ibfk_1` FOREIGN KEY (`id_profesional_salud`) REFERENCES `profesional_salud` (`id_profesional_salud`),
  ADD CONSTRAINT `prescripcion_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`);

--
-- Filtros para la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  ADD CONSTRAINT `prescripcion_medicamento_ibfk_1` FOREIGN KEY (`id_prescripcion`) REFERENCES `prescripcion` (`id_prescripcion`),
  ADD CONSTRAINT `prescripcion_medicamento_ibfk_2` FOREIGN KEY (`id_presentacion`) REFERENCES `presentacion` (`id_presentacion`);

--
-- Filtros para la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  ADD CONSTRAINT `prescripcion_prestacion_ibfk_1` FOREIGN KEY (`id_prescripcion`) REFERENCES `prescripcion` (`id_prescripcion`),
  ADD CONSTRAINT `prescripcion_prestacion_ibfk_2` FOREIGN KEY (`id_prestacion`) REFERENCES `prestacion` (`id_prestacion`);

--
-- Filtros para la tabla `presentacion`
--
ALTER TABLE `presentacion`
  ADD CONSTRAINT `presentacion_ibfk_1` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento` (`id_medicamento`),
  ADD CONSTRAINT `presentacion_ibfk_2` FOREIGN KEY (`id_concentracion`) REFERENCES `concentracion` (`id_concentracion`),
  ADD CONSTRAINT `presentacion_ibfk_3` FOREIGN KEY (`id_forma_farmaceutica`) REFERENCES `forma_farmaceutica` (`id_forma_farmaceutica`);

--
-- Filtros para la tabla `profesional_salud`
--
ALTER TABLE `profesional_salud`
  ADD CONSTRAINT `fk_profesional_salud_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_profesional_salud_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
