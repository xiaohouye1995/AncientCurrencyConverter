<template>
	<view class="container">
		<view class="panel-bg">
			<image class="panel-bg-logo" src="../../static/img/coinlogo.png" mode="aspectFit"></image>
			<view>中国古代货币换算器</view>
		</view>
		<view class="panel">
			<view class="panel-title">货币换算</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
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
		<view class="footer">
			<text class="footer-text">— 算法规则 —</text>
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
			bindPickerChangeOne: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexOne = e.target.value
				this.conversionAmountOne()
			},
			bindPickerChangeTwo: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexTwo = e.target.value
				this.conversionAmountTwo()
			},
			// 换算金额
			conversionAmountOne: function(event) {
				let money = event ? event.target.value : +this.moneyOne
				console.log('money', money)
				let scaleOne = this.currencyList[this.indexOne].scale
				console.log('scaleOne', scaleOne)
				let rmb = money * scaleOne
				console.log('rmb', rmb)
				let scaleTwo = this.currencyList[this.indexTwo].scale
				console.log('scaleTwo', scaleTwo)
				this.moneyTwo = (rmb / scaleTwo).toFixed(2)
				console.log('moneyTwo', this.moneyTwo)
			},
			conversionAmountTwo: function(event) {
				let money = event ? event.target.value : +this.moneyTwo
				console.log('money', money)
				let scaleTwo = this.currencyList[this.indexTwo].scale
				console.log('scaleTwo', scaleTwo)
				let rmb = scaleTwo * money
				console.log('rmb', rmb)
				let scaleOne = this.currencyList[this.indexOne].scale
				console.log('scaleOne', scaleOne)
				this.moneyOne = (rmb / scaleOne).toFixed(2)
				console.log('moneyOne', this.moneyOne)
			},
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		font-family: PingFang SC, 'Helvetica Neue', Arial, sans-serif;
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
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		background: #ff5500;
		border-radius: 50%;
		font-size: 11pt;
	}
	
	.note {
		font-size: 11pt;
		color: #888;
		margin: 0 8rpx;
	}
	
	.panel-bg {
		width: 100%;
		height: 600rpx;
		background-color: #00aaff;
		text-align: center;
		font-size: 20pt;
		color: #fff;
	}

	.panel-bg-logo {
		width: 200rpx;
		height: 200rpx;
	}

	.panel {
		position: absolute;
		width: 90%;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -48%);
		background-color: #fff;
		font-size: 17pt;
		color: #353535;
		border-radius: 12px;
		box-shadow: 0 4px 9px 0 rgba(109, 107, 107, 0.5);
	}

	.panel-title {
		padding: 10rpx;
		background: #ffd500;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		color: #fff;
		font-size: 13pt;
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
		color: #888;
	}
</style>
