$(function(){
	$(".js_selmun ul li").hover(function(){
		$(this).find("p.pti").addClass("on");
		$(this).find(".m_cont").show();
		$(this).find("p.h").addClass("on_act");
		$(this).find("p .allpr_icon").addClass("allpr_on");
	},function(){
		$(this).find("p.pti").removeClass("on");
		$(this).find(".m_cont").hide();
		$(this).find("p.h").removeClass("on_act");
		$(this).find("p .allpr_icon").removeClass("allpr_on");
	})
	
	$(".llist .rt_list p").hover(function(){
		$(".llist .rt_list p").removeClass("act");
		$(this).addClass("act");
		$(this).parent(".rt_list").parent(".llist").next(".show_list").find(".sel_conlist").hide();
		$(this).parent(".rt_list").parent(".llist").next(".show_list").find(".sel_conlist").eq($(this).attr("data")).show();
		
		//alert($(this).attr("data"));
		//$(this).parent(".rt_list").parent(".llist").next(".show_list").html("");
	},function(){
		//$(this).removeClass("act");
	})
	
	$(".llist .sor_selshow").hover(function(){
		$(".llist .rt_list p").removeClass("act");
		$(this).parent(".llist").next(".show_list").find(".sel_conlist").hide();
		$(this).parent(".llist").next(".show_list").find(".sel_conlist").eq($(this).attr("data")).show();
	},function(){
		//$(this).removeClass("act");
	})
	
	$(".zyff_cont .rt_list p").hover(function(){
		$(this).parent(".rt_list").parent(".llist").siblings(".sel_adimg").find("p").hide();
		$(this).parent(".rt_list").parent(".llist").siblings(".sel_adimg").find("p").eq($(this).attr("data")).show();
	},function(){
		//
	})
	
	
})