<template>
	<view class="content">
		<!-- 搜索 -->
		<u-search placeholder="搜索药品" v-model="keyword" class="search"></u-search>
		<!-- 搜索结果文字 -->
		<view class="search-text">
			<text>搜索结果({{medicineList.length}}条)</text>
		</view>

		<!-- 搜索结果 -->
		<view v-for="(item,index) in medicineList" :key="index" class="search-detail">
			<u-card :show-head="false" :showFoot="false" :border="false" :foot-border-top="false" padding="10rpx" @click="choseMidicine(index)">
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
				id:-1,
				keyword: '',
				medicineList: [{
						"drugId": 1,
						"drugName": "肠炎宁片",
						"tradeName": "[康恩贝]肠炎宁片",
						"pinyinCode": "cynp",
						"specification": "0.42g*48片",
						"packUnit": "盒",
						"price": 30,
						"dose": 0.42,
						"doseUnit": "g",
						"factoryName": "江西康恩贝中药有限公司",
						"approvalNumber": "国药准字Z36020518"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 3,
						"drugName": "小柴胡颗粒",
						"tradeName": "[999]小柴胡颗粒",
						"pinyinCode": "xchkl",
						"specification": "10g*9袋",
						"packUnit": "盒",
						"price": 18.2,
						"dose": 10,
						"doseUnit": "g",
						"factoryName": "华润三九医药股份有限公司",
						"approvalNumber": "国药准字Z44020709"
					},
					{
						"drugId": 4,
						"drugName": "布洛芬缓释胶囊",
						"tradeName": "[芬必得]布洛芬缓释胶囊",
						"pinyinCode": "blfysjn",
						"specification": "0.3g*20粒",
						"packUnit": "盒",
						"price": 14.2,
						"dose": 0.3,
						"doseUnit": "g",
						"factoryName": "中美天津史克制药有限公司",
						"approvalNumber": "国药准字H20013062"
					},
					{
						"drugId": 5,
						"drugName": "清凉油(白色)",
						"tradeName": "[龙虎]清凉油(白色)",
						"pinyinCode": "qly",
						"specification": "18.4g",
						"packUnit": "瓶",
						"price": 23,
						"dose": 0.1,
						"doseUnit": "g",
						"factoryName": "上海中华药业有限公司",
						"approvalNumber": "国药准字Z20026718"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					},
					{
						"drugId": 2,
						"drugName": "连花清瘟胶囊",
						"tradeName": "[以岭]连花清瘟胶囊",
						"pinyinCode": "lhqwjn",
						"specification": "0.35g*36粒",
						"packUnit": "盒",
						"price": 29.1,
						"dose": 0.35,
						"doseUnit": "g",
						"factoryName": "石家庄以岭药业股份有限公司",
						"approvalNumber": "国药准字Z20040063"
					}
				]
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		methods: {
			choseMidicine(index){
				var drugId = this.medicineList[index].drugId;
				var drugName = this.medicineList[index].drugName;
				var specification = this.medicineList[index].specification;
				uni.navigateTo({
					url:'/pages/setmedicine/setmedicine?drugName='+drugName+'&specification=' + specification + '&drugId=' + drugId + '&id=' +this.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
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
	
	.search-detail{
		border-bottom: 1rpx #e4e7ed solid;
	}
	
	.card-body{
		line-height: 60rpx;
		color: #303133;
	}
	
	.info-icon{
		padding-left: 10rpx;
	}
</style>
