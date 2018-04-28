create database oa_manager;
use oa_manager;
drop database oa_manager;

use oa_manager;
desc tbl_product;
insert into tbl_product_category values
(1,'hr'),(2,'saray');
use oa_manager;
select * from tbl_product;
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