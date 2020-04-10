<template>
	<view class="container">
		<view class="panel-bg">
			<image class="panel-bg-logo" src="../../static/img/coinlogo.png" mode="aspectFit"></image>
			<view>古代银钱换算器</view>
			<view class="panel-bg-text">天下熙熙皆为利来，天下攘攘皆为利往</view>
		</view>
		<view class="panel">
			<view class="panel-title">银钱换算</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<!-- 之后替换为该朝代流通货币图片 -->
					<view class="icon-money">{{currencyList[indexOne].name}}</view>
				</view>
				<view class="panel-cell-bd">
					<picker @change="bindPickerChangeOne" :value="indexOne" range-key="name" :range="currencyList">
						<text>{{currencyList[indexOne].name}}</text>
						<text class="note">{{currencyList[indexOne].note}}</text>
						<text class="iconfont icon-cc-chevron-right"></text>
					</picker>
				</view>
				<view class="panel-cell-ft">
					<input class="uni-input" :value="moneyOne" @input="conversionAmountOne" type="digit" placeholder="100" />
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<view class="icon-money">{{currencyList[indexTwo].name}}</view>
				</view>
				<view class="panel-cell-bd">
					<picker @change="bindPickerChangeTwo" :value="indexTwo" range-key="name" :range="currencyList">
						<text>{{currencyList[indexTwo].name}}</text>
						<text class="note">{{currencyList[indexTwo].note}}</text>
						<text class="iconfont icon-cc-chevron-right"></text>
					</picker>
				</view>
				<view class="panel-cell-ft">
					<input class="uni-input" :value="moneyTwo" @input="conversionAmountTwo" type="digit" placeholder="100" />
				</view>
			</view>
		</view>
		<!-- 后面加上朝代介绍，底层人员收入 -->
		<view class="footer">
			<text class="footer-text" @tap="toExplain()">— 算法说明 —</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currencyList: [],
				indexOne: 1,
				indexTwo: 0,
				moneyOne: 0,
				moneyTwo: 0
			}
		},
		onLoad() {
			uni.showShareMenu({
				withShareTicket: true
			});
			this.getCurrencyList();
		},
		methods: {
			// 获取货币列表
			getCurrencyList() {
				this.currencyList = [{
						name: '中国',
						note: '元',
						scale: 1
					},
					{
						name: '民国',
						note: '大洋',
						scale: 1500
					},
					{
						name: '清',
						note: '银两',
						scale: 3000
					}
				]
			},
			// 切换货币
			bindPickerChangeOne: function(e) {
				this.indexOne = e.target.value
				this.conversionAmountOne()
			},
			bindPickerChangeTwo: function(e) {
				this.indexTwo = e.target.value
				this.conversionAmountTwo()
			},
			// 换算金额
			conversionAmountOne: function(event) {
				let money = event ? event.target.value : +this.moneyOne
				let scaleOne = this.currencyList[this.indexOne].scale
				let rmb = money * scaleOne
				let scaleTwo = this.currencyList[this.indexTwo].scale
				this.moneyTwo = (rmb / scaleTwo).toFixed(2)
			},
			conversionAmountTwo: function(event) {
				let money = event ? event.target.value : +this.moneyTwo
				let scaleTwo = this.currencyList[this.indexTwo].scale
				let rmb = scaleTwo * money
				let scaleOne = this.currencyList[this.indexOne].scale
				this.moneyOne = (rmb / scaleOne).toFixed(2)
			},
			// 前往算法说明
			toExplain () {
				uni.navigateTo({
					url: '/pages/index/explain'
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		font-family: PingFang SC, 'Helvetica Neue', Arial, sans-serif;
		background-color: #22202e;
		background-color: #f7f8fa;
		color: #353535;
		font-size: 14pt;
		position: relative;
	}
	
	.iconfont {
		font-size: 11pt;
		color: #888;
	}

	.icon-money {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #fff;
		background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
		border-radius: 50%;
		font-size: 14pt;
	}
	
	.note {
		font-size: 11pt;
		color: #888;
		margin: 0 8rpx;
	}
	
	.panel-bg {
		width: 100%;
		height: 500rpx;
		background-color: #22202e;
		text-align: center;
		font-size: 20pt;
		color: #fff;
	}

	.panel-bg-logo {
		width: 200rpx;
		height: 200rpx;
	}
	
	.panel-bg-text {
		margin-top: 20rpx;
		font-size: 11pt;
	}

	.panel {
		position: absolute;
		width: 90%;
		top: 600rpx;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		font-size: 17pt;
		color: #353535;
		border-radius: 12px;
		box-shadow: 0 4px 9px 0 rgba(109, 107, 107, 0.5);
	}

	.panel-title {
		padding: 20rpx;
		background-image: linear-gradient(to right, #f9d423 0%, #ff4e50 100%);
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		color: #fff;
		font-size: 14pt;
	}

	.panel-cell {
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 1px dashed #ccc;
	}

	.panel-cell:last-child {
		border: none;
	}

	.panel-cell-hd {
		width: 20%;
		text-align: center;
	}

	.panel-cell-bd {
		width: 50%;
		padding: 0 12rpx;
	}

	.panel-cell-ft {
		text-align: right;
	}

	.footer {
		width: 100%;
		position: absolute;
		bottom: 200rpx;
		text-align: center;
	}

	.footer-text {
		font-size: 13pt;
		color: #fff;
		color: #888;
	}
</style>
