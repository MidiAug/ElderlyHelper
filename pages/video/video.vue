<template>
	<view class="container">
		<!-- 分类选项卡 -->
		<scroll-view scroll-x class="category-scroll" :scroll-left="scrollLeft">
			<view class="category-list">
				<view class="category-item" 
					v-for="(category, index) in categories" 
					:key="index"
					:class="{ active: currentCategory === category.id }"
					@tap="switchCategory(category.id)">
					{{ category.name }}
				</view>
			</view>
		</scroll-view>

		<!-- 视频列表 -->
		<scroll-view scroll-y class="video-scroll" @scrolltolower="loadMore">
			<view class="video-list">
				<view class="video-item" 
					v-for="video in filteredVideos" 
					:key="video.id">
					<view class="video-header">
						<view class="author-info">
							<image :src="video.authorAvatar" class="author-avatar"/>
							<text class="author-name">{{ video.author }}</text>
						</view>
						<view class="options-wrapper">
							<image class="more-icon" src="/static/icons/options.png" @tap.stop="showOptions(video.id)" />
							<!-- 选项菜单 -->
							<view class="options-menu" v-if="video.showOptions">
								<view class="option-item" @tap.stop="handleNotInterested(video.id)">
									<image class="option-icon" src="/static/icons/video/unlike.png" />
									<text>不感兴趣</text>
								</view>
								<view class="option-item" @tap.stop="handleFavorite(video.id)">
									<image class="option-icon" :src="video.isCollected ? rb + '/icons/video/star-filled.png' : rb + '/icons/video/star.png'" />
									<text>{{ video.isCollected ? '已收藏' : '收藏' }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="video-content" @tap="playVideo(video)">
						<text class="video-title">{{ video.title }}</text>
						<image :src="video.cover" mode="aspectFill" class="video-cover"/>
					</view>
					<view class="video-footer">
						<view class="footer-item" @tap.stop="handleShare(video.id)">
							<image class="footer-icon" src="/static/icons/forward.png" />
							<text>{{ video.shares || '转发' }}</text>
						</view>
						<view class="footer-item" @tap.stop="handleLike(video.id)">
							<image class="footer-icon" src="/static/icons/upvote.png" />
							<text>{{ video.likes || '点赞' }}</text>
						</view>
						<view class="footer-item" @tap.stop="handleComment(video.id)">
							<image class="footer-icon" src="/static/icons/comment.png" />
							<text>{{ video.comments || '评论' }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 弹幕提示 -->
		<view class="toast" v-if="showToast">
			<text>{{ toastMessage }}</text>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;
export default {
	data() {
		return {
			currentCategory: 'all',
			scrollLeft: 0,
			showToast: false,
			toastMessage: '',
			categories: [
				{ id: 'all', name: '全部' },
				{ id: 'health', name: '健康养生' },
				{ id: 'exercise', name: '运动健身' },
				{ id: 'entertainment', name: '文娱活动' },
				{ id: 'life', name: '生活技巧' }
			],
			videos: [
				{
					id: 1,
					category: 'health',
					title: '中医养生：三伏天如何养生保健',
					author: '张医生说健康',
					authorAvatar: rb + '/pictures/video/author1.png',
					cover: rb + '/pictures/video/video1.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 2,
					category: 'health',
					title: '夏季养生食谱大全',
					author: '营养师小李',
					authorAvatar: rb + '/pictures/video/author2.png',
					cover: rb + '/pictures/video/video2.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 3,
					category: 'health',
					title: '老年人科学用药指南',
					author: '老年医学专家',
					authorAvatar: rb + '/pictures/video/author3.png',
					cover: rb + '/pictures/video/video3.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 4,
					category: 'health',
					title: '中老年人饮食营养搭配',
					author: '健康顾问王医生',
					authorAvatar: rb + '/pictures/video/author4.png',
					cover: rb + '/pictures/video/video4.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 5,
					category: 'exercise',
					title: '每日太极拳练习教程',
					author: '太极大师李师傅',
					authorAvatar: rb + '/pictures/video/author5.png',
					cover: rb + '/pictures/video/video5.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 6,
					category: 'exercise',
					title: '适合老年人的广场舞教学',
					author: '舞蹈老师小芳',
					authorAvatar: rb + '/pictures/video/author6.png',
					cover: rb + '/pictures/video/video6.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 7,
					category: 'exercise',
					title: '居家健身操完整版',
					author: '健身教练阿强',
					authorAvatar: rb + '/pictures/video/author7.png',
					cover: rb + '/pictures/video/video7.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 8,
					category: 'exercise',
					title: '老年人柔韧性训练指南',
					author: '运动康复师小张',
					authorAvatar: rb + '/pictures/video/author8.png',
					cover: rb + '/pictures/video/video8.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 9,
					category: 'entertainment',
					title: '京剧欣赏：贵妃醉酒',
					author: '京剧爱好者老王',
					authorAvatar: rb + '/pictures/video/author9.png',
					cover: rb + '/pictures/video/video9.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 10,
					category: 'entertainment',
					title: '民歌大家唱：茉莉花',
					author: '音乐老师美美',
					authorAvatar: rb + '/pictures/video/author10.png',
					cover: rb + '/pictures/video/video10.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 11,
					category: 'entertainment',
					title: '棋牌教学：象棋入门技巧',
					author: '棋牌大师老李',
					authorAvatar: rb + '/pictures/video/author11.png',
					cover: rb + '/pictures/video/video11.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 12,
					category: 'entertainment',
					title: '书法教程：楷书基础',
					author: '书法家张老师',
					authorAvatar: rb + '/pictures/video/author12.png',
					cover: rb + '/pictures/video/video12.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 13,
					category: 'life',
					title: '家庭种菜技巧分享',
					author: '园艺达人老陈',
					authorAvatar: rb + '/pictures/video/author13.png',
					cover: rb + '/pictures/video/video13.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 14,
					category: 'life',
					title: '传统面点制作教程',
					author: '美食达人王婆婆',
					authorAvatar: rb + '/pictures/video/author14.png',
					cover: rb + '/pictures/video/video14.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 15,
					category: 'life',
					title: '家居收纳整理技巧',
					author: '生活管家小周',
					authorAvatar: rb + '/pictures/video/author15.png',
					cover: rb + '/pictures/video/video15.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 16,
					category: 'life',
					title: '养花技巧：君子兰的养护',
					author: '花艺师兰姐',
					authorAvatar: rb + '/pictures/video/author16.png',
					cover: rb + '/pictures/video/video16.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 17,
					category: 'health',
					title: '老年人常见病预防指南',
					author: '社区医生老钱',
					authorAvatar: rb + '/pictures/video/author17.png',
					cover: rb + '/pictures/video/video17.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 18,
					category: 'exercise',
					title: '八段锦教学详解',
					author: '武术教练大山',
					authorAvatar: rb + '/pictures/video/author18.png',
					cover: rb + '/pictures/video/video18.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 19,
					category: 'entertainment',
					title: '越剧欣赏：梁山伯与祝英台',
					author: '戏曲表演者小红',
					authorAvatar: rb + '/pictures/video/author19.png',
					cover: rb + '/pictures/video/video19.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				},
				{
					id: 20,
					category: 'life',
					title: '中老年人穿搭技巧',
					author: '时尚达人阿姨',
					authorAvatar: rb + '/pictures/video/author20.png',
					cover: rb + '/pictures/video/video20.png',
					shares: 0,
					likes: 0,
					comments: 0,
					showOptions: false,
					isCollected: false
				}
			].map(video => ({
				...video,
				shares: Math.floor(Math.random() * 100),
				likes: Math.floor(Math.random() * 100),
				comments: Math.floor(Math.random() * 50),
				showOptions: false
			}))
		}
	},
	computed: {
		filteredVideos() {
			let videos = this.currentCategory === 'all' 
				? [...this.videos]
				: [...this.videos].filter(video => video.category === this.currentCategory);
			
			// Fisher-Yates 洗牌算法实现随机排序
			for (let i = videos.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[videos[i], videos[j]] = [videos[j], videos[i]];
			}
			
			return videos;
		}
	},
	methods: {
		switchCategory(categoryId) {
			this.currentCategory = categoryId
		},
		playVideo(video) {
			// 实现视频播放逻辑
			uni.navigateTo({
				url: `/pages/video/detail?id=${video.id}`
			})
		},
		loadMore() {
			// 实现加载更多逻辑
			console.log('加载更多视频')
		},
		showOptions(videoId) {
			// 关闭其他打开的选项菜单
			this.videos.forEach(video => {
				if (video.id !== videoId) {
					video.showOptions = false;
				}
			});
			// 切换当前选项菜单
			const video = this.videos.find(v => v.id === videoId);
			if (video) {
				video.showOptions = !video.showOptions;
			}
		},
		handleNotInterested(videoId) {
			const index = this.videos.findIndex(v => v.id === videoId);
			if (index !== -1) {
				this.videos.splice(index, 1);
			}
		},
		handleFavorite(videoId) {
			const video = this.videos.find(v => v.id === videoId);
			if (video) {
				video.isCollected = !video.isCollected;
				video.showOptions = false;
				
				this.showToast = true;
				this.toastMessage = video.isCollected ? '收藏成功' : '已取消收藏';
				setTimeout(() => {
					this.showToast = false;
				}, 1500);
			}
		},
		handleShare(videoId) {
			const video = this.videos.find(v => v.id === videoId);
			if (video) {
				video.shares++;
			}
		},
		handleLike(videoId) {
			const video = this.videos.find(v => v.id === videoId);
			if (video) {
				video.likes++;
			}
		},
		handleComment(videoId) {
			uni.showToast({
				title: '评论功能开发中',
				icon: 'none'
			});
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f0f0f0;
}

/* 分类选项卡样式 */
.category-scroll {
	background-color: #fff;
	padding: 10px 0;
	white-space: nowrap;
	border-bottom: 1px solid #eee;
}

.category-list {
	display: inline-flex;
	padding: 0 15px;
}

.category-item {
	padding: 5px 15px;
	margin-right: 10px;
	font-size: 14px;
	color: #666;
	background-color: #f5f5f5;
	border-radius: 15px;
}

.category-item.active {
	color: #fff;
	background-color: #ED5D29;
}

/* 视频列表样式 */
.video-scroll {
	flex: 1;
}

.video-list {
	padding: 12px;
	background-color: #f0f0f0;
}

.video-item {
	background-color: #fff;
	border-radius: 12px;
	overflow: hidden;
	margin-bottom: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.video-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
	border-bottom: 1px solid #f5f5f5;
}

.author-info {
	display: flex;
	align-items: center;
}

.author-avatar {
	width: 40px;
	height: 40px;
	border-radius: 20px;
	margin-right: 12px;
}

.author-name {
	font-size: 14px;
	color: #333;
	font-weight: 500;
}

.video-content {
	padding: 12px;
	background-color: #fff;
}

.video-title {
	font-size: 16px;
	color: #333;
	margin-bottom: 12px;
	display: block;
}

.video-cover {
	width: 100%;
	height: 200px;
	border-radius: 8px;
	background-color: #f5f5f5;
}

.video-footer {
	display: flex;
	justify-content: space-around;
	padding: 12px;
	background-color: #fff;
	border-top: 1px solid #f5f5f5;
}

.footer-item {
	display: flex;
	align-items: center;
	padding: 8px 12px;
}

.footer-icon {
	width: 20px;
	height: 20px;
	margin-right: 4px;
}

.options-wrapper {
	position: relative;
}

.more-icon {
	width: 24px;
	height: 24px;
	padding: 4px;
}

.options-menu {
	position: absolute;
	top: 30px;
	right: 0;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	z-index: 100;
	width: 120px;
}

.option-item {
	display: flex;
	align-items: center;
	padding: 10px;
	transition: all 0.3s ease;
}

.option-item text {
	margin-left: 8px;
	color: #333;
	font-size: 14px;
}

.option-icon {
	width: 20px;
	height: 20px;
}

.toast {
	position: fixed;
	bottom: 20%;
	left: 50%;
	transform: translate(-50%, 0);
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	padding: 10px 20px;
	border-radius: 20px;
	font-size: 14px;
	z-index: 1000;
}
</style> 