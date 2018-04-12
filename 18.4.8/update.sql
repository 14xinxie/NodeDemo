--把用户表中points值在[20,29]区间内的修改为20
use test;
update tbl_user set uPoints=20 where uPoints>=20 and uPoints<=29;

use test;
select * from tbl_user;