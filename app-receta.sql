-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 03:08:04
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
  `id_medicamento` int(11) DEFAULT NULL,
  `valor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `concentracion`
--

INSERT INTO `concentracion` (`id_concentracion`, `id_medicamento`, `valor`) VALUES
(1, 1, '10mg'),
(2, 1, '20mg'),
(3, 1, '40mg'),
(4, 1, '5ml'),
(5, 2, '10mg'),
(6, 2, '20mg'),
(7, 2, '40mg'),
(8, 3, '500mg'),
(9, 3, '650mg'),
(10, 3, '10ml'),
(11, 4, '400mg'),
(12, 4, '600mg'),
(13, 4, '800mg'),
(14, 4, '5ml'),
(15, 4, '10ml'),
(16, 5, '325mg'),
(17, 5, '500mg'),
(18, 5, '300mg'),
(19, 5, '600mg'),
(20, 6, '75mg'),
(21, 6, '150mg'),
(23, 6, '25ml'),
(24, 7, '50mg'),
(26, 7, '100mg'),
(27, 7, '25ml'),
(28, 8, '5mg'),
(29, 8, '0.5ml'),
(30, 9, '250mg'),
(31, 9, '500mg'),
(32, 9, '5ml'),
(33, 9, '50ml'),
(34, 10, '100ml'),
(36, 11, '25mcg/h'),
(37, 11, '50 mcg/h'),
(38, 11, '50ml'),
(40, 11, '100mcg'),
(41, 11, '200mcg');

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
  `id_medicamento` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `forma_farmaceutica`
--

INSERT INTO `forma_farmaceutica` (`id_forma_farmaceutica`, `id_medicamento`, `nombre`) VALUES
(1, 1, 'Cápsulas'),
(2, 1, 'Tabletas'),
(3, 1, 'Solución oral'),
(4, 2, 'Cápsulas'),
(5, 2, 'Tabletas'),
(6, 3, 'Cápsulas'),
(7, 3, 'Tabletas'),
(8, 3, 'Inyección'),
(9, 4, 'Cápsulas'),
(10, 4, 'Inyección'),
(11, 4, 'Tabletas'),
(12, 4, 'Suspensión oral'),
(13, 5, 'Tabletas'),
(14, 5, 'Supositorios'),
(15, 6, 'Tabletas'),
(16, 6, 'Cápsulas'),
(17, 6, 'Inyección'),
(18, 7, 'Inyección'),
(19, 7, 'Tabletas'),
(20, 7, 'Cápsulas'),
(21, 8, 'Tabletas'),
(22, 8, 'Jarabe'),
(23, 9, 'Cápsulas'),
(24, 9, 'Tabletas'),
(25, 9, 'Suspensión oral'),
(26, 9, 'Inyección'),
(27, 10, 'Solución inyectable'),
(28, 10, 'Cartucho para pluma'),
(29, 11, 'Parche transdérmico'),
(30, 11, 'Inyección'),
(31, 11, 'Pastillas'),
(32, 11, 'Comprimidos bucales');

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
(5, 'Aspirina', 'activo', 6, 7),
(6, 'Ranitidina', 'activo', 4, 8),
(7, 'Diclofenac', 'activo', 5, 5),
(8, 'Desloratadina', 'activo', 8, 9),
(9, 'Amoxicilina', 'activo', 9, 10),
(10, 'Insulina Glargina', 'activo', 10, 12),
(11, 'Fentanilo', 'activo', 3, 11);

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
  `sexo` enum('M','F') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `id_plan`, `nombre`, `apellido`, `dni`, `fecha_nacimiento`, `sexo`) VALUES
(5, 2, 'Aitor', 'Tilla', '26654448', '1999-09-09', 'M'),
(6, 3, 'Diego Armando', 'Maradona', '10101010', '1960-10-30', 'M'),
(7, 5, 'Lionel Andres', 'Messi', '28193010', '1987-06-24', 'M'),
(8, 6, 'Ines', 'Perada', '23445667', '1999-03-08', 'F');

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
(59, 11, 7, 'Hipertensión arterial', '2024-06-13', '2024-07-13');

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
(22, 59, 83, '12 dias.', 'Cada 24 horas.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_prestacion`
--

