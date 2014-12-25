//index hover tab
function setIndexTab1(val){
    var current = val;
    var panel = $('#dealer' + current);
    $(".found ul").hide().eq(current).show();
}
$(".found ul").css({'display':'none'});
$(".found ul").eq(0).css({'display':'block'});
$('.found-left li').hover(function(){
	$('.found-left li').removeClass('hover');
	$(this).addClass('hover');
	setIndexTab1($(this).attr("model_value"));
});

// search
function inputSearch(txt,lab){
    $(txt).focus(function(){
        $(lab).hide();
    }).blur(function(){
        var text = $(this).val();
        if(text == ''){
            $(lab).show();
        }else{

        }
    });
    $(lab).click(function() {
        $(txt).focus();
    });
}
// login and register input
function inputTxt(){
    $('.user-txt').focus(function(){
        $(this).parents('.input-bd-style').find('.input-font').hide();
    }).blur(function(){
        var text = $(this).val();
        if(text == ''){
           $(this).parents('.input-bd-style').find('.input-font').show();
        }else{

        }
    });
    $('.input-font').click(function() {
        $(this).parents('.input-bd-style').find('.user-txt').focus();
    });
}
//page
function pageLi(){
    $('.page').find('li').find('a').click(function(){
        $('.page').find('li').find('a').removeClass('current');
        $(this).addClass('current');
    });
}
//when windows load
$(document).ready(function(){
    inputSearch('.txt-search','.lab-search');
    inputSearch('.txt-symptom-search','.lab-symptom-search');
    inputTxt();
    pageLi();
});


//login and ragister reg
function isName(str){
    //var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var reg2 = /^1[3|4|5|8][0-9]\d{4,8}$/;
    // return reg.test(str);
    // if (reg.test(str)) {
    //     $('.input-E').show();    
    //     $('.input-M').hide();    
    //     return reg.test(str);
    // }else if (reg2.test(str)) {
    if (reg2.test(str)) {
        $('.input-M').show();
        return reg2.test(str);
    }else if(reg2.test(str)){
        return false;
    };
}
function isPwd(str){
    var reg = /^(\w){6,20}$/;
    return reg.test(str);
}
$(function(){
    $('.userName').blur(function(){
        var tEmail=$('.userName').val();
        if(isName(tEmail)){
            $(this).parents('.username-c').find('.tip').text('');
        }else if(tEmail == ''){
            $(this).parents('.username-c').find('.tip').text('手机号不能为空').addClass('tip-b');
        }else{
            $(this).parents('.username-c').find('.tip').text('手机号格式不正确').addClass('tip-b');
        }
    });
});

$(function(){
    $('.userPwd').blur(function(){
        var tPwd=$('.userPwd').val();
        if(isPwd(tPwd)){
            // //正确
            $(this).parents('.userpwd-c').find('.tip').text('');
        }else{
            $(this).parents('.userpwd-c').find('.tip').text('请输入6-20个英文字母或数字密码').addClass('tip-b');
        }
    });
});

$(function(){
    $('.userSamePwd').blur(function(){
        if($('.userSamePwd').val() == $('.userPwd').val()){
            //正确
            $(this).parents('.userpwd-c').find('.tip').text('');
        }else{
            $(this).parents('.userpwd-c').find('.tip').text('密码输入不一致，请重新输入').addClass('tip-b');
        }
    });
});


$(function(){
	$("a[href='"+window.location.pathname+window.location.search+"']").addClass('hover');	
	$("#btn-newQuestion").click(function(){
		var myquestion = $("#myquestion").val();
		if(myquestion == ''){
			alert("请输入您的问题！");
			return false;
		}
		if(myquestion.length < 5){
			alert("问题字数太少");
			return false;			
		}
	});	
});

$(function(){
    $('.medicinalList a').click(function(){
        $(this).next('.medicine-details').show();
    });
    $('.close-btn').click(function(){
        $('.medicine-details').hide();
    })
});



