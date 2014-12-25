<footer>
    <img src="<?php echo mc_theme_url(); ?>/img/btm.png" width="980px" />
	<div class="footer">
	   <p>Copyright 2009 - 2014 <a href="http://www.hajk.com.cn">www.hajk.com.cn</a> All rights reserved ( 沪ICP备14044077号-2 )</p>
	   <p>沪爱健康管理有限公司</p>
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
</html>