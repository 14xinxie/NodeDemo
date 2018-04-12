--统计南北方明星的个数和南北方明星的平均受欢迎程度
--case when根据字段值取不同的别名
--group　by按position分组
--as 给列取别名
select case position 
when 2 then '南方'
else '北方'
end as dir,count(*),avg(s.popularity) from city c,star s where s.city_id=c.id group by position;

--分南北方城市输出明星的名字
--group_concat():函数的值等于属于一个组的指定列的所有值，以逗号隔开，并且以字符串表示。
select case position 
when 2 then '南方'
else '北方'
end as dir,group_concat(s.name) as starName from city c,star s where s.city_id=c.id group by dir;

--分别选出南北方明星中热度最高的前２名并按热度排序
--先分别选出南方和北方的热度最高的前两名
--然后再利用union将两者的结果集合并
--最后再在合并的结果集中根据热度排序　order by popularity
select * from(
(select s.* from star s,city c where s.city_id=c.id and c.position=1 order by s.popularity desc limit 0,2)
union (select s1.* from star s1,city c1 where s1.city_id=c1.id and c1.position=2 order by s1.popularity desc limit 0,2)) as table1
order by table1.popularity desc;


--查询用户的总数量，帖子的总数量，评论的总数量
select count(*) as '用户总数量' from tbl_user;

select count(*) as '帖子总数量' from tbl_posts;

select count(*) as '评论总数量' from tbl_posts_comments;

--查询用户表中的所有数据
select * from tbl_user;

--查询用户表中第二条到第五条数据
select * from tbl_user limit 1,4;

--查询用户表中所有数据的姓名、性别信息
select uName,uSex from tbl_user;

--查询用户中积分的最高值
select max(uPoints) from tbl_user;

--根据用户的分类不同查询每种类型的平均积分
select uType as '用户类型',avg(uPoints) as '平均积分' from tbl_user group by uType; 

--不用mysql的max函数，查询积分最高的积分值
select uPoints as '最高积分' from tbl_user where uPoints not in
(select A.uPoints from tbl_user A,tbl_user B where A.uPoints<B.uPoints)


--查询每种类型用户的平均积分和最高积分
select uType as '用户类型',avg(uPoints) as '平均积分',max(uPoints) as '最高积分' from tbl_user group by uType;

--计算用户积分的总和和平均值
select sum(uPoints) as '总积分',avg(uPoints) as '平均积分' from tbl_user;

--临时表实现查询积分最高的用户信息

select * from (select max(uPoints) maxPoint from tbl_user) as temp,tbl_user u where u.uPoints=temp.maxPoint;

--查询哪些用户的积分在平均值以上
select * from tbl_user where uPoints>(select avg(uPoints) from tbl_user);

--查询积分在100以上或者性别为女的用户
select * from tbl_user where uPoints>100 or uSex='女';

--查询最新发布的帖子
select * from tbl_posts where pCreateTime=(select max(pCreateTime) from tbl_posts);

--查询所有帖子（帖子标题、内容、作者姓名）
select pTitle as '标题',pContent as '内容',u.uName as '作者' from tbl_user u,tbl_posts p where u.uId=p.uId; 

--查询某个用户最近发布的十条帖子并按照createTime倒序排序
select * from tbl_user u,tbl_posts p where u.uId=p.uId and u.uName='张三' order by pCreateTime desc limit 0,10;

--查询uid=1和uid=2两个人发布的帖子
select * from tbl_user u,tbl_posts p where u.uId=p.uId and u.uId in (1,2);

--查询在2018-03-19~2018-05-16时间段内发布的帖子
select * from tbl_posts where pCreateTime>'2018-03-19' and pCreateTime<'2018-05-16';


