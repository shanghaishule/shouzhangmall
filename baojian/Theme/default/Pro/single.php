<?php mc_template_part('header'); ?>
	<?php foreach($page as $val) : ?>
	<div class="container">
		<ol class="breadcrumb" id="baobei-breadcrumb">
			<li>
				<a href="<?php echo mc_site_url(); ?>">
					首页
				</a>
			</li>
			<li>
				<a href="<?php echo U('pro/index/index'); ?>">
					商品
				</a>
			</li>
			<?php $term_id = mc_get_meta($val['id'],'term'); $parent = mc_get_meta($term_id,'parent',true,'term'); if($parent) : ?>
			<li class="hidden-xs">
				<a href="<?php echo U('pro/index/term?id='.$parent); ?>">
					<?php echo mc_get_page_field($parent,'title'); ?>
				</a>
			</li>
			<?php endif; ?>
			<li>
				<a href="<?php echo U('pro/index/term?id='.$term_id); ?>">
					<?php echo mc_get_page_field($term_id,'title'); ?>
				</a>
			</li>
			<li class="active hidden-xs">
				<?php echo $val['title']; ?>
			</li>
		</ol>
	</div>

	<div id="single-top">
		<div class="container">
			<div class="row f-detail">
				<div class="col-sm-6" id="pro-index-tl">
					<div id="pro-index-tlin">
					<?php $fmimg_args = mc_get_meta($val['id'],'fmimg',false); $fmimg_args = array_reverse($fmimg_args); ?>
					<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
						<!-- Indicators -->
						<ol class="carousel-indicators">
							<?php foreach($fmimg_args as $fmimg) : ?>
							<?php $fmimg_num++; ?>
							<li data-target="#carousel-example-generic" data-slide-to="<?php echo $fmimg_num-1; ?>" class="<?php if($fmimg_num==1) echo 'active'; ?>"></li>
							<?php endforeach; ?>
						</ol>
						<!-- Wrapper for slides -->
						<div class="carousel-inner">
							<?php $fmimg_num=0; ?>
							<?php foreach($fmimg_args as $fmimg) : ?>
							<?php $fmimg_num++; ?>
							<div class="item <?php if($fmimg_num==1) echo 'active'; ?>">
								<div class="imgshow"><img src="<?php echo $fmimg; ?>" alt="<?php echo $val['title']; ?>"></div>
							</div>
							<?php endforeach; ?>
						</div>
					</div>
					</div>
				</div>
				<div class="col-sm-6" id="pro-index-tr">
					<div id="pro-index-trin">
					<h1>
						<?php echo $val['title']; ?>
					</h1>
					<h3>
						<div class="row">
							<div class="col-xs-0 col">
								官方价：<span id="price" price-data="<?php echo mc_get_meta($val['id'],'price'); ?>">￥<?php echo mc_price_now($val['id']); ?></span>
							</div>
							<div class="col-xs-0 col">
								<small>库存：<?php echo mc_get_meta($val['id'],'kucun'); ?></small>
								<small>销量：<?php echo mc_get_meta($val['id'],'xiaoliang'); ?></small>
							</div>
						</div>
					</h3>
					<form method="post" action="<?php echo U('home/perform/add_cart'); ?>" id="pro-single-form">
					<?php $parameter = M('option')->where("meta_key='parameter' AND type='pro'")->select(); if($parameter) : foreach($parameter as $par) : ?>
					<?php $pro_parameter = mc_get_meta($val['id'],$par['id'],false,'parameter'); if($pro_parameter) : ?>
					<h4 class="pro-par-list-title"><?php echo $par['meta_value']; ?></h4>
					<ul class="list-inline pro-par-list" id="par-list-<?php echo $par['id']; ?>">
					<?php $num=0; ?>
					<?php foreach($pro_parameter as $pro_par) : $num++; ?>
						<?php 
							$price = M('meta')->where("page_id='".$val['id']."' AND meta_key='$pro_par' AND type ='price'")->getField('meta_value');
						?>
						<li>
							<label <?php if($num==1) echo 'class="active"'; ?> price-data="<?php echo $price; ?>">
								<span><?php echo $pro_par; ?></span>
								<input type="radio" name="parameter[<?php echo $par['id']; ?>]" value="<?php echo $pro_par; ?>"  <?php if($num==1) echo 'checked'; ?>>
							</label>
						</li>
					<?php endforeach; ?>
					<script>
						$('#par-list-<?php echo $par['id']; ?> label').click(function(){
							$('#par-list-<?php echo $par['id']; ?> label').removeClass('active');
							$(this).addClass('active');
							var price_now = $('#price').attr('price-data')*1;
							$.each($('.pro-par-list label.active'),function(){
								price_now += parseInt($(this).attr('price-data'));
							});
							$('#price').text(price_now);
						});
					</script>
					</ul>
					<?php endif; ?>
					<?php endforeach; endif; ?>
					<div class="form-group">
						<?php if(mc_get_meta($val['id'],'kucun')<=0) : ?>
						<button type="button" class="btn btn-default">
							<i class="icon-umbrella"></i> 暂时缺货
						</button>
						<?php else : ?>
						<div class="btn-group">
							<div class="btn-group">
							<ul id="allqty" style="font-size:12px; font-color:#999;">
		                    <li style="margin-right:10px;margin-top:10px;padding-bottom:5px;padding-left:5px;color:#3e4245">购买数量:</li>
		                    <li style="margin-top:5px;margin-left:5px;padding-bottom:5px">
		                        <a id="jia" style="float:left;margin-left: 1px;border:1px solid #cccccc" href="javascript:minus();"><img alt="" src="<?php echo mc_theme_url(); ?>/img/minus.png" style="width:30px; height:30px;"></a>
		                        <input type="text" value="1" id="buy-num" name="quantity" style="float:left;width:70px;height:32px;line-height:normal;border:1px solid #ddd;border-left:0;border-right:0;background:#fff;font-size:16px;background:#fff;text-align:center"/>
		                        <a id="jian" style="float:left;margin-right: 1px;border:1px solid #cccccc" href="javascript:plus();"><img alt="" src="<?php echo mc_theme_url(); ?>/img/plug.png" style="width:30px; height:30px;"></a>
		                    </li>
		                    <li style="margin-left:20px;margin-top:10px;">(盒)</li>
                    </ul>
							</div>
							<button type="submit" class="btn btn-warning add-cart">
								<!-- -<i class="glyphicon glyphicon-plus"></i> --> 立即购买
							</button>
						</div>
						<?php endif; ?>
					</div>
					<!--div class="form-group">
						<button type="submit" class="wish">
							<i class="icon-heart"></i> 我想要
						</button>
					</div-->
					<script>
						$('.add-cart').hover(function(){
							$('#pro-single-form').attr('action','<?php echo U('home/perform/add_cart'); ?>');
						});
						$('.wish').hover(function(){
							$('#pro-single-form').attr('action','<?php echo U('publish/index/add_post?group='.$val['id'].'&wish=1'); ?>');
						});
					</script>
					<input id="buy-num-input" type="hidden" name="number" value="1">
					<input type="hidden" value="<?php echo $val['id']; ?>" name="id">
					</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
	<div id="pro-single" class="mb-20">
		<div class="row">
			<div class="col-sm-12" id="single">
				<div id="entry">
					<?php echo mc_magic_out($val['content']); ?>
				</div>
				<hr>
				<div class="text-center">
					<?php if(!mc_is_admin() && !mc_is_bianji()) : ?>
					<?php echo mc_xihuan_btn($val['id']); ?>
					<?php echo mc_shoucang_btn($val['id']); ?>
					<?php else : ?>
					<a href="<?php echo U('publish/index/edit?id='.$val['id']); ?>" class="btn btn-info">
						<i class="glyphicon glyphicon-edit"></i> 编辑
					</a>
					<button class="btn btn-default" data-toggle="modal" data-target="#myModal">
						<i class="glyphicon glyphicon-trash"></i> 删除
					</button>
					<?php endif; ?>
				</div>
				<hr>
			</div>
		</div>
	</div>
	<div class="home-main">
		<h4 class="title mb-0">
			<i class="icon-comments"></i> 商品评论
		</h4>
	</div>
	<div id="pro-single">
		<div class="row">
			<div class="col-sm-12 pt-0" id="single">
				<?php if(mc_user_id()) : ?>
				<form role="form" method="post" action="<?php echo U('home/perform/comment'); ?>">
					<div class="form-group">
						<textarea name="content" class="form-control" rows="3" placeholder="请输入评论内容"></textarea>
					</div>
					<div class="text-center">
						<button type="submit" class="btn btn-block btn-warning">
							<i class="glyphicon glyphicon-ok"></i> 提交
						</button>
					</div>
					<input type="hidden" name="id" value="<?php echo $val['id']; ?>">
				</form>
				<?php else : ?>
				<form role="form">
					<div class="form-group">
						<textarea name="content" class="form-control" rows="3" placeholder="请输入评论内容" disabled></textarea>
						<p class="help-block">您必须在<a href="<?php echo U('user/login/index'); ?>">登陆</a>或<a href="<?php echo U('user/register/index'); ?>">注册</a>后，才可以发表评论！</p>
					</div>
				</form>
				<?php endif; ?>
				<?php if(mc_comment_count($val['id'])) : ?>
				<hr>
				<h3>全部评论（<?php echo mc_comment_count($val['id']); ?>）</h3>
				<hr>
				<?php echo W("Comment/index",array($val['id'])); ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
	</div>
	<?php if(mc_is_admin()) : ?>
	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title" id="myModalLabel">
						
					</h4>
				</div>
				<div class="modal-body text-center">
					确认要删除这篇文章吗？
				</div>
				<div class="modal-footer" style="text-align:center;">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="glyphicon glyphicon-remove"></i> 取消
					</button>
					<a class="btn btn-danger" href="<?php echo U('home/perform/delete?id='.$val['id']); ?>">
						<i class="glyphicon glyphicon-ok"></i> 确定
					</a>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
	<?php endif; ?>
	<?php endforeach; ?>
<?php mc_template_part('footer'); ?>