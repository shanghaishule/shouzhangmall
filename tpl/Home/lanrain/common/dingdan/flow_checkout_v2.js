
/**
 *显示新地址输入框
 **/
function showNewUserAddress(){
    document.getElementById('show_new_user_address').style.display ="block";
}
/**
 *隐藏新地址输入框
 **/
function hideNewUserAddress(){
    document.getElementById('show_new_user_address').style.display ="none";
}

/********************{修改支付方式}*************************/

/**
 *显示支付方式
 **/
function showPayment(d){
    if(d.error != ''){
        document.getElementById('show_payment').innerHTML = d;
    }
}
/**
 *显示订单总额
 **/
function showOrderTotal(d){
    if(emptyValue(d.error)){
        //if(d.bonus != undefined)alert('验证成功，使用优惠券：'+d.bonus);
        document.getElementById('show_order_total').innerHTML = d.content;
    }else{
        if(d.error != '填写正确的送货地址'){
            alert(d.error);
        }
    }
}

/**
 * 根据name获取 radio的值
 **/
function GetRadioValue(RadioName){
    var obj;   
    obj=document.getElementsByName(RadioName);
    if(obj!=null){
        var i;
        for(i=0;i<obj.length;i++){
            if(obj[i].checked){ 
			  return obj[i].value;
            }
        }
    }
    return null;
}

/**
 *判断值是否为空
 **/
function emptyValue(value){
   if(typeof(value) == "undefined" || value == null || value == ""){
       return true;
   }else{
       return false
   }
}

/**
 *删除值两边的空字符
 **/
function trimValue(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");  
	
}

/* *
 * 改变支付方式
 */
function selectPayment(payment)
{
  if(payment >10){
     payment  = 7; 
  } 
  Ajax.call('../flow.php?step=select_payment', 'addr=1&payment=' + payment, showOrderTotal, 'GET', 'JSON');
}


/*-----20130821 增加-----*/
$(function(){
        $('#new_payment').find('.rad').each(function(){
        if($(this).val() == $("#payment").val()){
            $(this).attr('checked',true);
        }
        }) 
    $('#new_payment').find('.rad').click(function(){
        if($(this).val()!=1){
            var pay_list = $(this).parents('li').find('.payment_list_tab'); 
            pay_list.next('.payment_bank').show();
            pay_list.find('.grey_txt').hide();
            pay_list.parent().siblings().find('.payment_list_tab').removeClass('payment_list_bg');
            pay_list.parent().siblings().find('.payment_list_tab').find('.grey_txt').show();
            pay_list.parent().siblings().find('.payment_bank').hide();
            pay_list.addClass('payment_list_bg');
        }else{
            var next_tag =$(this).parents('li').siblings();
            next_tag.find('.payment_list_tab').removeClass('payment_list_bg');
            next_tag.find('.payment_bank').hide();
            next_tag.find('.grey_txt').show();
        }  
        if($('#payment').val() !=$(this).val()){
            selectPayment($(this).val());
        }
        $('#payment').val($(this).val());
    })
    $('#new_payment').find('.bank_list li').click(function(){
        
        $(this).addClass('hover').siblings().removeClass('hover');
            if($('#payment').val() != $(this).attr('data')){
                selectPayment($(this).attr('data'));
                $('#payment').val($(this).attr('data'));
            }
/*        if($(this).attr('data')>10){
            $('#payment').val(7);
        }else{
            $('#payment').val($(this).attr('data'));
        }*/
    })
/*	var new_payment = $('#new_payment');
	var tab_rad = new_payment.find('.rad');
	var bank_list = new_payment.find('.bank_list li');
	tab_rad.click(function(){
		  var _this = $(this);
		  var index = tab_rad.index(this);
		  var pay_list = _this.parents('li').find('.payment_list_tab'); 
		  if(pay_list.hasClass('nobor-r')){
			  pay_list.next('.payment_bank').show();
			  pay_list.parent().siblings().find('.payment_bank').hide();
              
			  pay_list.parent().siblings().find('.payment_list_tab').removeClass('payment_list_bg');
			  pay_list.addClass('payment_list_bg');
			  }
		  else{
			  bank_list.removeClass('hover');
			  new_payment.find('.payment_list_tab').removeClass('payment_list_bg');
			  new_payment.find('.payment_bank').hide();
			  }
              pay_list.find('.grey_txt').hide();
              pay_list.parent().siblings().find('.grey_txt').show();
		})
    bank_list.click(function(){
        alert(1111);
    })
	bank_list.bind('click',function(){
		var _this = $(this);
		bank_lists(_this);
		});*/
		
/*优惠劵*/
 var coupon = $('#show_coupon');
 var hide_btn = coupon.find('.togg_pointer');
 var hide_btn2 = coupon.find('.close_coupon');
 $('.togg_pointer,.close_coupon').click(function(){
	 var _this=$(this);
	 var btn_point=_this.text();
	 var coupon_box=coupon.find('.coupon');
     if(!coupon_box.is(':hidden')){
        coupon_box.hide();
        hide_btn2.text('[展开]');
        hide_btn.text('+');
     }
     else{
        coupon_box.show();
        hide_btn2.text('[关闭]');
        hide_btn.text('-');

     }
	 });
	
})
function bank_lists(n){
	n.addClass('hover');
	n.siblings().removeClass('hover');
	n.parents()
	}
