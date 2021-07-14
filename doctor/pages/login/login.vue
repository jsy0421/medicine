<template>
	<view class="content">
		<image class="logo" :src="avatarUrl"></image>
		<text class="title">{{nickName}}</text>
		<view class="text-area">
			<view class="page-login">
				<view v-if="canIUse||canIGetUserProfile">
					<view class="login-box">
						<!--新版登录方式-->
						<button v-if="canIGetUserProfile" class='login-btn' type='primary' @click="bindGetUserInfo">
							<image src="../../static/微信.png" class="weixin" style="vertical-align:middle"></image><text class="weixinText">微信快捷登录</text>
						</button>
						<!--旧版登录方式-->
						<button v-else class='login-btn' type='primary' open-type="getUserInfo" withCredentials="true"
							lang="zh_CN" @getuserinfo="bindGetUserInfo">
							<image src="../../static/微信.png" class="weixin" style="vertical-align:middle"></image><text class="weixinText">微信快捷登录</text>
						</button>
					</view>
				</view>
				<view v-else class="text-center">
					请升级微信版本
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				sessionKey: '',
				openId: '',
				nickName: '微信用户',
				avatarUrl: "../../static/center.png",
				userInfo: {},
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				canIGetUserProfile: false,
			}
		},
		onLoad() {
			var _this = this;
			//console.log(uni.getUserProfile);
			if (uni.getUserProfile) {
				this.canIGetUserProfile = true;
			}
			//判断若是版本不支持新版则采用旧版登录方式
			//查看是否授权
			if (!this.canIGetUserProfile) {
				uni.getSetting({
					success: function(res) {
						if (res.authSetting['scope.userInfo']) {
							uni.getUserInfo({
								provider: 'weixin',
								success: function(res) {
									//console.log(res);
									_this.userInfo = res.userInfo;
									try {
										_this.login();
									} catch (e) {}
								},
								fail(res) {}
							});
						} else {
							// 用户没有授权
							console.log('用户还没有授权');
						}
					}
				});
			}
		},
		methods: {
			//登录授权
			bindGetUserInfo(e) {
				var _this = this;
				if (this.canIGetUserProfile) {
					//新版登录方式
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							//console.log(res);
							_this.userInfo = res.userInfo;
							try {
								_this.login();
							} catch (e) {}
						},
						fail: (res) => {
							console.log(res)
						}
					});
				} else {
					//旧版登录方式
					if (e.detail.userInfo) {
						//用户按了允许授权按钮
						//console.log('手动');
						//console.log(e.detail.userInfo);
						_this.userInfo = e.detail.userInfo;
						try {
							_this.login();
						} catch (e) {}
					} else {
						console.log('用户拒绝了授权');
						//用户按了拒绝按钮
					}
				}
			},
			//登录
			login() {
				let _this = this;
				// 获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(res) {
						//console.log(res);
						if (res.code) {
							let code = res.code;
							_this.updateUserInfo();
							//将用户登录code传递到后台置换用户SessionKey、OpenId等信息
							//...写用code置换SessionKey、OpenId的接口
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
				// uni.showLoading({
				// 	title: '登录中...'
				// });
				let _this = this;
				var params = {
					openId: _this.openId,
					nickName: _this.userInfo.nickName,
					avatarUrl: _this.userInfo.avatarUrl,
					gender: _this.userInfo.gender,
					city: _this.userInfo.city,
					province: _this.userInfo.province,
					country: _this.userInfo.country,
					unionId: '',
				}
				_this.avatarUrl = _this.userInfo.avatarUrl;
				_this.nickName = _this.userInfo.nickName;
				//console.log('登录');
				//...后台登录的接口
			}
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
	.page-login{
		width: 100%;
	}
	.login-btn{
		border-radius: 50rpx;
	}
	.weixin{
		width: 50rpx;
		height: 50rpx;
		padding-right: 20rpx;
	}
</style>
