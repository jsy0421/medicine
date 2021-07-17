<template>
	<view class="apply_page">
		<Head></Head>
		<view class="doctor">
			<view class="doc_info">
				<view class="avatar" @click="changeDoctor">
					<image src="../../static/center-selected.png" mode="aspectFill" class="avatar_img"></image>
				</view>
				<view class="doc_name">
					<view class="name_title">
						<text class="doc_name_txt" v-model="DoctorInfo.doctorName">{{DoctorInfo.doctorName}}</text>
						<text class="tag" v-model="DoctorInfo.levelName">{{DoctorInfo.levelName}}</text>
					</view>
					<view class="sort" v-model="DoctorInfo.deptName">{{DoctorInfo.deptName}}</view>
				</view>
			</view>

			<view class="change_doc" @click="changeDoctor">
				<text class="change_doc_txt">更换医生</text>
				<u-icon name="arrow-right" color="#999" size="30"></u-icon>
			</view>
		</view>

		<view class="form">
			<view class="form_item" @click="addInfo">
				<view class="label">
					<text class="label_required_icon">*</text>
					<text class="label_txt">问诊人</text>
				</view>
				<view class="value" v-if="UserInfo.personName.length>0">
					<text v-model="UserInfo.personName">{{UserInfo.personName}}</text>
					<text v-model="UserInfo.personGenderName">{{UserInfo.personGenderName}}</text>
					<text v-model="UserInfo.personAge">{{UserInfo.personAge}}岁</text>
				</view>
			</view>

			<u-select v-model="hospitalsPickerShow" :list="allHospitalsList" @confirm="handlePickerHospitalConfirm">
			</u-select>

			<view class="form_item">
					<view class="label">
						<text class="label_required_icon">*</text>
						<text class="label_txt">确诊诊断</text>
					</view>
					<view class="value">
						<u-input v-model="SicknessName" :type="type" input-align="right" :border="border" :height="height" placeholder="请输入诊断名" :auto-height="autoHeight" />
						<!-- <text>霍乱</text> -->
					</view>
				</view>
				<view class="form_item add_drugs_form">
					<view class="label">
						<text class="label_required_icon">*</text>
						<text class="label_txt">所需药品</text>
					</view>
					<view class="value" @tap="drugsPickerShow = true">
						<text class="value_txt">添加药品</text>
						<u-icon name="arrow-right" color="#999" size="30"></u-icon>
					</view>
				</view>
			
				<view class="drugs_list">
					<block v-for="(item,index) in drugsList" :key="index">
						<view class="drugs_item">
							<u-icon class="drug_close_icon" name="close-circle-fill" color="#f10" size="28"
								@tap="deleteDrugItem(index)"></u-icon>
							<text class="drugs_name">{{item.value}}</text>
						</view>
					</block>
				</view>
			</view>
			
			<!-- 药品列选择器 -->
			<u-select 
				v-model="drugsPickerShow" 
				:list="allDrugsList" 
				@confirm="handlePickerConfirm"
			></u-select>
			
			<!-- 病情部分 -->
			<view class="condition_item">
				<ConditionTitle 
					title="病情描述" 
					:required="true"
				></ConditionTitle>
				<view class="condition_content">
					<!-- <u-input v-model="SicknessCondition" :type="textarea" :height="100" placeholder="请输入病情" /> -->
					<u-form ref="uForm">
						<u-form-item ><u-input v-model="SicknessCondition" /></u-form-item>
						</u-form>
				</view>
			</view>
			
			<view class="condition_item upload">
				<ConditionTitle title="病情照片"></ConditionTitle>
				<view class="condition_content">
					<view class="pr_img_list">
						<view 
							class="pr_img_item" 
							v-for="(item,index) in imgList" 
							:key="index"
							@tap="handlePreviewImg(item,index)"
						>
							<u-icon class="img_close_icon" name="close-circle-fill" color="#f10" size="38"
								@tap.stop="deletePrImg(index)"></u-icon>
							<image :src="item.url" mode="aspectFill" class="pr_img"></image>
						</view>
						<u-upload
							:action="action" 
							:show-upload-list="false"
							:file-list="fileList"
							max-count="3"
							ref="uUpload"
							@on-change="handleUploadChange"
						></u-upload>
					</view>
					<view class="upload_notice_txt">
						请上传病情照片、化验单、检查资料、报告单、药品处方单，若为皮肤问题，建议对准患处拍照。照片仅自己和医师可见。
					</view>
				</view>
			</view>
			<!-- 提交按钮部分 -->
			<view class="btn">
				<view class="submitBtn center" @click="SubmitAll">
					提交
				</view>
			</view>
			
			<!-- 遮罩层 -->
			<u-mask :show="maskShow" :custom-style="{background: 'rgba(0, 0, 0, 0.8)'}">
				<view class="mask_warp" @tap.stop>
					<view class="mask_head center">
						<u-icon class="mask_close_icon" name="close-circle" color="#efefef" size="54" @tap="maskShow=false"></u-icon>
					</view>
					<view class="mask_content center" :animation="animationData" >
						<image :src="prImgUrl" mode="aspectFill" class="big_img"></image>
					</view>
					<view class="mask_foot center">
						<u-icon class="rotate_icon" name="reload" color="#efefef" size="54" @tap="handleRotate"></u-icon>
					</view>
				</view>
			</u-mask>
	</view>
