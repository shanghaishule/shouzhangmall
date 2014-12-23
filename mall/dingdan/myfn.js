var myfn = {
//数量增加函数
add:function(number){
   var num = document.getElementById(number);
   if( !Utils.isNumber(num.value)) return false;
   num.value = parseInt(num.value) + 1;		
},
//数量减少函数
decrease:function(number){
   var num = document.getElementById(number);
   if( !Utils.isNumber(num.value))  return false; 
   if (parseInt(num.value) == 1) return;
   num.value = parseInt(num.value) - 1;  
},
flowAddToCart:function(goodsId,number){
    var goods = 	'{"spec":[],"goods_id":'+goodsId+',"number":"'+number+'","parent":0}';
    var res = Ajax.call('/flow.php?step=add_to_cart', 'goods=' + goods, null, 'POST', 'JSON',false);
    if (!res){alert("添加到购物车失败，请重新点击尝试！");}
    if (res.error > 0){
        if (res.message){alert(res.message);}
        return false;
    }
  _paq.push(['addEcommerceItem',goodsId,res.goods_name,'','',res.goods_number]);
  _paq.push(['trackEcommerceCartUpdate',res.goods_total]);
  _paq.push(['trackPageView']);
   window.location.reload();
},flowPackageAddToCart:function(packageId,number){
        var package_info = 	'{"package_id":"'+packageId+'","number":"'+number+'"}';
/*        var package_info = new Object();
        package_info.package_id = packageId
        package_info.number     = number;*/
//        alert(package_info.package_id);
//        return;
        var res = Ajax.call('/flow.php?step=add_package_to_cart', 'package_info=' + package_info, null, 'POST', 'JSON',false);
        if (!res){alert("添加到购物车失败，请重新点击尝试！");}
        if (res.error > 0){
            if (res.message){alert(res.message);}
            return false;
        }
		_paq.push(['addEcommerceItem',packageId,res.goods_name,'','',res.goods_number]);
  		_paq.push(['trackEcommerceCartUpdate',res.goods_total]);
 		_paq.push(['trackPageView']);
        window.location.reload();
    },
myNewaddToCart:function(obj, goodsId,numberId, gotocart){
  var goods        = new Object(); 
  var spec_arr     = new Array();
  var fittings_arr = new Array();
  var number       = 1;
 // var formBuy      = document.forms['ECS_FORMBUY'];
  if(!Utils.isNumber(numberId)){
	  number = document.getElementById(numberId).value; 
  }
 if(!Utils.isNumber(goodsId)){
 	goodsId = document.getElementById(goodsId).value;
 }
  // 检查是否有商品规格
  goods.spec     = spec_arr;
  goods.goods_id = goodsId;
  goods.number   = number;
  goods.parent = 0;  
  var res = Ajax.call('/flow.php?step=add_to_cart', 'goods=' + goods.toJSONString(), null, 'POST', 'JSON',false); 
  if (!res){alert("添加到购物车失败，请重新点击尝试！");return false;}
  $('#goods_num').html(res.goods_number);
  if (res.error > 0){
	  if (res.message){alert(res.message);}
  	  return false;
  }
    if(gotocart=='direct'){
        _paq.push(["setCustomUrl", "Virtual/Order/Goumai/" + LR_websiteid]);
        _paq.push(["trackPageView","Virtual/Order/Goumai/" + LR_websiteid]);
    }else{
      _paq.push(['addEcommerceItem',goodsId,res.goods_name,'','',res.goods_number]);
      _paq.push(['trackEcommerceCartUpdate',res.goods_total]);
      _paq.push(['trackPageView']);
    }
  if (gotocart)
  {
      if(gotocart=='direct'){
          location.href = "/flow.php?step=directbuy";
      }else if(gotocart =='quick'){
          myfn.show_catr_back(obj,res,"#buy_now");
          $('.goto_pay').click(function(){
              $(".pop_container").hide();
          })
          get_favourable_list();//重新加载优惠列表
      }else if(gotocart == 'order'){
          get_favourable_list();//重新加载优惠列表
          return false;
      }else if(gotocart == 'blank'){
      get_favourable_list();//重新加载优惠列表
      return false;
      }else{
          location.href = "/flow.php?step=directbuy";
      }

		  return false;
  }
 	myfn.show_catr_back(obj,res,"/flow.php?step=directbuy");
},
myNewaddPackageToCart:function(obj,packageId,numberId,gotocart)
{ 
  var number = 1;
  var package_info = new Object();
  if(!Utils.isNumber(packageId)){
	  packageId = document.getElementById(packageId).value;
	 }
  if(!Utils.isNumber(numberId)){
	  number = document.getElementById(numberId).value; 
  }

  package_info.package_id = packageId
  package_info.number     = number;

  var res = Ajax.call('/flow.php?step=add_package_to_cart', 'package_info=' + package_info.toJSONString(), null, 'POST', 'JSON',false);
  if (!res){alert("添加到购物车失败，请重新点击尝试！");return false;}
  if (res.error > 0){
	  if (res.message){alert(res.message);}
  	  return false;
  }
if(gotocart=='direct'){
    _paq.push(["setCustomUrl", "Virtual/Order/Goumai/" + LR_websiteid]);
    _paq.push(["trackPageView","Virtual/Order/Goumai/" + LR_websiteid]);
}else{
    _paq.push(['addEcommerceItem',packageId,res.goods_name,'','',res.goods_number]);
    _paq.push(['trackEcommerceCartUpdate',res.goods_total]);
    _paq.push(['trackPageView']);
}

 if (gotocart)
  {
      if(gotocart=='direct'){
          location.href = "/flow.php?step=directbuy";
      }else if(gotocart =='quick'){
          myfn.show_catr_back(obj,res,"#buy_now");
          $('.goto_pay').click(function(){
              $(".pop_container").hide();
          })
          get_favourable_list();//重新加载优惠列表
      }else if(gotocart == 'order'){
          get_favourable_list();//重新加载优惠列表
          location.hash="buy_now";
          return false;
      }else if(gotocart == 'blank'){
     get_favourable_list();//重新加载优惠列表
     return false;
 }else{
          location.href = "/flow.php?step=cart";
      }
		 return false;
  }
 	myfn.show_catr_back(obj,res,"/flow.php?step=directbuy");
},
show_catr_back:function(obj,res,url){
	if (obj){
		var  add_catr_back = '<div class="pop_container"><div class="pop_top"><div class="left"><img src="/themes/chinaskin/images/2013/mycart/cart.png" /></div><div class="right"><p class="tip">此商品已成功放入购物车</p>'+
            '<p class="total"></p><p class="goto"><a class="goto_shop" href="javascript:;" title="继续购物"><< 继续购物</a>'+
            '<a class="goto_pay" href="'+url+'" title="立即结算"></a></p></div></div>'+
            '<div class="pop_list"><p class="pop_list_p"><span class="fl">购买此商品的用户还买过：</span><a class="red_txt" href="javascript:;">您可能会喜欢的商品 >></a></p><ul class="product_list"></ul></div>'+'<a href="javascript:;" class="pop_close" title="关闭">关闭</a></div>';
	  //clearTimeout(Dtimer);
        var promotions = '';
	  if ($(".pop_container").length < 1)  $(add_catr_back).appendTo('body');
	  var C = $(".pop_container");
	  C.find(".pop_close").click(function(){C.hide()});
        C.find('.goto_shop').click(function(){C.hide();});
        $('p.total').html('共有<span class="red_txt">'+res.goods_number+'</span>件商品，总计<span class="red_txt">'+res.goods_total.substring(0,res.goods_total.length-1)+'</span> 元');
        if(res.promotions){
            var pro_goods = res.promotions;
            for(var i=0;i<pro_goods.length;i++){
                if(pro_goods[i].act_id != undefined){
                    promotions += '<li><p><a href="/tzjs-p'+pro_goods[i].act_id+'.html"><img  src="'+pro_goods[i].goods_thumb+'" /></a></p><p class="gname"><a href="/tzjs-p'+
                        pro_goods[i].act_id+'.html" title="'+pro_goods[i].act_name+'">'+pro_goods[i].act_name.substring(0,16)+'</a></p><p class="red_txt">售价:￥'+pro_goods[i].shop_price+'</p></li>';
                }else if(pro_goods[i].goods_id != undefined){
                    promotions += '<li><p><a href="/goods-'+pro_goods[i].goods_id+'.html"><img  src="'+pro_goods[i].goods_thumb+'" /></a></p><p class="gname"><a href="/goods-'+
                        pro_goods[i].goods_id+'.html" title="'+pro_goods[i].goods_name+'">'+pro_goods[i].goods_name.substring(0,16)+'</a></p><p class="red_txt">售价:￥'+pro_goods[i].shop_price+'</p></li>';
                }
            }
            C.find('.product_list').html(promotions);
        }
		if($(obj).attr('coords')!=undefined && $(obj).attr('coords')!=''){
            var xy = $(obj).attr('coords').split(',');
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/chrome\/([\d.]+)/)){
                C.css({"top": $(obj).offset().top+parseInt(xy[1]) ,"left":parseInt(xy[0])});
            }else{
                C.css({"top": $(obj).offset().top+parseInt(xy[1]) - C.height() ,"left":$(obj).offset().left+parseInt(xy[0])/2 -  (C.width()/2) + ($(obj).width()/2)});
            }
		}else{
			C.css({"top": $(obj).offset().top - C.height() ,"left":$(obj).offset().left -  (C.width()/2) + ($(obj).width()/2)});
		}

	  C.show();
	  //Dtimer = setTimeout('$("#add_catr_back").hide()',3000);
	}

    $('p.total').html('共有<span class="red_txt">'+res.goods_number+'</span>件商品，总计<span class="red_txt">'+res.goods_total.substring(0,res.goods_total.length-1)+'</span> 元');
	  $("#MyCart_List").html('');//清空购物显示列表	
},
add_comment_consult:function(username,comment_content,id_value,comment_type){
    var comment  = new Object(); 
	 comment.username = document.getElementById(username).value;
	 comment.rank = document.getElementById("star_value").value;
	 comment.content  = document.getElementById(comment_content).value;
	 comment.id       = id_value;
	 comment.type 	  =	comment_type;
	 if(comment.type ==2){
		 comment.captcha  = document.getElementById('captcha_value').value; 
		 comment.capt	  = 1; 
			if (comment.captcha == '' || comment.captcha.length < 4){
				alert("验证码为空或内容长度过短！");
				return false;
			}
	 }else if(comment.type ==5){
		 comment.phone = document.getElementById('phone').value; 
	 }
	if (comment.username == '' || comment.username.length < 2){
		alert("没有填写名称或长度过短！");
		return false;
	}
	if (comment.content == '' || comment.content.length < 6){
		alert("咨询内容为空或内容长度过短！");
		return false;
	}
	 var res = Ajax.call('/comment.php', 'cmt=' + comment.toJSONString(), null, 'POST', 'JSON',false); 
	  if (!res){alert("操作失败，请重新尝试！");return;}
	  if (res.error==0){
	  	  alert(res.message);
		  document.getElementById(username).value = '';
		  document.getElementById(comment_content).value = '';
          myfn.showComment(comment);
		  
	  }else{
	  	  alert(res.message);
	  } 
	  if(comment.type ==2){
		  document.getElementById('captcha').src='/captcha.php?'+Math.random();
		  document.getElementById('captcha_value').value = ''; 
	  }else if(comment.type ==4){
		  document.getElementById('phone').value = '';
	  }

},
comment_page:function(page,cat_id){
    var res = Ajax.call('/new_category.php?act=get_comment_page', 'page=' + page+'&cat_id='+cat_id, null, 'POST', 'JSON',false); 
    if(res.content){
        $("#comment_page_content").html(res.content);
    }
    return false;
},
showCaptcha:function(obj){
$("#captcha").attr("src","/captcha.php");
document.getElementById('captcha').style.display='inline';
obj.style.display='none';
},
pl_list_team:document.getElementById('pl_list_team'),
coment_list1:document.getElementById('coment_list1'),
coment_list2:document.getElementById('coment_list2'),
myMarquee:function(){
if(myfn.coment_list2.offsetHeight-myfn.pl_list_team.scrollTop<=0)
   myfn.pl_list_team.scrollTop-=myfn.coment_list1.offsetHeight;
   else{
   myfn.pl_list_team.scrollTop++;
   }
},
commentScroll:function(){
	var speed=50;
   myfn.coment_list2.innerHTML=myfn.coment_list1.innerHTML;
   var MyMar=setInterval(function(){myfn.myMarquee();},speed);
   myfn.pl_list_team.onmouseover=function(){clearInterval(MyMar);}
   myfn.pl_list_team.onmouseout=function(){MyMar=setInterval(function(){myfn.myMarquee();},speed);}
},
setSwitch:function(product_img,des_id,special_price,original,product_id,href){
$('.set_products_info a').removeClass('current');
$('#product_img').attr('src',product_img);
$('#product_url').attr('href',href);

var alength = $('.set_products_info a').length;
for(var i=1;i<=alength;i++){
$('#product_desc_'+i).hide();
}
$('#product_desc_'+des_id).show();

$('#special_price').html(special_price);
$('#original').html(original);
$('#product_id').val(product_id);
//console.log(this);
$('#a_'+des_id).addClass('current');
},
 homeSwitch:function(className,id){
     $('.'+className).hide();
	 $('.sliderMenuBox li').removeClass('current');
     $('#'+id).show();
	 $('#id_'+id).addClass('current');
    // $(id).show();
 },
    addFavorite:function(goods_id,type)
{
    if(Utils.isNumber(goods_id)){
        var goods = new Object();
        goods.goods_id = goods_id;
        goods.type = type;
        var res = Ajax.call('/flow.php?step=add_favorite', 'goods=' + goods.toJSONString(), null, 'POST', 'JSON',false);
        if (!res){
            alert("添加到收藏失败，请重新点击尝试！");
            return false;
        }
        if (res.error > 0){
            if (res.message){alert(res.message);}
            return false;
        }else{
            alert('收藏成功！')
        }
    }else{
        if (document.all)
        {
            window.external.addFavorite(window.location.href,document.title);
        }
        else if (window.sidebar)
        {
            try{
                window.sidebar.addPanel(document.title,window.location.href, "");
            }catch(e) {
                alert("加入收藏夹失败，请使用 Ctrl+D 收藏");
            }
        }else{
            alert('加入收藏夹失败，请使用 Ctrl+D 收藏');
        }
    }

},
/*get_top_cart_info:function(){
    //自获取购物车商品总数与总价格
    var res = Ajax.call('/flow.php?step=newstatus', '', null, 'POST', 'JSON',false);
    if (!res) return false;
    $("#cart_goods_number").html(res.goods_number);$("#cart_goods_total").html(res.goods_total);

    $("#MyCart").mousemove(function(){
        var error = "获取购物车中商品失败！";
        if($("#MyCart_List").html()=='' || $("#MyCart_List").html()== error ){
            var res = Ajax.call('/flow.php?step=getcartgoods', '', null, 'POST', 'JSON',false);
            if (!res) $("#MyCart_List").html(error);
            $("#MyCart_List").html(res.content);
        }
        $("#MyCart_List").fadeIn();
    }).mouseleave(function(){
            Dtimer = setTimeout('$("#MyCart_List").fadeOut()',100);
        });
    $("#MyCart_List").mousemove(function(){
        clearTimeout(Dtimer);
    }).mouseleave(function(){
            $(this).fadeOut()
        });
} ,*/
delToCart:function(rec_id)
{
    if (typeof(Nodelcatr) != "undefined"){
        alert("本页面不能使用此删除功能！");
        return false;
    }

    var res = Ajax.call('/flow.php?step=deltocart', 'rec_id=' + rec_id, null, 'POST', 'JSON',false);
    if (!res){alert("删除商品失败，请重新点击尝试！");}
    if (res.error > 0){
        if (res.message){alert(res.message);}
        return false;
    }
    $("#cart_goods_number").html(res.goods_number);$("#cart_goods_total").html(res.goods_total);
    $("#MyCart_List").html(res.content);
},del_cart_goods: function (id)
{

    var res = Ajax.call('/flow.php?step=drop_goods&is_ajax=1', 'id=' + id, null, "POST", "JSON", false);
    if (!res){
        alert('连接失败，请联系客服！');
        return false;
    }
    if (res.message){alert(res.message);}

    var arr = eval(res.yiqifa);

    /** yiqifa 网盟推广 start ***/
    _adwq.push([ '_setDataType', 
        'delete'               // 指定数据类型为删除购物车 - 固定值 - 必填项
    ]); 

    _adwq.push([ '_setCustomer', 
        res.user_id                // 请输入用户会员ID或用户名 
    ]); 
    $.each(arr,function(idx,item){ 
        _adwq.push(['_setItem', 
            item.yiqifa_id,            // 请填入商品编号 - 必填项 
            item.name,            // 请填入商品名称 - 必填项 
            item.price,             // 请填入商品金额 - 必填项 
            item.number,             // 请填入商品数量 - 必填项 
            '',          // 请填入商品分类编号 - 必填项 
            ''           // 请填入商品分类名称 - 必填项 
        ]); 
    });
    _adwq.push([ '_trackTrans' ]);
    /** yiqifa 网盟推广 end ***/
    if(typeof(res.delGoods)=="object" || res.delGoods!=undefined || res.delGoods!=null){
        var goods = res.delGoods;
        for(var i=0;i<res.delGoods.length;i++){
            if(goods[i] !=null){
                myfn.setHistory('dgoods',goods[i].goods_id,goods[i].goods_name,goods[i].goods_img,goods[i].price,goods[i].type,goods[i].attr_value);
            }

        }
    }
    if (res.error == 1){return false;}
    window.location.reload();
    return true;
}, edit_goods_num: function (id,type)
{
    if (type == 'down' && $("#cart_goods_num_"+id).val() == 1)
    {
        alert('订购数量不能小于 1,不订购此商品可删除！');
        return false;
    }
    var res = Ajax.call('/flow.php?step=edit_goods_num', 'id=' + id+'&type='+type, null, "POST", "JSON", false);
    if (!res)
    {
        res.error = 1;
        alert('连接失败，请联系客服！');
        return false;
    }
    if (res.message){alert(res.message);}
    window.location.reload();
    return true;
}, direct_edit_goods_num: function (id,type)
    {
        if (type == 'down' && $("#cart_goods_num_"+id).val() == 1)
        {
            alert('订购数量不能小于 1,不订购此商品可删除！');
            return false;
        }
        var res = Ajax.call( '/flow.php?step=edit_goods_num&is_ajax=1', 'id=' + id+'&type='+type, null, "POST", "JSON", false);
        if (!res)
        {
            res.error = 1;
            alert('连接失败，请联系客服！');
            return false;
        }
        if (res.message){
            alert(res.message);
        }
        if(res.direct_cart){
            $('table.flwoTable tbody').html(res.direct_cart);
            $('.payBox .fr').html(res.direct_total);
        }
        myfn.calculate_bonus();//获取优惠劵
        myfn.get_free_gift();//获取满赠商品
        return true;
    },select_all:function(arg,id){
    var selects = document.getElementById(id);
    var checks = selects.getElementsByTagName('input');
    for(var i=0;i<checks.length;i++){
        if(checks[i].type == 'checkbox'){
            checks[i].checked = arg.checked;
           }
        }
    },
 deleteCartGoods:function(id){
     var selects = document.getElementById(id);
     var checks = selects.getElementsByTagName('input');
     var ids = '';
     for(var i=0;i<checks.length;i++){
         if(checks[i].type == 'checkbox' && checks[i].checked){
            if(Utils.isNumber(checks[i].value)) ids += checks[i].value+';';
         }
     }
     ids = ids.substring(0,ids.length-1);
     if(ids == ''){
         alert('请先选择要删除的产品！');
     }else{
         myfn.del_cart_goods(ids);
     }
 },
    setCookie:function(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    cookieVal=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
    document.cookie=cookieVal;
},getCookie:function(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return "";
},setHistory:function(cookieName,goods_id,goods_name,goods_img,goods_price,goods_type,goods_attr){
        if(cookieName !='' && goods_id !=undefined && goods_name !=undefined && goods_img !=undefined && goods_price !=undefined && goods_type !=undefined && goods_attr !=undefined)
        var goods = goods_id+'@@'+goods_name+'@@'+goods_img+'@@'+goods_price+'@@'+goods_type+'@@'+goods_attr;
        var hgoods = myfn.getCookie(cookieName);
        if(hgoods){
            var temp = hgoods.split('#');
            if(temp.length>8){
                temp.shift();
            }
            hgoods = temp.join('#');
            if(hgoods.indexOf(goods_name)<0){
                hgoods += ('#'+goods);
            }
        }else{
            hgoods = goods;
        }
        myfn.setCookie(cookieName,hgoods,30);
    }
