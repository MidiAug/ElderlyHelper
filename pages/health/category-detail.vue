<template>
	<view class="container">
		<view class="category-header">
			<text class="category-name">{{ categoryName }}</text>
			<text class="category-desc">专业养生课程，助您健康生活</text>
		</view>
		
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
</template>

<script>
	
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'category-detail',
	data() {
		return {
			categoryName: '',
			courses: [
				{
					title: '春季养生饮食指南',
					brief: '根据春季特点调理饮食',
					teacher: '李营养师',
					views: 1580,
					cover: rb + '/images/health/course1.png'
				},
				{
					title: '居家养生运动课程',
					brief: '适合老年人的居家运动',
					teacher: '张教练',
					views: 2190,
					cover: rb + '/images/health/course2.png'
				}
			]
		}
	},
	onLoad(options) {
		if (options.name) {
			this.categoryName = options.name
			uni.setNavigationBarTitle({
				title: this.categoryName
			})
		}
	},
	methods: {
		viewCourse(course) {
			uni.navigateTo({
				url: `/pages/health/course-detail?title=${course.title}`
			})
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f5f5f5;
	min-height: 100vh;
}

.category-header {
	padding: 20px;
	background-color: #fff;
	text-align: center;
	margin-bottom: 10px;
}

.category-name {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	margin-bottom: 10px;
}

.category-desc {
	font-size: 16px;
	color: #666;
}

.course-list {
	padding: 10px;
}

.course-item {
	background-color: #fff;
	border-radius: 8px;
	margin-bottom: 10px;
	overflow: hidden;
}

.course-cover {
	width: 100%;
	height: 200px;
}

.course-info {
	padding: 15px;
}

.course-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 8px;
}

.course-brief {
	font-size: 14px;
	color: #666;
	margin-bottom: 8px;
	line-height: 1.4;
}

.course-stats {
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	color: #999;
}
</style> 