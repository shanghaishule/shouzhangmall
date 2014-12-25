$(document).ready(function(){
    var test = document.getElementsByTagName('html')[0].innerHTML;
    if(isInclude('transport.js')){
        EC_CkUserInfo();
        EC_select_num();
    }else{
        JQ_CkUserInfo();
        JQ_select_num();
    }

});

//var res = document.referrer;
//if(res){
//    if(res.indexOf('i.chinaskin.cn')>-1){
//        SetCookie('HTTP_REFERER',document.referrer);
//    }else{
//        delCookie('HTTP_REFERER');
//    }
//}

//document.write("<scr"+"ipt type='text/javascript' src='/api/users/ajax/ssoinit.php'></scr"+"ipt>");//载入sso初始化文件

function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 1; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}

function delCookie(name)//删除cookie
{
    document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
}
/**
 * 检测购物车内商品数量 EC
 * 
 */
 function EC_select_num(){
    var res=Ajax.call('/flow.php?step=newstatus','',null,'GET','JSON',false);
    $('#goods_num').html(res.goods_number);
    if(res.goods_number > 0)
    {
        var cart_goods_num = "<i>" + res.goods_number + "</i>";
    }else{
        var cart_goods_num = "";
    }
    $('#cart_goods_num').html(cart_goods_num);
 }
/**
 * 检测购物车内商品数量 JQ
 * 
 */
function JQ_select_num(){
    $.ajax({
        type:'POST',
        url:'/flow.php',
        data:{step:'newstatus'},
        dataType:'JSON',
        success:function(data){
            $('#goods_num').html(data.goods_number);
            if(data.goods_number > 0)
            {
                var cart_goods_num = "<i>" + data.goods_number + "</i>";
            }else{
                var cart_goods_num = "";
            }
            $('#cart_goods_num').html(cart_goods_num);
        },
        error:function(){

        }
    });
}
/**
 * 检测用户 JQ
 * @constructor
 */
function JQ_CkUserInfo(){
    $.ajax({
        type:"GET",
		url:"../api/users/ajax/user.php",
		data:"act=CkUserInfo&"+Math.random(),
        dataType:"JSON",
		success: function(d){
            CkUserInfoSuccess(d);
		}
    });
}
/**
 * 检测用户 ES
 * @constructor
 */
function EC_CkUserInfo(){
    Ajax.call('../api/users/ajax/user.php','act=CkUserInfo&'+Math.random(),CkUserInfoSuccess,'GET','JSON',false);
}



function CkUserInfoSuccess(d){
    var ckLog = $("#ck_log");
    var html;
    if(d.code == 1){
        html = ' 您好：<a href="http://my.chinaskin.cn">'+ d.data +'</a>  <a href="../api/users/ajax/user.php?act=logout" id="logout" title="退出登录">[退出登录]</a> | ';
        ckLog.html(html);
//        toggleInputMobile(false);
    }else{
        html = '欢迎光临瓷肌官方商城 | ' +
        '<a href="../api/users/ajax/user.php?act=login" id="log" title="登录" target="_self">登录</a>/<a href="../api/users/ajax/user.php?act=register" id="register" title="注册" target="_self">注册</a> | ';
        ckLog.html(html);
//        toggleInputMobile(true);
    }
}

function toggleInputMobile(type)
{
	if ($('#input_mobile_num').length <= 0) return false;
	$('#input_mobile_num').toggle(type);
}

function isInclude(name){
    var js= /js$/i.test(name);
    var es=document.getElementsByTagName(js?'script':'link');
    for(var i=0;i<es.length;i++) 
    if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
    return false;
}