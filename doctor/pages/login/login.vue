<template>
	<view class="content">
		<image class="logo" :src="avatarUrl"></image>
		<text class="title">{{nickName}}</text>
		<view class="text-area">
			<view class="page-login">
				<view class="login-box">
					<!--新版登录方式-->
					<button class='login-btn' type='primary' @click="bindGetUserInfo" open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber">
						<image src="../../static/微信.png" class="weixin" style="vertical-align:middle"></image><text
							class="weixinText">微信快捷登录</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WXBizDataCrypt from "@/WXBizDataCrypt.js";
	export default {
		data() {
			return {
				title: 'Hello',
				sessionKey: '',
				openId: '',
				nickName: '',
				avatarUrl: "../../static/center.png",
				userInfo: {},
				encryptedData: '',
				iv: '',
				unionId: '',
				phoneNumber: '',
				isCanUse: uni.setStorageSync('isCanUse', true) //默认为true  记录当前用户是否是第一次授权使用的
			}
		},
		onLoad() {},
		methods: {
			//登录授权
			bindGetUserInfo(e) {
				var _this = this;
				//新版登录方式
				var isCanUse = uni.getStorageSync('isCanUse');
				if (isCanUse) {
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							console.log(res);
							_this.userInfo = res.userInfo;
							try {
								_this.login();
							} catch (e) {}
						},
						fail: (res) => {
							console.log(res)
						}
					});
				}
			},
			//登录
			login() {
				let _this = this;
				// 获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(res) {
						// console.log(res);
						if (res.code) {
							// let code = res.code;
							uni.request({
								url: 'https://api.weixin.qq.com/sns/jscode2session',
								method: 'GET',
								data: {
									appid: 'wxc485e910d320a0b3', //你的小程序的APPID  
									secret: '****', //你的小程序的secret, //65df3a78b1ee0d2d46d6d4667d0a8407
									js_code: res.code, //wx.login 登录成功后的code  
									grant_type: 'authorization_code',
								},
								success: (cts) => {
									// 换取成功后 暂存这些数据 留作后续操作  
									_this.openId = cts.data.openid //openid 用户唯一标识  
									_this.unionid = cts.data
										.unionid //unionid 开放平台唯一标识   当公众号和小程序同时登录过才会有
									_this.sessionKey = cts.data.session_key //session_key  会话密钥  
									console.log(cts)
									console.log(_this.openId, _this.sessionKey)
								}
							});
							_this.avatarUrl = _this.userInfo.avatarUrl;
							_this.nickName = _this.userInfo.nickName;
							// uni.setStorageSync('isCanUse', false);
							//置换成功调用登录方法_this.updateUserInfo();
						} else {
							uni.showToast({
								title: '登录失败！',
								duration: 2000
							});
							console.log('登录失败！' + res.errMsg)
						}
					},
				});
			},
			//向后台更新信息
			updateUserInfo() {
				let _this = this;
				console.log(_this.phoneNumber);
				var params = {
					mini_open_id: _this.openId,
					user_id: _this.userInfo.nickName,
					user_type: "1",
					phone_no: _this.phoneNumber
				}
				console.log('登录');
				//...后台登录的接口
			},
			getPhoneNumber: function(e) {
				let _this = this;
				console.log(uni.getStorageSync('isCanUse'));
				setTimeout(function() {
					_this.encryptedData = e.detail.encryptedData;
					_this.iv = e.detail.iv;
					var pc = new WXBizDataCrypt('wxc485e910d320a0b3', _this
						.sessionKey); //wxXXXXXXX为你的小程序APPID
					var data = pc.decryptData(_this.encryptedData, _this.iv);
					_this.phoneNumber = data.phoneNumber;
					console.log(data);
					var isCanUse = uni.getStorageSync('isCanUse');
					if (isCanUse){
						_this.updateUserInfo();
						console.log("nickName: " + _this.nickName);
						uni.navigateTo({
							url:'/pages/index/index?userId=' + _this.nickName
						})
					}
					uni.setStorageSync('isCanUse', false);
				}, 4000);
				uni.showLoading({
					title: '登录中...',
					duration: 4000
				});
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin-top: 10%;
		width: 80%;
	}

	.page-login {
		width: 100%;
	}

	.login-btn {
		border-radius: 50rpx;
	}

	.weixin {
		width: 50rpx;
		height: 50rpx;
		padding-right: 20rpx;
	}
</style>
