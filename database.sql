-- MySQL dump 10.13  Distrib 5.7.10, for osx10.11 (x86_64)
--
-- Host: localhost    Database: db_southgate
-- ------------------------------------------------------
-- Server version	5.7.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sg_admin`
--

DROP TABLE IF EXISTS `sg_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) NOT NULL DEFAULT 'xinz' COMMENT 'name',
  `title` varchar(255) NOT NULL COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_admin`
--

LOCK TABLES `sg_admin` WRITE;
/*!40000 ALTER TABLE `sg_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `sg_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sg_attribute`
--

DROP TABLE IF EXISTS `sg_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_attribute` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '字段名',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '字段注释',
  `field` varchar(100) NOT NULL DEFAULT '' COMMENT '字段定义',
  `type` varchar(20) NOT NULL DEFAULT '' COMMENT '数据类型',
  `value` varchar(100) NOT NULL DEFAULT '' COMMENT '字段默认值',
  `remark` text NOT NULL COMMENT '备注',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示',
  `extra` varchar(255) NOT NULL DEFAULT '' COMMENT '参数',
  `model_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '模型id',
  `is_must` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否必填',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `validate_rule` varchar(255) NOT NULL DEFAULT '',
  `validate_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `error_info` varchar(100) NOT NULL DEFAULT '',
  `validate_type` varchar(25) NOT NULL DEFAULT '',
  `auto_rule` varchar(100) NOT NULL DEFAULT '',
  `auto_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `auto_type` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='模型属性表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_attribute`
--

LOCK TABLES `sg_attribute` WRITE;
/*!40000 ALTER TABLE `sg_attribute` DISABLE KEYS */;
INSERT INTO `sg_attribute` VALUES (1,'name','name','varchar(255) NOT NULL','string','xinz','',1,'',1,0,1,0,1473149107862,'',3,'','regex','',3,'function'),(2,'title','标题','varchar(255) NOT NULL','string','','',1,'',1,0,1,0,1473152872312,'',3,'','regex','',3,'function');
/*!40000 ALTER TABLE `sg_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sg_auth_role`
--

DROP TABLE IF EXISTS `sg_auth_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_auth_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(80) NOT NULL DEFAULT '' COMMENT '描述信息',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `rule_ids` varchar(255) DEFAULT '',
  `module` varchar(20) NOT NULL DEFAULT '' COMMENT '用户组所属模块',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '组类型',
  `sort` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_auth_role`
--

LOCK TABLES `sg_auth_role` WRITE;
/*!40000 ALTER TABLE `sg_auth_role` DISABLE KEYS */;
INSERT INTO `sg_auth_role` VALUES (1,'超级管理员组','超级管理员权限',1,'','',1,0);
/*!40000 ALTER TABLE `sg_auth_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sg_auth_rule`
--

DROP TABLE IF EXISTS `sg_auth_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_auth_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `desc` varchar(255) NOT NULL DEFAULT '',
  `pid` int(11) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `condition` varchar(255) DEFAULT '',
  `module` varchar(20) NOT NULL COMMENT '规则所属module',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1-url;2-主菜单',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_auth_rule`
--

LOCK TABLES `sg_auth_rule` WRITE;
/*!40000 ALTER TABLE `sg_auth_rule` DISABLE KEYS */;
/*!40000 ALTER TABLE `sg_auth_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sg_auth_user_role`
--

DROP TABLE IF EXISTS `sg_auth_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_auth_user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_auth_user_role`
--

LOCK TABLES `sg_auth_user_role` WRITE;
/*!40000 ALTER TABLE `sg_auth_user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `sg_auth_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sg_model`
--

DROP TABLE IF EXISTS `sg_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_model` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '模型ID',
  `name` char(30) NOT NULL COMMENT '模型标识',
  `title` char(30) NOT NULL COMMENT '模型名称',
  `need_pk` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否需要主键',
  `field_sort` text COMMENT '表单字段排序',
  `attribute_list` text COMMENT '表字段',
  `attribute_alias` varchar(255) NOT NULL DEFAULT '' COMMENT '表字段别名',
  `list_grid` text COMMENT '列表定',
  `list_row` smallint(2) unsigned NOT NULL DEFAULT '10' COMMENT '列表数据长度',
  `create_time` bigint(15) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(15) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `engine_type` varchar(25) NOT NULL DEFAULT 'MyISAM' COMMENT '数据库引擎',
  `relation` varchar(30) NOT NULL DEFAULT '' COMMENT '继承与被继承模型的关联字段',
  `extend` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '继承的模型',
  `field_group` varchar(255) NOT NULL DEFAULT '1:基础',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='模型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_model`
--

LOCK TABLES `sg_model` WRITE;
/*!40000 ALTER TABLE `sg_model` DISABLE KEYS */;
INSERT INTO `sg_model` VALUES (1,'admin','admin2',1,'{\"1\":[\"2\"],\"2\":[\"1\"]}','1,2','','',10,1473145360567,1473152986157,1,'MyISAM','',0,'1:基础,2:附加');
/*!40000 ALTER TABLE `sg_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sg_users`
--

DROP TABLE IF EXISTS `sg_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` char(16) NOT NULL COMMENT '用户名',
  `email` char(32) NOT NULL COMMENT '用户邮箱',
  `password` char(32) NOT NULL COMMENT '用户密码',
  `last_login_time` bigint(13) unsigned NOT NULL COMMENT '最后登录时间',
  `reg_time` bigint(13) unsigned NOT NULL COMMENT '注册时间',
  `last_login_ip` bigint(20) NOT NULL COMMENT '最后登录IP',
  `update_time` bigint(13) unsigned NOT NULL COMMENT '更新时间',
  `status` tinyint(4) NOT NULL COMMENT '用户状态0禁用，1启用，-1删除',
  `is_admin` tinyint(2) NOT NULL COMMENT '0普通用户 1超级管理',
  `groupid` tinyint(3) unsigned NOT NULL COMMENT '所属组',
  `mobile` char(15) NOT NULL COMMENT '用户手机',
  `login` int(10) unsigned NOT NULL COMMENT '登录次数',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`id`,`email`),
  UNIQUE KEY `username` (`id`,`username`),
  UNIQUE KEY `mobile` (`id`,`mobile`),
  UNIQUE KEY `status` (`id`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_users`
--

LOCK TABLES `sg_users` WRITE;
/*!40000 ALTER TABLE `sg_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `sg_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sg_users_group`
--

DROP TABLE IF EXISTS `sg_users_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sg_users_group` (
  `groupid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(15) NOT NULL,
  `issystem` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `icon` char(30) NOT NULL,
  `usernamecolor` char(7) NOT NULL,
  `description` char(100) NOT NULL,
  `sort` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`groupid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sg_users_group`
--

LOCK TABLES `sg_users_group` WRITE;
/*!40000 ALTER TABLE `sg_users_group` DISABLE KEYS */;
INSERT INTO `sg_users_group` VALUES (1,'管理员',0,'images/group/vip.jpg','red','',0,1);
/*!40000 ALTER TABLE `sg_users_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-18 13:53:59
