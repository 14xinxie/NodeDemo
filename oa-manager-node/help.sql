drop database oa_manager;
create database oa_manager;
use oa_manager;
-- 更改数据库的编码为utf-8
alter database oa_manager character set utf8;
desc tbl_product_category;

select * from tbl_product_category;
SELECT `id`, `account`, `password`, `nick_name` AS `nickName`, `role` FROM `tbl_user` AS `User` WHERE `User`.`account` = 'aaa' AND `User`.`password` = '123' LIMIT 1;
use oa_manager;
insert into tbl_user values(1,'Admin123','Admin123','管理员','18720931185',1);

use oa_manager;
desc tbl_user;
select * from tbl_user;
drop database oa_manager;

use oa_manager;
desc tbl_product;
SELECT `Product`.`id`, `Product`.`name`, `Product`.`desc`, `Product`.`url`, `Product`.`category_id` AS `categoryId`, `Product`.`tip`, `Product`.`net_segment` AS `netSegment`, `Product`.`sort_id` AS `sortId`, `Product`.`icon_id` AS `iconId`, `Product`.`category_id`, `Category`.`id` AS `Category.id`, `Category`.`name` AS `Category.name` FROM `tbl_product` AS `Product` LEFT OUTER JOIN `tbl_product_category` AS `Category` ON `Product`.`category_id` = `Category`.`id` LIMIT 0, 10;


use oa_manager;
select * from tbl_log;
select * from tbl_category;
insert into tbl_category values
(1,'hr',1),(2,'saray',2);
use oa_manager;
select * from tbl_product ;
insert into tbl_product values
(1,'oa1','this is oa1','http://www.baidu.com',1,'attention1','inside',2,1),
(2,'oa2','this is oa2','http://www.baidu.com',2,'attention1','inside',1,1),
(3,'oa3','this is oa3','http://www.baidu.com',1,'attention1','inside',3,1),
(4,'oa4','this is oa4','http://www.baidu.com',2,'attention1','inside',3,1),
(5,'oa5','this is oa5','http://www.baidu.com',1,'attention1','inside',1,1),
(6,'oa6','this is oa6','http://www.baidu.com',2,'attention1','inside',2,1);

desc tbl_product;
desc tbl_product_category;
use oa_manager;

show create table tbl_product;