CREATE DATABASE if not exists shelter;
USE shelter;

DROP TABLE if exists staff;
DROP TABLE if exists pets;
DROP TABLE if exists shelte;

CREATE TABLE staff ( 
    staff_id int auto_increment primary key,
    staff_name varchar(100) unique,
    staff_email varchar(100) unique,
    staff_location varchar(100)
);
CREATE TABLE pets(
	pet_id int auto_increment primary key,
    pet_owner_name varchar(100),
	pet_name varchar(100),
    pet_specie varchar(100),
    pet_age int,
    pet_diet varchar(100)
    );

CREATE TABLE shelte(
	shelter_id int auto_increment primary key,
    shelter_nbr_of_staff int,
    shelter_nbr_of_pets int,
    shelter_nbr_max_of_pets int,
    shelter_size varchar(100),
    shelter_location varchar(100)
	);
        
    
INSERT INTO staff VALUES
(1, 'Sandy', 'sandy@pet.com', 'Budapest'),
(2, 'Mickeal', 'mickael@pet.com', 'Budapest'),
(3, 'Leo', 'leo@pet.com', 'Budapest'),
(4, 'Andrea', 'andrea@pet.com', 'Oslo'),
(5, 'Jojo', 'jojo@pet.com', 'Oslo'),
(6, 'Daisy', 'daisy@pet.com', 'Oslo'),
(7, 'Victor', 'victor@pet.com', 'New York'),
(8, 'Bethany', 'bethany@pet.com', 'New York'),
(9, 'Josh', 'josh@pet.com', 'New York'),
(10, 'Liam', 'liam@pet.com', 'Paris');

INSERT INTO shelte VALUES
(1, 3, 4, 10, 'Small', 'Oslo'),
(2, 18, 27, 50, 'Large', 'Budapest'),
(3, 8, 16, 20, 'Medium', 'London');

INSERT INTO pets VALUES
(1, 'Monica', 'Doggo', 'Dog', 11, 'Berries & Nuts'),
(2, 'Jerry', 'James', 'Tropical Fish', 1, 'Fish food'),
(3, 'Lilian', 'Honey', 'Horse', 18, 'Oats'),
(4, 'Tom', 'Cookie', 'Guinea Pig', 2, 'Pellets'),
(5, 'Henry', 'Emerald', 'Iguana', 7, 'Flies'),
(6, 'Andrew', 'Chucky', 'Cat', 15, 'Tuna'),
(7, 'Christopher', 'Skippy', 'Hamster', 3, 'Cereals'),
(8, 'Helene', 'Marlo', 'Cat', 4, 'Raw Tuna'),
(9, 'Jim', 'Zazu', 'Parrot', 86, 'Fruits'),
(10, 'Lucie', 'Nova', 'Dog', 10, 'Croquettes');

