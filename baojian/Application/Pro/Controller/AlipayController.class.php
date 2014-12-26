<?php
namespace Pro\Controller;
use Think\Controller;
class AlipayController extends Controller {
    public function alipay2(){
    	if(!$_POST['buyer_name']) {
	    	$this->error('请填写收货人姓名');
    	};
    	if(!$_POST['buyer_city']) {
	    	$this->error('请选择省份和城市');
    	};
    	if(!$_POST['buyer_address']) {
	    	$this->error('请填写详细地址');
    	};
    	if(!$_POST['buyer_phone']) {
	    	$this->error('请填写联系电话');
    	};
		require_once("./pay/alipay2/alipayapi.php");
    }
    public function alipay2_return(){
    	require_once("./pay/alipay2/return_url.php");
    }
    public function alipay2_notify(){
    	require_once("./pay/alipay2/notify_url.php");
    }
    public function alipay(){
    	if(!$_POST['buyer_name']) {
	    	$this->error('请填写收货人姓名');
    	};
    	if(!$_POST['buyer_city']) {
	    	$this->error('请选择省份和城市');
    	};
    	if(!$_POST['buyer_address']) {
	    	$this->error('请填写详细地址');
    	};
    	if(!$_POST['buyer_phone']) {
	    	$this->error('请填写联系电话');
    	};
		require_once("./pay/alipay/alipayapi.php");
    }
    public function alipay_return(){
    	require_once("./pay/alipay/return_url.php");
    }
    public function alipay_notify(){
    	require_once("./pay/alipay/notify_url.php");
    }
    public function alipay_wap(){
    	if(!$_POST['buyer_name']) {
	    	$this->error('请填写收货人姓名');
    	};
    	if(!$_POST['buyer_city']) {
	    	$this->error('请选择省份和城市');
    	};
    	if(!$_POST['buyer_address']) {
	    	$this->error('请填写详细地址');
    	};
    	if(!$_POST['buyer_phone']) {
	    	$this->error('请填写联系电话');
    	};
		require_once("./pay/alipay/alipayapi.php");
    }
    public function alipay_wap_return(){
    	require_once("./pay/alipay_wap/call_back_url.php");
    }
    public function alipay_wap_notify(){
    	require_once("./pay/alipay_wap/notify_url.php");
    }
    //财付通
    public function tenpay(){
    	if(!$_POST['buyer_name']) {
	    	$this->error('请填写收货人姓名');
    	};
    	if(!$_POST['buyer_city']) {
	    	$this->error('请选择省份和城市');
    	};
    	if(!$_POST['buyer_address']) {
	    	$this->error('请填写详细地址');
    	};
    	if(!$_POST['buyer_phone']) {
	    	$this->error('请填写联系电话');
    	};
    	require_once("./pay/tenpay/tenpay.php");
    }
    public function tenpay_return(){
    	require_once("./pay/tenpay/payReturnUrl.php");
    }
    public function tenpay_notify(){
    	require_once("./pay/tenpay/payNotifyUrl.php");
    }
    public function hdfk(){
    	if(mc_user_id()) {
    		if(!$_POST['buyer_name']) {
		    	$this->error('请填写收货人姓名');
	    	} elseif(!$_POST['buyer_city']) {
		    	$this->error('请选择省份和城市');
	    	} elseif(!$_POST['buyer_address']) {
		    	$this->error('请填写详细地址');
	    	} elseif(!$_POST['buyer_phone']) {
		    	$this->error('请填写联系电话');
	    	} else {
    			$now = strtotime("now");
				$cart = M('action')->field('id,page_id,action_value')->where(array("user_id"=>mc_user_id(),"action_key"=>'cart'))->select();
				//dump($cart);die;
				if($cart) {
					$item = '';//保存商品名
					$sumPrice = '';//保存商品总价
					foreach($cart as $key => $val){
						//echo $val['page_id'].':'.$val['action_value'].'<br />';
						$itemTitle = M('page')->field('title')->where(array('id'=>$val['page_id']))->find();
						$item.= $itemTitle['title'].'、';
						$itemPrice = M('meta')->field('meta_value')->where(array('page_id'=>$val['page_id'],'meta_key'=>'price'))->find();
						$sumPrice += floatval($itemPrice['meta_value']) * intval($val['action_value']);
						//dump($itemPrice);
					}
					
					$action['date'] = $now;
					$action['action_key'] = 'wait_hdfk';
					M('action')->where("user_id='".mc_user_id()."' AND action_key='cart'")->save($action);
					M('action')->where("user_id='".mc_user_id()."' AND action_key='address_pending'")->delete();
					M('action')->where("user_id='".mc_user_id()."' AND action_key='trade_pending'")->delete();
					$action['page_id'] = mc_user_id();
					$action['user_id'] = mc_user_id();
					$action['action_key'] = 'address_wait_hdfk';
					$action['action_value'] = '<h4>'.I('param.buyer_name').'</h4><p>'.I('param.buyer_province').'，'.I('param.buyer_city').'，'.I('param.buyer_address').'</p><p>'.I('param.buyer_phone').'</p>';
					M('action')->data($action)->add();
					$action['action_key'] = 'trade_wait_hdfk';
					$action['action_value'] = $out_trade_no;
					M('action')->data($action)->add();
					$id = mc_user_id();
					mc_delete_meta($id,'buyer_name','user');
					if(I('param.buyer_name')) {
						mc_add_meta($id,'buyer_name',I('param.buyer_name'),'user');
					};
					mc_delete_meta($id,'buyer_province','user');
					if(I('param.buyer_province')) {
						mc_add_meta($id,'buyer_province',I('param.buyer_province'),'user');
					};
					mc_delete_meta($id,'buyer_city','user');
					if(I('param.buyer_city')) {
						mc_add_meta($id,'buyer_city',I('param.buyer_city'),'user');
					};
					mc_delete_meta($id,'buyer_address','user');
					if(I('param.buyer_address')) {
						mc_add_meta($id,'buyer_address',I('param.buyer_address'),'user');
					};
					mc_delete_meta($id,'buyer_phone','user');
					if(I('param.buyer_phone')) {
						mc_add_meta($id,'buyer_phone',I('param.buyer_phone'),'user');
					};
                    $mobaddrname= I('param.buyer_name')."(".I('param.buyer_phone').")";
                    $mobaddr = I('param.buyer_province').I('param.buyer_city').I('param.buyer_address');
                    //给下单人员和商家发送短信通知
                    $this->PHPSMS(I('param.buyer_phone'), I('param.buyer_phone'),rtrim($item, '、'),$sumPrice,$mobaddrname,$mobaddr);
                    $this->PHPSMS('15214328120', I('param.buyer_phone'),rtrim($item, '、'),$sumPrice,$mobaddrname,$mobaddr);
					 $this->success('货到付款订单提交成功！',U('User/index/pro?id='.mc_user_id()));
				} else {
					$this->error('购物车里没有任何商品！');
				}
    			
	    	}
    	} else {
	    	$this->success('请先登陆',U('User/login/index'));
	    }
    }
    //发送短信
    public function PHPSMS($mob,$mobuser,$mobitem,$mobprice,$mobaddrname,$mobaddr){
    	$act = 'order_guke';
    	if($mob != ""){
    		$ch = curl_init();
    		curl_setopt($ch, CURLOPT_URL, "http://api.weimi.cc/2/sms/send.html");
    		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    		curl_setopt($ch, CURLOPT_POST, TRUE);
    		$uid = '1A0mXEFdgXNn';
    		$pas = '2bb3w3x4';
    		$tel = '4006555899';
    		if($act == 'register'){
    			$smscode = $this->_request('smscode', 'trim', '');
    			$cid = 'PPE1fo4CUJxJ';
    			$title = '沪爱健康';
    			//填写参数
    			curl_setopt($ch, CURLOPT_POSTFIELDS, 'uid='.$uid.'&pas='.$pas.'&mob='.$mob.'&cid='.$cid
    			.'&p1='.$title.'&p2='.$smscode.'&p3='.$tel.'&type=json');
    		}elseif($act == 'order_guke' || $act == 'order_shangjia'){
    			$cid = 'EJUFuhI08MHZ';
    			//$mobuser = $this->_request('mobuser', 'trim', '');//用户
    			//$mobitem = $this->_request('mobitem', 'trim', '');//购买的商品
    			//$mobprice = $this->_request('mobprice', 'trim', '');//订单总价
    			//$mobaddrname = $this->_request('mobaddrname', 'trim', '');//收货人姓名电话
    			//$mobaddr = $this->_request('mobaddr', 'trim', '');//收货地址
    			//填写参数
    			curl_setopt($ch, CURLOPT_POSTFIELDS, 'uid='.$uid.'&pas='.$pas.'&mob='.$mob.'&cid='.$cid
    			.'&p1='.$mobuser.'&p2='.$mobitem.'&p3='.$mobprice.'&p4='.$mobaddrname.'&p5='.$mobaddr
    			.'&p6='.$tel.'&type=json');
    		}
    		$res = curl_exec( $ch );
    		curl_close( $ch );
    		//echo($res);
    	}
    }
}