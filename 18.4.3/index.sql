--查看表的索引信息
show index from stu;

--添加索引
alter table stu add index index_title(ssex); 
--查看sql语句中使用索引的情况
--低效，在where子句中使用or来连接条件，这样会导致引擎放弃使用索引而进行全表扫描
explain select count(*) from stu where ssex='男' or sage>18;

--高效
explain select * from stu where ssex='男' union all select * from stu where sage>18;

select * from stu;

