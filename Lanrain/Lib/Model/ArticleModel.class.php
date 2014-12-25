<?php
class ArticleModel extends Model{

	protected $_validate =array(
		array('title','require','标题不能为空',1),
		array('imgs','require','封面不能为空',1),
	);

	
}