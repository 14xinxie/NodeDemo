--查询当前数据库中的视图
SHOW FULL TABLES IN user WHERE TABLE_TYPE LIKE 'VIEW';

--创建视图queryUser
create view queryUser as
select sid,sname from stu;