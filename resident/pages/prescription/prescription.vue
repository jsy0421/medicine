<template>
	<view class="content">
		<!-- 分段器 -->
		<view class="subsection">
			<u-subsection :list="list" :current="curNow" @change="sectionChange" :animation="true"
				active-color="#19be6b" inactiveColor="#c0c4cc" bg-color="#ffffff" height="100">
			</u-subsection>
		</view>
		<!-- 处方 -->
		<view class="prescription">
			<!-- 处方头部 -->
			<view class="prescription-head">
				<u-card :border="false" :foot-border-top="false" :head-border-bottom="false" :show-head="false" :full="true">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">{{org_id}}</view>
							</view>
							<view class="u-body-item u-flex u-row-between u-p-b-0">
								<view class="u-body-item-title u-line-2">处方笺</view>
								<button disabled="true">{{prescription_drug_id}}</button>
							</view>
						</view>
					</u-card>
				<p class="org_id">{{org_id}}</p>  <!--机构id-->
				<p>处方笺</p>
				<text>{{prescription_drug_id}}</text> <!--处方药品标识-->
			</view>
			<!-- 处方 患者信息 -->
			<view class="prescription-resident">
				<p><text>姓名 {{person_name}}</text>
					<text>性别 {{person_gender_name}}</text>
					<text>年龄 {{person_age}}</text>
					<text>日期 {{finish_time}}</text>
				</p>
				<p><text>{{person_card_type}} {{person_card_id}}</text>
					<text>手机号 {{person_phone_no}}</text>
				</p>

			</view>
			<!-- 分割线 -->
			<view class="divider">
				<u-divider half-width="100%" margin-top="100" border-color="#303133" :useSlot="false"></u-divider>
			</view>
			<!-- 处方 药品信息 -->
			<view class="prescription-medicine">
				<text>Rp</text>
				<p>{{drug_name}} {{quantity}}盒</p>
				<p>用法：{{dose}}{{dose_unit}} {{frequency_name}} {{usage_name}}</p>
				<p>药费：￥{{price*quantity}}元</p>
			</view>
			<!-- 处方 医生信息 -->
			<view class="prescription-doctor">
				<p>处方医师：{{doctor_name}}  盖章：</p>
				<p>审核医师：</p>
				<p>发药医师：</p>
			</view>
			<!-- 处方 药师温馨提示 -->
			<view class="prescription-warning">
				<p>*药师温馨提示：{{remark}}</p>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '处方1'
					},
					{
						name: '处方2'
					}
				],
				curNow: 0,

				// prescription_drug表
				org_id: '创业慧康医院',
				prescription_drug_id: '普通药品处方',
				drug_name: '鼻炎颗粒',
				quantity: '1',
				dose: '1.00', //一次剂量
				dose_unit: 'g/次', //剂量单位
				frequency_name: 'bit', //用药频次
				usage_name: '口服', //药品用法
				price: '0.01', //单价
				remark: '请遵医嘱服药！处方当日有效！', //药师温馨提示

				// consult_ask表
				person_name: '张三',
				person_card_type: '身份证号',
				person_card_id: '123456789654123654',
				person_gender_name: '女',
				person_age: '20',
				person_phone_no: '12345678911',
				finish_time: '2021-07-14',
				
				//prescription_info表
				doctor_name: '李四'
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 45rpx;
		font-weight: 600;
		color: #333;
		padding: 5rpx 10rpx;
		justify-content: center;
		align-items: center;
	}
		
	.u-body-item button {
		font-size: 35rpx;
		font-weight: 500;
		color: #303133;
		line-height: 40rpx;
		background-color: #ffffff;
		width: 180rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
		float: inline-end;
	}
</style>