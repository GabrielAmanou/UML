CREATE DATABASE if not exists shelter;
USE shelter;

DROP TABLE if exists staff;
DROP TABLE if exists stays_in;
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
    role varchar(100)
    );

CREATE TABLE staff ( 
    staff_id int auto_increment primary key,
    user_name varchar(100) unique,
    staff_email varchar(100) unique,
    staff_working_hours varchar(100),
    staff_task varchar(100),
    staff_shelter int,
    staff_password varchar(100),
    role varchar(100),
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
    CONSTRAINT fk_pet FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE,
    CONSTRAINT fk_shelter_stays FOREIGN KEY (shelter_id) REFERENCES shelter (shelter_id) ON DELETE CASCADE
    );
        

INSERT INTO shelter VALUES
(1, 3, "average", 11, 'Small', 'Oslo'),
(2, 5, "well equipped", 20, 'Large', 'Budapest'),
(3, 2, "minimum", 14, 'Medium', 'London'),
(4, 4, "good", 6, 'Very small', 'Paris');

INSERT into client VALUES
(1, 'Monica', 'monicalovesdog@gmail.com', 'Doggo11','CLIENT'),
(2, 'Jerry', "jerryholidays@gmail.com", 'mywife00','CLIENT'),
(3, 'Lilian', 'lilianwithtwol@gmail.com','nodonkeys101','CLIENT'),
(4, 'Sophie', 'sophie@gmail.com','SoLa1876','CLIENT'),
(5, 'Philippe', 'philippe@gmail.com', 'Philoulou02','CLIENT'),
(6, 'Edouard', 'edouard@gmail.com', 'Edouardgg407*','CLIENT'),
(7, 'Lara', 'lara@gmail.com', 'LALALA9','CLIENT'),
(8, 'Gigi', 'gigi@gmail.com', 'Gygy653','CLIENT'),
(9, 'Mickael', 'mickael@gmail.com', 'Micky111','CLIENT'),
(10, 'Jared', 'jared@gmail.com', 'HelloJared666','CLIENT'),
(11, 'Sonia', 'sonia@gmail.com', 'Ronaldo7','CLIENT'),
(12, 'gab', 'gab', 'gab', 'CLIENT');

    
INSERT INTO staff VALUES
(1, 'Sandy', 'sandy@pet.com', '9h-18h','Administration',1,'Sansy05','ADMIN'),
(2, 'Mickael', 'mickael@pet.com', '7h-16h','Pets care',1,'Micka','ADMIN'),
(3, 'Leo', 'leo@pet.com', '15h-22h','Pets care',1,'LeoTOTO','ADMIN'),
(4, 'Andrea', 'andrea@pet.com', '9h-18h','Administration',2,'ANDRE666','ADMIN'),
(5, 'Jojo', 'jojo@pet.com', '7h-16h','Pets care',2,'JOJOJOJO','ADMIN'),
(6, 'Daisy', 'daisy@pet.com', '15h-22h','Pets care',2,'DAISYDAISY','ADMIN'),
(7, 'Victor', 'victor@pet.com', '9h-18h','Administration',3,'VICOELCHICO','ADMIN'),
(8, 'Bethany', 'bethany@pet.com', '7h-16h','Pets care',3,'Bethany999','ADMIN'),
(9, 'Josh', 'josh@pet.com', '15h-22h','Pets care',3,'Joshattack','ADMIN'),
(10, 'Liam', 'liam@pet.com', '9h-18h','Administration',4,'Liammail','ADMIN'),
(11, 'Sasha', 'sasha@pet.com', '7h-16h','Pets care',4,'Sash81','ADMIN'),
(12, 'Leandre', 'leande@pet.com', '15h-22h','Pets care',4,'LEANDREOK','ADMIN'),
(13, 'gab', 'gab@pet.com', '15h-22h', 'Administration', 1, 'gab','ADMIN');

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
(14, 9, 'Lonie', 'spider', 3, 'bugs'),
(15, 10, 'Tatou', 'dog', 8, 'croquettes'),
(16, 11, 'Pinette', 'dog', 6, 'croquettes');

INSERT INTO stays_in VALUES
(1,1),
(2,1),
(3,1),
(4,2),
(5,2),
(6,2),
(7,2),
(8,2),
(9,2),
(10,2),
(11,3),
(12,3),
(13,3),
(14,3),
(15,4),
(16,4);

/*SELECT pets.pet_id, pet_owner_id, pet_name, pet_specie, pet_diet, shelter_location FROM pets INNER JOIN stays_in ON pets.pet_id = stays_in.pet_id INNER JOIN shelter ON stays_in.shelter_id = shelter.shelter_id
*/	





