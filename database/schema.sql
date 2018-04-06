DROP DATABASE lunch_planner;
CREATE DATABASE IF NOT EXISTS lunch_planner;
USE lunch_planner;

-- User
CREATE TABLE account
(
    account_email VARCHAR(30) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    account_hashed_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (account_email)
);

