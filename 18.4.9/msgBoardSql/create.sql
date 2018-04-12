--创建数据库msgBoard
create database msgBoard;

--创建用户表
use msgBoard;
create table user(
    id int not null auto_increment,
    username varchar(20) not null,
    password varchar(20) not null,
    primary key (id)
)engine=innodb default charset=utf8;


use msgBoard;
drop table infs;
--
