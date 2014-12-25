<?php
class IndexAction extends BaseAction{
	public function _initialize(){
		parent::_initialize();
		import('Think.ORG.Page');// 导入分页类
	}
	
	//首页
    public function index(){
	       $this->assign("home","123");
	       $this->display();
	}
	
	//复方强生胶囊
	public function jiaonang(){
		$this->assign("");
		$this->display();
	}
	
	//舒肝灵
	public function shuganling(){
		$this->display();
	}
	
	//消脂灵
	public function xiaozhiling(){
		$this->display();
	}
	
	//护肤霜
	public function hufushuang(){
		$this->display();
	}
	
	//关于我们
	public function about(){
		$this->display();
	}
	
	//订单
	public function dingdan(){
		if(IS_POST){
			  $name = $this->_post('jiaonang','trim');
			  $price = $this->_post('price','trim,intval');
			  $quantity = $this->_post('quantity','traim,intval');
			  if($name == '' || $price == '' || $quantity == '' ||!is_numeric($price) || !is_numeric($quantity)){
			  	    $this->error("参数错误");
			  }
			 $this->assign('name',$name);
			 $this->assign('price',$price);
			 $this->assign('quantity',$quantity);
			 $this->assign("sumPrice",$price*$quantity);
		}else{
			  $this->display('index');
		}
		$this->display();
	}
	
	//确认订单
	public function queren(){
		$this->display();
	}
}