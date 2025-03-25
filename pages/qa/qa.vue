<template>
	<view class="container">
		<!-- 顶部搜索 -->
		<view class="search-box">
			<input type="text" v-model="searchText" placeholder="搜索您感兴趣的问题" class="search-input"/>
			<button class="search-btn" @tap="search">搜索</button>
		</view>
		
		<!-- 问题分类 -->
		<scroll-view scroll-x class="category-scroll">
			<view class="category-list">
				<view 
					class="category-item" 
					v-for="(category, index) in categories" 
					:key="index"
					:class="{ active: currentCategory === index }"
					@tap="selectCategory(index)"
				>
					{{ category }}
				</view>
			</view>
		</scroll-view>
		
		<!-- 问题列表 -->
		<scroll-view scroll-y class="question-scroll" @scrolltolower="loadMore">
			<view class="question-list">
				<view class="question-item" v-for="(question, index) in questions" :key="index" @tap="viewDetail(question)">
					<view class="question-header">
						<image :src="question.userAvatar" class="user-avatar"/>
						<text class="user-name">{{ question.userName }}</text>
						<text class="post-time">{{ question.time }}</text>
					</view>
					<view class="question-content">
						<text class="question-title">{{ question.title }}</text>
						<text class="question-text">{{ question.content }}</text>
						<view class="question-images" v-if="question.images && question.images.length">
							<image 
								v-for="(img, imgIndex) in question.images" 
								:key="imgIndex" 
								:src="img" 
								class="content-image"
								mode="aspectFill"
							/>
						</view>
					</view>
					<view class="question-footer">
						<view class="stat-item">
							<image src="/static/icons/qa/answer.png" class="stat-icon"/>
							<text>{{ question.answerCount }}回答</text>
						</view>
						<view class="stat-item">
							<image src="/static/icons/qa/like.png" class="stat-icon"/>
							<text>{{ question.likeCount }}赞</text>
						</view>
					</view>
				</view>
			</view>
			<view class="loading" v-if="isLoading">加载中...</view>
		</scroll-view>
		
		<!-- 发布按钮 -->
		<view class="post-btn" @tap="showPostModal">
			<image src="/static/icons/qa/post.png" class="post-icon"/>
			<text>发布问题</text>
		</view>
		
		<!-- 发布问题弹窗 -->
		<view class="modal" v-if="showModal">
			<view class="modal-content">
				<view class="modal-header">
					<text class="modal-title">发布问题</text>
					<image src="/static/icons/qa/close.png" class="close-icon" @tap="hidePostModal"/>
				</view>
				<input 
					type="text" 
					v-model="newQuestion.title" 
					placeholder="请输入问题标题" 
					class="question-input"
				/>
				<textarea 
					v-model="newQuestion.content" 
					placeholder="请详细描述您的问题" 
					class="question-textarea"
				/>
				<view class="image-upload">
					<view class="upload-list">
						<image 
							v-for="(img, index) in newQuestion.images" 
							:key="index" 
							:src="img" 
							class="upload-image"
						/>
						<view class="upload-btn" @tap="chooseImage" v-if="newQuestion.images.length < 3">
							<image src="/static/icons/qa/camera.png" class="camera-icon"/>
							<text>添加图片</text>
						</view>
					</view>
				</view>
				<button class="submit-btn" @tap="submitQuestion">发布</button>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;
export default {
	data() {
		return {
			searchText: '',
			currentCategory: 0,
			categories: ['全部', '健康', '生活', '娱乐', '情感', '理财'],
			questions: [
				{
					id: 1,
					userName: '张大爷',
					userAvatar: rb + '/images/qa/avatar1.png',
					title: '每天应该走多少步比较合适？',
					content: '我今年65岁，身体还算硬朗，想知道每天应该走多少步比较合适，不会太少也不会太累...',
					time: '10分钟前',
					answerCount: 5,
					likeCount: 12,
					images: []
				},
				{
					id: 2,
					userName: '李奶奶',
					userAvatar: rb + '/images/qa/avatar2.png',
					title: '有什么好的理财建议吗？',
					content: '退休金每月都有结余，想找个稳妥的投资方式，求推荐...',
					time: '1小时前',
					answerCount: 8,
					likeCount: 15,
					images: [rb + '/images/qa/finance.png']
				}
			],
			isLoading: false,
			showModal: false,
			newQuestion: {
				title: '',
				content: '',
				images: []
			}
		}
	},
	methods: {
		search() {
			// 实现搜索功能
			if (!this.searchText.trim()) {
				uni.showToast({
					title: '请输入搜索内容',
					icon: 'none'
				})
				return
			}
			// TODO: 实现搜索逻辑
		},
		selectCategory(index) {
			this.currentCategory = index
			// TODO: 根据分类加载问题
		},
		loadMore() {
			if (this.isLoading) return
			this.isLoading = true
			// 模拟加载更多数据
			setTimeout(() => {
				// TODO: 加载更多问题
				this.isLoading = false
			}, 1000)
		},
		viewDetail(question) {
			uni.navigateTo({
				url: `/pages/qa/detail?id=${question.id}`
			})
		},
		showPostModal() {
			this.showModal = true
		},
		hidePostModal() {
			this.showModal = false
			this.newQuestion = {
				title: '',
				content: '',
				images: []
			}
		},
		chooseImage() {
			uni.chooseImage({
				count: 3 - this.newQuestion.images.length,
				success: (res) => {
					this.newQuestion.images = [...this.newQuestion.images, ...res.tempFilePaths]
				}
			})
		},
		submitQuestion() {
			if (!this.newQuestion.title.trim()) {
				uni.showToast({
					title: '请输入问题标题',
					icon: 'none'
				})
				return
			}
			if (!this.newQuestion.content.trim()) {
				uni.showToast({
					title: '请输入问题描述',
					icon: 'none'
				})
				return
			}
			
			// TODO: 提交问题到服务器
			uni.showToast({
				title: '发布成功',
				icon: 'success'
			})
			this.hidePostModal()
		}
	}
}
</script>

