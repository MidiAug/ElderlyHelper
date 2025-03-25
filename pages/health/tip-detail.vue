<template>
	<view class="container">
		<view class="article">
			<text class="title">{{ tipTitle }}</text>
			<view class="meta">
				<text class="date">{{ tipDate }}</text>
				<text class="source">{{ tipSource }}</text>
			</view>
			<image v-if="tipImage" :src="tipImage" mode="widthFix" class="cover-image"/>
			<view class="content">
				<text class="paragraph" v-for="(para, index) in content" :key="index">{{ para }}</text>
			</view>
		</view>
		
		<!-- 相关推荐 -->
		<view class="related">
			<view class="section-title">相关推荐</view>
			<view class="related-list">
				<view class="related-item" v-for="(item, index) in relatedTips" :key="index" @tap="readTip(item)">
					<text class="related-title">{{ item.title }}</text>
					<text class="related-brief">{{ item.brief }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'tip-detail',
	data() {
		return {
			tipTitle: '',
			tipDate: '2024-03-09',
			tipSource: '养生小知识',
			tipImage: rb + 'mages/health/tip1.png',
			content: [
				'春季是养生的重要季节，此时阳气升发，万物复苏，人体的新陈代谢也随之加快。',
				'在饮食方面，建议多食用温性食物，如韭菜、春笋等时令蔬菜，可以帮助身体适应季节变化。',
				'同时，要注意保暖，特别是早晚温差较大时，要适时增减衣物，预防感冒。',
				'此外，适当进行户外运动，如散步、太极拳等，可以帮助提高身体免疫力。'
			],
			relatedTips: [
				{
					title: '夏季养生要点',
					brief: '如何度过炎热夏季'
				},
				{
					title: '养生茶饮推荐',
					brief: '四季养生茶饮配方'
				}
			]
		}
	},
	onLoad(options) {
		if (options.title) {
			this.tipTitle = options.title
			uni.setNavigationBarTitle({
				title: '养生小知识'
			})
		}
	},
	methods: {
		readTip(tip) {
			uni.navigateTo({
				url: `/pages/health/tip-detail?title=${tip.title}`
			})
		}
	}
}
</script>

<style scoped>
.container {
	padding: 15px;
	background-color: #fff;
}

.article {
	margin-bottom: 20px;
}

.title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
	line-height: 1.4;
}

.meta {
	display: flex;
	margin-bottom: 15px;
}

.date, .source {
	font-size: 14px;
	color: #999;
	margin-right: 15px;
}

.cover-image {
	width: 100%;
	margin-bottom: 15px;
	border-radius: 8px;
}

.content {
	margin-bottom: 30px;
}

.paragraph {
	font-size: 16px;
	color: #333;
	line-height: 1.8;
	margin-bottom: 15px;
	text-align: justify;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
	padding-left: 10px;
	border-left: 4px solid #ED5D29;
}

.related-list {
	background-color: #f5f5f5;
	border-radius: 8px;
	padding: 15px;
}

.related-item {
	padding: 15px;
	border-bottom: 1px solid #eee;
	background-color: #fff;
	border-radius: 8px;
	margin-bottom: 10px;
}

.related-item:last-child {
	margin-bottom: 0;
	border-bottom: none;
}

.related-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 5px;
}

.related-brief {
	font-size: 14px;
	color: #666;
}
</style> 