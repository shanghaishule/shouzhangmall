//����ͼ9
jQuery (function (jq) {
	jq ("#focus .focus-list .box").live ("click", function () {
		jq ('.txt-txt').removeClass ('focus-hover');
		var temp = jq ("#focus .focus-now").html ();
		jq ("#focus .focus-now").html (jq (this).html ());
		jq (this).html (temp);
	});
	jq ('.txt-bg').live ({
		mouseenter: function () {
			jq (this).next ('.txt-txt').addClass ('focus-hover');
		},
		mouseleave: function () {
			jq (".txt-txt").removeClass ('focus-hover');
		}
	});
});


jQuery (function (jq) {
	//��ǩ


	function changeTab(lis, divs, nums) {
		lis.each (function (i) {
			var els = jq (this);
			els.mouseenter (function () {
				lis.removeClass ("now");
				divs.stop ().hide ();
				jq (this).addClass ("now");
				divs.eq (i).show ();
			});
		}).eq (nums).mouseenter ();
	}

	var divA = jq ("#menu-a");
	changeTab (divA.find (".menuA li"), divA.find (".block"), 0);

	var divB = jq ("#menu-b");
	changeTab (divB.find (".menuA li"), divB.find (".block"), 0);

	var divC = jq ("#menu-c");
	changeTab (divC.find (".menuA li"), divC.find (".sn-list"), 0);

	var divD = jq ("#menu-d");
	changeTab (divD.find (".menuA li"), divD.find (".block"), 0);

	var divE = jq ("#menu-e");
	changeTab (divE.find (".menuC li"), divE.find (".pic-text"), 0);

	var divF = jq ("#menu-f");
	changeTab (divF.find (".menuD li:not('.ln')"), divF.find (".turn"), 0);

	var divG = jq ("#menu-g");
	changeTab (divG.find (".menuD li:not('.ln')"), divG.find (".turn"), 0);

	var divH = jq ("#menu-h");
	changeTab (divH.find (".menuD li:not('.ln')"), divH.find (".turn"), 0);

	var divI = jq ("#menu-i");
	changeTab (divI.find (".menuD li:not('.ln')"), divI.find (".turn"), 0);

	var divJ = jq ("#menu-j");
	changeTab (divJ.find (".menuA li"), divJ.find (".sn-list"), 0);

	var divK = jq ("#menu-k");
	changeTab (divK.find (".menuA li"), divK.find (".sn-list"), 0);

	var divL = jq ("#menu-l");
	changeTab (divL.find (".menuD li:not('.ln')"), divL.find (".turn"), 0);

	var divM = jq ("#menu-m");
	changeTab (divM.find (".menuA li"), divM.find (".turn"), 0);

	var divN = jq ("#menu-n");
	changeTab (divN.find (".menuA li"), divN.find (".turn"), 0);

	var divO = jq ("#menu-o");
	changeTab (divO.find (".menuA li"), divO.find (".sn-list"), 0);

	var divP = jq ("#menu-p");
	changeTab (divP.find (".menuA li"), divP.find (".turn"), 0);

	var divQ = jq ("#menu-q");
	changeTab (divQ.find (".menuA li"), divQ.find (".turn"), 0);

	var divR = jq ('#menu-r');
	changeTab (divR.find ('.tab-con li'), divR.find ('.turn'), 0);
	
	var divS = jq ('#menu-s');
	changeTab (divS.find ('.menuA li'), divS.find ('.sn-list'), 0);

	var divT = jq ('#menu-t');
	changeTab (divT.find(".menuD li:not('.ln')"), divT.find ('.turn'), 0);
	//����



});

/*
 * ! getcndate v1.0.0 | (c) 2014
*/
function GetBit(e,t){return e>>t&1}function e2c(){TheDate=arguments.length!=3?new Date:new Date(arguments[0],arguments[1],arguments[2]);var e,t,n,r,i=!1,s=TheDate.getYear();s<1900&&(s+=1900),e=(s-1921)*365+Math.floor((s-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38,TheDate.getYear()%4==0&&TheDate.getMonth()>1&&e++;for(t=0;;t++){r=CalendarData[t]<4095?11:12;for(n=r;n>=0;n--){if(e<=29+GetBit(CalendarData[t],n)){i=!0;break}e=e-29-GetBit(CalendarData[t],n)}if(i)break}cYear=1921+t,cMonth=r-n+1,cDay=e,r==12&&(cMonth==Math.floor(CalendarData[t]/65536)+1&&(cMonth=1-cMonth),cMonth>Math.floor(CalendarData[t]/65536)+1&&cMonth--)}function GetcDateString(){var e="";e+=tgString.charAt((cYear-4)%10),e+=dzString.charAt((cYear-4)%12),e+="(",e+=sx.charAt((cYear-4)%12),e+=")年 ",cMonth<1?(e+="(闰)",e+=monString.charAt(-cMonth-1)):e+=monString.charAt(cMonth-1),e+="月",e+=cDay<11?"初":cDay<20?"十":cDay<30?"廿":"三十";if(cDay%10!=0||cDay==10)e+=numString.charAt((cDay-1)%10);return e}function GetLunarDay(e,t,n){return e<1921||e>2020?"":(t=parseInt(t)>0?t-1:11,e2c(e,t,n),GetcDateString())}function showCal(){var e=new Date,t="",n=e.getDay();t=e.getFullYear()+"年",t=t+(e.getMonth()+1)+"月",t=t+e.getDate()+"日 ",n==0?t+="星期日":n==1?t+="星期一":n==2?t+="星期二":n==3?t+="星期三":n==4?t+="星期四":n==5?t+="星期五":n==6&&(t+="星期六 "),document.write(t+" "+GetLunarDay(yy,mm,dd))}var CalendarData=new Array(100),madd=new Array(12),tgString="甲乙丙丁戊己庚辛壬癸",dzString="子丑寅卯辰巳午未申酉戌亥",numString="一二三四五六七八九十",monString="正二三四五六七八九十冬腊",weekString="日一二三四五六",sx="鼠牛虎兔龙蛇马羊猴鸡狗猪",cYear,cMonth,cDay,TheDate;CalendarData=new Array(2635,333387,1701,1748,267701,694,2391,133423,1175,396438,3402,3749,331177,1453,694,201326,2350,465197,3221,3402,400202,2901,1386,267611,605,2349,137515,2709,464533,1738,2901,330421,1242,2651,199255,1323,529706,3733,1706,398762,2741,1206,267438,2647,1318,204070,3477,461653,1386,2413,330077,1197,2637,268877,3365,531109,2900,2922,398042,2395,1179,267415,2635,661067,1701,1748,398772,2742,2391,330031,1175,1611,200010,3749,527717,1452,2742,332397,2350,3222,268949,3402,3493,133973,1386,464219,605,2349,334123,2709,2890,267946,2773,592565,1210,2651,395863,1323,2707,265877),madd[0]=0,madd[1]=31,madd[2]=59,madd[3]=90,madd[4]=120,madd[5]=151,madd[6]=181,madd[7]=212,madd[8]=243,madd[9]=273,madd[10]=304,madd[11]=334;var D=new Date,yy=D.getFullYear(),mm=D.getMonth()+1,dd=D.getDate(),ww=D.getDay(),ss=parseInt(D.getTime()/1e3);yy<100&&(yy="19"+yy);




