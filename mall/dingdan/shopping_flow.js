/* $Id : shopping_flow.js 4865 2007-01-31 14:04:10Z paulgao $ */

var selectedShipping = null;
var selectedPayment  = null;
var selectedPack     = null;
var selectedCard     = null;
var selectedSurplus  = '';
var selectedBonus    = 0;
var selectedIntegral = 0;
var selectedOOS      = null;
var alertedSurplus   = false;

var groupBuyShipping = null;
var groupBuyPayment  = null;


/* *
 * 改变配送方式
 */
function selectShipping(obj)
{
  if (selectedShipping == obj)
  {
    return;
  }
  else
  {
    selectedShipping = obj;
  }

  var supportCod = obj.attributes['supportcod'].value + 0;
  var theForm = obj.form;

  for (i = 0; i < theForm.elements.length; i ++ )
  {
    if (theForm.elements[i].name == 'payment' && theForm.elements[i].attributes['iscod'].value == '1')
    {
      if (supportCod == 0)
      {
        theForm.elements[i].checked = false;
        theForm.elements[i].disabled = true;
      }
      else
      {
        theForm.elements[i].disabled = false;
      }
    }
  }

  if (obj.attributes['insure'].value + 0 == 0)
  {
    document.getElementById('ECS_NEEDINSURE').checked = false;
    document.getElementById('ECS_NEEDINSURE').disabled = true;
  }
  else
  {
    document.getElementById('ECS_NEEDINSURE').checked = false;
    document.getElementById('ECS_NEEDINSURE').disabled = false;
  }

  var now = new Date();
  
  //取得pay_id
  var payment = '';
  var form1 = document.getElementById("theForm");
  for (i=0; i<form1.payment.length; i++)
    {
        if (form1.payment[i].checked)
        {
            selectedIndex = i;
            payment = form1.payment[i].value;
            break;
        }
    }  
	
  Ajax.call('flow.php?step=select_shipping&payment=' + payment, 'shipping=' + obj.value, orderShippingSelectedResponse, 'GET', 'JSON');
}

/**
 *
 */
function orderShippingSelectedResponse(result)
{
  if (result.need_insure)
  {
    try
    {
      document.getElementById('ECS_NEEDINSURE').checked = true;
    }
    catch (ex)
    {
      alert(ex.message);
    }
  }

  try
  {
    if (document.getElementById('ECS_CODFEE') != undefined)
    {
      document.getElementById('ECS_CODFEE').innerHTML = result.cod_fee;
    }
  }
  catch (ex)
  {
    alert(ex.message);
  }

  orderSelectedResponse(result);
}

/* *
 * 改变支付方式
 */
