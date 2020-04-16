<template>
	<view class="container">
		<!-- 手风琴效果 -->
		<uni-collapse>
			<uni-collapse-item title="算法公式" open>
				<text>底层工人、百姓勉强维持温饱的月入（银两、文钱、布帛、银元）= 现如今底层工人、百姓勉强维持温饱的月入（人民币）</text>
			</uni-collapse-item>
			<uni-collapse-item title="各朝代月收入对照表" open>
				<image class="table-img" src="../../static/img/table.png" mode="widthFix"></image>
				<text class="remask">
					ps: 王朝末期或战乱时，货币起伏波动较大，所以在选用朝代基础价格时，会选用朝代中较为稳定的时期。
					引用资料：
					王蕾：《二十世纪以来中国物价史研究述评》
					黄冕堂：《中国历代物价问题考述》(齐鲁书社，2008)
				</text>
			</uni-collapse-item>
			<uni-collapse-item title="算法出处" open>
				<jyf-parser ref="article" use-cache></jyf-parser>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import parser from "@/components/jyf-parser/jyf-parser";
	const doziHtml = require('../../static/json/douzi.js');
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			"jyf-parser": parser
		},
		data() {
			return {
				currencyList: [],
				strings: ''
			}
		},
		onLoad() {
			this.getCurrencyList();
			this.$refs.article.setContent(doziHtml);
		},
		methods: {
			// 获取货币列表
			getCurrencyList() {},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		font-family: PingFang SC, 'Helvetica Neue', Arial, sans-serif;
		// background-color: #2E294E;
		// background-color: #392850;
		background-color: #22202e;
		// background-color: #f7f8fa;
		color: #353535;
		font-size: 13pt;
		position: relative;
		box-sizing: border-box;
		padding: 40rpx;
		overflow: auto;
	}

	.table-img {
		width: 100%;
	}

	.container ::v-deep .uni-collapse {
		color: #353535;
		background-color: transparent;
		border-radius: 12px;

		.uni-collapse-cell {
			background: #463659;
			background-image: linear-gradient(-225deg, #463659 0%, #22202e 100%);
			background-image: linear-gradient(to right, #f9d423 0%, #ff4e50 100%);
			background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
			color: #fff;
			border-radius: 12px;
			box-shadow: 0 4px 9px 0 rgba(109, 107, 107, 0.5);
			margin: 40rpx 0;
			border: none;
		}

		.uni-collapse-cell__title {
			border-radius: 12px;
			font-weight: 600;
		}

		.uni-collapse-cell__title-text {
			font-size: 14pt;
		}

		.uni-collapse-cell__title:active {
			background-color: transparent;
		}

		.uni-icons {
			color: #fff !important;
		}

		.uni-collapse-cell__wrapper {
			padding: 20rpx 40rpx;
			background: #fff;
			color: #353535;
			border-bottom-left-radius: 12px;
			border-bottom-right-radius: 12px;
		}
	}
</style>
