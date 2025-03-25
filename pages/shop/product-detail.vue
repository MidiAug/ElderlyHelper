<template>
	<view class="container">
		<view v-if="product">
			<!-- 商品图片轮播 -->
			<swiper class="swiper" circular indicator-dots autoplay>
				<swiper-item v-for="(img, index) in product.images" :key="index">
					<image :src="img" mode="aspectFill" class="product-image"/>
				</swiper-item>
			</swiper>
			
			<!-- 价格区域 -->
			<view class="price-section">
				<text class="price">¥{{ product.price }}</text>
				<text class="original-price">¥{{ product.originalPrice }}</text>
			</view>
			
			<!-- 商品信息 -->
			<view class="info-section">
				<text class="title">{{ product.name }}</text>
				<text class="sales">月销 {{ product.sales }}+</text>
			</view>
			
			<!-- 商品详情 -->
			<view class="detail-section">
				<view class="section-title">商品详情</view>
				<view class="detail-item" v-for="(detail, index) in product.details" :key="index">
					<text class="detail-label">{{ detail.label }}：</text>
					<text class="detail-value">{{ detail.value }}</text>
				</view>
			</view>
			
			<!-- 推荐理由 -->
			<view class="recommend-section">
				<view class="section-title">推荐理由</view>
				<view class="recommend-item" v-for="(reason, index) in product.recommendations" :key="index">
					<text class="recommend-text">{{ reason }}</text>
				</view>
			</view>
			
			<!-- 底部操作栏 -->
			<view class="bottom-bar">
				<view class="action-buttons">
					<view class="collect-btn" @tap="toggleCollect">
						<image :src="isCollected ? rb + '/icons/star-filled.png' : rb + '/icons/star.png'" class="action-icon"/>
						<text>{{ isCollected ? '已收藏' : '收藏' }}</text>
					</view>
					<view class="customer-service" @tap="contactService">
						<image src="/static/icons/service.png" class="action-icon"/>
						<text>客服</text>
					</view>
				</view>
				<view class="main-buttons">
					<button class="buy-btn" @tap="buyNow">立即购买</button>
				</view>
			</view>
		</view>
		
		<!-- 加载提示 -->
		<view v-else class="loading">
			<text>加载中...</text>
		</view>
		
		<!-- Toast提示 -->
		<view class="toast" v-if="showToast">
			<text>{{ toastMessage }}</text>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;
import { productData } from './productData.js'

export default {
	data() {
		return {
			rb:rb,
			isCollected: false,
			showToast: false,
			toastMessage: '',
			product: null
		}
	},
	onLoad(options) {
		if (options.id) {
			const productId = parseInt(options.id);
			// 从预设数据中获取商品信息
			if (productData[productId]) {
				this.product = productData[productId];
				if (this.product.images && this.product.images.length > 0) {
				this.product.images = [rb + this.product.images[0]];
			}
			} else {
				// 如果找不到商品，显示提示并返回
				uni.showToast({
					title: '商品不存在',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		}
	},
	methods: {
		toggleCollect() {
			this.isCollected = !this.isCollected
			this.showToast = true
			this.toastMessage = this.isCollected ? '收藏成功' : '已取消收藏'
			setTimeout(() => {
				this.showToast = false
			}, 1000)
		},
		contactService() {
			uni.showToast({
				title: '正在接入客服...',
				icon: 'none'
			})
		},
		buyNow() {
			uni.showToast({
				title: '正在跳转支付...',
				icon: 'none'
			})
		}
	}
}
</script>

<style scoped>
.container {
	padding-bottom: 100px;
}

.swiper {
	width: 100%;
	height: 400px;
}

.product-image {
	width: 100%;
	height: 100%;
}

.price-section {
	padding: 15px;
	background-color: #fff;
}

.price {
	font-size: 24px;
	color: #ff4400;
	font-weight: bold;
}

.original-price {
	font-size: 16px;
	color: #999;
	text-decoration: line-through;
	margin-left: 10px;
}

.info-section {
	padding: 15px;
	background-color: #fff;
	margin-top: 10px;
}

.title {
	font-size: 20px;
	font-weight: bold;
	color: #333;
	margin-bottom: 10px;
}

.sales {
	font-size: 14px;
	color: #666;
}

.detail-section, .recommend-section {
	margin-top: 10px;
	padding: 15px;
	background-color: #fff;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
	border-left: 4px solid #ED5D29;
	padding-left: 10px;
}

.detail-item {
	display: flex;
	margin-bottom: 10px;
	font-size: 16px;
}

.detail-label {
	color: #666;
	width: 100px;
}

.detail-value {
	color: #333;
	flex: 1;
}

.recommend-item {
	margin-bottom: 10px;
	display: flex;
	align-items: center;
}

.recommend-text {
	font-size: 16px;
	color: #333;
	line-height: 1.5;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	display: flex;
	padding: 10px 15px;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	height: 60px;
	align-items: center;
	z-index: 100;
}

.action-buttons {
	display: flex;
	align-items: center;
	width: 40%;
}

.collect-btn, .customer-service {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 20px;
	width: 50px;
}

.action-icon {
	width: 24px;
	height: 24px;
	margin-bottom: 4px;
}

.main-buttons {
	flex: 1;
	display: flex;
	justify-content: flex-end;
}

.buy-btn {
	width: 120px;
	height: 40px;
	line-height: 40px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 20px;
	font-size: 16px;
	text-align: center;
	border: none;
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
	font-size: 16px;
	z-index: 1000;
	opacity: 0;
	animation: fadeInOut 1s ease-in-out;
}

@keyframes fadeInOut {
	0% {
		opacity: 0;
		transform: translate(-50%, 20px);
	}
	20% {
		opacity: 1;
		transform: translate(-50%, 0);
	}
	80% {
		opacity: 1;
		transform: translate(-50%, 0);
	}
	100% {
		opacity: 0;
		transform: translate(-50%, -20px);
	}
}

.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 16px;
	color: #666;
}
</style> 