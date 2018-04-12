-- select * from stu;

-- select * from stu where sid=2;

-- select sid,sname,sage from stu where sage>20;


-- select * from stu where sage>18 and ssex='女';

--嵌套查询
select * from stu where sid in (select sid from stu where sage>18 );
