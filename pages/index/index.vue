<template>
	<view class="container">
		<view class="panel-bg">
			<image class="panel-bg-logo" src="../../static/img/coinlogo.png" mode="aspectFit"></image>
			<view>古代银钱换算器</view>
			<view class="panel-bg-text">天下熙熙皆为利来，天下攘攘皆为利往</view>
		</view>
		<view class="panel" style="margin-top: -30px;">
			<view class="panel-title">
				<text>银钱换算</text>
				<view @tap="toExplain()">
					<text>算法说明</text>
					<text class="iconfont icon-wenhao"></text>
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<!-- 之后替换为该朝代流通货币图片 -->
					<view class="panel-cell-logo">{{pickerOne.name}}</view>
				</view>
				<view class="panel-cell-bd">
					<lb-picker ref="picker1" mode="multiSelector" :list="currencyList" :level="2" @confirm="bindPickerChangeOne"></lb-picker>
					<view class="" @tap="openPicker('picker1')">
						<text>{{ pickerOne.epoch}}</text>
						<text class="note">{{pickerOne.note}}</text>
						<text class="iconfont icon-cc-chevron-right"></text>
					</view>
				</view>
				<view class="panel-cell-ft">
					<input class="uni-input" :class="{minsize:moneyOne.length > 9}" v-model="moneyOne" @input="conversionAmountOne" type="digit" placeholder="0" />
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<view class="panel-cell-logo">{{pickerTwo.name}}</view>
				</view>
				<view class="panel-cell-bd">
					<lb-picker ref="picker2" mode="multiSelector" :list="currencyList" :level="2" @confirm="bindPickerChangeTwo"></lb-picker>
					<view class="" @tap="openPicker('picker2')">
						<text>{{ pickerTwo.epoch}}</text>
						<text class="note">{{pickerTwo.note}}</text>
						<text class="iconfont icon-cc-chevron-right"></text>
					</view>
				</view>
				<view class="panel-cell-ft">
					<input class="uni-input" :class="{minsize:moneyTwo.length > 9}" v-model="moneyTwo" @input="conversionAmountTwo" type="digit" placeholder="0" />
				</view>
			</view>
		</view>
		<view class="panel" v-show="show">
			<view class="panel-cell article">
				<jyf-parser ref="article" use-cache></jyf-parser>
			</view>
		</view>
		<view class="panel-link">
			<button class="btn-feedback" open-type='contact'>意见反馈</button>
			<text class="iconfont icon-fankuijianyi"></text>
		</view>
	</view>
</template>

<script>
	import currencyListJson from '../../static/json/CurrencyList.json'
	import parser from "@/components/jyf-parser/jyf-parser";
	import LbPicker from '@/components/lb-picker'
	export default {
		components: {
			"jyf-parser": parser,
			LbPicker
		},
		data() {
			return {
				currencyList: [],
				moneyOne: '',
				moneyTwo: '',
				show: true,
				pickerOne: {
					name: '民国',
					epoch: '民国七年',
					note: '银元(元)',
					scale: 1325.3
				},
				pickerTwo: {
					name: '中国',
					epoch: '2019',
					note: '人民币(元)',
					scale: 1
				}
			}
		},
		onLoad() {
			uni.showShareMenu({
				withShareTicket: true
			});
			this.getCurrencyList();
			this.getCurrencydetails();
		},
		methods: {
			// 获取货币列表
			getCurrencyList() {
				this.currencyList = currencyListJson.data;
				
			},
			// 打开级联选择器一
			openPicker (name) {
				this.$refs[name].show();
			},
			// 获取货币详情
			getCurrencydetails(val) {
				let name = val || 'minguo';
				if (name === 'china') {
					this.show = false;
				} else {
					this.show = true;
					const html = require(`../../static/json/${name}.js`);
					this.$refs.article.setContent(html);
				}
				
			},
			// 切换货币
			bindPickerChangeOne: function(e) {
				this.pickerOne = {
					name: e.item[0].label,
					epoch: e.item[1].label,			
					note: e.item[1].note,
					scale: e.item[1].value
				}			
				this.conversionAmountOne();
				this.getCurrencydetails(e.item[0].value);
			},
			bindPickerChangeTwo: function(e) {
				this.pickerTwo = {
					name: e.item[0].label,
					epoch: e.item[1].label,			
					note: e.item[1].note,
					scale: e.item[1].value
				}
				this.conversionAmountTwo();
			},
			// 换算金额
			conversionAmountOne: function(event) {
				let money = event ? event.target.value : +this.moneyOne;
				let scaleOne = this.pickerOne.scale;
				let rmb = money * scaleOne;
				let scaleTwo = this.pickerTwo.scale;
				this.moneyTwo = (rmb / scaleTwo).toFixed(2);
			},
			conversionAmountTwo: function(event) {
				let money = event ? event.target.value : +this.moneyTwo;
				let scaleTwo = this.pickerTwo.scale;
				let rmb = scaleTwo * money;
				let scaleOne = this.pickerOne.scale;
				this.moneyOne = (rmb / scaleOne).toFixed(2);
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
	
	.iconfont {
		font-size: 11pt;
		color: #888;
	}
	
	.icon-wenhao {
		font-size: 14pt;
		color: #fff;
	}
	
	.panel-cell-logo {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #fff;
		background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
		border-radius: 50%;
		font-size: 14pt;
		text-align: center;
	}
	
	.note {
		font-size: 11pt;
		color: #888;
		margin: 0 8rpx;
	}

	.panel {
		width: 90%;
		margin: 0 auto;
		margin-bottom: 20px;
		background-color: #fff;
		font-size: 13pt;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.panel-cell {
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: 1px dashed #ccc;
	}
	
	.article {
		padding: 40rpx 30rpx;
	}

	.panel-cell:last-child {
		border: none;
	}

	.panel-cell-bd {
		margin: 0 12rpx;
	}

	.panel-cell-ft {
		width: 150rpx;
		flex-grow: 1;
		text-align: right;
	}
	
	.minsize {
		font-size: 11pt;
	}
</style>
