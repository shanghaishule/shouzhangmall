$(function(){
	$(".mainC2 .tabBox:eq(0)").css("display","block")
	$("#tab a").mouseover(function(){
		var i=$("#tab a").index(this)
		$("#tab a").removeClass("selected")
		$(this).addClass("selected")
		$(".mainC2 .tabBox").css("display","none")
		$(".mainC2 .tabBox:eq("+i+")").css("display","block")
		})	
		
})
$(function(){
	$("#left .leftText").hover(function(){
		$("#left .leftText").removeClass("on")
		$(this).addClass("on")
		},function(){
			$("#left .leftText").removeClass("on")
			})

})
$(function(){
	setInterval ( Time,5000)
	function Time(){
	$("#rightBtn").trigger("click")
	}
        var page=0
        var sum=$("#banner ul li").length
        $("#rightBtn").click(function(){
            page=page+1
            if(page==sum){
            page=0
            }
            if(page<=sum){
			$("#banner ul li").fadeOut(500)
            $("#banner ul li").eq(page).fadeIn(1000)
            }
        })
        $("#leftBtn").click(function(){
            if(page==0){
            page=sum
            }
            page=page-1
            if(page<=sum){
            $("#banner ul li").fadeOut(500)
            $("#banner ul li:eq("+page+")").fadeIn(1000)

            }
        })
})