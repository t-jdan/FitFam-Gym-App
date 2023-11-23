DROP DATABASE IF EXISTS FitFam_Management_System;
CREATE DATABASE FitFam_Management_System;
USE FitFam_Management_System;
-- Create Person table
CREATE TABLE Person (
    user_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    tel_no VARCHAR(20),
    dob DATE,
    password VARCHAR(50)
);

-- Create Student table
CREATE TABLE Student (
    user_id VARCHAR(50) PRIMARY KEY,
    year_group DATE,
    major VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Person(user_id)
);

-- Create GymLog table
CREATE TABLE GymLog (
    log_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    log_in DATE,
    log_out DATE,
    FOREIGN KEY (user_id) REFERENCES Person(user_id)
);

-- Create Admin table
CREATE TABLE Admin (
    user_id VARCHAR(50) PRIMARY KEY,
    department_id VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Person(user_id)
);

-- Create GymUser TABLE
CREATE TABLE GymUser (
    user_id VARCHAR(50) PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES Person(user_id)
);

-- Create GymTrainer table
CREATE TABLE GymTrainer (
    user_id VARCHAR(50) PRIMARY KEY,
    wage INT,
    FOREIGN KEY (user_id) REFERENCES Person(user_id)
);

-- Create TrainerSchedule table
CREATE TABLE TrainerSchedule (
    time_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    recurring_day VARCHAR(20),
    recurring_hour VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES GymTrainer(user_id)
);
