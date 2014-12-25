<?php mc_template_part('header'); ?>
	<?php foreach($page as $val) : ?>
	<?php $author = mc_author_id($val['id']); $group_id = mc_get_meta($val['id'],'group'); ?>
	<header id="group-head" class="hidden-xs">
		<div class="container">
			<div class="row">
				<div class="col-sm-8">
					<h1>
						<a id="logo" class="pull-left img-div" href="<?php echo mc_get_url(mc_get_meta($val['id'],'group')); ?>"><img src="<?php echo mc_fmimg(mc_get_meta($val['id'],'group')); ?>"></a>
						<a href="<?php echo U('post/group/single?id='.mc_get_meta($val['id'],'group')); ?>" class="pull-left title"><?php echo mc_get_page_field(mc_get_meta($val['id'],'group'),'title'); ?></a>
					</h1>
				</div>
				<div class="col-sm-4">
					
				</div>
			</div>
		</div>
	</header>
	<div class="container">
		<ol class="breadcrumb mb-20 mt-20" id="baobei-term-breadcrumb">
			<li>
				<a href="<?php echo U('home/index/index'); ?>">
					首页
				</a>
			</li>
			<li>
				<a href="<?php echo U('post/group/index'); ?>">
					社区
				</a>
			</li>
			<li>
				<a href="<?php echo U('post/group/single?id='.$group_id); ?>">
					<?php echo mc_get_page_field($group_id,'title'); ?>
				</a>
			</li>
			<li class="active">
				<?php echo $val['title']; ?>
			</li>
			<div class="pull-right">
				<a href="javascript:;"><i class="icon-time"></i> <?php echo date('Y-m-d H:i:s',mc_get_meta($val['id'],'time')); ?>
				<a href="javascript:;" class="publish"><?php echo mc_views_count($val['id']); ?></a>
			</div>
		</ol>
		<div class="row">
			<div class="col-sm-8 col-lg-9">
			<h1 id="single-title" class="mt-0"><?php echo $val['title']; ?></h1>
			<div id="single">
				<?php if(mc_get_meta($val['id'],'number')) : $parameter = mc_get_meta($val['id'],'parameter',false); ?>
				<div class="wishbox mb-20">
					<?php $fmimg_args = mc_get_meta($group_id,'fmimg',false); $fmimg_args = array_reverse($fmimg_args); ?>
					<div class="row">
						<div class="col-sm-8">
							<div class="media">
								<a class="pull-left" href="<?php echo mc_get_url($group_id); ?>">
									<img width="100" src="<?php echo $fmimg_args[0]; ?>" alt="<?php echo mc_get_page_field($group_id,'title'); ?>">
								</a>
								<div class="media-body">
									<h4 class="media-heading mb-20">
										我想要 <a href="<?php echo mc_get_url($group_id); ?>"><?php echo mc_get_page_field($group_id,'title'); ?></a>
									</h4>
									<?php if($parameter) : foreach($parameter as $par) : list($key,$par_value) = explode('|',$par); $par_name = M('option')->where("id='$key'")->getField('meta_value'); ?><p><?php echo $par_name.' : '.$par_value; ?></p><?php endforeach; endif; ?>
									<p class="mb-0">数量 : <?php echo mc_get_meta($val['id'],'number'); ?></p>
								</div>
							</div>
						</div>
						<div class="col-sm-4 text-right">
							<?php
								$cart_price = mc_get_meta($group_id,'price');
								if($parameter) :
									foreach($parameter as $par) :
										list($key,$par_value) = explode('|',$par);
										$price = M('meta')->where("page_id='".$group_id."' AND meta_key='$par_value' AND type ='price'")->getField('meta_value');
										$cart_price += $price;
									endforeach;
								endif;
							?>
							<p class="mb-20">总价格：<span><?php echo $cart_price*mc_get_meta($val['id'],'number'); ?></span>元</p>
							<a href="#" class="btn btn-lg btn-warning" data-toggle="modal" data-target="#myModal"><i class="icon-key"></i> 帮助TA达成心愿</a>
						</div>
					</div>
				</div>
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<style>
								#myModal .modal-body {text-align: center; padding: 100px 0; font-size: 18px;}
								#myModal .modal-body i {color: #f50010; font-size: 50px;}
							</style>
							<div class="modal-body">
								<p><i class="icon-wrench"></i></p>
								功能调试中，稍后放出
							</div>
						</div>
					</div>
				</div>
				<?php endif; ?>
				<div id="entry">
					<?php echo mc_magic_out($val['content']); ?>
				</div>
				<hr>
				<div class="text-center">
					<?php if(mc_get_page_field($val['id'],'type')=='publish') : ?>
					<?php echo mc_xihuan_btn($val['id']); ?>
					<?php echo mc_shoucang_btn($val['id']); ?>
					<?php else : ?>
					<?php if(mc_is_admin() || mc_is_bianji()) : ?>
					<a href="<?php echo U('home/perform/review?id='.$val['id']); ?>" class="btn btn-danger">
						<i class="icon-ok-circle"></i> 通过审核
					</a>
					<?php endif; ?>
					<?php endif; ?>
					<?php if(mc_is_admin() || mc_is_bianji() || $author==mc_user_id()) : ?>
					<a href="<?php echo U('publish/index/edit?id='.$val['id'].'&group='.$group_id); ?>" class="btn btn-info">
						<i class="glyphicon glyphicon-edit"></i> 编辑
					</a>
					<?php endif; ?>
					<?php if(mc_is_admin() || mc_is_bianji() || $author==mc_user_id()) : ?>
					<button class="btn btn-default" data-toggle="modal" data-target="#myModal">
						<i class="glyphicon glyphicon-trash"></i> 删除
					</button>
					<?php endif; ?>
				</div>
				<hr>
				<div class="media">
					<div class="pull-left">
						<a href="<?php echo mc_get_url($author); ?>"><img class="img-circle media-object" src="<?php echo mc_user_avatar($author); ?>" alt="<?php echo mc_user_display_name($author); ?>" width="60"></a>
					</div>
					<div class="media-body">
						<h4 class="media-heading mb-10">
							<a href="<?php echo mc_get_url($author); ?>"><?php echo mc_user_display_name($author); ?></a>
							<span class="label label-default">作者</span>
						</h4>
						<?php echo mc_get_page_field($author,'content'); ?>
					</div>
				</div>
				<hr>
				<?php if(mc_user_id()) : ?>
				<form role="form" method="post" action="<?php echo U('home/perform/comment'); ?>">
					<div class="form-group">
						<label>
							评论内容
						</label>
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
						<label>
							评论内容
						</label>
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
			<div class="col-sm-4 col-lg-3 hidden-xs" id="group-side">
				<ul class="nav nav-pills nav-stacked text-center mb-20">
					<li><a href="<?php echo U('publish/index/add_post?group='.$group_id); ?>">发起话题</a></li>
					<?php if(mc_is_admin() || mc_is_bianji()) : ?>
					<li><a href="<?php echo U('publish/index/add_group'); ?>">新建版块</a></li>
					<?php endif; ?>
				</ul>
				<?php if(mc_get_page_field(mc_get_meta($val['id'],'group'),'type')=='pro') : //商品版块 ?>
				<div class="thumbnail">
					<?php $fmimg_args = mc_get_meta(mc_get_meta($val['id'],'group'),'fmimg',false); $fmimg_args = array_reverse($fmimg_args); ?>
					<a class="img-div" href="<?php echo mc_get_url($group_id); ?>"><img src="<?php echo $fmimg_args[0]; ?>" alt="<?php echo mc_get_page_field($group_id,'title'); ?>"></a>
					<div class="caption">
						<h4>
							<a href="<?php echo mc_get_url($group_id); ?>"><?php echo mc_get_page_field($group_id,'title'); ?></a>
						</h4>
						<p class="price pull-left">
							<span><?php echo mc_price_now($group_id); ?></span> <small>元</small>
						</p>
						<?php if(mc_get_meta($group_id,'kucun')<=0) : ?>
						<button type="button" class="btn btn-default btn-xs pull-right">
							<i class="icon-umbrella"></i> 暂时缺货
						</button>
						<?php else : ?>
						<a href="<?php echo U('home/perform/add_cart','id='.$group_id.'&number=1'); ?>" class="btn btn-warning btn-xs pull-right">
							<i class="glyphicon glyphicon-plus"></i> 加入购物车
						</a>
						<?php endif; ?>
						<div class="clearfix"></div>
					</div>
				</div>
				<?php else : ?>
				<?php mc_template_part('sidebar'); ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
	<?php if(mc_is_admin() || mc_is_group_admin(mc_get_meta($val['id'],'group'))) : ?>
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