CREATE DATABASE if not exists shelter;
USE shelter;

DROP TABLE if exists staff;
DROP TABLE if exists pets;
DROP TABLE if exists shelter;
DROP TABLE if exists client;


CREATE TABLE shelter(
	shelter_id int auto_increment primary key,
    shelter_grade int,
    shelter_equipment varchar(100),
    shelter_nbr_max_of_pets int,
    shelter_size varchar(100),
    shelter_location varchar(100)
	);

CREATE TABLE client(
    client_id int auto_increment primary key,
    client_name varchar(100),
    client_email varchar(100),
    client_password varchar(100),
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
    pet_diet varchar(100),
    CONSTRAINT fk_owner FOREIGN KEY (pet_owner_id) REFERENCES client (client_id)
    );

CREATE TABLE stays_in(
    pet_id int,
    shelter_id int,
    CONSTRAINT fk_pet FOREIGN KEY (pet_id) REFERENCES pets (pet_id),
    CONSTRAINT fk_shelter_stays FOREIGN KEY (shelter_id) REFERENCES shelter (shelter_id)
    );
        

INSERT INTO shelter VALUES
(1, 3, "average", 11, 'Small', 'Oslo'),
(2, 5, "well equipped", 20, 'Large', 'Budapest'),
(3, 2, "minimum", 14, 'Medium', 'London'),
(4, 4, "good", 6, 'Very small', 'Paris');

INSERT into client VALUES
(1, 'Monica', 'monicalovesdog@gmail.com', 'Doggo11'),
(2, 'Jerry', "jerryholidays@gmail.com", 'mywife00'),
(3, 'Lilian', 'lilianwithtwol@gmail.com','nodonkeys101'),
(4, 'Sophie', 'sophie@gmail.com','SoLa1876'),
(5, 'Philippe', 'philippe@gmail.com', 'Philoulou02'),
(6, 'Edouard', 'edouard@gmail.com', 'Edouardgg407*'),
(7, 'Lara', 'lara@gmail.com', 'LALALA9'),
(8, 'Gigi', 'gigi@gmail.com', 'Gygy653'),
(9, 'Mickael', 'mickael@gmail.com', 'Micky111'),
(10, 'Jared', 'jared@gmail.com', 'HelloJared666'),
(11, 'Sonia', 'sonia@gmail.com', 'Ronaldo7')

    
INSERT INTO staff VALUES
(1, 'Sandy', 'sandy@pet.com', '9h-18h','Administration',1),
(2, 'Mickael', 'mickael@pet.com', '7h-16h','Pets care',1),
(3, 'Leo', 'leo@pet.com', '15h-22h','Pets care',1),
(4, 'Andrea', 'andrea@pet.com', '9h-18h','Administration',2),
(5, 'Jojo', 'jojo@pet.com', '7h-16h','Pets care',2),
(6, 'Daisy', 'daisy@pet.com', '15h-22h','Pets care',2),
(7, 'Victor', 'victor@pet.com', '9h-18h','Administration',3),
(8, 'Bethany', 'bethany@pet.com', '7h-16h','Pets care',3),
(9, 'Josh', 'josh@pet.com', '15h-22h','Pets care',3),
(10, 'Liam', 'liam@pet.com', '9h-18h','Administration',4),
(11, 'Sasha', 'sasha@pet.com', '7h-16h','Pets care',4),
(12, 'Leandre', 'leande@pet.com', '15h-22h','Pets care',4);

INSERT INTO pets VALUES
(1, 1, 'Doggo', 'Dog', 11, 'Berries & Nuts'),
(2, 2, 'James', 'Tropical Fish', 1, 'Fish food'),
(3, 2,'Honey', 'Horse', 18, 'Oats'),
(4, 3, 'Cookie', 'Guinea Pig', 2, 'Pellets'),
(5, 4, 'Emerald', 'Iguana', 7, 'Flies'),
(6, 4, 'Chucky', 'Cat', 15, 'Tuna'),
(7, 4, 'Skippy', 'Hamster', 3, 'Cereals'),
(8, 5, 'Marlo', 'Cat', 4, 'Raw Tuna'),
(9, 6, 'Zazu', 'Parrot', 86, 'Fruits'),
(10, 6, 'Nova', 'Dog', 10, 'Croquettes'),
(11, 7, 'Suzie', 'Horse', 8, 'Oats'),
(12, 7, 'Moly', 'Cat', 2, 'Raw Tuna'),
(13, 8, 'Kiki', 'lizard', 8, 'bugs'),
(14, 9, 'Lonie', 'spider' 3, 'bugs'),
(15, 10, 'Tatou', 'dog', 8, 'croquettes'),
(16, 11, 'Pinette', 'dog', 6, 'croquettes'),

--INSERT INTO stays_in VALUES
...


