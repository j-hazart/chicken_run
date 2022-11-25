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

DROP TABLE IF EXISTS stock;

CREATE TABLE stock (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    item VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 0,
    chicken_id INT NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
    chickens (item, quantity, chicken_id)
VALUES
    (
        'egg',
        3,
        1
    ),
    (
        'egg',
        5,
        2
    )
    (
        'leather',
        6,
        1
    ),
    (
        'leather',
        12,
        2
    );