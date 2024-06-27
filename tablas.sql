create database if not exists heroclash4geeks;

use heroclash4geeks;
create user if not exists dsw@'%' identified by 'dsw';
grant select, update, insert, delete on heroclash4geeks.* to dsw@'%';

CREATE TABLE `clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `pets` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `clientId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pet_client` (`clientId`),
  CONSTRAINT `fk_pet_client` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE `medicalhistories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `petId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_medicalHistory_pet` (`petId`),
  CONSTRAINT `fk_medicalHistory_pet` FOREIGN KEY (`petId`) REFERENCES `pets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `vaccines` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `medicalhistories_vaccines` (
  `medicalHistoryId` int unsigned NOT NULL,
  `vaccineId` int unsigned NOT NULL,
  PRIMARY KEY (`medicalHistoryId`,`vaccineId`),
  KEY `vaccineId` (`vaccineId`),
  CONSTRAINT `medicalhistories_vaccines_ibfk_1` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `medicalhistories_vaccines_ibfk_2` FOREIGN KEY (`vaccineId`) REFERENCES `vaccines` (`id`) ON DELETE CASCADE
);


CREATE TABLE `observations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `medicalHistoryId` int unsigned NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_observation_medicalHistory` (`medicalHistoryId`),
  CONSTRAINT `fk_observation_medicalHistory` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `professionals` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dni` INT UNSIGNED NULL,
  `name` VARCHAR(255) NULL,
  `lastname` VARCHAR(255) NULL,
  `adress` VARCHAR(255) NULL,
  `phone_number` INT UNSIGNED NULL,
  `mail` VARCHAR(255) NULL,
  `birthdate` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
);
