CREATE DATABASE IF NOT EXISTS chicken_coop;

USE chicken_coop;

DROP TABLE IF EXISTS chickens;

CREATE TABLE chickens (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    birthday DATE,
    weight INT NOT NULL,
    steps INT DEFAULT 0,
    isRunning BOOLEAN DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
    chickens (name, birthday, weight)
VALUES
    (
        'Cocotte',
        '2020-11-01',
        1.5
    ),
    (
        'Poulette',
        '2021-05-13',
        1.8
    );