function selectPayment(obj)
{
  if (selectedPayment == obj)
  {
    return;
  }
  else
  {
    selectedPayment = obj;
  }

  Ajax.call('../flow.php?step=select_payment', 'payment=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}
/* *
 * 团购购物流程 --> 改变配送方式
 */
function handleGroupBuyShipping(obj)
{
  if (groupBuyShipping == obj)
  {
    return;
  }
  else
  {
    groupBuyShipping = obj;
  }

  var supportCod = obj.attributes['supportCod'].value + 0;
  var theForm = obj.form;

  for (i = 0; i < theForm.elements.length; i ++ )
  {
    if (theForm.elements[i].name == 'payment' && theForm.elements[i].attributes['iscod'].value == '1')
    {
      if (supportCod == 0)
      {
        theForm.elements[i].checked = false;
        theForm.elements[i].disabled = true;
      }
      else
      {
        theForm.elements[i].disabled = false;
      }
    }
  }

  if (obj.attributes['insure'].value + 0 == 0)
  {
    document.getElementById('ECS_NEEDINSURE').checked = false;
    document.getElementById('ECS_NEEDINSURE').disabled = true;
  }
  else
  {
    document.getElementById('ECS_NEEDINSURE').checked = false;
    document.getElementById('ECS_NEEDINSURE').disabled = false;
  }

  Ajax.call('group_buy.php?act=select_shipping', 'shipping=' + obj.value, orderSelectedResponse, 'GET');
}

/* *
 * 团购购物流程 --> 改变支付方式
 */
function handleGroupBuyPayment(obj)
{
  if (groupBuyPayment == obj)
  {
    return;
  }
  else
  {
    groupBuyPayment = obj;
  }

  Ajax.call('group_buy.php?act=select_payment', 'payment=' + obj.value, orderSelectedResponse, 'GET');
}

/* *
 * 改变商品包装
 */
function selectPack(obj)
{
  if (selectedPack == obj)
  {
    return;
  }
  else
  {
    selectedPack = obj;
  }

  Ajax.call('flow.php?step=select_pack', 'pack=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 改变祝福贺卡
 */
function selectCard(obj)
{
  if (selectedCard == obj)
  {
    return;
  }
  else
  {
    selectedCard = obj;
  }

  Ajax.call('flow.php?step=select_card', 'card=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 选定了配送保价
 */
function selectInsure(needInsure)
{
  needInsure = needInsure ? 1 : 0;
  
    //取得pay_id
  var payment = '';
  var form1 = document.getElementById("theForm");
  for (i=0; i<form1.payment.length; i++)
    {
        if (form1.payment[i].checked)
        {
            selectedIndex = i;
            payment = form1.payment[i].value;
            break;
        }
    }  

  Ajax.call('flow.php?step=select_insure&payment=' + payment, 'insure=' + needInsure, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 团购购物流程 --> 选定了配送保价
 */
function handleGroupBuyInsure(needInsure)
{
  needInsure = needInsure ? 1 : 0;

  Ajax.call('group_buy.php?act=select_insure', 'insure=' + needInsure, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 回调函数
 */
function orderSelectedResponse(result)
{
  if (result.error)
  {
    alert(result.error);
    location.href = './';
  }
  
  if (result.message)
  {
    if( confirm(result.message) )
	{
		if (result.url)
		{
			location.href = result.url;
		}
		else
		{
			location.href = 'flow.php';	
		}
	}
	else
	{

		//把支付方式设置成全部不选中
		var frm = document.forms['theForm'];		
		var radio = frm["payment"];		
		for(var i=0; i<radio.length; i++) { 
			selectedPayment = '';
			radio[i].checked = ''; 
		}  	
	}
  }  

  try
  {
    var layer = document.getElementById("show_order_total");

    layer.innerHTML = (typeof result == "object") ? result.content : result;

    if (result.payment != undefined)
    {
      var surplusObj = document.forms['theForm'].elements['surplus'];
      if (surplusObj != undefined)
      {
        surplusObj.disabled = result.pay_code == 'balance';
      }
    }
  }
  catch (ex) { }
  
}

/* *
 * 改变余额
 */
function changeSurplus(val)
{
  if (selectedSurplus == val)
  {
    return;
  }
  else
  {
    selectedSurplus = val;
  }

  Ajax.call('flow.php?step=change_surplus', 'surplus=' + val, changeSurplusResponse, 'GET', 'JSON');
}

/* *
 * 改变余额回调函数
 */
function changeSurplusResponse(obj)
{
  if (obj.error)
  {
    try
    {
      document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = obj.error;
      document.getElementById('ECS_SURPLUS').value = '0';
      document.getElementById('ECS_SURPLUS').focus();
    }
    catch (ex) { }
  }
  else
  {
    try
    {
      document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = '';
    }
    catch (ex) { }
    orderSelectedResponse(obj.content);
  }
}

/* *
 * 改变积分
 */
function changeIntegral(val)
{
  if (selectedIntegral == val)
  {
    return;
  }
  else
  {
    selectedIntegral = val;
  }

  Ajax.call('flow.php?step=change_integral', 'points=' + val, changeIntegralResponse, 'GET', 'JSON');
}

/* *
 * 改变积分回调函数
 */
function changeIntegralResponse(obj)
{
  if (obj.error)
  {
    try
    {
      document.getElementById('ECS_INTEGRAL_NOTICE').innerHTML = obj.error;
      document.getElementById('ECS_INTEGRAL').value = '0';
      document.getElementById('ECS_INTEGRAL').focus();
    }
    catch (ex) { }
  }
  else
  {
    try
    {
      document.getElementById('ECS_INTEGRAL_NOTICE').innerHTML = '';
    }
    catch (ex) { }
    orderSelectedResponse(obj.content);
  }
}


/* *
 * 改变发票的方式
 */
function changeNeedInv()
{
  var obj        = document.getElementById('ECS_NEEDINV');
  var objType    = document.getElementById('ECS_INVTYPE');
  var objPayee   = document.getElementById('ECS_INVPAYEE');
  var objContent = document.getElementById('ECS_INVCONTENT');
  var needInv    = obj.checked ? 1 : 0;
  var invType    = obj.checked ? (objType != undefined ? objType.value : '') : '';
  var invPayee   = obj.checked ? objPayee.value : '';
  var invContent = obj.checked ? objContent.value : '';
  objType.disabled = objPayee.disabled = objContent.disabled = ! obj.checked;
  if(objType != null)
  {
    objType.disabled = ! obj.checked;
  }

  Ajax.call('flow.php?step=change_needinv', 'need_inv=' + needInv + '&inv_type=' + encodeURIComponent(invType) + '&inv_payee=' + encodeURIComponent(invPayee) + '&inv_content=' + encodeURIComponent(invContent), orderSelectedResponse, 'GET');
}

/* *
 * 改变发票的方式
 */
function groupBuyChangeNeedInv()
{
  var obj        = document.getElementById('ECS_NEEDINV');
  var objPayee   = document.getElementById('ECS_INVPAYEE');
  var objContent = document.getElementById('ECS_INVCONTENT');
  var needInv    = obj.checked ? 1 : 0;
  var invPayee   = obj.checked ? objPayee.value : '';
  var invContent = obj.checked ? objContent.value : '';
  objPayee.disabled = objContent.disabled = ! obj.checked;

  Ajax.call('group_buy.php?act=change_needinv', 'need_idv=' + needInv + '&amp;payee=' + invPayee + '&amp;content=' + invContent, null, 'GET');
}

/* *
 * 改变缺货处理时的处理方式
 */
function changeOOS(obj)
{
  if (selectedOOS == obj)
  {
    return;
  }
  else
  {
    selectedOOS = obj;
  }

  Ajax.call('flow.php?step=change_oos', 'oos=' + obj.value, null, 'GET');
}

/* *
 * 检查提交的订单表单
 */
function checkOrderForm(frm)
{
  var paymentSelected = false;
  var shippingSelected = false;

  // 检查是否选择了支付配送方式
  for (i = 0; i < frm.elements.length; i ++ )
  {
    if (frm.elements[i].name == 'shipping' && frm.elements[i].checked)
    {
      shippingSelected = true;
    }

    if (frm.elements[i].name == 'payment' && frm.elements[i].checked)
    {
      paymentSelected = true;
    }
  }

  if ( ! shippingSelected)
  {
    alert(flow_no_shipping);
    return false;
  }

  if ( ! paymentSelected)
  {
    alert(flow_no_payment);
    return false;
  }

  // 检查用户输入的余额
  if (document.getElementById("ECS_SURPLUS"))
  {
    var surplus = document.getElementById("ECS_SURPLUS").value;
    var error   = Utils.trim(Ajax.call('flow.php?step=check_surplus', 'surplus=' + surplus, null, 'GET', 'TEXT', false));

    if (error)
    {
      try
      {
        document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = error;
      }
      catch (ex)
      {
      }
      return false;
    }
  }

  // 检查用户输入的积分
  if (document.getElementById("ECS_INTEGRAL"))
  {
    var integral = document.getElementById("ECS_INTEGRAL").value;
    var error    = Utils.trim(Ajax.call('flow.php?step=check_integral', 'integral=' + integral, null, 'GET', 'TEXT', false));

    if (error)
    {
      return false;
      try
      {
        document.getElementById("ECS_INTEGRAL_NOTICE").innerHTML = error;
      }
      catch (ex)
      {
      }
    }
  }
  frm.action = frm.action + '?step=done';
  return true;
}

/* *
 * 检查收货地址信息表单中填写的内容
 */
function checkConsignee(frm)
{
  var msg = new Array();
  var err = false;
  //邮政编码
  var zip = document.theForm.zipcode.value;
  var zipreg = /^\d{6,8}$/;
  //手机
  var call = document.getElementsByName('mobile')[0].value;
  var callreg = /^1\d{10}$/;
  //电话
  var telp = document.getElementsByName('tel')[0].value;
  var quhao = '';
  var is_quhao = document.getElementsByName('is_quhao')[0].value;
  var telreg = /^0\d{2,3}(\-)?\d{7,8}$/;

  if(is_quhao=='1'){
	  quhao = document.getElementsByName('quhao')[0].value;
	  telp = quhao + telp;
  }
  
  //备注
  var ct = document.getElementsByName('content')[0].value;
  var ctreg = /^[\u0391-\uFFE5A-Za-z0-9]+$/;
  //收货人
  var cons = document.getElementsByName("consignee")[0].value;
  var consreg = /^[\u0391-\uFFE5A-Za-z]+$/;
  //地址
  var addrs = document.getElementsByName('address')[0].value;
 var addrsreg = /^[\u0391-\uFFE5A-Za-z0-9\s]+$/;
  if (consreg.test(cons) == false || cons.length <= 0)
  {
	document.getElementById('consignee_notice').innerHTML = consignee_not_null;
    err = true;
    return false;
//    msg.push(consignee_not_null);
  }
  else
  {
	document.getElementById('consignee_notice').innerHTML = "";
  }	
  if (frm.elements['country'] && frm.elements['country'].value == 0)
  {
	document.getElementById('flow_notice').innertHTML = country_not_null;
//    msg.push(country_not_null);
    err = true;
  }

  if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 1)
  {
	document.getElementById('flow_notice').innerHTML = province_not_null;
    err = true;
	return false;  
//    msg.push(province_not_null);
  }

  if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 1)
  {
	document.getElementById('flow_notice').innerHTML = city_not_null;
    err = true;
	return false;  
//    msg.push(city_not_null);
  }

  if (frm.elements['district'] && frm.elements['district'].length > 1)
  {
    if (frm.elements['district'].value == 0)
    {
      err = true;
	  document.getElementById('flow_notice').innerHTML = district_not_null;
	  return false;  
//      msg.push(district_not_null);
    }
	else
	  {
		  document.getElementById('flow_notice').innerHTML = "";
	  }
	
  }
  
/*  if ( ! Utils.isEmail(frm.elements['email'].value))
  {
	document.getElementById('email_notice').innerHTML = invalid_email;
    err = true;
//    msg.push(invalid_email);
  }
  else
  {
	document.getElementById('email_notice').innerHTML = "";
   }*/

  if (addrsreg.test(addrs) == false || addrs.length <= 0) {
	document.getElementById('address_notice').innerHTML = address_not_null;
    err = true;
	return false; 
  }
  else
  {
	  document.getElementById('address_notice').innerHTML = "";
   }

  if (zip.length > 0 && zipreg.test(zip) == false)
  {
	document.getElementById('zipcode_notice').innerHTML = zipcode_not_null;  
    err = true;
	return false;    
  }else 
  {
	document.getElementById("zipcode_notice").innerHTML = '';
  }
/*
  if(Utils.isEmpty(frm.elements['mobile'].value) && Utils.isEmpty(frm.elements['tel_0'].value) && Utils.isEmpty(frm.elements['tel_1'].value) && Utils.isEmpty(frm.elements['tel_2'].value))
  {
	  document.getElementById('mobile_notice').innerHTML = tel_or_mobile_not_null;
	  err = true;
//  	  msg.push(mobile_not_null);
  }
  if((!Utils.isEmpty(frm.elements['tel_0'].value) && Utils.isEmpty(frm.elements['tel_1'].value)) || (!Utils.isEmpty(frm.elements['tel_1'].value) && Utils.isEmpty(frm.elements['tel_0'].value)))
  {
	  document.getElementById('tel_notice').innerHTML = tel_notice;
	  err = true;   
  }
  if((frm.elements['tel_0'] && frm.elements['tel_0'].value.length > 0 && (!Utils.isTel(frm.elements['tel_0'].value))) || (frm.elements['tel_1'] && frm.elements['tel_1'].value.length > 0 && (!Utils.isTel(frm.elements['tel_1'].value))))
  {
	  document.getElementById('tel_notice').innerHTML = tel_invaild;
	  err = true;
  }
*/
  if(telp.length > 0 && telreg.test(telp) == false ) {
	document.getElementById('tel_notice').innerHTML = tele_invaild;
	err = true;
	return false;
  }else {
	document.getElementById('tel_notice').innerHTML = '';
  }
	
  if(call.length > 0 && callreg.test(call) == false ) {
	document.getElementById('mobile_notice').innerHTML = mobile_invaild;
	err = true;
	return false;
  }else{
	document.getElementById('mobile_notice').innerHTML = '';
  }
  
  if (call.length <= 0 && telp.length <= 0 )
  {
	document.getElementById('tel_notice').innerHTML = tele_mobile_invaild;
	document.getElementById('mobile_notice').innerHTML = tele_mobile_invaild;
	err = true;
	return false;
  }else{
	document.getElementById('mobile_notice').innerHTML = '';
  }
  
/*
  if (frm.elements['mobile'] && frm.elements['mobile'].value.length > 0 && callreg.test(call) == false)
  {
	document.getElementById('mobile_notice').innerHTML = mobile_invaild;
    err = true;
	return false;
//    msg.push(mobile_invaild);
  }else {
	document.getElementById("mobile_notice").innerHTML = '';
  }
*/
  if(ct.length > 0 && ctreg.test(ct) == false ) {
	document.getElementById('message_notice').innerHTML = content_not_null;
	err = true;
	return false;
  }else {
	document.getElementById("message_notice").innerHTML = '';
  }

}