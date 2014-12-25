<?php

class ApplicationAction extends BackAction
{	
	public $_mod_application;
	public function _initialize() {
        $this->_mod_application = M('application');
    }

	public function index() {
    	$mod = $this->_mod_application;
    	//dump($mod);exit;
    	$this->_list($mod);
    	$this->display();
    }

    //分配用户
    public function dispatch(){
    	$mod = $this->_mod_application;
    	
    	$ids = trim($this->_request('id'), ',');
    	$userName = "user".$ids;
    	$password = $this->generate_password(8);
    	$user_info["uname"] = $userName;
    	$user_info["password"] = $password;
    	$where["id"] = $ids;
    	
    	if ($ids) {
    		$db=D('Users');
    		$user_data["username"] = $userName;
    		$user_data["password"] = md5($password);
    		$user_data["status"] = 1;
    		$user_data["gid"] = 5;
    		$user_data["createtime"] = time();
    		$id=$db->add($user_data);
    		$viptime=time()+30*365*24*3600;
    		$db->where(array('id'=>$id))->save(array('viptime'=>$viptime));
    		if ($id) {	   		
	    		if (false !== $mod->where($where)->save($user_info)) {
	    			IS_AJAX && $this->ajaxReturn(1, L('operation_success'));
	    			$this->success(L('operation_success'));
	    		} else {
	    			IS_AJAX && $this->ajaxReturn(0, L('operation_failure'));
	    			$this->error(L('operation_failure'));
	    		}
    		}
    	} else {
    		IS_AJAX && $this->ajaxReturn(0, L('illegal_parameters'));
    		$this->error(L('illegal_parameters'));
    	}
    }

    //随机生成密码
    function generate_password( $length = 8 ) {
    	// 密码字符集，可任意添加你需要的字符
    	$chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    
    	$password = '';
    	for ( $i = 0; $i < $length; $i++ )
    	{
    		
    		$password .= $chars[ mt_rand(0, strlen($chars) - 1) ];
    	}
    
    	return $password;
    }
    public function delete()
    {
    	$mod = $this->_mod_application;

    	$ids = trim($this->_request('id'), ',');
    	if ($ids) {
    		if (false !== $mod->delete($ids)) {
    			IS_AJAX && $this->ajaxReturn(1, L('operation_success'));
    			$this->success(L('operation_success'));
    		} else {
    			IS_AJAX && $this->ajaxReturn(0, L('operation_failure'));
    			$this->error(L('operation_failure'));
    		}
    	} else {
    		IS_AJAX && $this->ajaxReturn(0, L('illegal_parameters'));
    		$this->error(L('illegal_parameters'));
    	}
    	
    }

}
?>