create database myviralsong;

use myviralsong;

drop table users; 

CREATE TABLE Users (
  ID INT NOT NULL auto_increment unique,
  UserName VARCHAR(45) NOT NULL unique,
  dateofevent timestamp,
  PRIMARY KEY (ID)
  );


drop table songs;
CREATE TABLE Songs (
  ID INT NOT NULL auto_increment  PRIMARY KEY unique, 
  Title VARCHAR(45) NOT NULL,
  Artist VARCHAR(45) NOT NULL,
  Genre VARCHAR(45) NOT NULL,
  URL VARCHAR (100) DEFAULT NULL,
  Eventscode VARCHAR (45) NOT NULL REFERENCES Events (Eventscode)
  );
  
  drop table votes;
CREATE TABLE Votes (
   V_id int (45) not null auto_increment,
   Users_ID INT (45) NOT NULL REFERENCES Users (ID),
   EventsCode VARCHAR (100) NOT NULL REFERENCES Events (events),
   Songs_ID INT (45) NOT NULL REFERENCES Songs (ID),
   PRIMARY KEY (V_id, Users_ID, EventsCode, Songs_ID)

  );
  
 drop table events; 
 
  CREATE TABLE Events (
  EventsCode VARCHAR(45) NOT NULL,
  EventName VARCHAR(45) NOT NULL,
  EventDate timestamp,
  Users_ID INT (45) DEFAULT NULL REFERENCES Users (ID),
  PRIMARY KEY (EventsCode)

  );
  
-- EVENTS to delete old records every day  

												
select * from users;
DROP EVENT DeleteOldUsers;
show events;
select current_date;
show processlist;
    

delimiter // 
set global event_scheduler = ON; 
CREATE event DeleteOldEvents
 on schedule every 24 hour
 do
 begin
	if (SELECT * from Events WHERE EventDate < NOW() - INTERVAL 7 day) then 
    DELETE FROM events;
    end if;
    end;
// delimiter 

delimiter // 
set global event_scheduler = ON; 
CREATE event DeleteOldUsers
 on schedule every 24 hour
 do
 begin
	if (SELECT * from users WHERE DateofEvent < NOW() - INTERVAL 7 day) then 
    DELETE FROM users;
    end if;
    end;
// delimiter 
                                                         -- QUERIES

SELECT songs_id, EventsCode, COUNT(*) AS Uservotes
FROM votes where EventsCode = 2 group by EventsCode, songs_id;

select songs_id, EventsCode, COUNT(*) AS Uservotes 
FROM votes where EventsCode = 1 group by songs_id

select songs_id, EventsCode, COUNT(*) AS Uservotes 
FROM votes where EventsCode = 1 and songs_id = 1 group by songs_id




