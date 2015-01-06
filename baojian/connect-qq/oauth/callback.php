<?php
require_once("../API/qqConnectAPI.php");
$qc = new QC();

$acs = $qc->qq_callback();

$oid = $qc->get_openid();
$qc = new QC($acs,$oid);
$uinfo = $qc->get_user_info();
function getUserId(){
	//$page_id = M('meta')->where("meta_key='user_name' AND meta_value='".session('user_name')."' AND type='user'")->getField('page_id');
	$pageId = "select page_id from mc_meta where meta_key = 'user_name' and meta_value = '".$_SESSION['user_name']."' and type = 'user'";
	$result = mysql_query($pageId);
	$res = mysql_fetch_array($result);
	$user_pass_true = getMeta($res['page_id'],'user_pass',true,'user');
	if($_SESSION['user_name'] && $_SESSION['user_pass'] && $_SESSION['user_pass'] == $user_pass_true) {
		return $res['page_id'];
	}
}
function getMeta($page_id,$meta_key,$array=true,$type='basic'){
		//$meta = M('meta')->where("page_id='$page_id' AND meta_key='$meta_key' AND type ='$type'");
		$pageId = "select meta_value from mc_meta where page_id = '".$page_id."' and meta_key = '".$meta_key."' and type = '".$type."'";
		$result = mysql_query($pageId);
		$res = mysql_fetch_array($result);

		return $res['meta_value'];
}
//$page_id = M('meta')->where("meta_key='user_qqoid' AND meta_value='".$oid."' AND type='user'")->getField('page_id');
$query = "select page_id from mc_meta where meta_key = 'user_qqoid' and meta_value = '".$oid."' and type = 'user'";
$result =  mysql_query($query);
if($page_id = mysql_fetch_array($result)){
	$user_name = getMeta($page_id['page_id'],'user_name',true,'user');
	$user_pass_true = getMeta($page_id['page_id'],'user_pass',true,'user');
	//session('user_name',$user_name);
	//session('user_pass',$user_pass_true);
	$_SESSION['user_name'] = $user_name;
	$_SESSION['user_pass'] = $user_pass_true;
	//$this->success('登陆成功',U('user/index/edit?id='.getUserId()));
	header("Location",'/');
}else{
	function mc_check_user_name($name) {
		//$user_login = M('meta')->where("meta_key='user_login' AND type ='user'")->getField('meta_value',true);
		$query2 = "select meta_value from mc_meta where meta_key = 'user_login' and type = 'user'";
		$resultp =  mysql_query($query2);
		$resp = mysql_fetch_array($resultp);
	    if(in_array($name, $resp['meta_value'])){
	    	return true;
	    }else{
			return false;
	    }
	}
    do {
		$user_name_test = $oid.rand(1000,9999);
	}
	while (mc_check_user_name($user_name_test));
	/*$user['title'] = $uinfo["nickname"];
	$user['content'] = '';
	$user['type'] = 'user';
	$user['date'] = strtotime("now");
	$result = M("page")->data($user)->add();
	if($result){
		mc_add_meta($result,'user_name',$user_name_test,'user');
		$user_pass = md5($oid.mc_option('site_key'));
		mc_add_meta($result,'user_pass',$user_pass,'user');
		mc_add_meta($result,'user_qqoid',$oid,'user');
		mc_add_meta($result,'user_level','1','user');
		session('user_name',$user_name_test);
	    session('user_pass',$user_pass);
		$this->success('登陆成功',U('user/index/edit?id='.mc_user_id()));
	}else{
		$this->error('登陆失败');
    }*/echo '成功';
}
?>