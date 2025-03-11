<template>
	<view class="container">
		<!-- 轮播图 -->
		<swiper class="banner" circular indicator-dots autoplay>
			<swiper-item v-for="(banner, index) in banners" :key="index">
				<image :src="banner.image" mode="aspectFill" class="banner-image"/>
			</swiper-item>
		</swiper>
		
		<!-- 课程分类 -->
		<view class="category-section">
			<view class="category-item" v-for="(category, index) in categories" :key="index" @tap="selectCategory(category)">
				<image :src="category.icon" class="category-icon"/>
				<text class="category-name">{{ category.name }}</text>
			</view>
		</view>
		
		<!-- 推荐课程 -->
		<view class="course-section">
			<view class="section-title">热门课程</view>
			<view class="course-list">
				<view class="course-item" v-for="(course, index) in courses" :key="index" @tap="viewCourse(course)">
					<image :src="course.cover" class="course-cover"/>
					<view class="course-info">
						<text class="course-title">{{ course.title }}</text>
						<text class="course-brief">{{ course.brief }}</text>
						<view class="course-stats">
							<text class="course-teacher">{{ course.teacher }}</text>
							<text class="course-views">{{ course.views }}次观看</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 养生知识 -->
		<view class="tips-section">
			<view class="section-title">每日养生小知识</view>
			<view class="tips-list">
				<view class="tips-item" v-for="(tip, index) in healthTips" :key="index" @tap="readTip(tip)">
					<image :src="tip.image" class="tips-image"/>
					<view class="tips-content">
						<text class="tips-title">{{ tip.title }}</text>
						<text class="tips-brief">{{ tip.brief }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'health-class',
	data() {
		return {
			banners: [
				{ image: '/static/pictures/health/banner1.png' },
				{ image: '/static/pictures/health/banner2.png' },
				{ image: '/static/pictures/health/banner3.png' }
			],
			categories: [
				{ name: '饮食养生', icon: '/static/icons/health/diet.png' },
				{ name: '运动健康', icon: '/static/icons/health/exercise.png' },
				{ name: '中医养生', icon: '/static/icons/health/tcm.png' },
				{ name: '心理健康', icon: '/static/icons/health/mental.png' }
			],
			courses: [
				{
					title: '老年人饮食营养搭配',
					brief: '专业营养师教您科学饮食',
					teacher: '李营养师',
					views: 2580,
					cover: '/static/pictures/health/course1.png'
				},
				{
					title: '适老化运动指南',
					brief: '安全有效的运动方案',
					teacher: '张教练',
					views: 1890,
					cover: '/static/pictures/health/course2.png'
				},
				{
					title: '中医养生精要',
					brief: '传统养生智慧精选',
					teacher: '王医师',
					views: 3260,
					cover: '/static/pictures/health/course3.png'
				}
			],
			healthTips: [
				{
					title: '春季养生要点',
					brief: '春季养生的关键在于顺应自然...',
					image: '/static/pictures/health/tip1.png'
				},
				{
					title: '老年人睡眠指南',
					brief: '如何提高睡眠质量...',
					image: '/static/pictures/health/tip2.png'
				},
				{
					title: '养生茶饮配方',
					brief: '四季养生茶饮推荐...',
					image: '/static/pictures/health/tip3.png'
				}
			]
		}
	},
	methods: {
		selectCategory(category) {
			uni.navigateTo({
				url: `/pages/health/category-detail?name=${category.name}`
			})
		},
		viewCourse(course) {
			uni.navigateTo({
				url: `/pages/health/course-detail?title=${course.title}`
			})
		},
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
	background-color: #f5f5f5;
}

.banner {
	width: 100%;
	height: 200px;
}

.banner-image {
	width: 100%;
	height: 100%;
}

.category-section {
	display: flex;
	justify-content: space-around;
	padding: 20px;
	background-color: #fff;
	margin-bottom: 10px;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.category-icon {
	width: 50px;
	height: 50px;
	margin-bottom: 8px;
}

.category-name {
	font-size: 14px;
	color: #333;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	padding: 15px;
	color: #333;
}

.course-list {
	background-color: #fff;
	padding: 0 15px;
}

.course-item {
	display: flex;
	padding: 15px 0;
	border-bottom: 1px solid #eee;
}

.course-item:last-child {
	border-bottom: none;
}

.course-cover {
	width: 120px;
	height: 80px;
	border-radius: 8px;
	margin-right: 12px;
}

.course-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.course-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 6px;
}

.course-brief {
	font-size: 14px;
	color: #666;
	margin-bottom: 6px;
}

.course-stats {
	display: flex;
	justify-content: space-between;
	font-size: 12px;
	color: #999;
}

.tips-list {
	background-color: #fff;
	padding: 0 15px;
}

.tips-item {
	display: flex;
	padding: 15px 0;
	border-bottom: 1px solid #eee;
}

.tips-item:last-child {
	border-bottom: none;
}

.tips-image {
	width: 100px;
	height: 70px;
	border-radius: 8px;
	margin-right: 12px;
}

.tips-content {
	flex: 1;
}

.tips-title {
	font-size: 16px;
	color: #333;
	margin-bottom: 6px;
}

.tips-brief {
	font-size: 14px;
	color: #666;
	line-height: 1.4;
}
</style> 