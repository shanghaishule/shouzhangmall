// JavaScript Document
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
	}).mouseout(function(ev){
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