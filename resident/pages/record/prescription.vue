<template>
	<view class="content">
		<!-- 分段器 -->
		<view class="subsection">
			<u-tabs :list="list" :is-scroll="true" :current="curNow" @change="sectionChange" font-size="35"
				:bar-width="width" height="100" :item-width="width"></u-tabs>

		</view>
		<!-- 处方 -->
		<view class="prescription">
			<!-- 处方头部 -->
			<view class="prescription-head">
				<u-card :border="false" :foot-border-top="false" :head-border-bottom="false" :show-head="false"
					:full="true">
					<view class="" slot="body">
						<view class="u-body-item u-flex u-col-between u-p-t-0">
							<view class="u-body-item-title u-line-2">{{prescriptionResult.prescribeList[curNow].orgId}}
							</view>
							<!--机构id-->
						</view>
						<view class="u-body-item u-flex u-row-between u-p-b-0 prescription_drug_id">
							<view class="u-body-item-title u-line-2">处方笺</view>
							<button>{{prescriptionResult.prescribeList[curNow].prescriptionType | prescriptionTypeFormat}}</button>
							<!--处方药品标识-->
						</view>
					</view>
				</u-card>
			</view>
			<!-- 处方 患者信息 -->
			<view class="prescription-resident">
				<p><text>姓名 {{prescriptionResult.personName}}</text>
					<text>性别 {{prescriptionResult.personGenderName}}</text>
					<text>年龄 {{prescriptionResult.personAge}}岁</text>
					<text>日期 {{prescriptionResult.prescribeList[curNow].createTime | dataFormat}}</text> <!-- 接口缺 -->
				</p>
				<p><text>身份证号 {{prescriptionResult.personCardId}}</text>
					<text>手机号 {{prescriptionResult.personPhoneNo}}</text>
				</p>

			</view>
			<!-- 分割线 -->
			<u-gap height="5" bg-color="#303133" margin-top='100'></u-gap>
			<!-- 处方 药品信息 -->
			<text class="RP">Rp</text>
			<view v-for="(item,index) in prescriptionResult.prescribeList[curNow].drugList" :key="index">
				<view class="prescription-medicine">
					<table>
						<tr>
							<td>{{item.drugName}}<text class="quantity">{{item.quantity}} 盒</text></td>
						</tr>
						<tr>
							<td class="use">
								用法：{{item.dose}}{{item.doseUnit}}/次&nbsp;&nbsp;&nbsp;{{item.frequencyName}}&nbsp;&nbsp;&nbsp;{{item.usageName}}
							</td>
						</tr>

					</table>

				</view>
			</view>
			<text class="price">药费：<text>￥{{prescriptionResult.prescribeList[curNow].price}}</text>元</text>
			<!-- 处方 医生信息 -->
			<view class="prescription-doctor">
				<table>
					<tr>
						<td>处方医师：{{prescriptionResult.prescribeList[curNow].doctorName}} <text class="stamp">盖章：</text>
						</td>
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
				<text>*药师温馨提示：{{prescriptionResult.prescribeList[curNow].remark}}</text>
			</view>

		</view>
		<view class="button">
			<button class="determine" @click="right()">确认</button>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				list: [],
				curNow: 0,
				consultId: '',

				prescriptionResult: {},
				width: 300
			}
		},
		filters: {
			dataFormat(time) {
				var data = time.substring(0, 10);
				return data;
			},
			prescriptionTypeFormat(prescriptionType) {
				if (prescriptionType === '1')
					return '西药方';
				else if (prescriptionType === '2')
					return '中成药方'
			}
		},
		onLoad(option) {
			console.log(option)
			this.consultId = option.consultId;
			uni.request({
				url: `${this.$Url}/prescribe/${this.consultId}`, //这里的lid,page,pagesize只能是数字或字母
				// url: `${this.$Url}/prescribe/1415851778022617090`,
				method: 'GET',
				success: (res) => {
					console.log(res.data.result);
					this.prescriptionResult = res.data.result;
					for (var i = 0; i < this.prescriptionResult.prescribeList.length; i++) {
						var number = i + 1;
						var text = {
							name: '处方' + number,
						}
						this.list.push(text);
						var remark = '';
						var price = 0;
						for (var j = 0; j < this.prescriptionResult.prescribeList[i].drugList.length; j++) {
							remark += this.prescriptionResult.prescribeList[i].drugList[j].remark;
							price += this.prescriptionResult.prescribeList[i].drugList[j].price * this
								.prescriptionResult.prescribeList[i].drugList[j].quantity;
						}
						this.prescriptionResult.prescribeList[i]["remark"] = remark;
						this.prescriptionResult.prescribeList[i]["price"] = price;
					}
				},
				fail: (err) => {
					console.log(err)
				}
			});
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			},
			right() {
				uni.navigateBack({
					url:'/page/record/record'
				})
			}
		}
	}
</script>

<style lang="scss">
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
		background-color: #ffffff;
		width: 200rpx;
		height: 110rpx;
		border-radius: 8rpx;
		border: 5rpx solid #303133;
		vertical-align: middle;
		text-align: center;
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
		padding-top: 3%;
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
		padding-left: 60%;
	}

	.price text {
		color: #f29100;
	}

	.prescription-doctor {
		padding-top: 10%;
		line-height: 50rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #303133;
		letter-spacing: 2rpx;
	}

	.stamp {
		padding-left: 45%;
	}

	.prescription-warning {
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

	.button {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		z-index: 9999;
	}

	.button button {
		height: 100rpx;
	}

	.determine {
		background-color: #2b85e4;
		border-radius: 0;
		color: #FFFFFF;
		font-size: 32rpx;
	}
</style>
