<footer>
    <img src="<?php echo mc_theme_url(); ?>/img/btm.png" width="980px" />
	<div class="footer">
	   <p>Copyright 2009 - 2015 <a href="http://www.hajk.com.cn">www.hajk.com.cn</a> All rights reserved ( 沪ICP备14044077号-2 )</p>
	   <p>上海沪爱健康管理有限公司</p>
	</div>
</footer>
<a id="backtotop" class="goto" href="#site-top"><i class="glyphicon glyphicon-upload"></i></a>
<?php mc_template('Public/control'); ?>
</body>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<?php echo mc_theme_url(); ?>/js/bootstrap.min.js"></script>
<?php if(mc_option('homehdys')==2 && MODULE_NAME=='Home') : ?>
<?php else : ?>
<script src="<?php echo mc_theme_url(); ?>/js/headroom.min.js"></script>
<script>
(function() {
    var header = new Headroom(document.querySelector("#topnav"), {
        tolerance: 5,
        offset : 205,
        classes: {
          initial: "animated",
          pinned: "slideDown",
          unpinned: "slideUp"
        }
    });
    header.init();
}());
</script>
<?php endif; ?>
<script src="<?php echo mc_theme_url(); ?>/js/placeholder.js"></script>
<script type="text/javascript">
	$(function() {
		$('input, textarea').placeholder();
	});
</script>
<script src="<?php echo mc_theme_url(); ?>/js/cat.js"></script>
<?php echo mc_xihuan_js(); ?>
<?php echo mc_shoucang_js(); ?>
<?php echo mc_guanzhu_js(); ?>
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1253993139'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1253993139' type='text/javascript'%3E%3C/script%3E"));</script>
</html>