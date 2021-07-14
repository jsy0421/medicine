<template>
	<view class="u-menu-wrap">
		<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
			<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
				:class="[current==index ? 'u-tab-item-active' : '']" :data-current="index" @tap.stop="swichMenu(index)">
				<text class="u-line-1">{{item.name}}</text>
			</view>
		</scroll-view>
		<block v-for="(item,index) in tabbar" :key="index">
			<scroll-view scroll-y class="right-box" v-if="current==index">
				<view class="page-view">
					<view class="class-item">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
								<image class="item-menu-image" :src="item1.icon" mode=""></image>
								<view class="item-menu-name">{{item1.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: [{
						"name": "女装",
						"foods": [{
								"name": "半身裙",
								"key": "半身裙",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/3.jpg",
								"cat": 10
							},
							{
								"name": "衬衫",
								"key": "衬衫",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/4.jpg",
								"cat": 10
							},
							{
								"name": "短裙",
								"key": "短裙",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/5.jpg",
								"cat": 10
							},
							{
								"name": "阔腿裤",
								"key": "阔腿裤",
								"icon": "https://cdn.uviewui.com/uview/common/classify/1/6.jpg",
								"cat": 10
							},
						]
					},
					{
						"name": "美食",
						"foods": [{
								"name": "精品茗茶",
								"key": "茶",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/7.jpg",
								"cat": 6
							},
							{
								"name": "休闲食品",
								"key": "休闲食品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/8.jpg",
								"cat": 6
							},
							{
								"name": "糖果巧克力",
								"key": "糖果巧克力",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/9.jpg",
								"cat": 6
							},
							{
								"name": "方便速食",
								"key": "方便速食",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/10.jpg",
								"cat": 6
							}
						]
					},
					{
						"name": "户外运动",
						"foods": [{
								"name": "瑜伽用品",
								"key": "瑜伽",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/7.jpg",
								"cat": 0
							},
							{
								"name": "健身装备",
								"key": "健身",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/8.jpg",
								"cat": 0
							},
							{
								"name": "球迷用品",
								"key": "球迷",
								"icon": "https://cdn.uviewui.com/uview/common/classify/14/9.jpg",
								"cat": 0
							}
						]
					}
				],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		methods: {
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
