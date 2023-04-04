CREATE DATABASE  IF NOT EXISTS `inventario` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventario`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventario
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `codigoEmpleado` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `puestoEmpleado` varchar(45) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (12,2023,'Leonel','$2b$10$oTXsgF3v9qNFhThRijR.kuEgeqcgjAjIyC9GCthbdTOem7zQIqY0u','Administrador','2023-04-03 19:21:23');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `Pedido_idPedido` int NOT NULL AUTO_INCREMENT,
  `fechaPedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Empleados_idEmpleado` int NOT NULL,
  `Productos_idProducto` int NOT NULL,
  `Proveedores_idProveedor` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`Pedido_idPedido`),
  KEY `fk_detalle_pedido_Productos1_idx` (`Productos_idProducto`),
  KEY `fk_detalle_pedido_Proveedores1_idx` (`Proveedores_idProveedor`),
  KEY `fk_detalle_pedido_Empleados1_idx` (`Empleados_idEmpleado`),
  CONSTRAINT `fk_detalle_pedido_Empleados1` FOREIGN KEY (`Empleados_idEmpleado`) REFERENCES `empleados` (`idEmpleado`),
  CONSTRAINT `fk_detalle_pedido_Productos1` FOREIGN KEY (`Productos_idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `fk_detalle_pedido_Proveedores1` FOREIGN KEY (`Proveedores_idProveedor`) REFERENCES `proveedores` (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (19,'2023-04-03 21:40:44',12,1,1,10),(20,'2023-04-03 21:52:13',12,4,1,10),(21,'2023-04-03 21:56:33',12,4,1,10);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(100) NOT NULL,
  `descripcionProducto` varchar(255) NOT NULL,
  `categoriaProducto` varchar(50) NOT NULL,
  `existenciaProducto` int NOT NULL,
  `precioVenta` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Espaguetti','Pasta integral 1 libra','Comestible',35,3.50),(2,'Leche','Caja de 1 litro','Lácteos',20,11.50),(3,'Atún','Atún en agua','Enlatados',30,9.50),(4,'Salsa de tomate','Botella grande','Salsas',24,13.25),(5,'Shampoo','Shampoo hidratante','Cuidado personal',60,35.00),(6,'Jabón para baño','Jabón para baño','Cuidado personal',20,4.50),(7,'Gomitas','Gomitas de osos','Dulces',40,4.00),(8,'Cafetera','12 tazas','Electrodomesticos',5,300.00),(9,'Cuaderno','100 hojas de cuadricula','Libreria',35,11.25);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_proveedores`
--

DROP TABLE IF EXISTS `productos_proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_proveedores` (
  `idproductos_proveedores` int NOT NULL AUTO_INCREMENT,
  `Productos_idProducto` int NOT NULL,
  `Proveedores_idProveedor` int NOT NULL,
  `precioCompra` decimal(8,2) NOT NULL,
  PRIMARY KEY (`idproductos_proveedores`,`Productos_idProducto`,`Proveedores_idProveedor`),
  KEY `fk_productos_proveedores_Productos1_idx` (`Productos_idProducto`),
  KEY `fk_productos_proveedores_Proveedores1_idx` (`Proveedores_idProveedor`),
  CONSTRAINT `fk_productos_proveedores_Productos1` FOREIGN KEY (`Productos_idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `fk_productos_proveedores_Proveedores1` FOREIGN KEY (`Proveedores_idProveedor`) REFERENCES `proveedores` (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_proveedores`
--

LOCK TABLES `productos_proveedores` WRITE;
/*!40000 ALTER TABLE `productos_proveedores` DISABLE KEYS */;
INSERT INTO `productos_proveedores` VALUES (1,1,1,10.00),(2,1,5,20.00),(3,2,4,30.00),(4,2,5,40.00),(5,3,3,50.00),(6,3,4,60.00),(7,4,2,70.00),(8,4,3,80.00),(9,5,1,90.00),(10,5,2,10.00),(11,6,1,20.00),(12,6,5,30.00),(13,7,3,40.00),(14,7,4,50.00),(15,8,2,60.00),(16,8,3,70.00),(17,9,1,80.00),(18,9,2,90.00);
/*!40000 ALTER TABLE `productos_proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `idProveedor` int NOT NULL AUTO_INCREMENT,
  `nombreProveedor` varchar(100) NOT NULL,
  `direccionProveedor` varchar(255) NOT NULL,
  `telefonoProveedor` varchar(8) NOT NULL,
  PRIMARY KEY (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Distribuidora San Francisco','6 Avenida 21-64, zona 6','33707653'),(2,'Distribuidora Maya','52 Calle 19-44, zona 2','33513118'),(3,'Almacen Pedro','0 Avenida 40-09, zona 17','26961588'),(4,'Bodega Aguilar','53 Calle 3-47, zona 24','28276454'),(5,'Distribuidora Los 3','50 Avenida 35-59, zona 19','34751784'),(6,'Bodega San Juan','46 Calle 19-28, zona 18','39401596'),(7,'Almacen Roosevelt','27 Avenida 18-15, zona 13','23900458'),(8,'Tienda La Bendicion','25 Avenida 15-84, zona 14','29593756'),(9,'Tienda La Economica','39 Avenida 8-53, zona 13','32737022');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'inventario'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-03 19:57:26
