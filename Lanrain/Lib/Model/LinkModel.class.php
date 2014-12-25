<?php
class LinkModel extends Model{
	//自动完成
	protected $_auto = array (
			array('createTime','time',3,'function'), 	//新增时
	);	
	protected $_validate =array(
			array('title','require','标题不能为空',1),
			array('icon','require','图片不能为空',1),
			array('introduce','require','介绍不能为空',1),
			array('url','require','链接不能为空',1),
			array('position','require','位置不能为空',1),
	);	
	
}
?>