,getHistoryGoods:function(cookieName){
        var hgoods = myfn.getCookie(cookieName);
        var html = '';
        if(hgoods !='' && hgoods != undefined){
        var temp = hgoods.split('#');
        for(var i=temp.length-1;i>=0;i--){
            var goods = temp[i].split('@@');
            var goods_id = goods[0];
            var addto = ''
            if(goods[4]=='g') {url = 'goods-'+goods_id+'.html';addto = 'javascript:myfn.flowAddToCart('+goods_id+',1);'}
            if(goods[4] =='p'){url = 'tzjs-p'+goods_id+'.html';addto = 'javascript:myfn.flowPackageAddToCart('+goods_id+',1);'}
                var img = goods[2];
            var goods_price = goods[3];
            var goods_name = goods[1];
            var spec = goods[5];
            if(goods_id !=undefined && img != undefined && goods_price != undefined && spec !=undefined){
            html += '<li><div class="left"><a href="'+url+'"><img src="'+img+'" /></a></div><div class="right"><p><a class="links" href="'+url+'">'+
                goods_name+'</a></p><p class="price">￥'+goods_price+'</p><p>规格：'+spec+'</p><p>数量：1</p><p><a href="'+addto+'" class="buy" title="放入购物车"></a>'+
                '</p></div></li>'
            }
            }
        }
        if (html=='') html = '暂无记录';
        return html;
    }
