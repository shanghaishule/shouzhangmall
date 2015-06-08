var loginHtml = ''
    +'  <div class="login" id="denglu">'
    +'    登录'
    +'    <div class="loginBox" style="display: none;">'
    +'      <form action=""name="loginForm" id="logins">'
    +'        <p class="red"></p>'
    +'        <input name="username" type="text" class="name">'
    +'        <br>'
    +'        <input name="password" type="password" class="pass">'
    +'        <br>'
    +'        <label><input type="checkbox" class="check" checked="checked">10天内自动登录</label>'
    +'        <a href="http://passport.39yst.com/getpassindex/?" class="wjmm">忘记密码？</a>'
    +'        <br>'
    +'        <input type="button" value="登 录" class="btn">'
    +'      </form>'
    +'      <div class="blank10"></div>'
    +'          <p class="hezuo">'
    +'          使用合作账号一键登录：'
    +'          <br>'
    +'          <a href="http://passport.39yst.com/index.php?m=oauth&c=index&a=qq&x_url=http://www.39yst.com/" target="_blank">'
    +'              <img src="qq_login.gif"/*tpa=http://img.39yst.com/templates/39yst/images/qq_login.gif*/ width="124" height="24"></a>'
    +'          <a href="http://passport.39yst.com/index.php?m=oauth&c=index&a=sina&x_url=http://www.39yst.com/" target="_blank">'
    +'              <img src="weibo.gif"/*tpa=http://img.39yst.com/templates/39yst/images/weibo.gif*/ width="132" height="24"></a>'
    +'          </p>'
    +'      </div>'
    +'  </div>'
    +'  <a href="http://passport.39yst.com/register/?" target="_blank" class="zhuce">注册</a>';
$('#loginzhuce').html(loginHtml); 
$(document).ready(function(){
    function __comment_login_msg(str){
        $('http://img.39yst.com/templates/39yst/js/.loginBox .red').eq(0).html(str);
    }
    var url = window.location.href;
    //获取当前链接应用key
    var appid = $('input[name="appid"]').length>0 ? $('input[name="appid"]').val():'MRMGPRLK';
    //判断cookie，验证是否登陆
    if($.cookie('39yst_t') != null ) {
        var username = $.cookie('39yst_n');
        $('#denglu_Box').html('');
        $('#loginzhuce').html('<a href="http://app.39yst.com/?app=member&controller=panel&action=index" class="welcome" title="'+username+'" target="_blank">欢迎，'+username.substr(0,5)+'</a> <a href="http://passport.39yst.com/logout/?appid='+appid+'&x_url='+url+'" class="out">退出</a>');
    }
    //登陆数据验证
        function ajax_login(){
            var login_input = document.getElementById('logins').getElementsByTagName('input');
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
           var login_input = document.getElementById('logins').getElementsByTagName('input');
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
