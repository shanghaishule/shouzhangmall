// JavaScript Document
/////////幻灯片-焦点图//////////////
$(function(){
    var curIndex=0;
	var maxIndex=4;
  
	function tabChange(index)	{
		
			$(".focusTab  span").removeClass("slide_cur").eq(index).addClass("slide_cur");
			$(".itemBox").hide().eq(index).show();
   };	
  
	function resetIndex(){
	  curIndex=0;	
    }
	
	
	function autoPlay(){
		timeInterval=setInterval (function(){
		curIndex+=1;
		if(curIndex>maxIndex-1)
		{
		   	resetIndex();
	    };
		tabChange(curIndex);
    },2000);
	}
	 autoPlay();
	
	
	$(".focusTab span, .itemBox").mouseover(function(ev){
		stopAutoPlay()	
		$('.slide_pic li b').show()									   
	}).mouseout(function(ev){
		$('.slide_pic li b').hide()	
	   autoPlay();
	});
	
	
	function stopAutoPlay(){
		if(timeInterval)
		{
		  clearInterval(timeInterval);	
		}
	}
	

	$(".focusTab span").each(function(index){
		$(this).click(function(){
			tabChange(index);	
			curIndex=index;
	    });							
	});
	
	
})
/////////幻灯片-焦点图//////////////


/////////首页宁夏卫视健康大财富-重庆卫视爱尚健康-贵州卫视Tab切换效果//////////////
$('.cont3_tab a').mouseover(function(e) {
   $(this).addClass('a1').siblings().removeClass('a1')
	$('.cont3_qh1').eq($(this).index()).show().siblings().hide();
})
/////////首页宁夏卫视健康大财富-重庆卫视爱尚健康-贵州卫视切换效果//////////////