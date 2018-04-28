create database oa_manager;
use oa_manager;
drop database oa_manager;

use oa_manager;
SELECT `Product`.`id`, `Product`.`name`, `Product`.`desc`, `Product`.`url`, `Product`.`category_id` AS `categoryId`, `Product`.`tip`, `Product`.`net_segment` AS `netSegment`, `Product`.`sort_id` AS `sortId`, `Product`.`icon_id` AS `iconId`, `Product`.`category_id`, `Category`.`id` AS `Category.id`, `Category`.`name` AS `Category.name` FROM `tbl_product` AS `Product` LEFT OUTER JOIN `tbl_product_category` AS `Category` ON `Product`.`category_id` = `Category`.`id` LIMIT 0, 10;
desc tbl_product;
insert into tbl_product_category values
(1,'hr'),(2,'saray');
use oa_manager;
select * from tbl_product group by category_id;
insert into tbl_product values
(1,'oa1','this is oa1','http://www.baidu.com',1,'attention1','inside',2,1),
(2,'oa2','this is oa2','http://www.baidu.com',2,'attention1','inside',1,1),
(3,'oa3','this is oa3','http://www.baidu.com',1,'attention1','inside',3,1),
(4,'oa4','this is oa4','http://www.baidu.com',2,'attention1','inside',3,1),
(5,'oa5','this is oa5','http://www.baidu.com',1,'attention1','inside',1,1),
(6,'oa6','this is oa6','http://www.baidu.com',2,'attention1','inside',2,1);

desc tbl_product;
desc tbl_product_category;
show create table tbl_product_category;