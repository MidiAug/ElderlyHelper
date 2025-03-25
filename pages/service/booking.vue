<template>
	<view class="container">
		<!-- 服务信息 -->
		<view class="service-card">
			<image :src="service.image" class="service-image"/>
			<view class="service-info">
				<text class="service-name">{{ service.name }}</text>
				<text class="service-desc">{{ service.description }}</text>
				<view class="price-section">
					<text class="price">¥{{ service.price }}</text>
					<text class="unit">/{{ service.unit }}</text>
				</view>
			</view>
		</view>
		
		<!-- 预约信息填写 -->
		<view class="booking-form">
			<view class="form-title">预约信息</view>
			
			<!-- 服务时间 -->
			<view class="form-item">
				<text class="item-label">服务时间</text>
				<view class="date-time-picker">
					<picker mode="date" :value="bookingDate" @change="onDateChange" class="picker">
						<view class="picker-text">{{ bookingDate }}</view>
					</picker>
					<picker mode="time" :value="bookingTime" @change="onTimeChange" class="picker">
						<view class="picker-text">{{ bookingTime }}</view>
					</picker>
				</view>
			</view>
			
			<!-- 服务时长 -->
			<view class="form-item">
				<text class="item-label">服务时长</text>
				<view class="duration-selector">
					<view class="duration-item" v-for="(duration, index) in durations" :key="index"
						:class="{ active: selectedDuration === duration.value }" @tap="selectDuration(duration)">
						{{ duration.label }}
					</view>
				</view>
			</view>
			
			<!-- 服务地址 -->
			<view class="form-item">
				<text class="item-label">服务地址</text>
				<view class="address-section" @tap="selectAddress">
					<view v-if="selectedAddress">
						<view class="address-info">
							<text class="address-name">{{ selectedAddress.name }}</text>
							<text class="address-phone">{{ selectedAddress.phone }}</text>
						</view>
						<text class="address-detail">{{ selectedAddress.address }}</text>
					</view>
					<view v-else class="no-address">
						<text>请选择服务地址</text>
						<text class="arrow">></text>
					</view>
				</view>
			</view>
			
			<!-- 备注信息 -->
			<view class="form-item">
				<text class="item-label">备注信息</text>
				<textarea v-model="note" placeholder="请输入备注信息（选填）" class="note-input"/>
			</view>
		</view>
		
		<!-- 底部结算栏 -->
		<view class="bottom-bar">
			<view class="total-section">
				<text class="total-label">合计</text>
				<view class="total-price">
					<text class="price">¥{{ totalPrice }}</text>
				</view>
			</view>
			<button class="submit-btn" @tap="submitBooking">提交预约</button>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;
export default {
	name: 'service-booking',
	data() {
		return {
			service: {
				id: 1,
				name: '日常保洁',
				description: '专业保洁人员上门服务，包含房间卫生打扫等',
				price: 80,
				unit: '次',
				image: rb + '/images/service/clean.png'
			},
			bookingDate: '2024-03-09',
			bookingTime: '09:00',
			durations: [
				{ label: '2小时', value: 2 },
				{ label: '3小时', value: 3 },
				{ label: '4小时', value: 4 }
			],
			selectedDuration: 2,
			selectedAddress: null,
			note: ''
		}
	},
	computed: {
		totalPrice() {
			return this.service.price * this.selectedDuration
		}
	},
	onLoad(options) {
		if (options.id) {
			// 根据ID加载服务详情
			console.log('加载服务ID:', options.id)
		}
	},
	methods: {
		onDateChange(e) {
			this.bookingDate = e.detail.value
		},
		onTimeChange(e) {
			this.bookingTime = e.detail.value
		},
		selectDuration(duration) {
			this.selectedDuration = duration.value
		},
		selectAddress() {
			uni.navigateTo({
				url: '/pages/address/list?select=true'
			})
		},
		submitBooking() {
			if (!this.selectedAddress) {
				uni.showToast({
					title: '请选择服务地址',
					icon: 'none'
				})
				return
			}
			
			const bookingData = {
				serviceId: this.service.id,
				date: this.bookingDate,
				time: this.bookingTime,
				duration: this.selectedDuration,
				address: this.selectedAddress,
				note: this.note,
				totalPrice: this.totalPrice
			}
			
			console.log('提交预约:', bookingData)
			
			uni.showToast({
				title: '预约成功',
				icon: 'success',
				duration: 2000,
				success: () => {
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				}
			})
		}
	}
}
</script>

<style scoped>
.container {
	padding-bottom: 70px;
	background-color: #f5f5f5;
}

.service-card {
	display: flex;
	padding: 15px;
	background-color: #fff;
	margin-bottom: 15px;
}

.service-image {
	width: 100px;
	height: 100px;
	border-radius: 8px;
	margin-right: 15px;
}

.service-info {
	flex: 1;
}

.service-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 8px;
}

.service-desc {
	font-size: 14px;
	color: #666;
	margin-bottom: 8px;
	line-height: 1.4;
}

.price-section {
	display: flex;
	align-items: baseline;
}

.price {
	font-size: 20px;
	font-weight: bold;
	color: #ED5D29;
}

.unit {
	font-size: 14px;
	color: #999;
	margin-left: 2px;
}

.booking-form {
	background-color: #fff;
	padding: 15px;
}

.form-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
}

.form-item {
	margin-bottom: 20px;
}

.item-label {
	font-size: 14px;
	color: #666;
	margin-bottom: 10px;
	display: block;
}

.date-time-picker {
	display: flex;
	gap: 15px;
}

.picker {
	flex: 1;
}

.picker-text {
	height: 40px;
	line-height: 40px;
	padding: 0 15px;
	background-color: #f8f8f8;
	border-radius: 4px;
	font-size: 14px;
	color: #333;
}

.duration-selector {
	display: flex;
	gap: 15px;
}

.duration-item {
	flex: 1;
	height: 40px;
	line-height: 40px;
	text-align: center;
	background-color: #f8f8f8;
	border-radius: 4px;
	font-size: 14px;
	color: #666;
}

.duration-item.active {
	background-color: #ED5D29;
	color: #fff;
}

.address-section {
	padding: 15px;
	background-color: #f8f8f8;
	border-radius: 4px;
}

.address-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
}

.address-name {
	font-size: 14px;
	font-weight: bold;
	color: #333;
}

.address-phone {
	font-size: 14px;
	color: #666;
}

.address-detail {
	font-size: 14px;
	color: #666;
}

.no-address {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #999;
	font-size: 14px;
}

.arrow {
	color: #ccc;
}

.note-input {
	width: 100%;
	height: 100px;
	padding: 10px;
	background-color: #f8f8f8;
	border-radius: 4px;
	font-size: 14px;
}

.bottom-bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	padding: 10px 15px;
	background-color: #fff;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.total-section {
	flex: 1;
	display: flex;
	align-items: baseline;
}

.total-label {
	font-size: 14px;
	color: #666;
	margin-right: 10px;
}

.submit-btn {
	width: 120px;
	height: 40px;
	line-height: 40px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 20px;
	font-size: 16px;
	margin: 0;
}
</style> 