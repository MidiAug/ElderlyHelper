<template>
	<view class="container">
		<!-- 服务分类 -->
		<view class="service-categories">
			<view class="category-item" v-for="(category, index) in categories" :key="index" @tap="selectCategory(category)">
				<image :src="category.icon" class="category-icon"/>
				<text class="category-name">{{ category.name }}</text>
			</view>
		</view>
		
		<!-- 热门服务 -->
		<view class="hot-services">
			<view class="section-title">热门服务</view>
			<view class="service-list">
				<view class="service-item" v-for="(service, index) in hotServices" :key="index" @tap="bookService(service)">
					<image :src="service.image" class="service-image"/>
					<view class="service-info">
						<text class="service-name">{{ service.name }}</text>
						<text class="service-desc">{{ service.description }}</text>
						<view class="service-price">
							<text class="price">¥{{ service.price }}</text>
							<text class="unit">/{{ service.unit }}</text>
						</view>
					</view>
					<button class="book-btn">预约</button>
				</view>
			</view>
		</view>
		
		<!-- 服务保障 -->
		<view class="service-guarantee">
			<view class="section-title">服务保障</view>
			<view class="guarantee-list">
				<view class="guarantee-item" v-for="(item, index) in guarantees" :key="index">
					<image :src="item.icon" class="guarantee-icon"/>
					<text class="guarantee-text">{{ item.text }}</text>
				</view>
			</view>
		</view>
		
		<!-- 紧急服务 -->
		<view class="emergency-service">
			<view class="emergency-header">
				<image :src="rb + '/icons/service/emergency.png'" class="emergency-icon"/>
				<text class="emergency-title">紧急服务</text>
			</view>
			<view class="emergency-content">
				<text class="emergency-desc">24小时紧急响应，专业人员快速上门</text>
				<button class="emergency-btn" @tap="callEmergency">一键呼叫</button>
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
			rb:rb,
			
			categories: [
				{ name: '保洁服务', icon: rb + '/icons/service/cleaning.png' },
				{ name: '维修服务', icon: rb + '/icons/service/repair.png' },
				{ name: '护理服务', icon: rb + '/icons/service/care.png' },
				{ name: '送餐服务', icon: rb + '/icons/service/food.png' }
			],
			hotServices: [
				{
					name: '日常保洁',
					description: '专业保洁，打扫卫生',
					price: 80,
					unit: '次',
					image: rb + '/images/service/cleaning.png'
				},
				{
					name: '水电维修',
					description: '水管漏水，电路维修',
					price: 100,
					unit: '次',
					image: rb + '/images/service/repair.png'
				},
				{
					name: '居家护理',
					description: '专业护工，贴心照料',
					price: 150,
					unit: '天',
					image: rb + '/images/service/care.png'
				}
			],
			guarantees: [
				{ text: '专业认证', icon: rb + '/icons/service/certified.png' },
				{ text: '安全保障', icon: rb + '/icons/service/safe.png' },
				{ text: '准时上门', icon: rb + '/icons/service/ontime.png' },
				{ text: '满意付款', icon: rb + '/icons/service/payment.png' }
			]
		}
	},
	methods: {
		selectCategory(category) {
			uni.navigateTo({
				url: `/pages/service/list?category=${category.name}`
			})
		},
		bookService(service) {
			uni.navigateTo({
				url: `/pages/service/booking?service=${JSON.stringify(service)}`
			})
		},
		callEmergency() {
			uni.showModal({
				title: '紧急服务',
				content: '确认呼叫紧急服务吗？',
				success: (res) => {
					if (res.confirm) {
						uni.makePhoneCall({
							phoneNumber: '110'
						})
					}
				}
			})
		}
	}
}
</script>

<style scoped>
.container {
	padding: 20px;
	background-color: #f5f5f5;
}

.service-categories {
	display: flex;
	justify-content: space-between;
	padding: 20px;
	background-color: #fff;
	border-radius: 12px;
	margin-bottom: 20px;
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
	color: #333;
	margin-bottom: 15px;
}

.service-list {
	background-color: #fff;
	border-radius: 12px;
	padding: 15px;
}

.service-item {
	display: flex;
	align-items: center;
	padding: 15px 0;
	border-bottom: 1px solid #eee;
}

.service-item:last-child {
	border-bottom: none;
}

.service-image {
	width: 80px;
	height: 80px;
	border-radius: 8px;
	margin-right: 12px;
}

.service-info {
	flex: 1;
}

.service-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 5px;
}

.service-desc {
	font-size: 14px;
	color: #666;
	margin-bottom: 5px;
}

.service-price {
	display: flex;
	align-items: baseline;
}

.price {
	font-size: 18px;
	color: #ff4400;
	font-weight: bold;
}

.unit {
	font-size: 12px;
	color: #999;
	margin-left: 2px;
}

.book-btn {
	width: 80px;
	height: 36px;
	line-height: 36px;
	background-color: #007aff;
	color: #fff;
	border-radius: 18px;
	font-size: 14px;
}

.service-guarantee {
	margin: 20px 0;
}

.guarantee-list {
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	border-radius: 12px;
	padding: 20px;
}

.guarantee-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.guarantee-icon {
	width: 30px;
	height: 30px;
	margin-bottom: 5px;
}

.guarantee-text {
	font-size: 12px;
	color: #666;
}

.emergency-service {
	background-color: #fff;
	border-radius: 12px;
	padding: 20px;
}

.emergency-header {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
}

.emergency-icon {
	width: 24px;
	height: 24px;
	margin-right: 8px;
}

.emergency-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
}

.emergency-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.emergency-desc {
	font-size: 14px;
	color: #666;
	flex: 1;
}

.emergency-btn {
	width: 120px;
	height: 40px;
	line-height: 40px;
	background-color: #ff4400;
	color: #fff;
	border-radius: 20px;
	font-size: 16px;
}
</style> 