,showComment:function(cm){
    var d = new Date();
    var month = d.getMonth()+1;
    var day   = d.getDate();
    if(month <10){
    month = '0' + month;
    }
    if(day <10){
    day = '0' + day;
    }
    var timeStr = d.getFullYear()+'-'+month+'-'+day;
    var cmStr = '<li><div class="comment_name"><strong class="black_color">昵称：</strong><strong class="reb_color">'+cm.username + '</strong></div>  <div id="star_c"><span>评分：</span><ul>';
    var starStr = '';
    for(var j =1;j<6;j++){
        starStr = starStr + '<li id="'+j+'" ';
        if(j<=cm.rank){
            starStr = starStr + 'class ="on" '
        }
        starStr = starStr + ' >'
        starStr = starStr + '</li>';
    }
    cmStr  = cmStr + starStr + '</ul></div>'+'<div style="float:right;margin-right:15px;">'+timeStr+'</div>'+'<p class="clear">' + cm.content + '</p></li>';
    
    var html = $("#coment_list1").html();
    html = cmStr + html;
    
    $("#coment_list1").html(html);
    },
    
check_add_fav:function(type,act_id,id)
{

    var url = 'type='+type+'&goods='+id+'&act_id='+act_id;
    var res = Ajax.call('/favourable.php?is_ajax=1',url, null, 'POST', 'JSON',false);
    if (!res){
        alert("添加到购物车失败，请重新点击尝试！");
        return false;
    }
    if (res.error == 1){
        if (res.message){
            alert(res.message);
        }
        return false;
    }
    if(res.error == 3){
        if(confirm(res.message)){
            return true;
        }else{
            return false;
        }
    }
},

