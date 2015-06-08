function ys_slide(box,point){var oBox=document.getElementById(box);var oBoxli=document.getElementById(box).getElementsByTagName("li");var oList=document.getElementById(point).getElementsByTagName("span");var img=0;var bool=true;if(oBoxli.length!=oList.length){console.log("轮播图数量不够，请插入五个轮播图");return}for(var i=0;i<oList.length;i++){oList[i].index=i;oList[i].onmouseover=function(){var a=this.index;for(var j=0;j<oList.length;j++){oList[j].className="";oBoxli[j].style.display="none"}this.className="slide_cur";oBoxli[a].style.display="block";img=a}}oBox.onmouseover=function(){bool=false};oBox.onmouseout=function(){bool=true};function slide(){if(bool){for(var j=img;j<oList.length;j++){var a=oBoxli[j].getAttribute("name");oList[j].className="";oBoxli[j].style.display="none"}img=img+1;if(img>4){img=0}oList[img].className="slide_cur";oBoxli[img].style.display="block"}}var start=setInterval(slide,3000)}function linktab(box,list){var oTab=document.getElementById(box).getElementsByTagName("div");var oList=document.getElementById(list).getElementsByTagName("span");for(var i=0;i<oList.length;i++){oList[i].index=i;oList[i].onmouseover=function(){var a=this.index;for(var j=0;j<oList.length;j++){oTab[j].style.display="none";oList[j].className=""}this.className="blue cur";oList[0].style.marginRight="5px";oTab[a].style.display="block"}}};
//手机应用、登录
$('.shouji').hover(function(){
    $(".ewm").show();
},function(eve){
    var e = eve || event    
    if (this.contains(e.toElement)) return;
    $(".ewm").hide();
})
$('.login').hover(function(){
    $(".loginBox").show();
});
$('.login').on('click', function(e) {
    var e = e || window.event;   
    e.stopPropagation();
});
$(document).on('click',  function(e) {
    $ ('.loginBox').hide ();
});
var bool = true;
function more(){
  	var link_ul = document.getElementById('link_list').getElementsByTagName('ul')[0];
  	var _this = link_ul.getElementsByTagName('em')[0];
  	if (bool) {
    	link_ul.style.height = '150px';
    	_this.className = "em_cur";
    	bool = false;
  	}else{
    	link_ul.style.height = '100px';
    	_this.className = "";
    	bool = true;
  	}
}
ys_slide('slidesImgs','slideBar');
linktab('link_list','title');

/*
 * ! getcndate v1.0.0 | (c) 2014
 */
function GetBit(e,t){return e>>t&1}function e2c(){TheDate=arguments.length!=3?new Date:new Date(arguments[0],arguments[1],arguments[2]);var e,t,n,r,i=!1,s=TheDate.getYear();s<1900&&(s+=1900),e=(s-1921)*365+Math.floor((s-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38,TheDate.getYear()%4==0&&TheDate.getMonth()>1&&e++;for(t=0;;t++){r=CalendarData[t]<4095?11:12;for(n=r;n>=0;n--){if(e<=29+GetBit(CalendarData[t],n)){i=!0;break}e=e-29-GetBit(CalendarData[t],n)}if(i)break}cYear=1921+t,cMonth=r-n+1,cDay=e,r==12&&(cMonth==Math.floor(CalendarData[t]/65536)+1&&(cMonth=1-cMonth),cMonth>Math.floor(CalendarData[t]/65536)+1&&cMonth--)}function GetcDateString(){var e="";e+=tgString.charAt((cYear-4)%10),e+=dzString.charAt((cYear-4)%12),e+="(",e+=sx.charAt((cYear-4)%12),e+=")年 ",cMonth<1?(e+="(闰)",e+=monString.charAt(-cMonth-1)):e+=monString.charAt(cMonth-1),e+="月",e+=cDay<11?"初":cDay<20?"十":cDay<30?"廿":"三十";if(cDay%10!=0||cDay==10)e+=numString.charAt((cDay-1)%10);return e}function GetLunarDay(e,t,n){return e<1921||e>2020?"":(t=parseInt(t)>0?t-1:11,e2c(e,t,n),GetcDateString())}function showCal(){var e=new Date,t="",n=e.getDay();t=e.getFullYear()+"年",t=t+(e.getMonth()+1)+"月",t=t+e.getDate()+"日 ",n==0?t+="星期日":n==1?t+="星期一":n==2?t+="星期二":n==3?t+="星期三":n==4?t+="星期四":n==5?t+="星期五":n==6&&(t+="星期六 "),document.write(t+" "+GetLunarDay(yy,mm,dd))}var CalendarData=new Array(100),madd=new Array(12),tgString="甲乙丙丁戊己庚辛壬癸",dzString="子丑寅卯辰巳午未申酉戌亥",numString="一二三四五六七八九十",monString="正二三四五六七八九十冬腊",weekString="日一二三四五六",sx="鼠牛虎兔龙蛇马羊猴鸡狗猪",cYear,cMonth,cDay,TheDate;CalendarData=new Array(2635,333387,1701,1748,267701,694,2391,133423,1175,396438,3402,3749,331177,1453,694,201326,2350,465197,3221,3402,400202,2901,1386,267611,605,2349,137515,2709,464533,1738,2901,330421,1242,2651,199255,1323,529706,3733,1706,398762,2741,1206,267438,2647,1318,204070,3477,461653,1386,2413,330077,1197,2637,268877,3365,531109,2900,2922,398042,2395,1179,267415,2635,661067,1701,1748,398772,2742,2391,330031,1175,1611,200010,3749,527717,1452,2742,332397,2350,3222,268949,3402,3493,133973,1386,464219,605,2349,334123,2709,2890,267946,2773,592565,1210,2651,395863,1323,2707,265877),madd[0]=0,madd[1]=31,madd[2]=59,madd[3]=90,madd[4]=120,madd[5]=151,madd[6]=181,madd[7]=212,madd[8]=243,madd[9]=273,madd[10]=304,madd[11]=334;var D=new Date,yy=D.getFullYear(),mm=D.getMonth()+1,dd=D.getDate(),ww=D.getDay(),ss=parseInt(D.getTime()/1e3);yy<100&&(yy="19"+yy);
