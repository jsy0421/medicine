<template>
	<view class="content">
		<image class="logo" :src="avatarUrl"></image>
		<text class="title">{{nickName}}</text>
		<view class="text-area">
			<view class="page-login">
				<view class="login-box">
					<view v-if="isCanUse === true">
						<button class='login-btn' type='primary' @click="bindGetUserInfo">
							<image src="../../static/微信.png" class="weixin" style="vertical-align:middle"></image><text
								class="weixinText">微信快捷登录</text>
						</button>
					</view>
					<view v-else>
						<button class='login-btn' type='primary' @click="bindGetUserInfoSecond" open-type="getUserInfo"
							@getuserinfo="bindGetUserInfo">
							<image src="../../static/微信.png" class="weixin" style="vertical-align:middle"></image><text
								class="weixinText">微信快捷登录</text>
						</button>
					</view>

				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	// import WXBizDataCrypt from "@/WXBizDataCrypt.js";
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
				// phoneNumber: '',
				isCanUse: '' //默认为true  记录当前用户是否是第一次授权使用的
			}
		},
		onLoad() {
			uni.setStorageSync('isCanUse', true);
			this.isCanUse = uni.getStorageSync('isCanUse');
			console.log(this.isCanUse);
		},
		onShow() {
			this.isCanUse = uni.getStorageSync('isCanUse');
			console.log(this.isCanUse);
		},
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
			bindGetUserInfoSecond(e) {
				this.bindGetUserInfo(e);
				this.$refs.uToast.show({
					title: '登录成功',
					type: 'success'
				});
				uni.setStorageSync("userId", this.nickName);
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/index/index?userId=' + this.nickName
					})
				}, 2000);
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
									appid: 'wxf3c572b5e01fad13', //你的小程序的APPID  
									secret: '8f05dc5c15845e8f207380c8a813ed45', //你的小程序的secret, //65df3a78b1ee0d2d46d6d4667d0a8407
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
							getApp().globalData.nickname = _this.nickName
							_this.updateUserInfo();
							// uni.setStorageSync('isCanUse', false);
							//置换成功调用登录方法_this.updateUserInfo();
						} else {
							this.$refs.uToast.show({
								title: '登陆失败，请重新登录',
								type: 'error'
							});
							console.log('登录失败！' + res.errMsg)
						}
					},
				});
			},
			//向后台更新信息
			updateUserInfo() {
				let _this = this;
				// console.log(_this.phoneNumber);
				console.log('登录');
				//...后台登录的接口

				console.log(_this.userInfo.nickName);
				// console.log(_this.openId);
				// console.log(_this.phoneNumber);

				this.$refs.uToast.show({
					title: '登录成功',
					type: 'success'
				});
				uni.setStorageSync("userId", _this.nickName);
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/index/index?userId=' + _this.nickName
					})
				}, 2000);

				// uni.request({
				// 	url: `${this.$Url}/doctor/login`, //这里的lid,page,pagesize只能是数字或字母
				// 	method: 'POST',
				// 	data: {
				// 		userId: _this.userInfo.nickName,
				// 		miniOpenId: _this.openId,
				// 		phoneNo: _this.phoneNumber
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		this.$refs.uToast.show({
				// 			title: '登录成功',
				// 			type: 'success'
				// 		});
				// 		uni.setStorageSync("userId", _this.nickName);
				// 		setTimeout(function() {
				// 			uni.navigateTo({
				// 				url: '/pages/index/index?userId=' + _this.nickName
				// 			})
				// 		}, 2000);
				// 	},
				// 	fail: (err) => {
				// 		console.log(err)
				// 	}
				// })
			},
			// getPhoneNumber: function(e) {
			// 	let _this = this;
			// 	console.log(uni.getStorageSync('isCanUse'));
			// 	setTimeout(function() {
			// 		_this.encryptedData = e.detail.encryptedData;
			// 		_this.iv = e.detail.iv;
			// 		var pc = new WXBizDataCrypt('wxc485e910d320a0b3', _this
			// 			.sessionKey); //wxXXXXXXX为你的小程序APPID
			// 		var data = pc.decryptData(_this.encryptedData, _this.iv);
			// 		_this.phoneNumber = data.phoneNumber;
			// 		console.log(data);
			// 		var isCanUse = uni.getStorageSync('isCanUse');
			// 		if (isCanUse) {
			// 			_this.updateUserInfo();
			// 			console.log("nickName: " + _this.nickName);
			// 		} else {
			// 			this.$refs.uToast.show({
			// 				title: '登录成功',
			// 				type: 'success'
			// 			});
			// 			uni.setStorageSync("userId", _this.nickName);
			// 			setTimeout(function() {
			// 				uni.navigateTo({
			// 					url: '/pages/index/index?userId=' + _this.nickName
			// 				})
			// 			}, 2000);
			// 		}
			// 		uni.setStorageSync('isCanUse', false);
			// 	}, 4000);
			// 	uni.showLoading({
			// 		title: '登录中...',
			// 		duration: 4000
			// 	});
			// },
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
