CREATE TABLE `stu` ( 
    `sid` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `sname` varchar(20) NOT NULL, 
    `sage` int(11) NOT NULL, 
    `ssex` varchar(2) NOT NULL, 
    `stime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (`sid`) 
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


