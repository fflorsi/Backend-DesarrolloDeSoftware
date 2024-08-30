DROP SCHEMA IF EXISTS `veterinaria` ;
CREATE SCHEMA IF NOT EXISTS `veterinaria`; 


//no estan en orden perdonenme 

  
CREATE TABLE IF NOT EXISTS `veterinaria`.`clients` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dni` VARCHAR(10) NOT NULL,
  `firstname` VARCHAR(20) NOT NULL,
  `lastname` VARCHAR(20) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `registrationDate` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `veterinaria`.`medicalhistories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `petId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medicalHistory_pet` (`petId` ASC) VISIBLE,
  CONSTRAINT `fk_medicalHistory_pet`
    FOREIGN KEY (`petId`)
    REFERENCES `veterinaria`.`pets` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `veterinaria`.`medicalhistories_vaccines` (
  `medicalHistoryId` INT UNSIGNED NOT NULL,
  `vaccineId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`medicalHistoryId`, `vaccineId`),
  INDEX `vaccineId` (`vaccineId` ASC) VISIBLE,
  CONSTRAINT `medicalhistories_vaccines_ibfk_1`
    FOREIGN KEY (`medicalHistoryId`)
    REFERENCES `veterinaria`.`medicalhistories` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `medicalhistories_vaccines_ibfk_2`
    FOREIGN KEY (`vaccineId`)
    REFERENCES `veterinaria`.`vaccines` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `veterinaria`.`observations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `medicalHistoryId` INT UNSIGNED NOT NULL,
  `observation` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `dificultyLevel` INT UNSIGNED NULL DEFAULT NULL,
  `materialsUsed` INT UNSIGNED NULL DEFAULT NULL,
  `datePerformed` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_observation_medicalHistory` (`medicalHistoryId` ASC) VISIBLE,
  CONSTRAINT `fk_observation_medicalHistory`
    FOREIGN KEY (`medicalHistoryId`)
    REFERENCES `veterinaria`.`medicalhistories` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `veterinaria`.`pets` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `age` INT UNSIGNED NULL DEFAULT NULL,
  `type` VARCHAR(200) NULL DEFAULT NULL,
  `breed` VARCHAR(200) NULL DEFAULT NULL,
  `weight` INT UNSIGNED NULL DEFAULT NULL,
  `client_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_client_id` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_client_id`
    FOREIGN KEY (`client_id`)
    REFERENCES `veterinaria`.`clients` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `veterinaria`.`professionals` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dni` INT UNSIGNED NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `lastname` VARCHAR(255) NULL DEFAULT NULL,
  `adress` VARCHAR(255) NULL DEFAULT NULL,
  `phone_number` INT UNSIGNED NULL DEFAULT NULL,
  `mail` VARCHAR(255) NULL DEFAULT NULL,
  `birthdate` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `veterinaria`.`vaccines` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