add_favourable_to_car:function(type,act_id,id,is_reload)
{
    var val,url;
    url = url = 'type='+type+'&goods='+id+'&act_id='+act_id;
    var res = Ajax.call('/favourable.php?is_ajax=1', url, null, 'POST', 'JSON',false);
    if (!res){
    	alert("添加优惠失败，请重新再试！"); 
    	return false;
    }
    if (res.error == 1){
        alert(res.message);
        return false;
    }
    if (is_reload == true){
        if (confirm("已成功添加到购物车，是否前往前往购物车!"))
        {
            location.href = '/flow.php?step=pre_cart';
        }
        return false;
    }
    window.location.reload();
    return false;
},add_package:function(pid,number,reload){
        var package_info = new Object();
        package_info.package_id = pid
        package_info.number     = number;
        var res = Ajax.call('/flow.php?step=add_package_to_cart&is_ajax=1', 'package_info=' + package_info.toJSONString(), null, 'POST', 'JSON',false);
        if (!res){
            alert("添加到购物车失败，请重新点击尝试！");
            return false;
        }
        if (res.error > 0){
            if (res.message){alert(res.message);}
            return false;
        }

        if (reload)
        {
            window.location.href = "/flow.php?step=pre_cart&r="+Math.ceil(Math.random()*1000)+"#cuxiao_order";
            return false;
        }
    }
