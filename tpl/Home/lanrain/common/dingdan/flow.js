//订单商品数目修改
function cut_goods_number(goods_id,subtotal)
{
	var goods_number = parseInt($("#goods_number_"+goods_id).val());
	var goods_subtotal = parseFloat(subtotal);
	if (goods_number <= 1)
	{
		return false;
	}
	$("#goods_number_"+goods_id).val(goods_number-1); 
	$("#goods_numbers_"+goods_id).html(goods_number-1);
	$("#formCart").submit(); 
}

function add_goods_number(goods_id,subtotal)
{
	var goods_number_int = parseInt($("#goods_number_"+goods_id).val())+1;
	$("#goods_number_"+goods_id).val(goods_number_int); 
	$("#goods_numbers_"+goods_id).html(goods_number_int);
	document.formCart.submit(); 
	alert(1);
}

function drop_goods(goods_id)
{
	art.dialog({
		border: false,
		title: '',
		follow: document.getElementById('Shanc'),
		content: '你确定不够买该商品吗？'
	});
}

function inputMobileNum(This)
{
	var num = $.trim($(This).val());
	var res = Ajax.call('/flow.php?step=input_mobile&is_ajax=1', 'input_mobile=' + num, null, 'POST', 'JSON',false);
	if (res.error == 1) {
		alert(res.message);
	}else {
		var cancel_html = '<li>如果您不想享受会员优惠，可以<a href="javascript:void(0);" onclick="memberCancel(this);" class="yh_btn02">点击取消</a>会员优惠</li>';
		$(This).parent().parent().empty().html(cancel_html);
	}
	if(res.direct_cart){
		$('table.flwoTable tbody').html(res.direct_cart);
		$('.payBox .fr').html(res.direct_total);
	}
	return true;
}

function memberCancel(This)
{
	var res = Ajax.call('/flow.php?step=input_mobile&is_ajax=1', 'member_cancel=1', null, 'POST', 'JSON',false);
	if(res.direct_cart){
		$('table.flwoTable tbody').html(res.direct_cart);
		$('.payBox .fr').html(res.direct_total);
		var input_html = '';
		if (res.message > 0) {
			input_html = '<li>您已经登录，可以<a href="javascript:void(0);" onclick="memberDiscount(this);" class="yh_btn02">点击享受</a>会员优惠</li>';
		}else {
			input_html = '<li>如果您已成功注册瓷肌会员，请立即<a href="/api/users/ajax/user.php?act=login" class="yh_btn01"> 登录 </a>或<input type="text" class="vip_num" placeholder="输入你的手机号" onblur="if(this.value==\'\'){this.value=\'输入你的手机号\';};inputMobileNum(this);" onfocus="if(this.value==\'输入你的手机号\'){this.value=\'\';}"  value="输入你的手机号">即可享受<span>会员95折扣</span>；</li>'
    			+'<li>如果您还未注册，立即注册<span>送10元券并同享95折扣</span><a href="/api/users/ajax/user.php?act=register" class="yh_btn02">立即注册 ></a></li>';
		}

		$(This).parent().parent().empty().html(input_html);
	}

	return true;
}

function memberDiscount(This)
{
	var res = Ajax.call('/flow.php?step=input_mobile&is_ajax=1', 'member_discount=1', null, 'POST', 'JSON',false);
	if(res.direct_cart){
		$('table.flwoTable tbody').html(res.direct_cart);
		$('.payBox .fr').html(res.direct_total);
		var input_html = '<li>如果您不想享受会员优惠，可以<a href="javascript:void(0);" onclick="memberCancel(this);" class="yh_btn02">点击取消</a>会员优惠</li>';
		$(This).parent().parent().empty().html(input_html);
	}
}