CREATE TABLE `prescripcion_prestacion` (
  `id_prescripcion_prestacion` int(11) NOT NULL,
  `id_prescripcion` int(11) DEFAULT NULL,
  `id_prestacion` int(11) DEFAULT NULL,
  `observacion` text DEFAULT NULL,
  `resultado` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion_prestacion`
--

INSERT INTO `prescripcion_prestacion` (`id_prescripcion_prestacion`, `id_prescripcion`, `id_prestacion`, `observacion`, `resultado`) VALUES
(15, 59, 1, 'Ayuno de 12 horas previo.', 'N/A');

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
(104, 11, 41, 31, 'Duragesic', 'x14 unidades');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestacion`
--

CREATE TABLE `prestacion` (
  `id_prestacion` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `lado` varchar(50) DEFAULT NULL,
  `indicacion` text NOT NULL,
  `justificacion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestacion`
--

INSERT INTO `prestacion` (`id_prestacion`, `nombre`, `lado`, `indicacion`, `justificacion`) VALUES
(1, 'Extracción de sangre', 'Brazo izquierdo', '', ''),
(2, 'Consulta médica general', 'N/A', '', ''),
(3, 'Ecografía abdominal', 'Abdomen', '', ''),
(4, 'Electrocardiograma (ECG)', 'Pecho', '', ''),
(5, 'Inyección intramuscular', 'Glúteo derecho', '', '');

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
  `id_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesional_salud`
--

INSERT INTO `profesional_salud` (`id_profesional_salud`, `id_usuario`, `nombre`, `apellido`, `dni`, `profesion`, `especialidad`, `domicilio`, `matricula`, `id_refeeps`, `fecha_caducidad`, `fecha_registro`, `id_rol`) VALUES
(7, 171, 'Armando', 'Paredes', '11999234', 'Medico', 'Cirujano', 'La Obra 32', '012323', '099992', '2024-12-30', '2024-06-05', 1),
(11, 173, 'Carlos Salvador', 'Bilardo', '15569012', 'Medico', 'Ginecologia', 'Belgrano 332', '001223', '198610', '2024-12-31', '2024-06-05', 1);

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
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_rol`, `email`, `password`) VALUES
(171, 1, 'drtres@gmail.com', '3212'),
(172, 2, 'user@admin.com', 'admin'),
(173, 1, 'carlosbilardo@gmail.com', '1986');

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
  ADD PRIMARY KEY (`id_concentracion`),
  ADD KEY `id_medicamento` (`id_medicamento`);

--
-- Indices de la tabla `familia`
--
ALTER TABLE `familia`
  ADD PRIMARY KEY (`id_familia`);

--
-- Indices de la tabla `forma_farmaceutica`
--
ALTER TABLE `forma_farmaceutica`
  ADD PRIMARY KEY (`id_forma_farmaceutica`),
  ADD KEY `id_medicamento` (`id_medicamento`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`id_medicamento`),
  ADD KEY `fk_categoria` (`id_categoria`),
  ADD KEY `fk_familia` (`id_familia`);

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
  MODIFY `id_concentracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `familia`
--
ALTER TABLE `familia`
  MODIFY `id_familia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `forma_farmaceutica`
--
ALTER TABLE `forma_farmaceutica`
  MODIFY `id_forma_farmaceutica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `id_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  MODIFY `id_obra_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  MODIFY `id_prescripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  MODIFY `id_prescripcion_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  MODIFY `id_prescripcion_prestacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  MODIFY `id_presentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `prestacion`
--
ALTER TABLE `prestacion`
  MODIFY `id_prestacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `profesional_salud`
--
ALTER TABLE `profesional_salud`
  MODIFY `id_profesional_salud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `concentracion`
--
ALTER TABLE `concentracion`
  ADD CONSTRAINT `concentracion_ibfk_1` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento` (`id_medicamento`);

--
-- Filtros para la tabla `forma_farmaceutica`
--
ALTER TABLE `forma_farmaceutica`
  ADD CONSTRAINT `forma_farmaceutica_ibfk_1` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento` (`id_medicamento`);

--
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `fk_familia` FOREIGN KEY (`id_familia`) REFERENCES `familia` (`id_familia`);

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
  ADD CONSTRAINT `fk_profesional_salud_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_Rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_profesional_salud_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_Rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
