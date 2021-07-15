<template>
	<view class="content">
		<u-card u-card :title="time" :sub-title="prescription_status" sub-title-color="#f49416" sub-title-size="27"
			:foot-border-top="false">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<u-image
						src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						shape="circle" width="120rpx" height="120rpx"></u-image>
					<view class="line">
						<view class="doc-text" v-model="doctor_name">{{result_item.doctorName}} 在线云诊室</view>
						<view class="patient-text" v-model="patient_name">就诊人： {{result_item.personName}}</view>
						<view class="sick-text" v-model="sick_condition">病情： {{result_item.question}}</view>
					</view>
				</view>
			</view>
			<view class="foot" slot="foot">
				<u-icon name="gift" size="34" color="" label="复诊配药"></u-icon>
				<view class="btn" v-show="isCompelete">
					<u-button type="success" size="mini" plain @click="lookPrescription" :ripple="true">查看处方</u-button>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: '',//后端返回res之后加上问诊时间
				prescription_status: '', //后端返回res之后判断赋值
				isCompelete: false, //后端返回res之后判断赋值
			};
		},
		props: {
			result_item: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		mounted() {
			this.time="问诊时间: "+this.result_item.createTime;
			if(this.result_item.consultStatus==1){
				this.prescription_status="已完成";
				this.isCompelete=true
			}
			else{
				this.prescription_status="待完成";
				this.isCompelete=false
			}
		},
		methods: {
			lookPrescription() {
				console.log(this.result_item)
			}
		}
	};
</script>

<style scoped lang="scss">
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		// padding: 20rpx 10rpx 0px 10px;
		display: flex;
		flex-direction: row;
	}

	.line {
		margin-left: 10%;
		margin-bottom: 3%;
	}

	.doc-text {
		line-height: 55rpx;
		font-size: 30rpx;
	}

	.patient-text {
		line-height: 55rpx;
		font-size: 30rpx;
		color: #767676;
	}

	.sick-text {
		line-height: 55rpx;
		font-size: 30rpx;
		color: #767676;
	}

	.foot {
		display: flex;
	}

	.btn {
		margin-left: 53%;
		justify-content: right;
	}
</style>
