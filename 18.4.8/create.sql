--创建数据库test1
create database test1;

--创建用户表tbl_user
use test1;
create table tbl_user(
    uId int not null auto_increment,
    uName varchar(20) not null,
    uAge int not null,
    uPhone varchar(11) not null,
    uPoints int not null,
    uType int not null,
    primary key (uId)
)engine=innodb default charset=utf8;

--创建动态表tbl_dynamic
use test1;
create table tbl_dynamic(
    dId int not null auto_increment,
    dContent text not null,
    uId int not null,
    dCreateTime datetime not null default now(),
    comment_num int not null default 0,
    primary key (dId)
)engine=innodb default charset=utf8;

--创建评论表tbl_comment
use test1;
create table tbl_comment(
    cId int not null auto_increment,
    cContent text not null,
    cCreateTime datetime not null default now(),
    uId int not null,
    dId int not null,
    primary key (cId),
    foreign key (dId) references tbl_dynamic(dId),
    foreign key (uId) references tbl_user(uId)
)engine=innodb default charset=utf8;

use test1;
desc tbl_comment;
drop table tbl_comment;
drop table tbl_dynamic;
show create table tbl_user;