,calculate_bonus:function(){
    var bonus_sn=$("#bonus_sn");
    if(bonus_sn.val()=='')
    {
        bonus_sn.val('');
    }
    var res=Ajax.call('/flow.php?step=calculate_bonus', '', null, 'POST', 'JSON', false);
    if(!res)
    {
        alert("重新计算优惠劵失败！");
        return false;
    }
    $("#bonus_list").html(res.content);
    return true;
},
get_free_gift:function(){

    var res=Ajax.call('/flow.php?step=get_free_gift', '', null, 'POST', 'JSON', false);
    if(!res)
    {
        alert("获取赠品失败！");
        return false;
    }
    $(".choice_gift").html(res.content);
    return true; 
},
add_free_gift:function(type,act_id,goods_id)
{
    var type = type;
    var act_id = act_id*1;
    var goods_id =goods_id*1;
    
    if(type == '' || act_id == 0 || goods_id == 0)
    {
        alert("参数错误，请重试");
        return false;
    }
    var url='type='+type+'&goods='+goods_id+'&act_id='+act_id;
    var res = Ajax.call('/favourable.php?is_ajax=1', url, null, 'POST', 'JSON', false);
    if(!res)
    {
        alert("添加赠品失败，请重新添加");
        return false;
    }
    if(res.error>0)
    {
        alert(res.message);
        return false;
    }
    window.location.reload();
    return false;        
}
}