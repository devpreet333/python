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

--List the following details of each employee: employee number, last name, first name, gender, and salary.

SELECT employees.emp_no, employees.last_name, employees.first_name, employees.gender, salaries.salary
FROM employees
INNER JOIN salaries ON
employees.emp_no=salaries.emp_no

--List employees who were hired in 1986.

SELECT * from employees
WHERE hire_date < '1987-01-01' AND hire_date > '1985-12-31'

--List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name, and start and end employment dates.

SELECT * from manager

SELECT manager.dept_no, departments.dept_name, manager.emp_no, employees.last_name, employees.first_name, manager.from_date, manager.to_date 
FROM ((manager
LEFT JOIN departments ON RIGHT(manager.dept_no,3) = RIGHT(departments.dept_no,3))
LEFT JOIN employees ON employees.emp_no = manager.emp_no)

--List the department of each employee with the following information: employee number, last name, first name, and department name.

SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM ((dept_emp
LEFT JOIN departments ON RIGHT(dept_emp.dept_no,3) = RIGHT(departments.dept_no,3))
LEFT JOIN employees ON employees.emp_no = dept_emp.emp_no);

--List all employees whose first name is "Hercules" and last names begin with "B."

SELECT * from dept_emp

SELECT * from employees
WHERE first_name = 'Hercules' AND LEFT(last_name,1) = 'B'

--List all employees in the Sales department, including their employee number, last name, first name, and department name.

SELECT * from dept_emp

SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM ((dept_emp
INNER JOIN departments ON RIGHT(dept_emp.dept_no,3) = RIGHT(departments.dept_no,3))
INNER JOIN employees ON employees.emp_no = dept_emp.emp_no)
WHERE dept_emp.dept_no = 'd007'

--List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.

SELECT * from departments

SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM ((dept_emp
INNER JOIN departments ON RIGHT(dept_emp.dept_no,3) = RIGHT(departments.dept_no,3))
INNER JOIN employees ON employees.emp_no = dept_emp.emp_no)
WHERE dept_emp.dept_no = 'd007' OR dept_emp.dept_no = 'd005'

--In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

Select last_name, count(*)
From   employees
Group By last_name
Order By count(last_name) Desc;