//提交订单检验
function check_direct_order(){
    //邮政编码
    var zip = document.getElementsByName('zipcode')[0].value;
    var zipreg = /^\d{6,8}$/;
    //手机
    var call = document.getElementsByName('mobile')[0].value;
    var callreg = /^1\d{10}$/;
    //电话
    var telp = document.getElementsByName('tel')[0].value;

    //收货人
    var cons = document.getElementsByName("consignee")[0].value;
    var consreg = /^[\u0391-\uFFE5A-Za-z]+$/;
    //地址
    var addrs = trimValue(document.getElementsByName('address')[0].value);
    var addrsreg = /^[\u0391-\uFFE5A-Za-z0-9\s]+$/;
    var telreg = /^0\d{2,3}(\-)?\d{7,8}$/;
    var frm    = document.getElementById('user_address_Form');
    var province    = '';
    var city        = '';
    var district    = '';
    var town        = '';
    var shipping_type = 1; //GetRadioValue('shipping_type');不用选择配送方式
    var payment_id = document.getElementById('payment').value;
    var address_id = GetRadioValue('select_user_address');
    var postscript = $('#postscript').val();
    var bonus_sn = $('#bonus_sn').val();
    if(payment_id>10){
        payment_id =7;
    }
	function isparSHOW(is){
			$(is).parents(".popUpLeft").show();
		}
	function isparHIDE(is){
			$(is).parents(".popUpLeft").hide();
		}
    if(address_id<=0){
        if (consreg.test(cons) == false || cons.length <= 0)
        {
			isparSHOW("#consignee_notice");
            document.getElementById('consignee_notice').innerHTML = '收货人填写不合法(支持双字节字符)';
            alert('收货人填写不合法(支持双字节字符)');
            return false;
        }
        else
        {
			isparHIDE("#consignee_notice");
            document.getElementById('consignee_notice').innerHTML = "";
        }
        if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 1)
        {
			isparSHOW("#flow_notice");
            document.getElementById('flow_notice').innerHTML = '请您选择收货人所在省份';
            alert('请您选择收货人所在省份');
            return false;
        }
        province  = frm.elements['province'].value;

        if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 1)
        {
			isparSHOW("#flow_notice");
            document.getElementById('flow_notice').innerHTML = '请您选择收货人所在城市';
            alert('请您选择收货人所在城市');
            return false;
        }
        city      = frm.elements['city'].value;
        if (frm.elements['district'] && frm.elements['district'].length > 1)
        {
            if (frm.elements['district'].value == 0)
            {
				isparSHOW("#flow_notice");
                document.getElementById('flow_notice').innerHTML = '请您选择收货人所在区域';
                alert('请您选择收货人所在区域');
                return false;
            }
            else
            {
				isparHIDE("#flow_notice");
                document.getElementById('flow_notice').innerHTML = "";
            }
        }
        district      = frm.elements['district'].value;
        if (frm.elements['town'] && frm.elements['town'].length > 1)
        {
            if (frm.elements['town'].value == 0)
            {
				isparSHOW("#flow_notice");
                document.getElementById('flow_notice').innerHTML = '请您选择所在街道/镇';
                alert('请您选择所在街道/镇');
                return false;
            }
            else
            {
				isparHIDE("#flow_notice");
                document.getElementById('flow_notice').innerHTML = "";
            }
        }
        town      = frm.elements['town'].value;
        if (addrsreg.test(addrs) == false || addrs.length <= 0) {
			isparSHOW("#address_notice");
            document.getElementById('address_notice').innerHTML = '收货人的详细地址不能为空';
            alert('收货人的详细地址不能为空');
            return false;
        }
        else
        {
			isparHIDE("#address_notice");
            document.getElementById('address_notice').innerHTML = "";
        }
        if (zip.length > 0 && zipreg.test(zip) == false)
        {
			isparSHOW("#zipcode_notice");
            document.getElementById('zipcode_notice').innerHTML = '邮政编码不是有效的号码';
            alert('邮政编码不是有效的号码');
            return false;
        }else
        {
			isparHIDE("#zipcode_notice");
            document.getElementById("zipcode_notice").innerHTML = '';
        }
        if(telp.length > 0 && telreg.test(telp) == false ) {
			isparSHOW("#mobile_notice");
            document.getElementById('mobile_notice').innerHTML = '电话号码不是有效的号码';
            alert('电话号码不是有效的号码');
            return false;
        }else {
			isparHIDE("#mobile_notice");
            document.getElementById('mobile_notice').innerHTML = '';
        }

        if(call.length > 0 && callreg.test(call) == false ) {
			isparSHOW("#mobile_notice");
            document.getElementById('mobile_notice').innerHTML = '手机号码不是有效的号码';
            alert('手机号码不是有效的号码');
            return false;
        }else{
			isparHIDE("#mobile_notice");
            document.getElementById('mobile_notice').innerHTML = '';
        }

        if (call.length <= 0 && telp.length <= 0 )
        {
			isparSHOW("#mobile_notice");
            document.getElementById('mobile_notice').innerHTML = '电话号码和手机号码必须填写一项';
            alert('电话号码和手机号码必须填写一项');
            return false;
        }else{
			isparHIDE("#mobile_notice");
            document.getElementById('mobile_notice').innerHTML = '';
        }
    }

    if(emptyValue(shipping_type)){
        alert('亲爱的用户，请选择送货时间');
        return false;
    }
    if(emptyValue(payment_id)){
        alert('亲爱的用户，请选择支付方式');
        return false;
    }
    var args = "shipping_id=15"+"&shipping_type="+ shipping_type+"&payment_id="+payment_id+"&address_id="+address_id+"&postscript="+postscript+"&bonus_sn="+bonus_sn;
    if(address_id==0){
        args +='&zipcode='+zip+"&mobile="+call+"&tel="+telp+"&consignee="+
            cons+"&address="+addrs+"&province="+province+"&city="+city+"&district="+district+"&town="+town;
    }
    var res = Ajax.call('/flow.php?step=check_directbuy',args, null, 'POST', 'JSON',false);
    if (!res){
        alert("下单失败，请重新点击尝试！");
        return false;
    }else if (res.error > 0){
        if(res.error == 1){
            window.location.href = '/flow.php?step=directbuy';
        }
        if (res.message){
            alert(res.message);
        }
        return false;
    }else{
        window.location.href="/flow.php?step=done";
    }
}
