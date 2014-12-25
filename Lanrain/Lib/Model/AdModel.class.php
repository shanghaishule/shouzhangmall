<?php
class AdModel extends Model{
	//自动完成
	/*protected $_auto = array (
			array('createTime','time',1,'function'), 	//新增时
	);*/
	protected $_validate =array(
			array('isPage','require','所属不能为空',1),
			array('title','require','标题不能为空',1),
			array('imgurl','require','图片不能为空',1),
			array('introduce','require','介绍不能为空',1),
			array('url','require','链接不能为空',1),
			array('level','require','位置不能为空',1),
	);
}
?>