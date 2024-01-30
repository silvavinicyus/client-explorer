CREATE DATABASE client_explorer;

DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
	id SERIAL PRIMARY KEY,
  uuid varchar(40) UNIQUE NOT NULL,
  name varchar(40) NOT NULL,
  email varchar(40) UNIQUE NOT NULL,
  phone varchar(15) NOT NULL,
  address varchar(10) NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL 
)