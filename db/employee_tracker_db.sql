DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title varchar(45) NOT NULL,
  salary decimal(10,4) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  KEY department_id_idx (department_id),
  CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  role_id int DEFAULT NULL,
  manager_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY role_id_idx (role_id),
  KEY manager_id_idx (manager_id),
  CONSTRAINT manager_id FOREIGN KEY (manager_id) REFERENCES employees (id),
  CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES roles (id)
); 