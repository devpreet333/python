-- Database: Homework

-- DROP DATABASE "Homework";

CREATE DATABASE "Homework"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS dept_emp;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS salaries;
DROP TABLE IF EXISTS titles;

CREATE TABLE departments (
	dept_no character varying(45) NOT NULL,
	dept_name character varying(45) NOT NULL
);

ALTER TABLE departments
ADD PRIMARY KEY (dept_no);

SELECT * FROM departments;

CREATE TABLE dept_emp (
	emp_no INT NOT NULL,
	dept_no character varying(45) NOT NULL,
	from_date date NOT NULL,
	to_date date NOT NULL
	);
	
ALTER TABLE dept_emp
ADD FOREIGN KEY (emp_no) REFERENCES employees(emp_no);

ALTER TABLE dept_emp
ADD FOREIGN KEY (dept_no) REFERENCES departments(dept_no);

SELECT * FROM dept_emp

CREATE TABLE manager (
	dept_no character varying(45) NOT NULL,
	emp_no integer NOT NULL,
	from_date date NOT NULL,
	to_date date NOT NULL,
	dept_id int 
	);

ALTER TABLE manager
ADD FOREIGN KEY (emp_no) REFERENCES employees(emp_no);

ALTER TABLE manager
ADD FOREIGN KEY (dept_no) REFERENCES departments(dept_no);

ALTER TABLE manager
DROP COLUMN dept_id;

SELECT * FROM manager

CREATE TABLE employees (
	emp_no integer NOT NULL,
	birth_date date NOT NULL,
	first_name character varying NOT NULL,
	last_name character varying NOT NULL,
	gender character varying NOT NULL,
	hire_date date NOT NULL
	);
ALTER TABLE employees
ADD PRIMARY KEY (emp_no);

SELECT * FROM employees

CREATE TABLE salaries (
	emp_no integer NOT NULL,
	salary integer NOT NULL,
	from_date date NOT NULL,
	to_date date NOT NULL
	);

ALTER TABLE salaries
ADD FOREIGN KEY (emp_no) REFERENCES employees(emp_no);

SELECT * FROM salaries

CREATE TABLE titles (
	emp_no integer NOT NULL,
	title character varying NOT NULL,
	from_date date NOT NULL,
	to_date date NOT NULL
	);

ALTER TABLE titles
ADD FOREIGN KEY (emp_no) REFERENCES employees(emp_no);

SELECT * FROM titles

