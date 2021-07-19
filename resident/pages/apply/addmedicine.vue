<template>
	<view class="content">
		<!-- 搜索 -->
		<u-search placeholder="搜索药品" v-model="keyword" class="search" :show-action="true" action-text="搜索"
			@custom="searchDrug" @search="searchDrug"></u-search>
		<!-- 搜索结果文字 -->
		<view class="search-text">
			<text>搜索结果({{medicineList.length}}条)</text>
		</view>

		<!-- 搜索结果 -->
		<view v-for="(item,index) in medicineList" :key="index" class="search-detail">
			<u-card @click="chooseThis(index)" :show-head="false" :showFoot="false" :border="false"
				:foot-border-top="false" padding="10rpx">
				<view class="card-body" slot="body">
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							<view class="u-body-item u-flex u-col-between u-p-t-0">
								<text>{{item.drugName}}</text>
								<u-icon name="info-circle-fill" color="#c0c4cc" size="35" class="info-icon"></u-icon>
							</view>
							<view class="u-body-item u-flex u-col-between u-p-t-0">
								<text>{{item.factoryName}}</text>
							</view>
						</view>
						<text>{{item.dose}}{{item.doseUnit}}</text>

					</view>
				</view>
			</u-card>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				drugitem:{
					chooseDrugName:'',
					chooseDrugId:'',
				},
				chooseDrugName: '',
				keyword: '',
				medicineList: []
			}
		},
		onLoad() {
			uni.request({
				url: `${this.$Url}/drug/page`,
				method: 'GET',
				data:{
					size:100
				},
				success: (res) => {
					//console.log(res.data.result.records)
					res.data.result.records.forEach(item => {
						var single = {
							drugId: item.drugId,
							drugName: item.drugName,
							tradeName: item.tradeName,
							pinyinCode: item.pinyinCode,
							specification: item.specification,
							packUnit: item.packUnit,
							price: item.price,
							dose: item.dose,
							doseUnit: item.doseUnit,
							factoryName: item.factoryName,
							approvalNumber: item.approvalNumber
						}
						this.medicineList.push(single)
					})
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			searchDrug() {
				if (this.keyword == ''||this.keyword == ' ')
					this.keyword = "-1"
				console.log(this.keyword)
				uni.request({
					url: `${this.$Url}/drug/search/${this.keyword}`, //这里的lid,page,pagesize只能是数字或字母?????
					method: 'GET',
					success: (res) => {
						this.keyword=''
						console.log(res.data.result)
						this.medicineList = []
						res.data.result.forEach(item => {
							var single = {
								drugId: item.drugId,
								drugName: item.drugName,
								tradeName: item.tradeName,
								pinyinCode: item.pinyinCode,
								specification: item.specification,
								packUnit: item.packUnit,
								price: item.price,
								dose: item.dose,
								doseUnit: item.doseUnit,
								factoryName: item.factoryName,
								approvalNumber: item.approvalNumber
							}
							this.medicineList.push(single)
						})
					},
					fail: (err) => {
						this.keyword=''
						console.log(err)
					}
				})
			},
			chooseThis(index) {
				this.drugitem.chooseDrugName = this.medicineList[index].drugName
				this.drugitem.chooseDrugId = this.medicineList[index].drugId
				console.log(this.drugitem)
				this.$event.notify('medicineEvent', this.drugitem)
				uni.navigateBack({
					url: '../apply/apply'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 150rpx;
	}

	.search {
		background-color: #ffffff;
		height: 100rpx;
		width: 98%;
		padding: 18rpx 10rpx;
		position: fixed;
		top: 0rpx;
		z-index: 9999;
	}

	.u-search-box {
		width: 80%;
		float: left;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		display: flex;
		height: 60rpx;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.search-text {
		background-color: #ecf5ff;
		padding: 2%;
		letter-spacing: 2rpx;
		position: fixed;
		top: 100rpx;
		width: 100%;
		z-index: 9999;
	}

	.search-detail {
		border-bottom: 1rpx #e4e7ed solid;
	}

	.card-body {
		line-height: 60rpx;
		color: #303133;
	}

	.info-icon {
		padding-left: 10rpx;
	}
</style>
