function get_top_cart_info(){

    //自获取购物车商品总数与总价格
    var res = Ajax.call('/flow.php?step=newstatus', '', null, 'POST', 'JSON',false);
    if (!res) return false;
    $("#cart_goods_number").html(res.goods_number);$("#cart_goods_total").html(res.goods_total);

/*    $("#MyCart").mousemove(function(){
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
        });*/
}
//}
//$(document).ready(function() {
//    get_top_cart_info();
//});
