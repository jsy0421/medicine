<template>
	<view class="content">
		<!-- 分段器 -->
		<view class="subsection">
			<u-subsection :list="list" :current="curNow" @change="sectionChange" :animation="true"
				active-color="#2979ff" inactiveColor="#c0c4cc" bg-color="#ffffff" height="100">
			</u-subsection>
		</view>
		<view class="" v-if="curNow === 0">
			<!-- 患者所需的药品 -->
			<view class="need">
				<text>患者所需药品 <text class="drug_names">{{drugNames}}</text></text>
			</view>
			<!-- 处方 -->
			<view class="prescription">
				<view v-for="(item,index) in midicineList" :key="index">
					<u-card :showFoot="false" border-radius="40">
						<view class="head" slot="head">
							<view class="u-flex u-col-between u-p-t-0">
								<image src="../../static/icon/药丸.png" class="midicineImg"></image>
								<text class="prescriptionName">{{item.prescriptionName}}</text>
								<view class="add" @tap="addMidicine(index)">
									<u-icon name="plus" color="#2979ff" size="28" class="plusIcon"></u-icon>
									<text class="addMidicine">新增药品</text>
								</view>

							</view>
						</view>
						<view class="" slot="body">
							<view v-for="(ditem,dindex) in item.drugList" :key="dindex">

								<view class="u-body-item u-flex u-row-between u-p-b-0">
									<view class="u-body-item-title u-line-2">
										<view class="u-body-item u-flex u-col-between u-p-t-0">
											<text>{{ditem.drugName}}</text>
										</view>
										<view class="u-body-item u-flex u-col-between u-p-t-0">
											<text class="specification">{{ditem.specification}}</text>
										</view>
										<view class="u-body-item u-flex u-col-between u-p-t-0">
											<text
												class="use">用法：{{ditem.frequency_name}}&nbsp;&nbsp;&nbsp;{{ditem.usage_name}}</text>
										</view>
									</view>
									<text>{{ditem.quantity}}盒</text>
									<u-icon name="trash" color="#fa3534" size="40"
										@click="deleteMedicine(index,dindex)"></u-icon>
								</view>
							</view>
							<u-icon class="trash" name="trash" color="#fa3534" size="40"
								@click="deletePrescription(index)" label="删除处方"></u-icon>
						</view>
					</u-card>
				</view>

			</view>
			<!-- 两个按钮 -->
			<view class="button">
				<button class="addPrescription" @click="prescriptionNameShow = true">
					<u-icon name="plus" color="#303133" size="28" class="plusIcon" :select-open="prescriptionNameShow">
					</u-icon>新增处方
				</button>
				<button class="submitPrescription">提交处方</button>
			</view>
			<u-select mode="single-column" :list="prescriptionNameList" v-model="prescriptionNameShow"
				@confirm="prescriptionNameConfirm"></u-select>
		</view>
		<view class="" v-else>
			<view class="prescription">
				<view v-for="(item,index) in midicineList" :key="index">
					<u-card :showFoot="false" border-radius="40">
						<view class="head" slot="head">
							<view class="u-flex u-col-between u-p-t-0">
								<image src="../../static/icon/药丸.png" class="midicineImg"></image>
								<text class="prescriptionName">{{item.prescriptionName}}</text>

							</view>
						</view>
						<view class="" slot="body">
							<view v-for="(ditem,dindex) in item.drugList" :key="dindex">

								<view class="u-body-item u-flex u-row-between u-p-b-0">
									<view class="u-body-item-title u-line-2">
										<view class="u-body-item u-flex u-col-between u-p-t-0">
											<text>{{ditem.drugName}}</text>
										</view>
										<view class="u-body-item u-flex u-col-between u-p-t-0">
											<text class="specification">{{ditem.specification}}</text>
										</view>
										<view class="u-body-item u-flex u-col-between u-p-t-0">
											<text
												class="use">用法：{{ditem.frequency_name}}&nbsp;&nbsp;&nbsp;{{ditem.usage_name}}</text>
										</view>
									</view>
									<text>{{ditem.quantity}}盒</text>
									<u-icon name="arrow-right" color="#909399" size="40"></u-icon>
								</view>
							</view>
						</view>

					</u-card>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prescriptionNameList: [{
					value: "西药方",
					label: "西药方",
				}, {
					value: "中成药方",
					label: "中成药方",
				}],
				prescriptionNameShow: false,
				midicineList: [],
				list: [{
						name: '待提交'
					},
					{
						name: '已开方'
					}
				],
				curNow: 0,
				orgId: "",
				doctorId: "",
				doctorName: "",
				drugNames: "",
				userId:''

			}
		},
		onLoad(option) {
			uni.$on("handClickdetail", res => {
				console.log(res);
				var drugList = {
					drugName: res.drugName,
					specification: res.specification,
					quantity: res.quantity,
					frequency_name: res.frequencyName, //用药频次
					usage_name: res.usageName,
				}
				var id = res.id;
				this.midicineList[id].drugList.push(drugList);
				console.log(this.midicineList[id].drugList);
			})

			if (option.doctorId != undefined) {
				this.orgId = option.orgId;
				this.doctorId = option.doctorId;
				this.doctorName = option.doctorName;
				this.drugNames = option.drugNames;
				this.userId = option.userId;
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			},
			addMidicine(index) {
				uni.navigateTo({
					url: '/pages/setmedicine/setmedicine?id=' + index
				})
			},
			prescriptionNameConfirm(e) {
				var prescriptionName = '';
				var prescriptionType = '';
				e.map((val, index, letter) => {
					prescriptionName += prescriptionName == '' ? val.label : '-' + val.label;
				});

				console.log(prescriptionName);
				if (prescriptionName === '西药方')
					prescriptionType = '1';
				else if (prescriptionName === '中成药方')
					prescriptionType = '2';
				console.log(prescriptionType)
				var id = this.midicineList.length;
				var newPrescription = {
					prescriptionId: id,
					prescriptionName: prescriptionName,
					prescriptionType: prescriptionType,
					drugList: []
				}
				this.midicineList.push(newPrescription);
				console.log(this.midicineList);
			},
			deleteMedicine(index, dindex) {
				this.midicineList[index].drugList.splice(dindex, 1)
			},
			deletePrescription(index) {
				this.midicineList.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f4f6;
	}

	.content {
		background-color: #ffffff;
		padding-top: 100rpx;
		padding-bottom: 150rpx;
	}

	.subsection {
		position: fixed;
		top: 0rpx;
		width: 100%;
		z-index: 9999;
	}

	.need {
		background-color: #fef0f0;
		padding: 2%;
	}

	.drug_names {
		margin-left: 10rpx;
		color: #19be6b;
	}

	.u-card-wrap {
		background-color: #ecf5ff;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-card__head {
		background-color: #ecf5ff;
	}

	.midicineImg {
		width: 60rpx;
		height: 60rpx;
		padding-right: 3%;
	}

	.prescriptionName {
		width: 20%;
	}

	.add {
		width: 30%;
		margin-left: 40%;
	}

	.plusIcon {
		padding-right: 2%;
	}

	.addMidicine {
		color: #2979ff;
	}

	.specification {
		margin-left: 10%;
	}

	.trash {
		float: right;
		padding-right: 5%;
	}

	.use {
		color: #909399;
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

	.addPrescription {
		float: left;
		width: 40%;
		border-radius: 0;
		font-size: 32rpx;
	}

	.submitPrescription {
		float: right;
		width: 60%;
		background-color: #2b85e4;
		border-radius: 0;
		color: #FFFFFF;
		font-size: 32rpx;
	}
</style>
