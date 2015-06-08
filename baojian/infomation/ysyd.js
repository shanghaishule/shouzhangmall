//JavaScript Document
//焦点图片效果
$(function(){
	var num=0
	$('.slide_pic .sp_r').click(function(e) {
        num++
		if(num>3){
			num=0;
			$('.slide_pic ul').css('left',0)
		}
		$('.slide_pic  ul').stop().animate({left:-num*330},50)
		
		
    });
	
	$('.slide_pic .sp_l').click(function(e) {
        num--
		if(num<0){
			num=3;
			$('.slide_pic ul').css('left',-1320)
		}
		$('.slide_pic ul').stop().animate({left:-num*330},50)
		
    });
	
	
	//图片和视频切换效果
	$(".taiji h2 span a").each(function(index){   
	$(this).mouseover(function(){
	$(".taiji h2 span a").each(function(i){
	$(this).removeClass("over"+i);
	});
	$(".ship1").hide();
	$(this).addClass("over"+index);
	$(".ship1").eq(index).show();
	}) ;
	
	
 });
});


