//把站点下面所有跟优惠劵有关的整合到一起
/********************flow.php关联************************/

/*
 *选中优惠劵
 */
$(function(){
    $("input[name='bonus'][type='checkbox']").click(function(){
        var selected=$("input[name='bonus'][type='checkbox']:checked").size();
        if(selected > 1)
        {
            $(this).parent().siblings().children("input").attr("checked",false);
            selected=parseInt(selected-1)
        }
        var bonus_id=$("input[name='bonus'][type='checkbox']:checked").attr("id");
        if(bonus_id!=undefined)
        {
            Ajax.call('/flow.php?step=change_bonus', 'bonus=' + bonus_id, selectBonusResponse, 'GET', 'JSON');
            $('.use_c').html(selected);
        }else{
            Ajax.call('/flow.php?step=cancel_bonus', 'bonus=0', cancelBonusResponse, 'GET', 'JSON');
            $('.use_c').html(selected);
        }       
    });
});
function selectBonusResponse(obj)
{
  if (obj.error)
  {
    alert(obj.error);
    document.getElementById('use_c').innerHTML = "0";
    document.getElementById('less_m').innerHTML = "0";
    $("input[name='bonus'][type='checkbox']:checked").attr("checked",false);
    try
    {
      document.getElementById('bonus_sn').value = '';
    }
    catch (ex) { }
  }
  else
  {
    //alert("恭喜您，优惠劵激活成功");
    document.getElementById('bonus_sn').value = '';
    document.getElementById('less_m').innerHTML = obj.bonus;
    orderSelectedResponse(obj.content);
  }
}
function cancelBonusResponse(obj)
{
  if (obj.error)
  {
    alert(obj.error);
    try
    {
      document.getElementById('bonus_sn').value = '';
    }
    catch (ex) { }
  }
  else
  {
    $("input[name='bonus'][type='checkbox']:checked").attr("checked",false);
    document.getElementById('less_m').innerHTML = obj.bonus;
    document.getElementById('use_c').innerHTML = '0';
    document.getElementById('bonus_sn').value = '';
    orderSelectedResponse(obj.content);
  }
}
/* *
 * 改变红包
 */
function changeBonus(val)
{
  if (selectedBonus == val)
  {
    return;
  }
  else
  {
    selectedBonus = val;
  }
  Ajax.call('/flow.php?step=change_bonus', 'bonus=' + val, changeBonusResponse, 'GET', 'JSON');
}
/* *
 * 改变红包的回调函数
 */
function changeBonusResponse(obj)
{
  if (obj.error)
  {
    alert(obj.error);

    try
    {
      document.getElementById('ECS_BONUS').value = '0';
    }
    catch (ex) { }
  }
  else
  {
    alert("恭喜您，优惠劵激活成功");
    orderSelectedResponse(obj.content);
  }
}
/**
 * 验证红包序列号
 * @param string bonusSn 红包序列号
 */
function checkBonus()
{
  var bonusSn =   document.getElementById('bonus_sn').value;
  if(bonusSn=='' || bonusSn==undefined)
  {
      alert("请正确输入优惠券号！");
      return false;
  }
  $("input[name='bonus'][type='checkbox']").each(function(){
      $(this).attr("checked",false);
  });
  Ajax.call('/flow.php?step=validate_bonus', 'bonus_sn=' + bonusSn, showBonusResponse, 'GET', 'JSON');
}
function cancelBonus()
{
    var bonusSn =   document.getElementById('bonus_sn').value;
  if(bonusSn=='' || bonusSn==undefined)
  {
      alert("请正确输入优惠券号！");
      return false;
  }  
  Ajax.call('/flow.php?step=cancel_bonus', 'bonus=0', cancelBonusResponse, 'GET', 'JSON');
}
/**
 *显示订单总额
 **/
function showBonusResponse(d){
    if(d.error == ""){
        alert("恭喜您，优惠劵激活成功");
        document.getElementById('show_order_total').innerHTML = d.content;
        document.getElementById('less_m').innerHTML = d.bonus;
        document.getElementById('use_c').innerHTML = '1';
    }else{
        if(d.error != '填写正确的送货地址'){
            alert(d.error);
        }
    }
}
/**
 * 验证红包序列号
 * @param string bonusSn 红包序列号
 */
function validateBonus(bonusSn)
{
    if(bonusSn=='' || bonusSn==undefined)
    {
        alert("请正确输入优惠券号！");
        return false;
    }
  Ajax.call('/flow.php?step=validate_bonus', 'bonus_sn=' + bonusSn, validateBonusResponse, 'GET', 'JSON');
}

function validateBonusResponse(obj)
{

if (obj.error)
  {
    alert(obj.error);
    orderSelectedResponse(obj.content);
    try
    {
      document.getElementById('ECS_BONUSN').value = '0';
    }
    catch (ex) { }
  }
  else
  {
    orderSelectedResponse(obj.content);
  }
}

/***********************s_flow.php关联*************************/
//验证优惠券
function check_bonus_sn()
{

    var bonus_sn = $('#bonus_sn').val();
    if(bonus_sn =='' || bonus_sn==undefined){
        alert('请正确输入优惠券号');
        return false;
    }
    var pay_id = $('input[name="payment"]:checked').val();
    if(pay_id==undefined)pay_id=3;
    var res = Ajax.call('/s_flow.php?act=check_bonus_no', 'bonus_sn=' + bonus_sn+'&pay_id='+pay_id, null, "POST", "JSON", false);
    if (!res)
    {
        res.error = 1;
        alert('连接失败，请联系客服！');
        return false;
    }
    if (res.message){alert(res.message);}
        if (res.error == 1){return false;}
        if(res.error == 0)
        {
            alert("恭喜您，优惠劵激活成功");
            $(".out_payinfo").html(res.content).show();
        }
}
//验证优惠券
function check_bonus_sn_again()
{
    $("#check_bonus_sn_bnt").css({"display":""});
    $("#bonus_sn").css({"display":""});
    $("#bonus_sn_info").html('');
    select_pay($("#pay_id").val());
}

function s_cancel_bonus()  //小购物车取消使用优惠劵
{
    var bonusSn =   document.getElementById('bonus_sn').value;
    var pay_id=$("input[name='payment']:checked").val();
    if(pay_id==undefined) pay_id=1;
  if(bonusSn=='' || bonusSn==undefined)
  {
      alert("请正确输入优惠券号！");
      return false;
  }  
  Ajax.call('/s_flow.php?act=cancel_bonus', 'bonus=0&pay_id='+pay_id, s_cancelBonusResponse, 'POST', 'JSON');
}

function s_cancelBonusResponse(obj)
{
   if (obj.error)
  {
    alert(obj.message);
  }
  else
  {
    document.getElementById('bonus_sn').value = '';
    $(".out_payinfo").html(obj.content).show();   
  }   
}