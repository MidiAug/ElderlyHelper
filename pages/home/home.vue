<template>
	<view class="container" v-if="rb">
		<!-- 搜索框 -->
		<view class="search-bar">
			<input type="text" placeholder="搜索" />
			<image class="search-icon" :src="rb + '/icons/search.png'" />
		</view>

		<!-- 轮播图 -->
		<swiper class="swiper" autoplay="true" interval="3000" circular="true">
			<swiper-item v-for="(item, index) in swiperImages" :key="index">
				<image class="swiper-image" :src="item" />
			</swiper-item>
		</swiper>

		<!-- 功能入口 -->
		<view class="function-buttons">
			<view class="button" v-for="(item, index) in functions" :key="index" @tap="navigateTo(item.path)">
				<image class="button-image" :src="item.image" />
				<text>{{ item.name }}</text>
			</view>
		</view>

		<!-- 热门视频 -->
		<view class="hot-videos">
			<text class="section-title">热门视频</text>
			<view class="divider"></view>
			<view class="video-list">
				<view class="video" v-for="(video, index) in videos" :key="index" @tap="watchVideo(video)">
					<image class="video-image" :src="video.image" />
					<text class="video-title">{{ video.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'Home',
	data() {
		return {
			rb: rb,
			
			swiperImages: [
				rb + '/pictures/home/rotation1.png',
				rb + '/pictures/home/rotation2.png',
				rb + '/pictures/home/rotation3.png'
			],
			functions: [
				{ image: rb + '/icons/home/1.png', name: '老友问医', path: '/pages/medical/medical' },
				{ image: rb + '/icons/home/2.png', name: '养生课堂', path: '/pages/health/health-class' },
				{ image: rb + '/icons/home/3.png', name: '夕阳助手', path: '/pages/assistant/assistant' },
				{ image: rb + '/icons/home/4.png', name: '健康监测', path: '/pages/health/monitor' },
				{ image: rb + '/icons/home/5.png', name: '休闲娱乐', path: '/pages/entertainment/entertainment' },
				{ image: rb + '/icons/home/6.png', name: '家庭服务', path: '/pages/service/home-service' },
				{ image: rb + '/icons/home/7.png', name: '夕阳问答', path: '/pages/qa/qa' },
				{ image: rb + '/icons/home/8.png', name: '小二上门', path: '/pages/service/door-service' }
			],
			videos: this.getRandomVideos()
		};
	},
	methods: {
		getRandomVideos() {
			const allVideos = [
				{ image: rb + '/pictures/home/video1.png', title: '脖子疼怎么办？', bv: 'BV1zP4y167Zn' },
				{ image: rb + '/pictures/home/video2.png', title: '在家也能做的健身操', bv: 'BV1rd4y1q7xQ' },
				{ image: rb + '/pictures/home/video3.png', title: '养老机器人来了', bv: 'BV12j9MYkENd' },
				{ image: rb + '/pictures/home/video4.png', title: '更适合我们的新产品', bv: 'BV1Rm421V7kk' },
				{ image: rb + '/pictures/home/video5.png', title: '早饭吃什么对身体好', bv: 'BV1jv4y1V7ix' }
			];
			return allVideos.sort(() => 0.5 - Math.random()).slice(0, 4);
		},
		navigateTo(path) {
			uni.navigateTo({
				url: path
			});
		},
		watchVideo(video) {
			uni.navigateTo({
				url: `/pages/video/video?bv=${video.bv}`
			});
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	background-color: #f8f9fa;
}

.search-bar {
	width: 95%;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	background-color: white;
	padding: 0px 15px;
	border-radius: 25px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
}

.search-bar:focus-within {
	box-shadow: 0 4px 12px rgba(237, 93, 41, 0.15);
}

input {
	flex-grow: 1;
	padding: 10px;
	border: none;
	outline: none;
	font-size: 15px;
}

.search-icon {
	width: 22px;
	height: 22px;
	margin-left: 10px;
	opacity: 0.6;
}

.swiper {
	width: 100%;
	height: 200px;
	margin-bottom: 20px;
	border-radius: 15px;
	overflow: hidden;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.swiper-image {
	width: 100%;
	height: 100%;
}

.function-buttons {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	background: #fff;
	border-radius: 15px;
	padding: 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.button {
	width: 22%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px 5px;
	transition: all 0.3s ease;
}

.button:active {
	transform: scale(0.95);
}

.button-image {
	width: 50px;
	height: 50px;
	margin-bottom: 8px;
	transition: all 0.3s ease;
}

.button text {
	font-size: 14px;
	color: #333;
	text-align: center;
}

.hot-videos {
	width: 95%;
	margin-top: 20px;
	background-color: #fff;
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.section-title {
	font-size: 20px;
	font-weight: bold;
	margin: 15px 0;
	color: #333;
	text-align: center;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.section-title:before, .section-title:after {
	content: '';
	flex: 0.15;
	height: 2px;
	background: linear-gradient(90deg, transparent, #ED5D29, transparent);
	margin: 0 15px;
}

.divider {
	width: 100%;
	height: 1px;
	background: linear-gradient(90deg, transparent, #eee, transparent);
	margin-bottom: 20px;
}

.video-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 15px;
}

.video {
	width: 45%;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: all 0.3s ease;
}

.video:active {
	transform: scale(0.98);
}

.video-image {
	width: 100%;
	height: 100px;
	margin-bottom: 8px;
	border-radius: 12px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	object-fit: cover;
}

.video-title {
	font-size: 15px;
	color: #444;
	text-align: center;
	line-height: 1.4;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style> 