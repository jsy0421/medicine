<template>
	<view class="content">
		<view class="from">
			<u-form :model="model" :rules="rules" ref="uForm">
				<!-- 药品 选择 -->
				<u-form-item :label-position="labelPosition" label="药品" prop="medicine" label-width="200"
					right-icon="arrow-right">
					<u-input v-model="model.medicine" placeholder="请选择药品" @click="choseMedicine()"></u-input>
				</u-form-item>

				<!-- 剂量 加减 -->
				<u-form-item :label-position="labelPosition" label="剂量(g)" prop="dose" label-width="200">
					<u-number-box v-model="model.doseValue" @change="doseValueChange" :min="1"></u-number-box>
				</u-form-item>

				<!-- 频次 选择 -->
				<u-form-item :label-position="labelPosition" label="频次" prop="frequency" label-width="200"
					right-icon="arrow-right">
					<u-input :select-open="frequencyShow" v-model="model.frequencyType" placeholder="请选择频次"
						@click="frequencyShow = true"></u-input>
				</u-form-item>

				<!-- 用法 选择 -->
				<u-form-item :label-position="labelPosition" label="用法" prop="usage" label-width="200"
					right-icon="arrow-right">
					<u-input :select-open="useShow" v-model="model.useType" @click="useShow = true" placeholder="请选择用法">
					</u-input>
				</u-form-item>

				<!-- 用药天数 加减 -->
				<u-form-item :label-position="labelPosition" label="用药天数(天)" prop="takeDays" label-width="200">
					<u-number-box v-model="model.daysValue" @change="daysValueChange" :min="1"></u-number-box>
				</u-form-item>

				<!-- 总量 加减 -->
				<u-form-item :label-position="labelPosition" label="总量(盒)" prop="quantity" label-width="200">
					<u-number-box v-model="model.quantityValue" @change="quantityValueChange" :min="1"></u-number-box>
				</u-form-item>

				<!-- 备注 输入 -->
				<u-form-item :label-position="labelPosition" prop="remark">
					<u-input type="textarea" placeholder="请输入备注(选填)" v-model="model.remark" />
				</u-form-item>
			</u-form>
			<u-select mode="single-column" :list="useList" v-model="useShow" @confirm="useConfirm"></u-select>
			<u-select mode="single-column" :list="frequencyList" v-model="frequencyShow" @confirm="frequencyConfirm">
			</u-select>
		</view>
		<!-- 弹窗 -->
		<view>
			<u-toast ref="uToast" />
		</view>
		<!-- 两个按钮 -->
		<view class="button">
			<button class="cancel" @click="cancel()">取消</button>
			<button class="determine" @click="determine()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				id: -1,
				model: {
					doseValue: 1,
					daysValue: 1,
					quantityValue: 1,
					remark: '',
					frequencyType: '',
					medicine: '',
					drugId: '',
					useType: '',
					drugName: '',
					specification: ''
				},
				useList: [{
						"itemCode": 1,
						"itemName": "口服",
						label: "口服"
					},
					{
						"itemCode": 2,
						"itemName": "涂抹",
						label: "涂抹"
					},
					{
						"itemCode": 3,
						"itemName": "静脉注射",
						label: "静脉注射"
					},
					{
						"itemCode": 4,
						"itemName": "皮下注射",
						label: "皮下注射"
					}
				],
				frequencyList: [{
						"itemCode": 1,
						"itemName": "每日一次",
						"itemNameAbbr": "qd",
						label: "qd",
					},
					{
						"itemCode": 2,
						"itemName": "每日两次",
						"itemNameAbbr": "bid",
						label: "bid",
					},
					{
						"itemCode": 3,
						"itemName": "每日三次",
						"itemNameAbbr": "tid",
						label: "tid",
					},
					{
						"itemCode": 4,
						"itemName": "每日四次",
						"itemNameAbbr": "qid",
						label: "qid",
					},
					{
						"itemCode": 5,
						"itemName": "隔日一次",
						"itemNameAbbr": "qod",
						label: "qod",
					},
					{
						"itemCode": 6,
						"itemName": "每周一次",
						"itemNameAbbr": "qw",
						label: "qw",
					}
				],
				useShow: false,
				frequencyShow: false,
			};
		},
		onLoad(option) {
			console.log(option);
			if (option.drugId != undefined) {
				this.model.drugId = option.drugId;
				this.model.medicine = option.drugName + ' ' + option.specification;
				this.model.drugName = option.drugName;
				this.model.specification = option.specification;
			}
			if (option.id != undefined) {
				this.id = option.id;
			}
		},
		methods: {
			useConfirm(e) {
				this.model.useType = '';
				e.map((val, index) => {
					this.model.useType += this.model.useType == '' ? val.label : '-' + val.label;
				})
			},
			frequencyConfirm(e) {
				this.model.frequencyType = '';
				e.map((val, index) => {
					this.model.frequencyType += this.model.frequencyType == '' ? val.label : '-' + val.label;
				})
			},
			choseMedicine() {
				uni.navigateTo({
					url: '/pages/addmedicine/addmedicine?id=' + this.id
				})
			},
			doseValueChange(e) {
				this.model.doseValue = e.value;
				console.log(this.model.doseValue);
			},
			daysValueChange(e) {
				this.model.daysValue = e.value;
				console.log(this.model.daysValue);
			},
			quantityValueChange(e) {
				this.model.quantityValue = e.value;
				console.log(this.model.quantityValue);
			},
			cancel() {
				uni.navigateBack({
					delta:1
				})
			},
			determine() {
				if (this.model.drugId == '') {
					this.$refs.uToast.show({
						title: '请选择药品',
						type: 'error'

					})
				} else if (this.model.frequencyType == '') {
					this.$refs.uToast.show({
						title: '请选择频次',
						type: 'error'

					})
				} else if (this.model.useType == '') {
					this.$refs.uToast.show({
						title: '请选择用法',
						type: 'error'

					})
				} else {
					this.$refs.uToast.show({
						title: '操作成功',
						type: 'success',
					})
					var detail = {
							id: this.id,
							drugId: this.model.drugId,
							drugName: this.model.drugName,
							specification: this.model.specification,
							dose: this.model.doseValue,
							frequencyName: this.model.frequencyType,
							usageName: this.model.useType,
							takeDays: this.model.daysValue,
							quantity: this.model.quantityValue,
							remark: this.model.remark
					};
					uni.$emit("handClickdetail",{
							id: this.id,
							drugId: this.model.drugId,
							drugName: this.model.drugName,
							specification: this.model.specification,
							dose: this.model.doseValue,
							frequencyName: this.model.frequencyType,
							usageName: this.model.useType,
							takeDays: this.model.daysValue,
							quantity: this.model.quantityValue,
							remark: this.model.remark
					});
					uni.navigateBack({
						delta:3
					})
				}

			}

		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f3f4f6;
	}

	.content {
		background-color: #FFFFFF;
		padding: 3%;
	}

	u-number-box {
		float: right;
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

	.cancel {
		float: left;
		width: 50%;
		border-radius: 0;
		font-size: 32rpx;
	}

	.determine {
		float: right;
		width: 50%;
		background-color: #2b85e4;
		border-radius: 0;
		color: #FFFFFF;
		font-size: 32rpx;
	}
</style>
