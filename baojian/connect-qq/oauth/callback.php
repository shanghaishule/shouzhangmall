<?php
require_once("./connect-qq/API/qqConnectAPI.php");
$qc = new QC();
$acs = $qc->qq_callback();
$oid = $qc->get_openid();
$qc = new QC($acs,$oid);
$uinfo = $qc->get_user_info();
//$page_id = M('meta')->where("meta_key='user_qqoid' AND meta_value='".$oid."' AND type='user'")->getField('page_id');
$pageid = getPage_id($oid);
if($pageid) {
	$user_name = mc_get_meta($pageid,'user_name',true,'user');
	$user_pass_true = mc_get_meta($pageid,'user_pass',true,'user');
	//session('user_name',$user_name);
	//session('user_pass',$user_pass_true);
	$_SESSION['user_name'] = $user_name;
	$_SESSION['user_pass'] = $user_pass_true;
	success();
}else {
	function mc_check_user_name($name) {
		$user_login = callbackSearch();
	    if(in_array($name, $user_login)){
	    	return true;
	    }else{
			return false;
		}
	}
    do {
		$user_name_test = $oid.rand(1000,9999);
	}
	while (mc_check_user_name($user_name_test));
	$user['title'] = $uinfo["nickname"];
	$user['content'] = '';
	$user['type'] = 'user';
	$user['date'] = strtotime("now");
	$result = callbackAdd($user);
	if($result){
		mc_add_meta($result,'user_name',$user_name_test,'user');
		$user_pass = md5($oid.mc_option('site_key'));
		mc_add_meta($result,'user_pass',$user_pass,'user');
		mc_add_meta($result,'user_qqoid',$oid,'user');
		mc_add_meta($result,'user_level','1','user');
		//session('user_name',$user_name_test);
	    //session('user_pass',$user_pass);
	    $_SESSION['user_name'] = $user_name_test;
	    $_SESSION['user_pass'] = $user_pass;
		success();
	}else{
		error();
	}
}