<style scoped>
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 100px;
}

.search-box {
	padding: 15px;
	background-color: #fff;
	display: flex;
	align-items: center;
}

.search-input {
	flex: 1;
	height: 40px;
	background-color: #f5f5f5;
	border-radius: 20px;
	padding: 0 15px;
	margin-right: 10px;
	font-size: 14px;
}

.search-btn {
	width: 60px;
	height: 40px;
	line-height: 40px;
	background-color: #007aff;
	color: #fff;
	border-radius: 20px;
	font-size: 14px;
}

.category-scroll {
	background-color: #fff;
	padding: 10px 0;
	white-space: nowrap;
}

.category-list {
	display: inline-flex;
	padding: 0 15px;
}

.category-item {
	padding: 5px 15px;
	margin-right: 10px;
	border-radius: 15px;
	font-size: 14px;
	color: #666;
	background-color: #f5f5f5;
}

.category-item.active {
	background-color: #007aff;
	color: #fff;
}

.question-scroll {
	height: calc(100vh - 180px);
}

.question-list {
	padding: 15px;
}

.question-item {
	background-color: #fff;
	border-radius: 12px;
	padding: 15px;
	margin-bottom: 15px;
}

.question-header {
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

.user-name {
	font-size: 16px;
	color: #333;
	margin-right: 10px;
}

.post-time {
	font-size: 12px;
	color: #999;
}

.question-content {
	margin-bottom: 15px;
}

.question-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 8px;
	display: block;
}

.question-text {
	font-size: 14px;
	color: #666;
	line-height: 1.5;
	display: block;
}

.question-images {
	display: flex;
	margin-top: 10px;
}

.content-image {
	width: 80px;
	height: 80px;
	margin-right: 10px;
	border-radius: 4px;
}

.question-footer {
	display: flex;
	justify-content: flex-end;
}

.stat-item {
	display: flex;
	align-items: center;
	margin-left: 15px;
}

.stat-icon {
	width: 16px;
	height: 16px;
	margin-right: 4px;
}

.stat-item text {
	font-size: 12px;
	color: #999;
}

.post-btn {
	position: fixed;
	right: 20px;
	bottom: 20px;
	width: 120px;
	height: 40px;
	background-color: #007aff;
	color: #fff;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 2px 8px rgba(0,122,255,0.3);
}

.post-icon {
	width: 20px;
	height: 20px;
	margin-right: 5px;
}

.modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	width: 90%;
	background-color: #fff;
	border-radius: 12px;
	padding: 20px;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.modal-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
}

.close-icon {
	width: 24px;
	height: 24px;
}

.question-input {
	width: 100%;
	height: 40px;
	border: 1px solid #eee;
	border-radius: 4px;
	padding: 0 10px;
	margin-bottom: 15px;
	font-size: 14px;
}

.question-textarea {
	width: 100%;
	height: 120px;
	border: 1px solid #eee;
	border-radius: 4px;
	padding: 10px;
	margin-bottom: 15px;
	font-size: 14px;
}

.image-upload {
	margin-bottom: 20px;
}

.upload-list {
	display: flex;
	flex-wrap: wrap;
}

.upload-image {
	width: 80px;
	height: 80px;
	margin-right: 10px;
	margin-bottom: 10px;
	border-radius: 4px;
}

.upload-btn {
	width: 80px;
	height: 80px;
	border: 1px dashed #ddd;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.camera-icon {
	width: 24px;
	height: 24px;
	margin-bottom: 5px;
}

.upload-btn text {
	font-size: 12px;
	color: #999;
}

.submit-btn {
	width: 100%;
	height: 40px;
	line-height: 40px;
	background-color: #007aff;
	color: #fff;
	border-radius: 20px;
	font-size: 16px;
}

.loading {
	text-align: center;
	padding: 15px;
	color: #999;
	font-size: 14px;
}
</style> 