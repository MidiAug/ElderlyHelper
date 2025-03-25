<template>
	<view class="container">
		<!-- 地址选择 -->
		<view class="address-section">
			<view class="address-header">
				<image src="/static/icons/service/location.png" class="location-icon"/>
				<text class="address-title">服务地址</text>
			</view>
			<view class="address-content" @tap="selectAddress">
				<view v-if="selectedAddress">
					<text class="address-detail">{{ selectedAddress.detail }}</text>
					<view class="contact-info">
						<text>{{ selectedAddress.name }}</text>
						<text>{{ selectedAddress.phone }}</text>
					</view>
				</view>
				<view v-else class="no-address">
					<text>请选择服务地址</text>
					<image src="/static/icons/service/arrow.png" class="arrow-icon"/>
				</view>
			</view>
		</view>
		
		<!-- 服务时间选择 -->
		<view class="time-section">
			<view class="section-title">服务时间</view>
			<view class="time-picker">
				<picker mode="date" :start="startDate" :end="endDate" @change="onDateChange">
					<view class="picker-item">
						<text>日期：{{ selectedDate }}</text>
						<image src="/static/icons/service/arrow.png" class="arrow-icon"/>
					</view>
				</picker>
				<picker mode="selector" :range="timeSlots" @change="onTimeChange">
					<view class="picker-item">
						<text>时间：{{ selectedTime }}</text>
						<image src="/static/icons/service/arrow.png" class="arrow-icon"/>
					</view>
				</picker>
			</view>
		</view>
		
		<!-- 服务项目选择 -->
		<view class="service-section">
			<view class="section-title">服务项目</view>
			<view class="service-list">
				<view 
					class="service-item" 
					v-for="(service, index) in services" 
					:key="index"
					:class="{ active: selectedServices.includes(service.id) }"
					@tap="toggleService(service)"
				>
					<image :src="service.icon" class="service-icon"/>
					<view class="service-info">
						<text class="service-name">{{ service.name }}</text>
						<text class="service-price">¥{{ service.price }}</text>
					</view>
					<image 
						:src="selectedServices.includes(service.id) ? rb + '/icons/service/checked.png' : rb + '/icons/service/unchecked.png'" 
						class="check-icon"
					/>
				</view>
			</view>
		</view>
		
		<!-- 备注信息 -->
		<view class="remark-section">
			<view class="section-title">备注信息</view>
			<textarea 
				v-model="remark" 
				placeholder="请输入其他需求或注意事项" 
				class="remark-input"
			/>
		</view>
		
		<!-- 底部结算栏 -->
		<view class="bottom-bar">
			<view class="price-info">
				<text class="total-label">合计：</text>
				<text class="total-price">¥{{ totalPrice }}</text>
			</view>
			<button class="submit-btn" @tap="submitOrder">提交订单</button>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;
export default {
	data() {
		return {
			selectedAddress: null,
			startDate: this.getStartDate(),
			endDate: this.getEndDate(),
			selectedDate: this.getStartDate(),
			timeSlots: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'],
			selectedTime: '08:00-10:00',
			services: [
				{
					id: 1,
					name: '居家保洁',
					price: 100,
					icon: rb + '/icons/service/cleaning.png'
				},
				{
					id: 2,
					name: '维修服务',
					price: 150,
					icon: rb + '/icons/service/repair.png'
				},
				{
					id: 3,
					name: '代购服务',
					price: 50,
					icon: rb + '/icons/service/shopping.png'
				},
				{
					id: 4,
					name: '陪护服务',
					price: 200,
					icon: rb + '/icons/service/care.png'
				}
			],
			selectedServices: [],
			remark: ''
		}
	},
	computed: {
		totalPrice() {
			return this.selectedServices.reduce((total, serviceId) => {
				const service = this.services.find(s => s.id === serviceId)
				return total + (service ? service.price : 0)
			}, 0)
		}
	},
	methods: {
		getStartDate() {
			const date = new Date()
			return date.toISOString().split('T')[0]
		},
		getEndDate() {
			const date = new Date()
			date.setDate(date.getDate() + 30)
			return date.toISOString().split('T')[0]
		},
		selectAddress() {
			uni.navigateTo({
				url: '/pages/address/list'
			})
		},
		onDateChange(e) {
			this.selectedDate = e.detail.value
		},
		onTimeChange(e) {
			this.selectedTime = this.timeSlots[e.detail.value]
		},
		toggleService(service) {
			const index = this.selectedServices.indexOf(service.id)
			if (index === -1) {
				this.selectedServices.push(service.id)
			} else {
				this.selectedServices.splice(index, 1)
			}
		},
		submitOrder() {
			if (!this.selectedAddress) {
				uni.showToast({
					title: '请选择服务地址',
					icon: 'none'
				})
				return
			}
			if (this.selectedServices.length === 0) {
				uni.showToast({
					title: '请选择服务项目',
					icon: 'none'
				})
				return
			}
			
			// TODO: 提交订单到服务器
			uni.showLoading({
				title: '提交中...'
			})
			
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '预约成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}, 1000)
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

.address-section {
	background-color: #fff;
	padding: 15px;
	margin-bottom: 10px;
}

.address-header {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.location-icon {
	width: 20px;
	height: 20px;
	margin-right: 5px;
}

.address-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.address-content {
	padding: 10px;
	background-color: #f8f8f8;
	border-radius: 8px;
}

.address-detail {
	font-size: 16px;
	color: #333;
	margin-bottom: 5px;
	display: block;
}

.contact-info {
	font-size: 14px;
	color: #666;
}

.contact-info text {
	margin-right: 15px;
}

.no-address {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #999;
}

.arrow-icon {
	width: 16px;
	height: 16px;
}

.time-section, .service-section, .remark-section {
	background-color: #fff;
	padding: 15px;
	margin-bottom: 10px;
}

.section-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
}

.time-picker {
	background-color: #f8f8f8;
	border-radius: 8px;
	padding: 10px;
}

.picker-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	font-size: 14px;
	color: #333;
}

.picker-item:first-child {
	border-bottom: 1px solid #eee;
}

.service-list {
	background-color: #f8f8f8;
	border-radius: 8px;
	padding: 10px;
}

.service-item {
	display: flex;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.service-item:last-child {
	border-bottom: none;
}

.service-item.active {
	background-color: #e8f5ff;
}

.service-icon {
	width: 40px;
	height: 40px;
	margin-right: 10px;
}

.service-info {
	flex: 1;
}

.service-name {
	font-size: 16px;
	color: #333;
	margin-bottom: 5px;
}

.service-price {
	font-size: 14px;
	color: #ff4400;
}

.check-icon {
	width: 24px;
	height: 24px;
}

.remark-input {
	background-color: #f8f8f8;
	border-radius: 8px;
	padding: 10px;
	width: 100%;
	height: 100px;
	font-size: 14px;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 60px;
	background-color: #fff;
	display: flex;
	align-items: center;
	padding: 0 15px;
	box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.price-info {
	flex: 1;
}

.total-label {
	font-size: 14px;
	color: #666;
}

.total-price {
	font-size: 20px;
	color: #ff4400;
	font-weight: bold;
}

.submit-btn {
	width: 120px;
	height: 40px;
	line-height: 40px;
	background-color: #007aff;
	color: #fff;
	border-radius: 20px;
	font-size: 16px;
	margin-left: 15px;
}
</style> 