function SlideShow(c) {
    var a = document.getElementById("slideContainer"), f = document.getElementById("slidesImgs").getElementsByTagName("li"), h = document.getElementById("slideBar"), n = h.getElementsByTagName("span"), d = f.length, c = c || 3000, e = lastI = 0, j, m;
    function b() {
        m = setInterval(function () {
            e = e + 1 >= d ? e + 1 - d : e + 1;
            g()
        }, c)
    }
    function k() {
        clearInterval(m)
    }
    function g() {
        f[lastI].style.display = "none";
        n[lastI].className = "";
        f[e].style.display = "block";
        n[e].className = "slide_cur";
        lastI = e
    }
    f[e].style.display = "block";
    a.onmouseover = k;
    a.onmouseout = b;
    h.onmouseover = function (i) {
        j = i ? i.target : window.event.srcElement;
        if (j.nodeName === "SPAN") {
            e = parseInt(j.innerHTML, 10) - 1;
            g()
        }
    };
    b()
}
;
/*返回顶部*/
function pageScroll(){
   
    window.scrollBy(0,-100);
   
    scrolldelay = setTimeout('pageScroll()',100);
  
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    
    if(sTop==0) clearTimeout(scrolldelay);
}