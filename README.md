# Backend-DesarrolloDeSoftware

En tablas.sql está todo el código para crear las tablas que tenemos hasta el momento
Importante que TODOS creemos la db con las siguientes 4 lineas así tenemos el mismo nombre en la db, mismos routes y misma pool

create database if not exists veterinaria;
use veterinaria;
create user if not exists dsw@'%' identified by 'dsw';
grant select, update, insert, delete on veterinaria.* to dsw@'%';

//En tablas.sql ya está todo ese código.
