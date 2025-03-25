<template>
	<view class="container">
		<!-- 课程封面 -->
		<image :src="course.cover" mode="aspectFill" class="course-cover"/>
		
		<!-- 课程信息 -->
		<view class="course-info">
			<text class="course-title">{{ course.title }}</text>
			<view class="teacher-info">
				<image :src="course.teacherAvatar" class="teacher-avatar"/>
				<view class="teacher-detail">
					<text class="teacher-name">{{ course.teacher }}</text>
					<text class="teacher-title">{{ course.teacherTitle }}</text>
				</view>
			</view>
			<view class="course-stats">
				<text class="stats-item">{{ course.duration }}分钟</text>
				<text class="stats-item">{{ course.views }}次观看</text>
				<text class="stats-item">{{ course.likes }}人点赞</text>
			</view>
		</view>
		
		<!-- 课程简介 -->
		<view class="course-section">
			<view class="section-title">课程简介</view>
			<text class="course-desc">{{ course.description }}</text>
		</view>
		
		<!-- 课程目录 -->
		<view class="course-section">
			<view class="section-title">课程目录</view>
			<view class="chapter-list">
				<view class="chapter-item" v-for="(chapter, index) in course.chapters" :key="index">
					<text class="chapter-title">{{ chapter.title }}</text>
					<text class="chapter-duration">{{ chapter.duration }}分钟</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'course-detail',
	data() {
		return {
			course: {
				title: '',
				cover: rb + '/images/health/course1.png',
				teacher: '李营养师',
				teacherTitle: '高级营养师',
				teacherAvatar: rb + '/images/health/teacher1.png',
				duration: 45,
				views: 2580,
				likes: 326,
				description: '本课程专门针对老年人的饮食特点，从营养学的角度出发，详细讲解老年人在不同季节应该如何调理饮食，以达到养生保健的目的。',
				chapters: [
					{ title: '第1章 春季养生饮食原则', duration: 15 },
					{ title: '第2章 春季养生食材选择', duration: 12 },
					{ title: '第3章 春季养生食谱推荐', duration: 18 }
				]
			}
		}
	},
	onLoad(options) {
		if (options.title) {
			this.course.title = options.title
			uni.setNavigationBarTitle({
				title: this.course.title
			})
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f5f5f5;
}

.course-cover {
	width: 100%;
	height: 200px;
}

.course-info {
	background-color: #fff;
	padding: 20px;
	margin-bottom: 10px;
}

.course-title {
	font-size: 20px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
}

.teacher-info {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
}

.teacher-avatar {
	width: 50px;
	height: 50px;
	border-radius: 25px;
	margin-right: 12px;
}

.teacher-detail {
	flex: 1;
}

.teacher-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 4px;
}

.teacher-title {
	font-size: 14px;
	color: #666;
}

.course-stats {
	display: flex;
	justify-content: space-around;
	border-top: 1px solid #eee;
	padding-top: 15px;
}

.stats-item {
	font-size: 14px;
	color: #666;
}

.course-section {
	background-color: #fff;
	padding: 20px;
	margin-bottom: 10px;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
	padding-left: 10px;
	border-left: 4px solid #ED5D29;
}

.course-desc {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
}

.chapter-list {
	margin-top: 10px;
}

.chapter-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.chapter-item:last-child {
	border-bottom: none;
}

.chapter-title {
	font-size: 16px;
	color: #333;
}

.chapter-duration {
	font-size: 14px;
	color: #999;
}
</style> 