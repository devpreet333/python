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
