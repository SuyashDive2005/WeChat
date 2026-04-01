-- MySQL schema equivalent to the MongoDB/Mongoose models used in this project.
-- Run this file in MySQL to create the database and required tables.

CREATE DATABASE IF NOT EXISTS wechat
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE wechat;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(30) NOT NULL,
  email VARCHAR(191) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_pic TEXT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  CONSTRAINT chk_users_password_minlen CHECK (CHAR_LENGTH(password) >= 6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(30) NOT NULL,
  sender_id VARCHAR(30) NOT NULL,
  receiver_id VARCHAR(30) NOT NULL,
  text TEXT NULL,
  image TEXT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY idx_messages_sender_id (sender_id),
  KEY idx_messages_receiver_id (receiver_id),
  KEY idx_messages_created_at (created_at),
  CONSTRAINT fk_messages_sender
    FOREIGN KEY (sender_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_messages_receiver
    FOREIGN KEY (receiver_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;