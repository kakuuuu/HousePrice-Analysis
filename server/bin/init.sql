create table house (title char(20),number char(20),unit char(20),info char(40),city char(20),lng double,lat double);
create table encryption (setkey char(20) primary key);
insert into encryption(setkey) values("npAKRjiG");
create table users (user char(20),pwd char(20));
insert into users (user,pwd) values("admin","admin123");