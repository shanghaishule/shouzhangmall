<?php
function isAndroid(){
	if(strstr($_SERVER['HTTP_USER_AGENT'],'Android')) {
		return 1;
	}
	return 0;
}
function attach($attach, $type) {
	if (false === strpos($attach, 'http://')) {
		//本地附件
		return __ROOT__ . '/weTall/data/upload/' . $type . '/' . $attach;
		//远程附件
		//todo...
	} else {
		//URL链接
		return $attach;
	}
}
function msubstr($str, $start=0, $length, $charset="utf-8", $suffix=true)
{
	if(function_exists("mb_substr")){
		if($suffix)
			return mb_substr($str, $start, $length, $charset)."...";
		else
			return mb_substr($str, $start, $length, $charset);
	}
	elseif(function_exists('iconv_substr')) {
		if($suffix)
			return iconv_substr($str,$start,$length,$charset)."...";
		else
			return iconv_substr($str,$start,$length,$charset);
	}
	$re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
	$re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
	$re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
	$re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
	preg_match_all($re[$charset], $str, $match);
	$slice = join("",array_slice($match[0], $start, $length));
	if($suffix) return $slice."…";
	return $slice;
}

function todaytime() {
	return mktime(0, 0, 0, date('m'), date('d'), date('Y'));
}

/**
 * 友好时间
 */
function fdate($time) {
	if (!$time)
		return false;
	$fdate = '';
	$d = time() - intval($time);
	$ld = $time - mktime(0, 0, 0, 0, 0, date('Y')); //年
	$md = $time - mktime(0, 0, 0, date('m'), 0, date('Y')); //月
	$byd = $time - mktime(0, 0, 0, date('m'), date('d') - 2, date('Y')); //前天
	$yd = $time - mktime(0, 0, 0, date('m'), date('d') - 1, date('Y')); //昨天
	$dd = $time - mktime(0, 0, 0, date('m'), date('d'), date('Y')); //今天
	$td = $time - mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')); //明天
	$atd = $time - mktime(0, 0, 0, date('m'), date('d') + 2, date('Y')); //后天
	if ($d == 0) {
		$fdate = '刚刚';
	} else {
		switch ($d) {
			case $d < $atd:
				$fdate = date('Y年m月d日', $time);
				break;
			case $d < $td:
				$fdate = '后天' . date('H:i', $time);
				break;
			case $d < 0:
				$fdate = '明天' . date('H:i', $time);
				break;
			case $d < 60:
				$fdate = $d . '秒前';
				break;
			case $d < 3600:
				$fdate = floor($d / 60) . '分钟前';
				break;
			case $d < $dd:
				$fdate = floor($d / 3600) . '小时前';
				break;
			case $d < $yd:
				$fdate = '昨天' . date('H:i', $time);
				break;
			case $d < $byd:
				$fdate = '前天' . date('H:i', $time);
				break;
			case $d < $md:
				$fdate = date('m月d H:i', $time);
				break;
			case $d < $ld:
				$fdate = date('m月d', $time);
				break;
			default:
				$fdate = date('Y年m月d日', $time);
				break;
		}
	}
	return $fdate;
}
?>