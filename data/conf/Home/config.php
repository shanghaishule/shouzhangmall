<?php
return array(	
	'DEFAULT_THEME'=>'lanrain',
		'TMPL_PARSE_STRING'  =>array(
				'__PUBLIC__' => '/tpl/Home/lanrain/common', // 更改默认的/Public 替换规则
				'__JS__'     => '/Public/JS/', // 增加新的JS类库路径替换规则
				'__UPLOAD__' => '/Uploads', // 增加新的上传路径替换规则
				'__STATIC__' =>'/tpl/static'
		),
);
?>