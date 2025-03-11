<template>
	<view class="container">
		<view class="article">
			<text class="title">{{ newsTitle }}</text>
			<view class="meta">
				<text class="date">{{ newsDate }}</text>
				<text class="source">{{ newsSource }}</text>
			</view>
			<image v-if="newsImage" :src="newsImage" mode="widthFix" class="cover-image"/>
			<view class="content">
				<text class="paragraph" v-for="(para, index) in content" :key="index">{{ para }}</text>
			</view>
		</view>
		
		<!-- 相关阅读 -->
		<view class="related">
			<view class="section-title">相关阅读</view>
			<view class="related-list">
				<view class="related-item" v-for="(item, index) in relatedNews" :key="index" @tap="readNews(item)">
					<text class="related-title">{{ item.title }}</text>
					<text class="related-brief">{{ item.brief }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'news-detail',
	data() {
		return {
			newsTitle: '',
			newsDate: '2024-03-09',
			newsSource: '健康资讯',
			newsImage: '/static/images/medical/news1.png',
			content: [
				'随着年龄的增长，老年人的饮食健康变得越来越重要。科学合理的饮食不仅能够预防疾病，还能提高生活质量。',
				'首先，老年人应该注意营养均衡，每天的饮食要包含充足的蛋白质、维生素和矿物质。其次，要控制饮食量，不要暴饮暴食。',
				'建议老年人多吃新鲜蔬菜和水果，适量食用肉类和鱼类，保证营养的同时也要注意消化系统的负担。',
				'此外，老年人还要注意补充足够的水分，每天至少喝1500ml的水，可以预防便秘和泌尿系统疾病。'
			],
			relatedNews: [
				{
					title: '老年人运动指南',
					brief: '科学运动，健康生活'
				},
				{
					title: '健康饮食小贴士',
					brief: '合理搭配，营养均衡'
				}
			]
		}
	},
	onLoad(options) {
		if (options.title) {
			this.newsTitle = options.title
			uni.setNavigationBarTitle({
				title: '健康资讯'
			})
		}
	},
	methods: {
		readNews(news) {
			uni.navigateTo({
				url: `/pages/medical/news-detail?title=${news.title}`
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