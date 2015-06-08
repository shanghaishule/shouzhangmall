
var url = encodeURIComponent(window.location.href);
//获取当前链接应用key
var appid = $('input[name="appid"]').length>0 ? $('input[name="appid"]').val():'TTNKSAQQ';

var loginHtml = ''
    +'  <div class="login" id="denglu">'
    +'    <a href="#" class="mr10"><span class="icon_login"></span>登录</a>'
    +'    <div class="loginBox">'
    +'      <form action="" name="loginForm" id="login">'
    +'        <p class="red"></p>'
    +'        <input name="username" type="text" class="name">'
    +'        <div class="blank10"></div>'
    +'        <input name="password" type="password" class="pass">'
    +'        <label><input type="checkbox" class="check" checked="checked">10天内自动登录</label>'
    +'        <a href="http://passport.39yst.com/getpassindex/?appid='+appid+'&x_url='+url+'" class="wjmm">忘记密码？</a>'
    +'        <input type="button" value="登 录" class="btn">' 
    +'      </form>'
    +'      <p class="hezuo">'
    +'          使用合作账号一键登录：<br/>'
    +'          <a href="http://passport.39yst.com/qq/?appid='+appid+'&x_url='+url+'" target="_blank">'
    +'              <img src="qq_login.gif"/*tpa=http://img.39yst.com/templates/39yst/images/qq_login.gif*/ width="124" height="24"></a>'
    +'          <a href="http://passport.39yst.com/sina/?appid='+appid+'&x_url='+url+'" target="_blank">'
    +'              <img src="weibo.gif"/*tpa=http://img.39yst.com/templates/39yst/images/weibo.gif*/ width="132" height="24"></a>'
    +'      </p>'
    +'    </div>'
    +'  </div>'
    +'  <div class="fl"><span class="icon_reg"></span><a href="http://passport.39yst.com/register/?appid='+appid+'&x_url='+url+'" target="_blank">注册</a></div>'
    +'  ';
$('#loginzhuce').html(loginHtml); 
$(document).ready(function(){
    function __comment_login_msg(str){
        $('http://img.39yst.com/statics/zj/js/.loginBox .red').eq(0).html(str);
    }

    //判断cookie，验证是否登陆
    if($.cookie('39yst_t') != null ) {
        var username = $.cookie('39yst_n');
        $('#loginzhuce').html('');
        $('#loginzhuce').html('<a href="http://app.39yst.com/?app=member&controller=panel&action=index" class="welcome" title="'+username+'" target="_blank">欢迎，'+username.substr(0,5)+'</a> <a href="http://passport.39yst.com/logout/?appid='+appid+'&x_url='+url+'" class="out">退出</a>');
    }
    //登陆数据验证
        function ajax_login(){
            var login_input = document.getElementById('login').getElementsByTagName('input');
            $.ajax({
                type:"get",
                url:"http://passport.39yst.com/api.php?op=login",
                data:{"username":login_input[0].value,"password":login_input[1].value,'appid':appid},
                dataType:"jsonp",
                jsonp:"jsoncallback",
                success:function(data){
                    if(data.status == 1){
                        // $.cookie('39yst_p',base64encode(utf16to8(data.avatar)));
                        location.reload();
                    }else{
                        switch(data.status){
                            case -4:
                                __comment_login_msg('应用密钥不能为空');
                                break;
                            case -5:
                                __comment_login_msg('用户名不合法');
                                break;  
                            case -7:
                                __comment_login_msg('应用密钥不存在');
                                break;                           
                            case -9:
                                __comment_login_msg('用户不存在');
                                break;  
                            case -10:
                                __comment_login_msg('密码错误');
                                break;
                            default:
                                __comment_login_msg('502 请求超时')
                                break;
                        }
                    }
                }
            });
        }
    //登陆表单验证
        function login() {
           var login_input = document.getElementById('login').getElementsByTagName('input');
           if (login_input[0].value == "") {
            __comment_login_msg('请输入账号');
            return
           }else if (login_input[1].value == "") {
            __comment_login_msg('请输入密码');
            return
           }else{
              ajax_login();
           };
        }
    if ($('.btn').length > 0) {
        $('.btn').on('click', function(event) {
            login();
        });
    }
}); 
//划过显示登陆
$('#denglu').hover(function(){
    $(".loginBox").show();
    $('.login').css('background','#fff')
},function(event){
    return 
});
$('.login').on('click', function(e) {
    var e = e || window.event;   
    e.stopPropagation();
});
$(document).on('click',  function(e) {
    $('.loginBox').hide ();
    $('.login').css('background','')
});

/*
*收藏和返回顶部
*/
$(window).scroll(function(event) {
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop
    if (scrollTop > 300) {
        $(".gotop02").show();
    } else {
        $(".gotop02").hide();
    }
});
$(".favo").click(function() {
    window.scrollTo(0,0)
});

//头部专栏下拉
var menushow;
$('#zhuanlan').hover(function() {
    $('.menu').show();
    $(this).addClass('current')
}, function() {
    menushow = setTimeout(function(){$('.menu').hide();$('#zhuanlan').removeClass('current');},200);
});
$('.menu').hover(function() {
    clearTimeout(menushow);
    $('#zhuanlan').addClass('current');
    $(this).show();
}, function() {
    $(this).hide();
    $('#zhuanlan').removeClass('current');
});   
