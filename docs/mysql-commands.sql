create database if not exists veterinaria;

use veterinaria;

create user if not exists dsw@'%' identified by 'dsw';
grant select, update, insert, delete on veterinaria.* to dsw@'%';

create table if not exists  `veterinaria`.`pets`(
     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
     `name` VARCHAR(255) NOT NULL,
     `age` INT UNSIGNED NULL,
     `type` VARCHAR (200) NULL,
     `breed` VARCHAR (200) NULL,
     `weight` INT UNSIGNED NULL,
    PRIMARY KEY (`id`)
);


insert into veterinaria.pets values (1, 'Moro', 5, 'perro', 'Caniche', '20', 2 );

create table if not exists `veterinaria`.`clients` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dni` VARCHAR(10) NOT NULL,
  `firstname` VARCHAR(20) NOT NULL,
  `lastname` VARCHAR(20) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `registrationDate` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`)
);
insert into veterinaria.clients

values(
    1,
    '44523096',
    'Facundo',
    'Munne',
    'Buenos Aires 1430',
    '3416470473',
    'fnmunne@gmail.com',
    '08/12/2002'
  );

USE veterinaria

ALTER TABLE Pets
MODIFY COLUMN client_id INT UNSIGNED;

ALTER TABLE Pets
ADD CONSTRAINT fk_client_id
FOREIGN KEY (client_id) REFERENCES Clients(id);

CREATE TABLE `veterinaria`.`medicalhistories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `petId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_medicalHistory_pet` (`petId`),
  CONSTRAINT `fk_medicalHistory_pet` FOREIGN KEY (`petId`) REFERENCES `pets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `veterinaria`.`vaccines` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `veterinaria`.`medicalhistories_vaccines` (
  `medicalHistoryId` int unsigned NOT NULL,
  `vaccineId` int unsigned NOT NULL,
  PRIMARY KEY (`medicalHistoryId`,`vaccineId`),
  KEY `vaccineId` (`vaccineId`),
  CONSTRAINT `medicalhistories_vaccines_ibfk_1` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `medicalhistories_vaccines_ibfk_2` FOREIGN KEY (`vaccineId`) REFERENCES `vaccines` (`id`) ON DELETE CASCADE
);


CREATE TABLE `veterinaria`.`observations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `medicalHistoryId` int unsigned NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_observation_medicalHistory` (`medicalHistoryId`),
  CONSTRAINT `fk_observation_medicalHistory` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

insert into veterinaria.medicalHistories values(1,1);
insert into veterinaria.vaccines values(1,'Vacuna Antirrabica');
insert into veterinaria.vaccines values(2,'Vacuna del Moquillo');
insert into veterinaria.medicalHistories_vaccines values(1,1);
insert into veterinaria.observations values(1,1,'21/06/2024','Vacuna id:1 aplicada a mascota id:1');

create table if not exists `veterinaria`.`professionals` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dni` INT UNSIGNED NULL,
  `name` VARCHAR(255) NULL,
  `lastname` VARCHAR(255) NULL,
  `adress` VARCHAR(255) NULL,
  `phone_number` INT UNSIGNED NULL,
  `mail` VARCHAR(255) NULL,
  `birthdate` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));




insert into veterinaria.professionals values(1,'44021044','Juan Bautista','Larroquette','Izarra 1212',9122018,'juanlarroquette@gmail.com','08/08/2002');

create table if not exists `veterinaria`.`observations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `dificultyLevel` INT UNSIGNED NULL,
  `materialsUsed` INT UNSIGNED NULL,
  `description` VARCHAR(255) NULL,
  `datePerformed` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));

insert into veterinaria.observations values(001,'Leg cast',3,4,'Leg broken in 2 places','27/06/2024');