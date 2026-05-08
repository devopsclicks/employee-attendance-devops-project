# Employee Attendance DevOps Project

## MariaDB Setup and Required File Configuration

This project uses:

- Frontend: HTML + CSS + JavaScript + Nginx
- Backend: Spring Boot + Maven + Java 17
- Database: MariaDB (MySQL compatible)

This README covers:

- MariaDB installation
- Database creation
- Employee table overview
- `application.properties` update
- `script.js` update

---

# 1. Install MariaDB

## Update Server

```bash
sudo yum update -y
```

## Install MariaDB (Amazon Linux 2023)

```bash
sudo dnf install mariadb105-server -y
```

## Verify Installation

```bash
mysql --version
```

---

# 2. Start MariaDB Service

```bash
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo systemctl status mariadb
```

Expected:

```text
active (running)
```

---

# 3. Secure MariaDB Installation

```bash
sudo mysql_secure_installation
```

Recommended:

- Enter current password → Press Enter
- Switch to unix_socket authentication → n
- Change root password → Y
- Set root password → your password
- Remove anonymous users → Y
- Disallow root login remotely → Y
- Remove test database → Y
- Reload privilege tables → Y

Example password used:

```text
Suresh@231
```

---

# 4. Login to MariaDB

```bash
mysql -u root -p
```

---

# 5. Create Database

```sql
CREATE DATABASE employeedb;
SHOW DATABASES;
EXIT;
```

---

# 6. Employee Table Creation

No manual table creation is required.

Spring Boot automatically creates the table using:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Table name created:

```text
employees
```

---

# 7. Employee Table Structure

| Column | Type |
|---|---|
| id | BIGINT |
| name | VARCHAR |
| status | VARCHAR |

Example:

| id | name | status |
|---|---|---|
| 1 | Suresh | PRESENT |
| 2 | Ramesh | ABSENT |

---

# 8. Update application.properties

## File Location

```text
src/main/resources/application.properties
```

## Required Content

```properties
server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root
spring.datasource.password=Suresh@231
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

## Purpose

This connects:

Spring Boot → MariaDB

If username, password, or DB name is wrong, backend will fail.

---

# 9. Update script.js

## File Location

```text
frontend/script.js
```

## Required Content

```javascript
const API_URL = "http://54.211.68.55:8080/api/employees";
```

## Important

Do NOT use:

```javascript
localhost
```

because browser localhost means the local machine, not the EC2 server.

Use public server IP so frontend can reach backend.

---

# 10. Frontend Files

```text
frontend/
├── index.html
├── style.css
└── script.js
```

- index.html → UI structure
- style.css → UI design
- script.js → API calls

---

# 11. Backend Files

```text
backend/
├── pom.xml
├── src/
└── application.properties
```

- pom.xml → Maven dependencies
- Java files → API logic
- application.properties → DB connection

---

# Final Flow

```text
Nginx Frontend (Port 80)
        ↓
Spring Boot Backend (Port 8080)
        ↓
MariaDB Database
```

