CREATE DATABASE IF NOT EXISTS chicken_coop;

USE chicken_coop;

DROP TABLE IF EXISTS chickens;

CREATE TABLE chickens (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    birthday DATE,
    weight INT NOT NULL,
    steps INT DEFAULT 0,
    isRunning BOOLEAN DEFAULT false
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
    chickens (name, birthday, weight)
VALUES
    (
        'Cocotte',
        DATE('2013-02-28'),
        1.5
    ),
    (
        'Poulette',
        DATE('2014-10-02'),
        1.8
    );