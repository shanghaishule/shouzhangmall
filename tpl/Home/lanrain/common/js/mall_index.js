function rankTab() {
	var b = $(".floorRight_5:first"),
	a = b.find("h3 span"),
	c = b.find("ul");
	a.mouseover(function() {
		var d = $(this);
		if (!d.hasClass("cur")) {
			a.removeClass("cur");
			d.addClass("cur");
			c.removeClass("cur");
			c.eq(d.index()).addClass("cur")
		}
	})
}
function tsSlide(b, i) {
	var l = i || 5,
	k = 1,
	e, j = $("#content_tsSlide"),
	c = j.find(".tsSlideList"),
	m = c.find("li"),
	g = b * l,
	h = j.find(".tsSlideSwitch li"),
	f = false;
	j.hover(function() {
		clearInterval(e)
	},
	function() {
		e = setInterval(function() {
			if (k == l) {
				k = 1;
				a()
			} else {
				d();
				k++
			}
			h.removeClass("cur");
			h.eq(k - 1).addClass("cur")
		},
		5000)
	}).trigger("mouseout");
	function a() {
		m.eq(0).addClass("cur").css("left", g);
		c.animate({
			left: -g
		},
		500,
		function() {
			m.eq(0).removeClass("cur").css("left", 0);
			c.css("left", 0)
		})
	}
	function d() {
		var n = -b * k;
		c.animate({
			left: n + "px"
		},
		500)
	}
	h.mouseover(function() {
		var o = $(this).index(),
		n = -b * o;
		if (o != 0 || k != 1) {
			k = o + 1;
			h.removeClass("cur");
			$(this).addClass("cur");
			c.stop().animate({
				left: n
			},
			500)
		}
	})
}
function scrollTop() {
	var a = document.getElementById("scrollTop");
	loli.delay(window, "scroll",
	function() {
		return true
	},
	function() {
		if ($(window).scrollTop() > 230) {
			a.className = ""
		} else {
			a.className = "scrollTop"
		}
	},
	500);
	$(a).click(function() {
		$(window).scrollTop(0)
	})
}
$(function() {
	homeCatPanel();
	rankTab();
	var a = $("#tsSlideList").find("img").size();
	if (isWidescreen) {
		tsSlide(790, a)
	} else {
		tsSlide(570, a)
	}
	
	
});