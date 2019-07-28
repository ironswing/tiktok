-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: douyin
-- ------------------------------------------------------
-- Server version	5.7.24

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned NOT NULL COMMENT '视频id',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '评论的用户id',
  `reply_comment_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '回复的评论ID,0表示非回复',
  `content` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '评论内容',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '状态,1:正常,0:删除',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_video_id_index` (`video_id`),
  KEY `comments_user_id_index` (`user_id`),
  KEY `comments_reply_comment_id_index` (`reply_comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,2,2,0,'爱是迷迷糊糊的滋味',1,'2019-07-15 14:46:41','2019-07-15 14:46:41'),(2,2,1,0,'爱过的人不后悔',1,'2019-07-15 14:47:36','2019-07-15 14:47:36'),(3,1,1,0,'test',1,'2019-07-16 15:49:06','2019-07-16 15:49:06'),(4,5,1,0,'你仿佛喜爱奔袭牛羚  跑过我一点一点的脑区  叫我见高山沟壑皆是平   早安  孤独小美  格致别趣  六点起床第853天 迟到84天',1,'2019-07-16 16:26:19','2019-07-16 16:26:19'),(5,5,3,0,'铿锵',1,'2019-07-17 01:20:28','2019-07-17 01:20:28'),(6,5,2,0,'路过',1,'2019-07-17 02:02:48','2019-07-17 02:02:48'),(7,7,4,0,'还不错哟',1,'2019-07-17 02:17:14','2019-07-17 02:17:14'),(8,8,5,0,'123',1,'2019-07-21 01:05:08','2019-07-21 01:05:08');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `followers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '用户id',
  `follower_id` int(10) unsigned NOT NULL COMMENT '粉丝的用户ID',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '关注的状态,1关注,2取关',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `followers_user_id_follower_id_unique` (`user_id`,`follower_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,2,1,1,'2019-07-15 14:49:58','2019-07-15 14:49:58'),(2,1,2,1,'2019-07-16 16:27:33','2019-07-16 16:27:33'),(6,1,3,1,'2019-07-17 00:24:29','2019-07-17 00:24:29'),(7,2,3,1,'2019-07-17 00:45:46','2019-07-17 00:45:46'),(8,2,4,1,'2019-07-17 02:14:38','2019-07-17 02:14:38'),(9,4,5,1,'2019-07-19 02:37:32','2019-07-19 02:37:32');
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_05_07_205010_create_comments_table',1),(4,'2019_05_08_001434_create_thumb_table',2),(5,'2019_05_08_001434_create_videos_table',2),(6,'2019_06_25_174706_create_followers_table',2),(7,'2019_07_26_211320_create_note_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '便签的作者ID',
  `content` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '便签内容',
  `offset_x` int(10) NOT NULL DEFAULT '9' COMMENT 'x 偏移',
  `offset_y` int(10) NOT NULL DEFAULT '9' COMMENT 'y 偏移',
  `status` int(10) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (6,1,'哈哈哈',9,9,0,'2019-07-28 03:59:43','2019-07-28 07:56:19'),(13,1,'便签2',177,152,0,'2019-07-28 06:31:52','2019-07-28 07:55:35'),(14,1,'托尔斯泰',175,329,1,'2019-07-28 06:35:15','2019-07-28 06:35:15'),(15,1,'Hover.css是一套使用CSS3动画实现的Hover特效集锦，包含了：\n\n2D变形\n边框过渡效果\n阴影过渡效果\n页脚翻转效果',95,302,0,'2019-07-28 06:39:52','2019-07-28 07:53:09'),(16,1,'便签测试',161,497,1,'2019-07-28 06:46:44','2019-07-28 06:46:44'),(17,1,'哈哈哈哈哈哈哈',132,182,0,'2019-07-28 07:57:50','2019-07-28 07:57:56');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `password_resets_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thumbs`
--

DROP TABLE IF EXISTS `thumbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thumbs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '点赞的用户ID',
  `video_id` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '视频的ID',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '状态,1:点赞,0:取消点赞',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `thumbs_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thumbs`
--

LOCK TABLES `thumbs` WRITE;
/*!40000 ALTER TABLE `thumbs` DISABLE KEYS */;
INSERT INTO `thumbs` VALUES (1,1,'5',1,'2019-07-16 02:48:29','2019-07-16 02:48:29'),(2,1,'4',1,'2019-07-16 02:48:43','2019-07-16 02:48:43'),(3,1,'1',1,'2019-07-16 15:48:50','2019-07-16 15:48:50'),(4,3,'1',1,'2019-07-17 00:38:44','2019-07-17 00:38:44'),(5,2,'5',1,'2019-07-17 02:10:03','2019-07-17 02:10:03'),(6,4,'3',1,'2019-07-17 02:14:24','2019-07-17 02:14:24'),(7,4,'7',1,'2019-07-17 02:17:23','2019-07-17 02:17:23'),(8,4,'5',1,'2019-07-17 03:05:53','2019-07-17 03:05:53'),(9,3,'7',1,'2019-07-18 23:17:24','2019-07-18 23:17:24'),(10,3,'5',0,'2019-07-18 23:42:54','2019-07-18 23:42:54'),(11,2,'1',0,'2019-07-19 01:58:56','2019-07-19 01:58:56'),(12,2,'3',0,'2019-07-19 02:21:31','2019-07-19 02:21:31'),(13,5,'7',1,'2019-07-19 02:37:23','2019-07-19 02:37:23'),(14,5,'6',1,'2019-07-19 03:15:11','2019-07-19 03:15:11'),(15,3,'8',0,'2019-07-20 11:19:07','2019-07-20 11:19:07'),(16,1,'8',0,'2019-07-20 17:54:03','2019-07-20 17:54:03'),(17,5,'8',1,'2019-07-21 01:04:46','2019-07-21 01:04:46'),(18,5,'5',1,'2019-07-21 01:06:20','2019-07-21 01:06:20'),(19,1,'6',1,'2019-07-22 02:39:34','2019-07-22 02:39:34'),(20,1,'2',1,'2019-07-22 09:31:09','2019-07-22 09:31:09');
/*!40000 ALTER TABLE `thumbs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `signature` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '个性签名',
  `avatar` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.jpg' COMMENT '头像',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '状态,1:正常,0:删除,2:封禁',
  `background_image` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.jpg' COMMENT '主页背景图',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'anshi','123456','ok@163.com','暂无吧','/images/20190715/259b8b25062f079ebfaf3ccbc2105402.jpeg',1,'/images/20190727/e2f4ea4026de2c91166b5c1480db3f9e.jpeg',NULL,'2019-07-27 10:26:00'),(2,'test2','123456','as@qq.com','','default.jpg',1,'default.jpg',NULL,NULL),(3,'test3','123456','test3@qq.com','','default.jpg',1,'default.jpg',NULL,NULL),(4,'1288','A15841639880','4258','高考题楼咯无咯木我','/images/20190717/00750e3ac5477137c6736f92cb25e60c.jpeg',1,'default.jpg',NULL,'2019-07-17 02:34:07'),(5,'123','123','123','456','/images/20190719/87a4e9256022ec7306334e804e9d8280.jpeg',1,'default.jpg',NULL,'2019-07-19 04:22:32'),(6,'test3','1234','1234','','default.jpg',1,'default.jpg',NULL,NULL),(7,'test3','1111','11111','','default.jpg',1,'default.jpg',NULL,NULL),(8,'123','123','123456','','default.jpg',1,'default.jpg',NULL,NULL),(9,'1234','1234','159','','default.jpg',1,'default.jpg',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '视频的用户id',
  `title` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '视频的标题',
  `path` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '视频的路径',
  `poster` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.poster.jpg' COMMENT '视频的封面',
  `thumbs` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点赞数',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '状态,1:正常,0:删除',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `videos_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,1,'test','/videos/20190715/0f54b3d0c6f47ab341655e4eebda36a1.mp4','/images/20190715/c9ae79eaaf75e4400b6635937b25b7c2.jpeg',0,1,'2019-07-15 13:50:50','2019-07-15 13:50:50'),(2,1,'test','/videos/20190715/c2abb8617bae32b0df3057a377dc526b.mp4','/images/20190715/19339c6d0290b27e52769579612036a6.jpeg',0,1,'2019-07-15 14:14:08','2019-07-15 14:14:08'),(3,2,'test2 publish','/videos/20190715/257c02eff3901313de65682b5a0f53d9.mp4','/images/20190715/e9a548d0396e2b9adbf4c2f254d9a8c8.jpeg',0,1,'2019-07-15 14:52:26','2019-07-15 14:52:26'),(4,1,'test1','/videos/20190716/12eb22bb36e579a226f2ddd5caf0cbc2.mp4','/images/20190716/d3cd16628c63fbb33025e81a44d370dd.jpeg',0,1,'2019-07-16 00:47:20','2019-07-16 00:47:20'),(5,1,'test1','/videos/20190716/95dcd2de2f049612d6c9c9ac62965c3b.mp4','/images/20190716/572d39322b7e2d09ec286297cb7f6dec.jpeg',0,1,'2019-07-16 00:47:45','2019-07-16 00:47:45'),(6,2,'好的吧','/videos/20190717/bf73f158f0e3ca658aa8fd7f4ac4dcd7.mp4','/images/20190717/792a4a1cb89bafe6d1fda5f5f8cf8192.jpeg',0,1,'2019-07-17 02:03:24','2019-07-17 02:03:24'),(7,4,'123','/videos/20190717/eeadc935b1067629f51fabcf70645f49.mp4','/images/20190717/b35bbc2c98ea49f185a2803d103a978b.jpeg',1,1,'2019-07-17 02:15:47','2019-07-17 02:15:47'),(8,5,'123','/videos/20190719/8118b254bd4fcbcb6becac4e9bd644d8.mp4','/images/20190719/be4e54319c88d1c0fd9fa76f36cb9df2.jpeg',0,1,'2019-07-19 04:20:37','2019-07-19 04:20:37');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-28 16:01:16
