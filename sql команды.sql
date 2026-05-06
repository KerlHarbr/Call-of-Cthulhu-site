CREATE DATABASE IF NOT EXISTS cok;

USE cok;

CREATE TABLE IF NOT EXISTS Users
(
	UsersKey INT UNSIGNED AUTO_INCREMENT,
	Login VARCHAR(32),
	Passwod VARCHAR(64),
	RegDate DATETIME,
	PRIMARY KEY(UsersKey)
);

CREATE TABLE IF NOT EXISTS Sheets
(
	SheetKey INT UNSIGNED AUTO_INCREMENT,
	FUsersKey INT UNSIGNED,
	SheetName VARCHAR(32),
	SheetProf VARCHAR(32),
	SheetCreation DATETIME,
	SheetLastOpen DATETIME,
	SheetFile JSON,
	PRIMARY KEY(SheetKey),
	FOREIGN KEY(FUsersKey) REFERENCES Users(UsersKey) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sessions
(
	SessionKey INT UNSIGNED AUTO_INCREMENT,
	SUserKey INT UNSIGNED,
	SessionId VARCHAR(64),
	PRIMARY KEY(SessionKey),
	FOREIGN KEY(SUserKey) REFERENCES Users(UsersKey) ON DELETE CASCADE
);

#тестовые данные
INSERT Users(Login, Passwod, RegDate)
VALUES ('admin', 'admin', '2026-05-05 11:43:00');