</template>

<script>
	import Head from './components/head.vue'
	import ConditionTitle from './components/conditiontitle.vue'

	export default {
		components: {
			Head,ConditionTitle
		},
		data() {
			return {
				UserInfo: {
					personName: '',
					personCardId: '',
					personPhoneNo: '',
					personGenderName: '',
					personBirthDate: '',
					personAge: 0,
					personGenderCode:0,
				},
				SicknessName:'',
				SicknessCondition:'',
				DoctorInfo: {
					doctorId: '',
					doctorName: '姓名',
					levelName: '职位',
					avatarUrl: '../../static/center-selected.png',
					deptName: '科室'
				},
				// drugsList: [],
				hospitalsPickerShow: false,
				chooseHospital: '',
				allHospitalsList: [],
				allDrugsList: [ //药品选择器中列表数据
					{
						label: '千斤藤',
						value: '千斤藤'
					},
					{
						label: '金线风',
						value: '金线风'
					},
					{
						label: '换骨筋',
						value: '换骨筋'
					},
				],
				drugsList: [], //选择后的列表
				drugsPickerShow: false, //药品选择器显示
				maskShow: false,//遮罩层显示
				
				action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", //上传图片演示地址
				fileList: [//上传图片列表
					// {
					// 	url: '',
					// },
				],
				imgList: [],//预览图片列表
				prImgUrl: '',//预览图片地址
				animationData: {},
				degValue: 0//旋转度数
			}
		},
		onShow() {
			// 初始化一个动画
			var animation = uni.createAnimation({
			  duration: 550,
			  timingFunction: 'ease',
				transformOrigin: '50% 50% 0',
			})
			this.animation = animation
		},
		onLoad() {
			this.$event.on('userEvent', (UserInfo) => {
				this.UserInfo = JSON.parse(UserInfo)
				console.log(this.UserInfo)
			})
			this.$event.on('doctorEvent', (DoctorInfo) => {
				this.DoctorInfo = JSON.parse(DoctorInfo)
				console.log(this.DoctorInfo)
			})
			uni.request({
				url: `${this.$Url}/organization/page`, //这里的lid,page,pagesize只能是数字或字母?????
				method: 'GET',
				success: (res) => {
					res.data.result.records.forEach(item => {
						var single = {
							label: item.organizationName,
							value: item.organizationId
						}
						this.allHospitalsList.push(single)
					})
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			handlePickerHospitalConfirm(data) {
				this.chooseHospital = data[0].value
				//带医院id跳转
				uni.navigateTo({
					url: '../apply/choosedoc?orgId=' + this.chooseHospital
				});
			},
			changeDoctor() { //选择医院 
				this.hospitalsPickerShow = true
			},
			addInfo() {
				uni.navigateTo({
					url: 'add'
				});
			},
			handlePickerConfirm(data) {
				this.drugsList.push(data[0])
			},
			//点击删除
			deleteDrugItem(deIndex) {
				this.drugsList = this.drugsList.filter((item, index) => {
					return index != deIndex
				})
			},
			//上传图片事件回调 成功或者失败都触发
			handleUploadChange() {
				let upList = this.$refs.uUpload.lists
				this.imgList = upList.filter(item => {
					return item.progress==100 && item.error == false
				})
			},
			//点击预览大图片
			handlePreviewImg(item,index) {
				this.prImgUrl = item.url
				this.maskShow = true
			},
			//图片旋转
			handleRotate() {
				this.degValue = this.degValue + 90
				// 定义动画内容
				this.animation.rotate(this.degValue).step()
				// 导出动画数据传递给data层
				this.animationData = this.animation.export()
			},
			//删除预览图片列表
			deletePrImg(deIndex) {
				this.imgList = this.imgList.filter((item,index) => {
					return deIndex != index
				})
			},
			SubmitAll(){
				var submititem={
					createUserId:'',
					doctorId:this.DoctorInfo.doctorId,
					personCardId:this.UserInfo.personCardId,
					personGenderCode:this.UserInfo.personGenderCode,//性别编号(1男,2女),
					personPhoneNo:this.UserInfo.personPhoneNo,
					personName:this.UserInfo.personName,
					question:this.SicknessCondition,
					diagnosis:this.SicknessName,
					drugIds:'',
					drugNames:'',
					personAge:this.userInfo.personAge,
					personBirthDate:this.userInfo.personBirthDate,
					personGenderName:this.userInfo.personGenderName,
					file:'',
				}
				console.log(this.UserInfo)
				console.log(this.DoctorInfo)
				console.log(this.SicknessCondition)
				console.log(this.SicknessName)
			}
		}
	}
</script>

<style lang="scss">
	.apply_page {
		background-color: #f2f2f2;
		min-height: 100vh;

		.doctor {
			margin-top: 8rpx;
			margin-bottom: 25rpx;
			padding: 18rpx 24rpx;
			border: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

			.doc_info{
				display: flex;
				align-items: center;

				.avatar {
					width: 140rpx;
					height: 140rpx;
					border-radius: 100%;
					overflow: hidden;
					margin: 18rpx;

					.avatar_img {
						width: 100%;
						height: 100%;
					}
				}

				.doc_name {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name_title {
						display: flex;
						align-items: center;

						.doc_name_txt {
							font-size: 32rpx;
							font-weight: 600;
							margin-right: 10rpx;
						}

						.tag {
							display: inline-block;
							padding: 4rpx 10rpx;
							border: .5rpx solid #ff9900;
							border-radius: 30rpx;
							font-size: 24rpx;
							color: #ff9900;
						}
					}

					.sort {
						font-size: 28rpx;
						margin-top: 18rpx;
					}
				}
			}

			.change_doc {
				display: flex;
				align-items: center;
				color: #999;

				.change_doc_txt {
					line-height: 0;
					margin-right: 14rpx;
				}
			}
		}

		.form {
			background-color: #fff;
			padding: 0 24rpx 24rpx;
			margin-bottom: 25rpx;

			.form_item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 28rpx 0;
				// border-bottom: .5rpx solid #dedede;

				.label{
					color: #666;
					font-size: 30rpx;

					.label_required_icon {
						color: #f10;
						font-size: 32rpx;
						margin-right: 6rpx;
					}
				}

				.value{
					display: flex;
					align-items: center;

					text {
						margin-left: 8rpx;
						line-height: 0;
					}

					.value_txt {
						color: #999;
					}
				}
			}

			.ye_block{
				border: .5rpx solid yellow;
				width: 100%;
				height: 70rpx;
				margin-top: 10rpx;
			}

			.add_drugs_form {
				border: 0;
			}

			.drugs_list{
				display: flex;
				flex-flow: row wrap;
				padding: 30rpx 12rpx;

				.drugs_item {
					position: relative;
					display: inline-block;
					text-align: center;
					padding: 6rpx 13rpx;
					border-radius: 8rpx;
					background-color: #dbf1e1;
					color: #18b566;
					font-size: 26rpx;
					margin-right: 38rpx;
					margin-bottom: 30rpx;

					.drug_close_icon {
						position: absolute;
						right: -12rpx;
						top: -12rpx;
					}
				}
			}
		}

		.condition_item {
			padding: 0 24rpx;
			background-color: #fff;
			margin-bottom: 25rpx;

			.condition_content {
				padding: 22rpx 0rpx 45rpx;

				.upload_notice_txt {
					color: #888;
					font-size: 28rpx;
					text-indent: 2em;
					margin-top: 50rpx;
				}

				.pr_img_list {
					display: flex;

					.pr_img_item {
						position: relative;
						margin-right: 24rpx;
						margin-bottom: 24rpx;
						width: 200rpx;
						height: 200rpx;

						.img_close_icon {
							position: absolute;
							right: -20rpx;
							top: -20rpx;
						}

						.pr_img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.upload{
			margin-bottom: 0;
		}

		.btn{
			padding: 0 24rpx 15rpx;
			background-color: #fff;

			.submitBtn {
				width: 100%;
				height: 80rpx;
				background-color: #29bd6b;
				border-radius: 10rpx;
				color: #fff;
				font-size: 30rpx;
				letter-spacing: 4rpx;
			}
		}

		.mask_warp {
			position: relative;
			width: 100%;
			min-height: 100vh;

			.mask_head {
				width: 100%;
				height: 350rpx;
			}

			.mask_content {
				width: 700rpx;
				height: 700rpx;
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -350rpx;
				margin-left: -350rpx;
			}

			.mask_foot {
				width: 100%;
				height: 80rpx;
				position: absolute;
				bottom: 120rpx;
			}
		}
	}
</style>
