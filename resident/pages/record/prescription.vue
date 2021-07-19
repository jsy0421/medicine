<template>
	<view class="content">
		<!-- 分段器 -->
		<view class="subsection">
			<u-subsection :list="list" :current="curNow" @change="sectionChange" :animation="true"
				active-color="#2979ff" inactiveColor="#c0c4cc" bg-color="#ffffff" height="100">
			</u-subsection>
		</view>
		<!-- 处方 -->
		<view class="prescription">
			<!-- 处方头部 -->
			<view class="prescription-head">
				<u-card :border="false" :foot-border-top="false" :head-border-bottom="false" :show-head="false"
					:full="true">
					<view class="" slot="body">
						<view class="u-body-item u-flex u-col-between u-p-t-0">
							<view class="u-body-item-title u-line-2">{{org_id}}</view>
							<!--机构id-->
						</view>
						<view class="u-body-item u-flex u-row-between u-p-b-0 prescription_drug_id">
							<view class="u-body-item-title u-line-2">处方笺</view>
							<button disabled="true">{{prescription_drug_id}}</button>
							<!--处方药品标识-->
						</view>
					</view>
				</u-card>
			</view>
			<!-- 处方 患者信息 -->
			<view class="prescription-resident">
				<p><text>姓名 {{person_name}}</text>
					<text>性别 {{person_gender_name}}</text>
					<text>年龄 {{person_age}}岁</text>
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
			<text class="RP">Rp</text>
			<view class="prescription-medicine">
				<table>
					<tr>
						<td>{{drug_name}}<text class="quantity">{{quantity}} 盒</text></td>
					</tr>
					<tr>
						<td class="use">
							用法：{{dose}}{{dose_unit}}/次&nbsp;&nbsp;&nbsp;{{frequency_name}}&nbsp;&nbsp;&nbsp;{{usage_name}}
						</td>
					</tr>
					<tr>
						<td class="price">药费：<text>￥{{price*quantity}}</text>元</td>
					</tr>
				</table>
			</view>
			<!-- 处方 医生信息 -->
			<view class="prescription-doctor">
				<table>
					<tr>
						<td>处方医师：{{doctor_name}} <text class="stamp">盖章：</text></td>
					</tr>
					<tr>
						<td>审核医师：</td>
					</tr>
					<tr>
						<td>发药医师：</td>
					</tr>
				</table>
			</view>
			<!-- 处方 药师温馨提示 -->
			<view class="prescription-warning">
				<text>*药师温馨提示：{{remark}}</text>
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
				
				result: {
				    prescribeList: [
				      {
				        userId: "mkd",
				        consultId: "1415851778022617090",
				        orgId: "1",
				        doctorId: "1",
				        doctorName: "无语",
				        prescriptionType: "1",
				        drugList: [
				          {
				            drugId: 1,
				            dose: 1,
				            frequencyName: "bid",
				            usageName: "口服",
				            takeDays: 1,
				            quantity: 1,
				            remark: ""
				          },
				          {
				            drugId: 2,
				            dose: 1,
				            frequencyName: "bid",
				            usageName: "口服",
				            takeDays: 10,
				            quantity: 15,
				            remark: "你好"
				          }
				        ]
				      }
				    ],
				    personCardId: "330303200343431230",
				    personGenderName: "男",
				    personBirthDate: "2012-01-14T16:00:00.000+00:00",
				    personAge: 12,
				    personPhoneNo: "13656646985",
				    personName: "李白"
				  },

				// prescription_drug表
				org_id: '创业慧康医院',
				prescription_drug_id: '普通药品处方',
				drug_name: '鼻炎颗粒',
				quantity: '1.00',
				dose: '1.00', //一次剂量
				dose_unit: 'g', //剂量单位
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
		onLoad() {
			// this.$event.on('doctorEvent', (DoctorInfo) => {
			// 	this.DoctorInfo = JSON.parse(DoctorInfo)
			// 	console.log(this.DoctorInfo)
			// })
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
		font-weight: 700;
		color: #333;
		padding: 5rpx 10rpx;
		justify-content: center;
		align-items: center;
	}

	.u-body-item button {
		font-size: 35rpx;
		font-weight: 540;
		color: #303133;
		line-height: 50rpx;
		background-color: #ffffff;
		width: 180rpx;
		height: 110rpx;
		border-radius: 8rpx;
		margin-left: 15%;
		border: 5rpx solid #303133;
	}

	.prescription {
		padding-left: 3%;
		padding-right: 3%;
	}

	.prescription_drug_id {
		margin-left: 40%;
	}

	.prescription-resident {
		line-height: 80rpx;
		font-size: 26rpx;
		font-weight: 600;
		color: #303133;
	}

	.prescription-resident text {
		padding-right: 3%;
	}

	.RP {
		padding-top: 5%;
		padding-left: 2%;
		font-size: 35rpx;
		font-weight: 600;
		color: #303133;
		display: block;
		margin-bottom: 3%;
	}

	.prescription-medicine {
		padding-left: 2%;
		padding-right: 3%;
		line-height: 50rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #303133;
		letter-spacing: 2rpx;
	}

	.quantity {
		float: inline-end;
	}

	.use {
		color: #606266;
		padding-left: 10rpx;
	}

	.price {
		padding-left: 65%;
	}

	.price text {
		color: #f29100;
	}
	
	.prescription-doctor{
		padding-top: 10%;
		line-height: 50rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #303133;
		letter-spacing: 2rpx;
	}
	.stamp{
		padding-left: 45%;
	}
	
	.prescription-warning{
		padding-top: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 50rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #c0c4cc;
		letter-spacing: 2rpx;
	}
</style>
