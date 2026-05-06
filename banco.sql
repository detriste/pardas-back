-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pardas
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `pardas` ;

-- -----------------------------------------------------
-- Schema pardas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pardas` DEFAULT CHARACTER SET utf8mb3 ;
USE `pardas` ;

-- -----------------------------------------------------
-- Table `pardas`.`produtos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pardas`.`produtos` ;

CREATE TABLE IF NOT EXISTS `pardas`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nomepro` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(45) NOT NULL,
  `preco` DECIMAL(10,3) NOT NULL,
  `quantidade` INT NOT NULL,
  `quantidade_minima` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `pardas`.`movimentações`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pardas`.`movimentações` ;

CREATE TABLE IF NOT EXISTS `pardas`.`movimentações` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `produto_id` INT NOT NULL,
  `tipo` ENUM('Entrada', 'Saida') NOT NULL,
  `quantidade` INT NOT NULL,
  `data_hora` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_mov_produto` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `fk_mov_produto`
    FOREIGN KEY (`produto_id`)
    REFERENCES `pardas`.`produtos` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `pardas`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pardas`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `pardas`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `senha` VARCHAR(450) NOT NULL,
  `email` VARCHAR(450) NOT NULL,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `produtos_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_usuarios_produtos_idx` (`produtos_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_produtos`
    FOREIGN KEY (`produtos_id`)
    REFERENCES `pardas`.`produtos` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
