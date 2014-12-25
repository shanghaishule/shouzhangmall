<?php
class IndexAction extends BaseAction{
	//首页
	public function index(){
		
	}
	
	//最新问题
	public function newQuestion(){
		
	}
	
	//问医生页面
	public function askDoctor(){
		//获取科室.
		$md=M("department");
		$department=$md->order("position ASC")->select();
		dump($department);exit();
		
	}
	
	//保存问医生科室的问题.
	public function doAskDoctor(){
		$data['createDate']=date('Y-m-d',time());
		$data['createTime'] = time();
		$data['title']=$this->_post('title');
		$data['sex']=$this->_post('sex');
		$data['icon']=$this->_post('icon');
		$data['priorityAnswer']=$this->_post('priorityAnswer');		
		$data['depId']=$this->_post('depId');
		$data["userId"]=session("uid");
		$quiz=M("quiz");
		$lastId=$quiz->add($data); 
	}
	
	//提示
	public  function hint(){
		
	}
	
	//app推荐
	public function download(){
		
	}
	
	//我的医生
	public function myDoctor(){
		
	}
	
	//寻找医生
	public function foundDR(){
		
	}
	
	//情况(症状)
	public function symptom(){
		
	}
	
	//自查
	public function checkSelf(){
		
	}
	
	//健康
	public function health(){
		
	}
	
	//药物
	public function medicinal(){
		//药物分类
		$mmt=M("medicinetype");
		$medicineType=$mmt->order("position ASC")->select();
		$this->assign("medicineType",$medicineType);
		
		//所有药物
		$med = M("medicine");
	
	}
	
	//步骤
	public function step(){
		
		
	}
	
	//普通用户注册页面
	public function register(){
		
	}
	
	//普通用户注册方法
	public  function  doReg(){
	
	}
	
	//普通用户登陆页面
	public function login(){
		
	}
	
	//普通用户登陆方法.
	public function checkLogin(){
		
	}
	
	//普通用户个人中心
	public function Individualcenter(){
		
	}
	
	//登出
	public function logout() {
	
	}
	
	//医生注册页面
	public function DRregister(){
		
	}
	
	//医生注册方法
	public function doDReg(){
			
	}
	
	//医生登陆页面
	public function DRlogin(){
		
	}
	
	//医生登陆方法
	public function checkDRLogin(){
		
	}
	
	//医生个人中心
	public function DRIndividualCenter(){
		
	}
	
	//医生详情页面
	public function DRdetail(){
		
	}
	
	//提交医生详情页面
	public function commitDR(){
		
	}
	
}
