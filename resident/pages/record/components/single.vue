<template>
	<view class="content">
		<u-card u-card :title="time" :sub-title="prescription_status" title-size="30" sub-title-color="#f49416" sub-title-size="27"
			:foot-border-top="false">
			<view class="" slot="body">
				<view class="u-body-item u-flex  u-col-between u-p-t-0">
					<u-image
						:src="imgUrl"
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
				imgUrl:'',
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
			this.imgUrl=this.result_item.avatarUrl
			console.log(this.imgUrl)
			//时间格式
			this.timeFormat(this.result_item.createTime)
			this.time="问诊时间 : "+this.result_item.createTime;
			console.log(this.time)
			if(this.result_item.consultStatus==3){
				this.prescription_status="已完成";
				this.isCompelete=true
			}
			else if(this.result_item.consultStatus==2){
				this.prescription_status="进行中";
				this.isCompelete=false
			}
			else{
				this.prescription_status="待接诊";
				this.isCompelete=false
			}
		},
		methods: {
			timeFormat(date){
				var arr=date.split("T");
				    var d=arr[0];
				    var darr = d.split('-');
				    var t=arr[1];
				    var tarr = t.split('.000');
				    var marr = tarr[0].split(':');
				    var dd = darr[0]+"-"+darr[1]+"-"+darr[2]+" "+marr[0]+":"+marr[1];
					this.result_item.createTime=dd
					// console.log(this.result_item.createTime)
			},
			lookPrescription() {
				// this.$event.notify('prescriptionEvent', this.drugitem.consultId)
				
				//移至prescription
				// this.$event.on('prescriptionEvent', (consultId) => {
				// 	this.consultId = consultId
				// 	console.log(this.consultId)
				// })
				
				uni.navigateTo({
					url: '/pages/record/prescription',
				});
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
