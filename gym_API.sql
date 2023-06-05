DROP DATABASE IF EXISTS GYM_API;
CREATE DATABASE GYM_API;
USE GYM_API;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	admin_app BOOL false)
     
CREATE TABLE IF NOT EXISTS admin_app (
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	admin_app BOOL true)
     
CREATE TABLE IF NOT EXISTS exercises (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description VARCHAR(140) NOT NULL,
	picture VARCHAR(300) NOT NULL,
	goal_id VARCHAR(50) NOT NULL,
	muscle_group_id VARCHAR(50) NOT NULL,
	FOREIGN KEY (muscle_group_id) REFERENCE muscle_group(id),
	FOREIGN KEY (goal_id) REFERENCE goal(id))

CREATE TABLE IF NOT EXISTS workouts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    goal_id VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(140) NOT NULL,
    muscle_group_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (muscle_group_id) REFERENCE muscle_group(id),
	FOREIGN KEY (goal_id) REFERENCE goal(id)))

CREATE TABLE IF NOT EXISTS exercises_likes (
	id CHAR(36) PRIMARY KEY,
	exercises_id CHAR(36) NOT NULL,
	FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE)

CREATE TABLE IF NOT EXISTS favourites (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    exercises_id VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

CREATE TABLE IF NOT EXISTS muscle_group (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50))

CREATE TABLE IF NOT EXISTS goal (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50))





