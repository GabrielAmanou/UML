CREATE DATABASE if not exists shelter;
USE shelter;

DROP TABLE if exists staff;
DROP TABLE if exists pets;
DROP TABLE if exists shelter;
DROP TABLE if exists client;

CREATE TABLE client(
    client_id int auto_increment primary key,
    client_name varchar(100),
    client_email varchar(100),
    client_password varchar(100),
    client_nbr_of_pets int
);

CREATE TABLE shelter(
	shelter_id int auto_increment primary key,
    shelter_nbr_of_staff int,
    shelter_nbr_of_pets int,
    shelter_nbr_max_of_pets int,
    shelter_size varchar(100),
    shelter_location varchar(100)
	);

CREATE TABLE staff ( 
    staff_id int auto_increment primary key,
    staff_name varchar(100) unique,
    staff_email varchar(100) unique,
    staff_working_hours varchar(100),
    staff_task varchar(100),
    staff_shelter int,
    CONSTRAINT fk_shelter FOREIGN KEY (staff_shelter) REFERENCES shelter (shelter_id)
);

CREATE TABLE pets(
	pet_id int auto_increment primary key,
    pet_owner_id int,
	pet_name varchar(100),
    pet_specie varchar(100),
    pet_age int,
    pet_diet varchar(100)
    CONSTRAINT fk_owner FOREIGN KEY (pet_owner_id) REFERENCES client (client_id)
    );

CREATE TABLE stays_in(
    pet_id int,
    shelter_id int,
    CONSTRAINT fk_pet FOREIGN KEY (pet_id) REFERENCES pets (pet_id),
    CONSTRAINT fk_shelter_stays FOREIGN KEY (shelter_id) REFERENCES shelter (shelter_id)
);
        
    
/*INSERT INTO staff VALUES
(1, 'Sandy', 'sandy@pet.com', '9h-18h','Administration'),
(2, 'Mickeal', 'mickael@pet.com', '7h-16h','Pets care'),
(3, 'Leo', 'leo@pet.com', '15h-22h','Pets care'),
(4, 'Andrea', 'andrea@pet.com', '9h-18h','Administration'),
(5, 'Jojo', 'jojo@pet.com', '7h-16h','Pets care'),
(6, 'Daisy', 'daisy@pet.com', '15h-22h','Pets care'),
(7, 'Victor', 'victor@pet.com', '9h-18h','Administration'),
(8, 'Bethany', 'bethany@pet.com', '7h-16h','Pets care'),
(9, 'Josh', 'josh@pet.com', '15h-22h','Pets care'),
(10, 'Liam', 'liam@pet.com', '9h-18h','Administration'),
(11, 'Sasha', 'sasha@pet.com', '7h-16h','Pets care'),
(12, 'Leandre', 'leande@pet.com', '15h-22h','Pets care');

INSERT INTO shelte VALUES
(1, 3, 4, 10, 'Small', 'Oslo'),
(2, 3, 27, 20, 'Large', 'Budapest'),
(3, 3, 16, 15, 'Medium', 'London'),
(4, 3, 9, 6, 'Very small', 'Paris');


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

