--查询某条帖子的所有评论(评论信息中需有评论者及被评论者信息)
use test;
select p.pId as '帖子Id',p.pTitle as '帖子标题',p.pContent as '帖子内容',(select uName from tbl_user where uId=
(select uId from tbl_posts where pId=1)) as '帖子发布者',u.uName as '评论者',pc.pcContent as '评论内容',
pc.pcCreateTime as '评论时间' from tbl_posts p left join tbl_posts_comments pc on p.pId=pc.pc_pId left join tbl_user u on pc.pc_uId=u.uId where p.pId=1;

--查询评论数最多的帖子
use test;
select p.*,count(*) as '评论数' from tbl_posts_comments pc,tbl_posts p where pc.pc_pId=p.pId group by pc.pc_pId having count(pc.pc_pId)=(select max(mycount) from 
(select count(pc_pId) mycount from tbl_posts_comments group by pc_pId) as tb);

--查询uId=1或者uId=2两个用户评论过的帖子
use test;
select * from tbl_posts where pId in (select pc_pId from tbl_posts_comments where pc_uId=1 or pc_uId=2);

--查询帖子并按照updatetime倒序排序（带有帖子作者和＠用户的id）
use test;
select p.pId as '帖子Id',p.pTitle as '帖子标题',p.pContent as '帖子内容',p.pCreateTime as '帖子创建时间',
p.pUpdateTime as '帖子更新时间',p.uId as '帖子作者的id',au.au_uId as '@用户的id' from tbl_posts p left join tbl_user u on p.uId=u.uId left join tbl_at_user au on p.pId=au.au_pId order by p.pUpdateTime desc;

--查询帖子并按照updatetime倒序排序（带有帖子作者信息和＠用户的id）
use test;
select p.*,u.*,au.au_uId as '@用户的id' from tbl_posts p left join tbl_user u on p.uId=u.uId left join tbl_at_user au on p.pId=au.au_pId order by p.pUpdateTime desc;

--查询帖子并按照updatetime倒序排序
use test;
select p.pId as '帖子Id',p.pTitle as '帖子标题',p.pContent as '帖子内容',p.pUpdateTime as '帖子更新时间',
group_concat(pc.pcContent) as '评论信息',group_concat(u.uName) as '评论者'
from tbl_posts p left join tbl_posts_comments pc on pc.pc_pId=p.pId left join tbl_user u on pc.pc_uId=u.uId group by p.pId order by p.pUpdateTime desc;  


--查询帖子标题中含有‘英雄’字符的所有帖子
use test;
select * from tbl_posts where pTitle like '%英雄%';

--查询某个帖子的所有评论信息（包括评论者的信息）
use test;
select p.pId as '帖子Id',p.pTitle as '帖子标题',p.pContent as '帖子内容',(select uName from tbl_user where uId=
(select uId from tbl_posts where pId=5)) as '帖子发布者',u.uName as '评论者',pc.pcContent as '评论内容',
pc.pcCreateTime as '评论时间' from tbl_posts p left join tbl_posts_comments pc on p.pId=pc.pc_pId left join tbl_user u on pc.pc_uId=u.uId where p.pId=5;

--查询某个用户的最近评论的情况，按createtime倒序排序（包括评论的内容和帖子的信息）
use test;
select u.uId as '评论者id',u.uName as '评论者姓名',pc.pcContent as '评论内容',pc.pcCreateTime as '评论时间',p.pTitle as '评论的帖子标题',p.pContent as '评论的帖子内容'
from tbl_user u left join tbl_posts_comments pc on u.uId=pc.pc_uId left join tbl_posts p on p.pId=pc.pc_pId
where u.uId=2 order by pc.pcCreateTime desc;

--使用子查询，查询发表过帖子的用户信息
use test;
select * from tbl_user u where u.uId in (select uId from tbl_posts) 


--查询发表的帖子的数量最多的三个用户（发表帖子的数量，用户信息）
use test;
select *,count(*) as '发帖数量' from tbl_posts group by uId order by count(*) desc limit 0,3; 

-----------test1数据库
--查询出某用户最新发布的十条动态并按时间倒序排列。
use test1;
select * from tbl_dynamic where uId=1 order by dCreateTime desc limit 0,10;

--查询出某条动态所有评论（评论信息中需要有评论者及被评论者信息）
use test1;
select d.dId as '动态Id',d.dContent as '动态内容',(select uName from tbl_user where 
uId=(select uId from tbl_dynamic where dId=1)) as '动态发布者',u.uName as '评论者',c.cContent as '评论内容',
c.cCreateTime as '评论时间' from tbl_dynamic d left join tbl_comment c on d.dId=c.dId left join tbl_user u on c.uId=u.uId where d.dId=1; 

--创建触发器，实现每插入（删除）一条评论，该评论对应的动态的评论数自动加１（减１）

--插入评论的触发器
use test1;
SHOW TRIGGERS;
create trigger tri_comment_insert after insert on tbl_comment for each row
begin
    update tbl_dynamic set comment_num=comment_num+1 where dId=new.dId;
end

--删除评论的触发器
use test1;
create trigger tri_comment_delete after delete on tbl_comment for each row
begin
    update tbl_dynamic set comment_num=comment_num-1 where dId=old.dId;
end


--查询出某段时间内每天各类用户发布动态的数量及所有用户发布动态的数量
use test1;
select date_format(d.dCreateTime,'%Y-%m-%d') as 'days',count(*) as 'total',
sum(case when u.uType=1 then 1 else 0 end) as 'type1',
sum(case when u.uType=2 then 1 else 0 end) as 'type2',
sum(case when u.uType=3 then 1 else 0 end) as 'type3'
from tbl_dynamic d left join tbl_user u on d.uId=u.uId where dCreateTime>'2018-2-13' and dCreateTime<'2018-5-1' 
group by d.dCreateTime order by d.dCreateTime 

--创建存储过程（接受两个时间参数）,统计在该时间段内每天发布动态的人数
create procedure count_number(in startTime datetime,endTime datetime)
begin
    use test1;
    select date_format(dCreateTime,'%Y-%m-%d') as 'days',count(distinct uId) as 'total' from tbl_dynamic where dCreateTime>startTime and dCreateTime<endTime group by dCreateTime
end
