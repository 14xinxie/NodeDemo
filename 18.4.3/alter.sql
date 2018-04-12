--增加stime这一列，类型为datetime,默认值为now()
alter table stu add stime datetime not null default now();

--修改表名
alter table student rename stu;

