<template>
	<view class="container">
		<!-- 问题详情 -->
		<view class="question-section">
			<view class="question-header">
				<image :src="question.userAvatar" class="user-avatar"/>
				<view class="question-info">
					<text class="username">{{ question.username }}</text>
					<text class="time">{{ question.time }}</text>
				</view>
			</view>
			<view class="question-content">
				<text class="title">{{ question.title }}</text>
				<text class="content">{{ question.content }}</text>
				<view class="image-list" v-if="question.images && question.images.length">
					<image v-for="(image, index) in question.images" 
						:key="index" 
						:src="image" 
						class="content-image"
						@tap="previewImage(index)"/>
				</view>
			</view>
			<view class="question-footer">
				<view class="action-item">
					<image src="/static/icons/qa/like.png" class="action-icon"/>
					<text class="action-text">{{ question.likes }} 点赞</text>
				</view>
				<view class="action-item">
					<image src="/static/icons/qa/comment.png" class="action-icon"/>
					<text class="action-text">{{ question.comments.length }} 评论</text>
				</view>
				<view class="action-item">
					<image src="/static/icons/qa/share.png" class="action-icon"/>
					<text class="action-text">分享</text>
				</view>
			</view>
		</view>
		
		<!-- 回答列表 -->
		<view class="answers-section">
			<view class="section-title">全部回答 ({{ question.comments.length }})</view>
			<view class="answer-item" v-for="(comment, index) in question.comments" :key="index">
				<view class="answer-header">
					<image :src="comment.userAvatar" class="user-avatar"/>
					<view class="answer-info">
						<text class="username">{{ comment.username }}</text>
						<text class="time">{{ comment.time }}</text>
					</view>
				</view>
				<view class="answer-content">
					<text class="content">{{ comment.content }}</text>
					<view class="image-list" v-if="comment.images && comment.images.length">
						<image v-for="(image, index) in comment.images" 
							:key="index" 
							:src="image" 
							class="content-image"
							@tap="previewImage(index, comment.images)"/>
					</view>
				</view>
				<view class="answer-footer">
					<view class="action-item">
						<image src="/static/icons/qa/like.png" class="action-icon"/>
						<text class="action-text">{{ comment.likes }}</text>
					</view>
					<view class="action-item" @tap="replyToComment(comment)">
						<image src="/static/icons/qa/reply.png" class="action-icon"/>
						<text class="action-text">回复</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部评论栏 -->
		<view class="comment-bar">
			<input type="text" 
				class="comment-input" 
				v-model="newComment" 
				placeholder="写下你的回答..."
				@focus="onInputFocus"/>
			<button class="submit-btn" 
				:disabled="!newComment.trim()" 
				@tap="submitComment">发送</button>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;
export default {
	data() {
		return {
			question: {
				id: 1,
				username: '老年生活达人',
				userAvatar: rb + '/images/avatar/user1.png',
				time: '2024-03-15 14:30',
				title: '请问附近有什么适合老年人的运动场所吗？',
				content: '最近想找个地方锻炼身体，希望有适合老年人的运动设施，最好是免费或者价格实惠的场所。',
				images: [],
				likes: 12,
				comments: [
					{
						username: '健康顾问',
						userAvatar: rb + '/images/avatar/user2.png',
						time: '2024-03-15 15:00',
						content: '您可以去附近的公园，那里有专门的老年人健身区，设施齐全而且免费。建议早上或傍晚去，可以认识很多志同道合的朋友。',
						images: [rb + '/images/qa/park.jpg'],
						likes: 8
					},
					{
						username: '社区工作者',
						userAvatar: rb + '/images/avatar/user3.png',
						time: '2024-03-15 15:30',
						content: '我们社区活动中心也有室内健身房，每天上午9点到下午5点开放，有专业教练指导，月卡只要50元。',
						images: [],
						likes: 5
					}
				]
			},
			newComment: ''
		}
	},
	methods: {
		previewImage(index, images = this.question.images) {
			uni.previewImage({
				urls: images,
				current: images[index]
			})
		},
		replyToComment(comment) {
			this.newComment = `回复 @${comment.username}：`
		},
		onInputFocus() {
			// 处理输入框获取焦点事件
		},
		submitComment() {
			if (!this.newComment.trim()) return
			
			// 添加新评论
			const newComment = {
				username: '当前用户',
				userAvatar: rb + '/images/avatar/default.png',
				time: new Date().toLocaleString(),
				content: this.newComment,
				images: [],
				likes: 0
			}
			
			this.question.comments.push(newComment)
			this.newComment = ''
			
			uni.showToast({
				title: '评论成功',
				icon: 'success'
			})
		}
	}
}
</script>

<style scoped>
.container {
	padding-bottom: 60px;
	background-color: #f5f5f5;
}

.question-section {
	background-color: #fff;
	padding: 15px;
	margin-bottom: 10px;
}

.question-header, .answer-header {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.user-avatar {
	width: 40px;
	height: 40px;
	border-radius: 20px;
	margin-right: 10px;
}

.question-info, .answer-info {
	flex: 1;
}

.username {
	font-size: 16px;
	color: #333;
	font-weight: bold;
	display: block;
}

.time {
	font-size: 12px;
	color: #999;
	display: block;
	margin-top: 2px;
}

.question-content, .answer-content {
	margin-bottom: 15px;
}

.title {
	font-size: 18px;
	color: #333;
	font-weight: bold;
	margin-bottom: 10px;
	display: block;
}

.content {
	font-size: 15px;
	color: #666;
	line-height: 1.5;
	display: block;
}

.image-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
}

.content-image {
	width: 100px;
	height: 100px;
	margin-right: 10px;
	margin-bottom: 10px;
	border-radius: 4px;
}

.question-footer, .answer-footer {
	display: flex;
	border-top: 1px solid #eee;
	padding-top: 15px;
}

.action-item {
	display: flex;
	align-items: center;
	margin-right: 20px;
}

.action-icon {
	width: 16px;
	height: 16px;
	margin-right: 4px;
}

.action-text {
	font-size: 14px;
	color: #666;
}

.answers-section {
	background-color: #fff;
	padding: 15px;
}

.section-title {
	font-size: 16px;
	color: #333;
	font-weight: bold;
	margin-bottom: 15px;
}

.answer-item {
	padding: 15px 0;
	border-bottom: 1px solid #eee;
}

.answer-item:last-child {
	border-bottom: none;
}

.comment-bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	padding: 10px 15px;
	display: flex;
	align-items: center;
	box-shadow: 0 -1px 4px rgba(0,0,0,0.1);
}

.comment-input {
	flex: 1;
	height: 36px;
	background-color: #f5f5f5;
	border-radius: 18px;
	padding: 0 15px;
	font-size: 14px;
	margin-right: 10px;
}

.submit-btn {
	width: 60px;
	height: 36px;
	line-height: 36px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 18px;
	font-size: 14px;
	padding: 0;
}

.submit-btn[disabled] {
	background-color: #ccc;
}
</style> 