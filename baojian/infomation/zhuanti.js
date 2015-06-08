/*失焦获焦*/
function inputTipText() {
	$("input[class*=common_text]")
			.each(function() {
				var oldVal = $(this).val();
				$(this)
						.css({"color": "#999"})
						.focus(function() {
							if ($(this).val() != oldVal) {
								$(this).css({"color": "#333"})
							} else {
								$(this).val("").css({"color": "#999"})
							}
							$(this).css({"border": "1px solid #3b5998"})
						})
						.blur(function() {
							if ($(this).val() == "") {
								$(this).val(oldVal).css({"color": "#999"})
							}
							$(this).css({"border": "1px solid #dfdfdf"})
						})
						.keydown(function() {
							$(this).css({"color": "#333"})
						});

			});
}

$(function() {
	inputTipText();
})

/*默认显示一点内容点击全部显示*/
$(function() {
	var timer = [];
	jQuery(".n_drop-more").mouseover(function() {
		if (!jQuery(this).hasClass("hover")) {
			jQuery(this).addClass("hover");
			jQuery(this).find("#drop_nav").stop(true, true).slideDown(230);
		}
		window.clearTimeout(timer[0]);
	}).mouseleave(function() {
		if (jQuery(this).hasClass("hover")) {
			var _this = this;
			timer[0] = window.setTimeout(function() {
				jQuery(_this).removeClass("hover");
				jQuery(_this).find("#drop_nav").stop(true, true).slideUp(150);
			}, 300);
		}
	});
});
$(function(){
var index=$("#zhuanti dl").length+1
for(i=1;i<=$("#zhuanti dl").length;i++){
	if(i%4==0){
		n=i-1
		$("#zhuanti").find("dl").eq(n).css("margin-right","0")
	}
	}
})
$(function() {
		$(".n_drop-more").hover(function() {
		    $(".n_drop").show();
		});
	    });$('.con_search').html("<input value=\"搜一下，了解秋季养生\" class=\"con_search_input common_text\" type=\"text\" name=\"q\" onblur=\"if (this.value == '')this.value = '搜一下，了解秋季养生';\" onfocus=\"if (this.value == '搜一下，了解秋季养生')this.value = '';\"><input class=\"con_search_bnt\" name=\"\" value=\"搜索\"  type=\"submit\"><input name=\"s\" type=\"hidden\" value=\"5102400637599991353\" /><span class=\"icon_ser\"></span>");
$(document).ready(function() {
	var mydate = new Date();
	str = mydate.getFullYear();
	$('#Y').html(str);
});
 
