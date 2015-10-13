<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用入口文件
//判断是否上海和北京用户
  /*  header("Content-type: text/html; charset=utf-8");
	function getIPLoc_sina($queryIP){
		$url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='.$queryIP;
		$ch = curl_init($url);
		curl_setopt($ch,CURLOPT_ENCODING ,'utf8');
		curl_setopt($ch, CURLOPT_TIMEOUT, 5);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ; // 获取数据返回
		$location = curl_exec($ch);
		$location = json_decode($location);
		curl_close($ch);
		$loc = "";
		if($location===FALSE) return "";
		if (empty($location->desc)) {
			$loc = $location->province;  //.$location->city.$location->district.$location->isp
		}else{
			$loc = $location->desc;
		}
		return $loc;
	}

	$user_IP = ($_SERVER["HTTP_VIA"]) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : $_SERVER["REMOTE_ADDR"];
	$user_IP = ($user_IP) ? $user_IP : $_SERVER["REMOTE_ADDR"];

    $location = getIPLoc_sina($user_IP);
    if($location == '北京' || $location == '上海'){
    	header("Location:/infomation/");
    }
    */
// 检测PHP环境

if(version_compare(PHP_VERSION,'5.3.0','<'))  die('PHP版本必须为5.3以上！');

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_DEBUG',True);

// 定义应用目录
define('APP_PATH','./Application/');

//若服务器支持 开启Gzip
define ( "GZIP_ENABLE", function_exists ( 'ob_gzhandler' ) );
ob_start ( GZIP_ENABLE ? 'ob_gzhandler' : null );

// 引入ThinkPHP入口文件
require './Engine/index.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单