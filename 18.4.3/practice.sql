--创建star表
create table star(
    id int auto_increment,
    name varchar(255),
    city_id int,
    createtime date,
    popularity float,
    primary key (id),
    foreign key (city_id) references city(id)
)engine=innodb default charset=utf8;


--创建city表
create table city(
    id int auto_increment,
    name varchar(255),
    position int,
    primary key (id)
)engine=innodb default charset=utf8; 

-- desc star;
--向city表中插入数据
insert into city values(1,'北京',1),(2,'广州',2),(3,'哈尔滨',1),(4,'三亚',2),(5,'大理',2),(6,'大连',1);

--向star表中插入数据
insert into star values(1,'小彩旗',5,'1999-01-24',0),(2,'刘诗诗',1,'1987-03-10',86),(3,'鹿晗',1,'1990-04-20',99.9),(4,'吴亦凡',2,'1990-11-06',93),
(5,'陈楚生',4,'1981-07-25',22.5),(6,'阚清子',3,'1980-04-15',50),(7,'董洁',6,'1980-04-19',-1);

delete from star;

select * from star;

desc star;

alter table star change createtime createtime date

--找到所有90后明星，按姓氏拼音A-Z排序
select * from star where createtime>'1990-01-01' order by convert(name using gbk);

--找到所有姓刘的明星
select * from star where name like '刘%';

--输出所有明星的名字、出生日期和所在城市
select s.name,s.createtime,c.name from star s,city c where s.city_id=c.id;

--找到所有北方城市的明星的个数
select count(*) from star s,city c where s.city_id=c.id and c.position=1;
 
select name from star;