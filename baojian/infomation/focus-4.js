

/*失焦获焦*/
function inputTipText(){
$("input[class*=common_text]") 
.each(function(){
   var oldVal=$(this).val();     
   $(this)
   .css({"color":"#999"})    
   .focus(function(){
    if($(this).val()!=oldVal){$(this).css({"color":"#333"})}else{$(this).val("").css({"color":"#999"})}
	$(this).css({"border":"1px solid #3b5998"})
   })
   .blur(function(){
    if($(this).val()==""){$(this).val(oldVal).css({"color":"#999"})}
	$(this).css({"border":"1px solid #dfdfdf"})
   })
   .keydown(function(){$(this).css({"color":"#333"})})
  	
})
}

$(function(){
inputTipText();    
})
 
 /*默认显示一点内容点击全部显示*/
$(function(){
	var timer=[];
			jQuery(".n_drop-more").mouseover(function(){
				if(!jQuery(this).hasClass("hover")){
					jQuery(this).addClass("hover"); jQuery(this).find("#drop_nav").stop(true,true).slideDown(230);
				}
					window.clearTimeout(timer[0]);
			}).mouseleave(function(){
				if(jQuery(this).hasClass("hover")){
					var _this=this;
					timer[0]=window.setTimeout(function(){
						jQuery(_this).removeClass("hover");jQuery(_this).find("#drop_nav").stop(true,true).slideUp(150);
					},300);
				}
			});
			});
/**/
$(function(){
	var timer=[];
			jQuery(".article-tools-share").mouseover(function(){
				if(!jQuery(this).hasClass("hover")){
					jQuery(this).addClass("hover"); jQuery(this).find("#share_pop").stop(true,true).slideDown(230);
				}
					window.clearTimeout(timer[0]);
			}).mouseleave(function(){
				if(jQuery(this).hasClass("hover")){
					var _this=this;
					timer[0]=window.setTimeout(function(){
						jQuery(_this).removeClass("hover");jQuery(_this).find("#share_pop").stop(true,true).slideUp(150);
					},300);
				};
				
						
			});
			
/************分享*************/			
	  $(".share_bnt").hover(
	  function() {
	  $(this).children('.article-tools-share-pop').css({display: 'block'});
	  $(this).children('a').addClass('bianse_blue');
	  },
	  function() {
	  $(this).children('.article-tools-share-pop').css({display: 'none'});
	  $(this).children('a').removeClass('bianse_blue');
	  }
  );	
});
/*******右侧列表*******/
$(".listbox li").each(function(index){
     $(".listbox li").eq(index).children("span").html(index+1);	
	 if(index<=2){
	 $(".listbox li").eq(index).children("span").addClass("red")
	 }
});


/****点击切换****/
jQuery (function () {
	$("#focus .focus-list .box").on("click", function () {
		$('.txt-txt').removeClass ('focus-hover');
		var temp = $("#focus .focus-now").html ();
		$("#focus .focus-now").html ($(this).html ());
		$(this).html (temp);
	});
	$('.txt-bg').on({
		mouseenter: function () {
			$(this).next ('.txt-txt').addClass ('focus-hover');
		},
		mouseleave: function () {
			$(".txt-txt").removeClass ('focus-hover');
		}
	});
});

/********头部更多下拉效果*****/
$(".n_drop-more").hover(function(){
$(".n_drop").addClass("show");

})
$(".jiathis_button_weixin").click(function(){
$(".weixin_modal").toggle()								
})
$(".weixin_close").click(function(){
  $(".weixin_modal").hide();						
                          
})

	/***广场舞排行榜切换**/
$('.paihb_1').mouseover(function(e) {
	$('.paihb_1').children('dl').hide()
    $(this).children('dl').show()
	$(this).addClass('paihb_2')
}).mouseout(function(){
//	$(this).children('dl').hide();
	$(this).siblings().removeClass('paihb_2');
	})


$('.jiaoc_3').mouseover(function(e) {
	$(this).siblings('.jiaoc_3').children('p').show();
	$(this).siblings('.jiaoc_3').children('dl').hide();
	$(this).siblings('.jiaoc_3').removeClass('paihb_21');
	$(this).children('p').hide();
    $(this).addClass('paihb_21').children('dl').show();
	 
})


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
/**/
$(function() {
	var timer = [];
	jQuery(".article-tools-share").mouseover(function() {
		if (!jQuery(this).hasClass("hover")) {
			jQuery(this).addClass("hover");
			jQuery(this).find("#share_pop").stop(true, true).slideDown(230);
		}
		window.clearTimeout(timer[0]);
	}).mouseleave(function() {
		if (jQuery(this).hasClass("hover")) {
			var _this = this;
			timer[0] = window.setTimeout(function() {
				jQuery(_this).removeClass("hover");
				jQuery(_this).find("#share_pop").stop(true, true).slideUp(150);
			}, 300);
		}
	});
});

var sharefloat = $('.sharefloat');
function backtoTopLeft() {
	var btLeft = $(window).width() / 2 + 172;
	if (btLeft <= 570) {
		sharefloat.css({'left': 955});
	} else {
		sharefloat.css({'left': btLeft});
	}
}
backtoTopLeft();
$(window).resize(backtoTopLeft);

$(".article-tools").css({display: 'none'});
var initTop = 0;
$(window).scroll(function() {
	var scrollTop = $(document).scrollTop();
	if (scrollTop > initTop || scrollTop < 188) {
		$('#article-tools').removeAttr("style");
		$(".article-tools").css({display: 'none'});
	} else {
		$(".article-tools").css({display: 'block'});
		$("#article-tools").css({display: 'block', position: "fixed", top: "0"});
	}
	initTop = scrollTop;
});

$('.gotop02').show();
$('.gotop02-con').hide();
$('.favo').css({'border-bottom': '1px solid #ccd3e4'});
$(window).scroll(function() {
	var scrollTop = $(document).scrollTop();
	if (scrollTop >= 300) {
		$('.favo').css({'border-bottom': 'none'});
		$('.gotop02-con').show();
	} else {
		$('.favo').css({'border-bottom': '1px solid #ccd3e4'});
		$('.gotop02-con').hide();
	}
});
$('.gotop02-con').click(function() {
	$('html,body').animate({
		scrollTop: '0px'
	}, 1000);//返回顶部所用的时间 
});























