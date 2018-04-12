--创建数据库test
create database test;

--创建用户表
use test;
create table tbl_user(
    uId int not null auto_increment, --用户Id
    uName varchar(20) not null, --用户姓名
    uAge int not null,  --用户年龄
    uPhone varchar(11) not null,    --用户手机号
    uPoints int not null,   --用户积分
    uType int not null, --用户类型
    primary key (uId)
)engine=innodb default charset=utf8;

--创建帖子表
use test;
create table tbl_posts(
    pId int not null auto_increment,    --帖子Id
    pTitle varchar(20) not null,    --帖子标题
    pContent text not null, --帖子内容
    pCreateTime datetime not null default now(),    --帖子发布时间
    pUpdateTime datetime not null default now(),    --帖子更新时间
    uId int not null,   --发布帖子的用户Id
    primary key (pId),
    foreign key (uId) references tbl_user(uId)
)engine=innodb default charset=utf8;

--创建评论表
use test;
create table tbl_posts_comments(
    pcId int not null,  --评论记录Id
    pcContent text not null,    --评论内容
    pcCreateTime datetime not null default now(), --发表评论的时间
    pc_uId int not null,    --发表评论的用户的Id
    pc_pId int not null,    --评论的帖子的Id
    primary key (pcId),
    foreign key (pc_uId) references tbl_user(uId),
    foreign key (pc_pId) references tbl_posts(pId)
)engine=innodb default charset=utf8;

--创建帖子＠用户表
use test;
create table tbl_at_user(
    auId int not null, --帖子＠用户的记录Id
    au_uId int not null,    --帖子＠的用户的Id
    au_pId int not null,    --＠用户的帖子的Id
    primary key (auId),
    foreign key (au_uId) references tbl_user(uId),
    foreign key (au_pId) references tbl_posts(pId)
)engine=innodb default charset=utf8;
