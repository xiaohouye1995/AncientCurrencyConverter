<template>
	<view class="container">
		<view class="panel-bg">
			<image class="panel-bg-logo" src="../../static/img/coinlogo.png" mode="aspectFit"></image>
			<view>算法说明</view>
			<view class="panel-bg-text">五千年来谁著史，八千里外觅封侯</view>
		</view>
		<!-- 手风琴效果 -->
		<uni-collapse>
			<uni-collapse-item title="算法公式" open>
				<text>底层工人、百姓勉强维持温饱的月入（银两、文钱、布帛、银元）= 现如今底层工人、百姓勉强维持温饱的月入（人民币）</text>
			</uni-collapse-item>
			<uni-collapse-item title="各朝代月收入对照表" open>
				<jyf-parser ref="table" use-cache></jyf-parser>
			</uni-collapse-item>
			<uni-collapse-item title="算法出处" open>
				<jyf-parser ref="article" use-cache></jyf-parser>
			</uni-collapse-item>
		</uni-collapse>
		<view class="panel-link">
			<button class="btn-feedback" open-type='contact'>意见反馈</button>
			<text class="iconfont icon-fankuijianyi"></text>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import parser from "@/components/jyf-parser/jyf-parser";
	const doziHtml = require('../../static/json/douzi.js');
	const tableHtml = require('../../static/json/table.js');
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			"jyf-parser": parser
		},
		data() {
			return {
			}
		},
		onLoad() {
			this.$refs.article.setContent(doziHtml);
			this.$refs.table.setContent(tableHtml);
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>

	.container ::v-deep .uni-collapse {
		color: #353535;
		background-color: transparent;
		border-radius: 12px;
		width: 90%;
		margin: 0 auto;
		margin-top: -30px;

		.uni-collapse-cell {
			background: #fff;
			color: #fff;
			border-radius: 12px;
			box-shadow: 0 4px 9px 0 rgba(109, 107, 107, 0.5);
			margin-bottom: 20px;
			border: none;
		}
		
		.uni-collapse-cell--open {
			.uni-collapse-cell__title {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}

		.uni-collapse-cell__title {
			border-radius: 12px;
			background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
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
			color: #353535;
			border-bottom-left-radius: 12px;
			border-bottom-right-radius: 12px;
		}
	}
</style>
