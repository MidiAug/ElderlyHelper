<template>
	<view class="container">
		<!-- 轮播图 -->
		<swiper class="banner" circular autoplay interval="3000" duration="500">
			<swiper-item v-for="(banner, index) in banners" :key="index">
				<image :src="banner.image" mode="aspectFill" class="banner-image"/>
			</swiper-item>
		</swiper>
		
		<!-- 功能区域 -->
		<view class="section">
			<text class="section-title">娱乐</text>
			<view class="function-grid">
				<view class="function-item" v-for="(item, index) in functions" :key="index" @tap="navigateToFunction(item)">
					<image :src="item.icon" class="function-icon"/>
					<text class="function-name">{{ item.name }}</text>
				</view>
			</view>
		</view>
		
		<!-- 联系人列表 -->
		<view class="section">
			<text class="section-title">我的联系人</text>
			<view class="contact-list">
				<view class="contact-item" v-for="(contact, index) in contacts" :key="index" @tap="navigateToChat(contact)">
					<image :src="contact.avatar" class="contact-avatar"/>
					<view class="contact-info">
						<text class="contact-name">{{ contact.name }}</text>
						<text class="contact-message">{{ contact.messages[contact.messages.length - 1].content }}</text>
					</view>
					<text class="contact-time">{{ contact.messages[contact.messages.length - 1].time }}</text>
				</view>
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
			banners: [
				{
					image: rb + '/pictures/entertainment/rotation1.png',
					url: ''
				},
				{
					image: rb + '/pictures/entertainment/rotation2.png',
					url: ''
				},
				{
					image: rb + '/pictures/entertainment/rotation3.png',
					url: ''
				}
			],
			functions: [
				{
					name: '广场舞',
					icon: rb + '/icons/entertainment/1.png',
					url: '/pages/entertainment/dance'
				},
				{
					name: '录歌房',
					icon: rb + '/icons/entertainment/2.png',
					url: '/pages/entertainment/sing'
				},
				{
					name: '太极',
					icon: rb + '/icons/entertainment/3.png',
					url: '/pages/entertainment/taichi'
				},
				{
					name: '刺绣',
					icon: rb + '/icons/entertainment/4.png',
					url: '/pages/entertainment/embroidery'
				},
				{
					name: '书画',
					icon: rb + '/icons/entertainment/5.png',
					url: '/pages/entertainment/art'
				},
				{
					name: '京剧',
					icon: rb + '/icons/entertainment/6.png',
					url: '/pages/entertainment/opera'
				},
				{
					name: '园艺',
					icon: rb + '/icons/entertainment/7.png',
					url: '/pages/entertainment/garden'
				},
				{
					name: '烹饪',
					icon: rb + '/icons/entertainment/8.png',
					url: '/pages/entertainment/cooking'
				},
				{
					name: '休闲棋牌',
					icon: rb + '/icons/entertainment/9.png',
					url: '/pages/entertainment/chess'
				}
			],
			contacts: [
				{
					id: 1,
					name: '老李头',
					avatar: rb + '/icons/entertainment/role1.png',
					messages: [
						{
							id: 1,
							type: 'received',
							content: '最近身体怎么样？',
							time: '10:00'
						},
						{
							id: 2,
							type: 'sent',
							content: '挺好的，每天都在锻炼身体',
							time: '10:01'
						},
						{
							id: 3,
							type: 'received',
							content: '那就好，要保重身体啊',
							time: '10:02'
						},
						{
							id: 4,
							type: 'sent',
							content: '你也是，要多运动',
							time: '10:03'
						},
						{
							id: 5,
							type: 'received',
							content: '对了，明天广场舞你来吗？',
							time: '10:04'
						}
					]
				},
				{
					id: 2,
					name: '大女儿',
					avatar: rb + '/icons/entertainment/role2.png',
					messages: [
						{
							id: 1,
							type: 'received',
							content: '爸，今天吃药了吗？',
							time: '09:30'
						},
						{
							id: 2,
							type: 'sent',
							content: '吃了，都按时吃',
							time: '09:31'
						},
						{
							id: 3,
							type: 'received',
							content: '血压怎么样？',
							time: '09:31'
						},
						{
							id: 4,
							type: 'sent',
							content: '今天测了，120/80，很正常',
							time: '09:32'
						},
						{
							id: 5,
							type: 'received',
							content: '太好了，继续保持！',
							time: '09:33'
						}
					]
				},
				{
					id: 3,
					name: '二女儿',
					avatar: rb + '/icons/entertainment/role3.png',
					messages: [
						{
							id: 1,
							type: 'received',
							content: '爸，周末我带孩子回来看您',
							time: '14:20'
						},
						{
							id: 2,
							type: 'sent',
							content: '好啊，想孙子了',
							time: '14:21'
						},
						{
							id: 3,
							type: 'received',
							content: '他也想爷爷，说要吃您包的饺子',
							time: '14:22'
						},
						{
							id: 4,
							type: 'sent',
							content: '行，我准备些馅儿',
							time: '14:23'
						},
						{
							id: 5,
							type: 'received',
							content: '太好了，他一定很开心',
							time: '14:24'
						}
					]
				}
			]
		}
	},
	methods: {
		navigateToFunction(item) {
			uni.navigateTo({
				url: item.url
			})
		},
		navigateToChat(contact) {
			uni.navigateTo({
				url: `/pages/chat/chat?contactId=${contact.id}`
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

/* 轮播图样式 */
.banner {
	height: 200px;
	background-color: #fff;
}

.banner-image {
	width: 100%;
	height: 100%;
}

/* 通用section样式 */
.section {
	margin: 15px;
	background-color: #fff;
	border-radius: 8px;
	padding: 15px;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	text-align: center;
	margin-bottom: 30px;
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

/* 分割线 */
.function-grid,
.contact-list {
	position: relative;
}

.section-title:before, .section-title:after {
	content: '';
	flex: 0.15;
	height: 2px;
	background: linear-gradient(90deg, transparent, #ED5D29, transparent);
	margin: 0 15px;
}

/* 功能网格样式 */
.function-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 15px;
}

.function-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
}

.function-icon {
	width: 50px;
	height: 50px;
	margin-bottom: 8px;
}

.function-name {
	font-size: 14px;
	color: #333;
}

/* 联系人列表样式 */
.contact-list {
	margin-top: 10px;
}

.contact-item {
	display: flex;
	align-items: center;
	padding: 15px 0;
	border-bottom: 1px solid #eee;
}

.contact-item:last-child {
	border-bottom: none;
}

.contact-avatar {
	width: 50px;
	height: 50px;
	border-radius: 25px;
	margin-right: 12px;
}

.contact-info {
	flex: 1;
	margin-left: 15px;
	display: flex;
	flex-direction: column;
}

.contact-name {
	font-size: 16px;
	color: #333;
	font-weight: 500;
	margin-bottom: 8px;
}

.contact-message {
	font-size: 14px;
	color: #999;
	width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.contact-time {
	font-size: 12px;
	color: #999;
}
</style> 