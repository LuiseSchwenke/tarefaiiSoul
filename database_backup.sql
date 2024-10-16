-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: tarefa1
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_data`
--

DROP TABLE IF EXISTS `all_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `sex` varchar(2) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `logradouro_id` int DEFAULT NULL,
  `bairro_id` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `number` varchar(45) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  KEY `fk_bairro` (`bairro_id`),
  KEY `fk_city` (`city_id`),
  KEY `fk_logradouro` (`logradouro_id`),
  CONSTRAINT `fk_bairro` FOREIGN KEY (`bairro_id`) REFERENCES `bairro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_city` FOREIGN KEY (`city_id`) REFERENCES `cidade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_logradouro` FOREIGN KEY (`logradouro_id`) REFERENCES `logradouro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_data`
--

LOCK TABLES `all_data` WRITE;
/*!40000 ALTER TABLE `all_data` DISABLE KEYS */;
INSERT INTO `all_data` VALUES (4,'Anna','Pereira','1988-04-25','F','876.543.210-00',4,4,4,'12a','04040-000','ana.pereira@example.com','(41) 96543-2109'),(5,'Pedro','Lima','1995-05-10','M','345.678.901-00',5,5,5,'3487','05050-000','pedro.lima@example.com','(51) 95432-1098'),(6,'Julia','Costa','1980-06-15','F','654.321.098-00',6,6,6,'1','06060-000','julia.costa@example.com','(61) 94321-0987'),(7,'Felipe','Alves','1998-07-20','M','543.210.987-00',7,7,7,'56','07070-000','felipe.alves@example.com','(71) 93210-9876'),(8,'Larissa','Rodrigues','1993-08-28','F','432.109.876-00',8,8,8,'34','08080-000','larissa.rodrigues@example.com','(81) 92109-8765'),(9,'Renato','Ferreira','1982-09-30','M','321.098.765-00',9,9,9,'323','09090-000','renato.ferreira@example.com','(91) 91098-7654'),(10,'Bianca','Martins','1991-10-05','F','210.987.654-00',10,10,10,'2c','10010-000','bianca.martins@example.com','(01) 90987-6543'),(12,'thor','Schwenke','2024-08-07','m','128.111.111-11',13,12,12,'527','11606-166','asuzrf@gmail.com','(12)98830-9979'),(16,'highScore','cavalo','2024-10-24','m','333.333.333-33',17,16,16,'527','11606-166','asuzrf@gmail.com',''),(17,'John','Doe','1990-05-14','M','123.456.789-00',33,31,31,'123','01234-567','john.doe@example.com','(11) 91234-5678'),(18,'Jane','Smith','1988-11-22','F','234.567.890-11',34,32,32,'456','98765-432','jane.smith@example.com','(21) 99876-5432'),(19,'Carlos','Silva','1975-08-10','M','345.678.901-22',35,33,33,'789','65432-109','carlos.silva@example.com','(31) 98765-4321'),(20,'Maria','Fernandes','1992-03-05','F','456.789.012-33',36,34,34,'101','54321-098','maria.fernandes@example.com','(41) 99654-3210'),(21,'Lucas','Almeida','1985-07-16','M','567.890.123-44',37,35,35,'202','43210-987','lucas.almeida@example.com','(51) 99543-2109'),(22,'Ana','Costa','1991-01-23','F','678.901.234-55',38,36,36,'303','32109-876','ana.costa@example.com','(61) 99432-1098'),(23,'Pedro','Oliveira','1979-09-09','M','789.012.345-66',39,37,37,'404','21098-765','pedro.oliveira@example.com','(71) 99321-0987'),(24,'Juliana','Pereira','1983-12-12','F','890.123.456-77',40,38,38,'505','10987-654','juliana.pereira@example.com','(81) 99210-9876'),(25,'Bruno','Lima','1995-04-02','M','901.234.567-88',41,39,39,'606','09876-543','bruno.lima@example.com','(91) 99109-8765'),(26,'Isabela','Santos','1987-11-29','F','012.345.678-99',42,40,40,'707','98765-432','isabela.santos@example.com','(81) 99098-7654'),(27,'Felipe','Gomes','1990-08-15','M','111.222.333-44',33,31,31,'808','87654-321','felipe.gomes@example.com','(71) 98987-6543'),(28,'Laura','Mendes','1993-03-08','F','234.234.234-23',34,32,32,'909','76543-210','laura.mendes@example.com','(61) 98876-5432'),(29,'Ricardo','Ribeiro','1977-05-19','M','345.345.345-34',35,33,33,'1010','65432-109','ricardo.ribeiro@example.com','(51) 98765-4321'),(30,'Luiza','Martins','1982-09-03','F','346.346.346-36',36,34,34,'1111','54321-098','luiza.martins@example.com','(41) 98654-3210'),(31,'Thiago','Nunes','1989-07-22','M','347.347.347-37',37,35,35,'1212','43210-987','thiago.nunes@example.com','(31) 98543-2109'),(32,'Beatriz','Araujo','1986-02-11','F','348.348.348-38',38,36,36,'1313','32109-876','beatriz.araujo@example.com','(21) 98432-1098'),(33,'Guilherme','Moraes','1994-06-10','M','349.349.349-39',39,37,37,'1414','21098-765','guilherme.moraes@example.com','(11) 98321-0987'),(34,'Fernanda','Barros','1988-12-17','F','449.449.449-49',40,38,38,'1515','10987-654','fernanda.barros@example.com','(31) 98210-9876'),(35,'Rodrigo','Teixeira','1991-11-23','M','549.549.549-59',41,39,39,'1616','09876-543','rodrigo.teixeira@example.com','(81) 98109-8765'),(36,'Camila','Sousa','1992-10-31','F','000.000.111-00',42,40,40,'1717','98765-432','camila.sousa@example.com','(71) 98098-7654'),(37,'alalalala','alalalal','2024-10-18','f','987.987.987-97',43,41,47,'527','11606-166','luise@schwenke.de','(11) 1111-1111'),(38,'bababab','bababab','2024-10-18','f','626.262.626-26',44,42,48,'527','11606-166','luise@schwenke.de','(11) 1111-1111'),(40,'bababab','ababba','2024-10-31','f','636.463.626-36',46,44,50,'527','11606-166','luise@schwenke.de','(11) 1111-1111'),(44,'Luise','Schwenke','2024-10-25','f','828.328.238-28',50,48,54,'527','11606-166','adfwe@gmail.com','(11) 1111-1111'),(45,'yoyoyoyo','yoyoyoyo','2024-10-07','f','010.101.010-23',51,49,55,'527','11606-166','luise@schwenke.de','(11) 1111-1111'),(46,'wewewewe','sdfas','2024-10-17','m','303.030.303-12',52,50,56,'28','12559-123','luise@schwenke.de','(11) 1111-1111'),(47,'wuwiiw','wuwuwi','2024-10-24','f','757.575.757-63',53,51,57,'527','11606-166','luise@schwenke.de','(11) 1111-1111'),(49,'oioioi','oioioi','2024-10-06','f','959.697.959-69',55,53,59,'527','11606-166','luise@schwenke.de','(11) 1111-1111'),(50,'ffff','ffffff','2024-10-09','f','616.263.646-56',56,54,60,'527','11606-166','adfwe@gmail.com','(11) 1111-1111'),(52,'ffff','ffffff','2024-10-09','f','616.263.646-77',58,56,62,'527','11606-166','adfwe@gmail.com','(11) 1111-1111'),(53,'yaayaya','yayaya','2024-10-10','m','828.481.858-67',59,57,63,'527','11606-166','luise@schwenke.de','(11) 1111-1111'),(54,'yaayaya','yayaya','2024-10-10','m','828.481.858-99',60,58,64,'527','11606-166','luise@schwenke.de','(11) 1111-1111');
/*!40000 ALTER TABLE `all_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bairro`
--

DROP TABLE IF EXISTS `bairro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bairro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bairro`
--

LOCK TABLES `bairro` WRITE;
/*!40000 ALTER TABLE `bairro` DISABLE KEYS */;
INSERT INTO `bairro` VALUES (1,'Centro'),(2,'Jardim'),(3,'Vila Nova'),(4,'Alto da Boa Vista'),(5,'Copacabana'),(6,'Ipanema'),(7,'Bela Vista'),(8,'Barra da Tijuca'),(9,'Morumbi'),(10,'Pinheiros'),(11,'Vila Nova'),(12,'Bela Vista'),(13,'Vila Nova'),(14,'Vila Nova'),(15,'Copacabana'),(16,'Centro'),(17,'Alto da Boa Vista'),(18,'Jardim'),(19,'Vila Nova'),(20,'Bela Vista'),(21,'Ipanema'),(22,'Alto da Boa Vista'),(23,'Alto da Boa Vista'),(24,'Jardim'),(25,'Centro'),(26,'Vila Nova'),(27,'Bela Vista'),(28,'Morumbi'),(29,'Morumbi'),(30,'Bela Vista'),(31,'Centro'),(32,'Jardins'),(33,'Pinheiros'),(34,'Vila Madalena'),(35,'Moema'),(36,'Itaim Bibi'),(37,'Brooklin'),(38,'Tatuapé'),(39,'Morumbi'),(40,'Vila Mariana'),(41,'Copacabana'),(42,'Copacabana'),(43,'Copacabana'),(44,'Vila Nova'),(45,'Vila Nova'),(46,'Copacabana'),(47,'Vila Nova'),(48,'Jardim'),(49,'Barra da Tijuca'),(50,'Copacabana'),(51,'Vila Madalena'),(52,'Vila Madalena'),(53,'Ipanema'),(54,'Vila Madalena'),(55,'Vila Madalena'),(56,'Vila Madalena'),(57,'Morumbi'),(58,'Morumbi');
/*!40000 ALTER TABLE `bairro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cidade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
INSERT INTO `cidade` VALUES (1,'São Paulo'),(2,'Rio de Janeiro'),(3,'Belo Horizonte'),(4,'Salvador'),(5,'Curitiba'),(6,'Brasília'),(7,'Fortaleza'),(8,'Recife'),(9,'Porto Alegre'),(10,'Natal'),(11,'Rio de Janeiro'),(12,'São Paulo'),(13,'Belo Horizonte'),(14,'Belo Horizonte'),(15,'Brasília'),(16,'Salvador'),(17,'Salvador'),(18,'Salvador'),(19,'Rio de Janeiro'),(20,'Salvador'),(21,'Salvador'),(22,'Rio de Janeiro'),(23,'Rio de Janeiro'),(24,'Belo Horizonte'),(25,'São Paulo'),(26,'Rio de Janeiro'),(27,'Porto Alegre'),(28,'Porto Alegre'),(29,'Porto Alegre'),(30,'Natal'),(31,'São Paulo'),(32,'Rio de Janeiro'),(33,'Belo Horizonte'),(34,'Porto Alegre'),(35,'Curitiba'),(36,'Salvador'),(37,'Fortaleza'),(38,'Brasília'),(39,'Manaus'),(40,'Recife'),(41,'Belém'),(42,'Goiânia'),(43,'Campinas'),(44,'São Luís'),(45,'Maceió'),(46,'Natal'),(47,'Salvador'),(48,'Curitiba'),(49,'Curitiba'),(50,'Belo Horizonte'),(51,'Belo Horizonte'),(52,'Belo Horizonte'),(53,'Belo Horizonte'),(54,'São Paulo'),(55,'Rio de Janeiro'),(56,'Belo Horizonte'),(57,'São Paulo'),(58,'São Paulo'),(59,'Rio de Janeiro'),(60,'Rio de Janeiro'),(61,'Rio de Janeiro'),(62,'Rio de Janeiro'),(63,'Salvador'),(64,'Salvador');
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logradouro`
--

DROP TABLE IF EXISTS `logradouro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logradouro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logradouro`
--

LOCK TABLES `logradouro` WRITE;
/*!40000 ALTER TABLE `logradouro` DISABLE KEYS */;
INSERT INTO `logradouro` VALUES (1,'Rua','Avenida Paulista'),(2,'Avenida','Rua da Consolação'),(3,'Travessa','Rua XV de Novembro'),(4,'Estrada','Avenida Brigadeiro Faria Lima'),(5,'Alameda','Rua Augusta'),(6,'Praça','Avenida Rio Branco'),(7,'Rodovia','Rua dos Três Irmãos'),(8,'Largo','Rua dos Jardins'),(9,'Vila','Rua dos Atibais'),(10,'Condomínio','Rua da Liberdade'),(11,'Avenida','Rua Quinze de Novembro'),(12,'Avenida','Rua Quinze de Novembro'),(13,'Estrada','Rua Quinze de Novembro'),(14,'Travessa','Rua Quinze de Novembro'),(15,'Travessa','Rua Quinze de Novembro'),(16,'Travessa','Rua Quinze de Novembro'),(17,'Estrada','Rua Quinze de Novembro'),(18,'Avenida','Rua Quinze de Novembro'),(19,'Avenida','Rua Quinze de Novembro'),(20,'Avenida','Rua Quinze de Novembro'),(21,'Avenida','Rua Quinze de Novembro'),(22,'Rodovia','Rua Quinze de Novembro'),(23,'Avenida','Rua Quinze de Novembro'),(24,'Travessa','Rua Quinze de Novembro'),(25,'Avenida','Rua Quinze de Novembro'),(26,'Rua','Rua Quinze de Novembro'),(27,'Avenida','Rua Quinze de Novembro'),(28,'Travessa','Rua Quinze de Novembro'),(29,'Alameda','Rua Quinze de Novembro'),(30,'Alameda','Rua Quinze de Novembro'),(31,'Avenida','Rua Quinze de Novembro'),(32,'Rua','Rua da Praia'),(33,'Rua','Avenida Paulista'),(34,'Rua','Rua da Consolação'),(35,'Avenida','Avenida Brasil'),(36,'Rua','Rua Augusta'),(37,'Avenida','Avenida Ibirapuera'),(38,'Rua','Rua Oscar Freire'),(39,'Avenida','Avenida Faria Lima'),(40,'Rua','Rua Vergueiro'),(41,'Avenida','Avenida Rebouças'),(42,'Rua','Rua Bela Cintra'),(43,'Alameda','Rua Quinze de Novembro'),(44,'Travessa','Rua Quinze de Novembro'),(45,'Travessa','Rua Quinze de Novembro'),(46,'Travessa','Rua Quinze de Novembro'),(47,'Travessa','Rua Quinze de Novembro'),(48,'Avenida','Rua Quinze de Novembro'),(49,'Praça','Rua Quinze de Novembro'),(50,'Rua','Rua Quinze de Novembro'),(51,'Avenida','Rua Quinze de Novembro'),(52,'Estrada','Alfred-Randt-Strasse'),(53,'Travessa','Rua Quinze de Novembro'),(54,'Travessa','Rua Quinze de Novembro'),(55,'Avenida','Rua Quinze de Novembro'),(56,'Travessa','Rua Quinze de Novembro'),(57,'Travessa','Rua Quinze de Novembro'),(58,'Travessa','Rua Quinze de Novembro'),(59,'Estrada','Rua Quinze de Novembro'),(60,'Estrada','Rua Quinze de Novembro');
/*!40000 ALTER TABLE `logradouro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-16 17:03:44
