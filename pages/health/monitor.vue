<template>
	<view class="container">
		<!-- 健康数据概览 -->
		<view class="health-overview">
			<view class="data-card" v-for="(data, index) in healthData" :key="index" @tap="showDetail(data)">
				<view class="data-icon">
					<image :src="data.icon" class="icon"/>
				</view>
				<view class="data-info">
					<text class="data-name">{{ data.name }}</text>
					<view class="data-value">
						<text class="value">{{ data.value }}</text>
						<text class="unit">{{ data.unit }}</text>
					</view>
					<text class="data-status" :class="data.status">{{ data.statusText }}</text>
				</view>
			</view>
		</view>
		
		<!-- 健康趋势图 -->
		<view class="trend-section">
			<view class="section-header">
				<text class="section-title">健康趋势</text>
				<picker mode="selector" :range="timeRanges" @change="changeTimeRange">
					<text class="time-range">{{ currentRange }}</text>
				</picker>
			</view>
			<view class="chart-container">
				<!-- 这里需要集成图表组件 -->
				<text class="placeholder">健康数据趋势图</text>
			</view>
		</view>
		
		<!-- 健康建议 -->
		<view class="advice-section">
			<view class="section-title">健康建议</view>
			<view class="advice-list">
				<view class="advice-item" v-for="(advice, index) in healthAdvice" :key="index">
					<view class="advice-content">
						<text class="advice-title">{{ advice.title }}：</text>
						<text class="advice-text">{{ advice.content }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部操作按钮 -->
		<view class="bottom-actions">
			<button class="action-btn" @tap="startMeasure">开始测量</button>
			<button class="action-btn history" @tap="viewHistory">查看历史</button>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	data() {
		return {
			healthData: [
				{
					name: '血压',
					value: '120/80',
					unit: 'mmHg',
					icon: rb + '/icons/health/blood-pressure.png',
					status: 'normal',
					statusText: '正常'
				},
				{
					name: '心率',
					value: '75',
					unit: '次/分',
					icon: rb + '/icons/health/heart-rate.png',
					status: 'normal',
					statusText: '正常'
				},
				{
					name: '血糖',
					value: '5.6',
					unit: 'mmol/L',
					icon: rb + '/icons/health/blood-sugar.png',
					status: 'warning',
					statusText: '偏高'
				},
				{
					name: '体温',
					value: '36.5',
					unit: '°C',
					icon: rb + '/icons/health/temperature.png',
					status: 'normal',
					statusText: '正常'
				}
			],
			timeRanges: ['最近7天', '最近30天', '最近90天'],
			currentRange: '最近7天',
			healthAdvice: [
				{
					title: '血压管理建议',
					content: '建议适当运动，控制饮食盐分...',
				},
				{
					title: '血糖控制建议',
					content: '注意饮食规律，控制碳水摄入...',
				},
				{
					title: '运动建议',
					content: '建议每天进行30分钟适度运动...',
				}
			]
		}
	},
	methods: {
		showDetail(data) {
			uni.navigateTo({
				url: `/pages/health/detail?type=${data.name}`
			})
		},
		changeTimeRange(e) {
			this.currentRange = this.timeRanges[e.detail.value]
			// 更新趋势图数据
		},
		startMeasure() {
			uni.navigateTo({
				url: '/pages/health/measure'
			})
		},
		viewHistory() {
			uni.navigateTo({
				url: '/pages/health/history'
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

.health-overview {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 20px;
}

.data-card {
	width: 40%;
	background-color: #fff;
	border-radius: 12px;
	padding: 15px;
	margin-bottom: 15px;
	display: flex;
	align-items: center;
}

.data-icon {
	width: 40px;
	height: 40px;
	margin-right: 12px;
}

.icon {
	width: 100%;
	height: 100%;
}

.data-info {
	flex: 1;
}

.data-name {
	font-size: 14px;
	color: #666;
	margin-bottom: 5px;
}

.data-value {
	display: flex;
	align-items: baseline;
	margin-bottom: 5px;
}

.value {
	font-size: 20px;
	font-weight: bold;
	color: #333;
}

.unit {
	font-size: 12px;
	color: #999;
	margin-left: 5px;
}

.data-status {
	font-size: 12px;
	padding: 2px 6px;
	border-radius: 10px;
}

.normal {
	background-color: #e8f5e9;
	color: #4caf50;
}

.warning {
	background-color: #fff3e0;
	color: #ff9800;
}

.danger {
	background-color: #ffebee;
	color: #f44336;
}

.trend-section {
	background-color: #fff;
	border-radius: 12px;
	padding: 15px;
	margin-bottom: 20px;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
}

.section-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.time-range {
	font-size: 14px;
	color: #666;
}

.chart-container {
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f8f8f8;
	border-radius: 8px;
}

.placeholder {
	color: #999;
	font-size: 14px;
}

.advice-section {
	background-color: #fff;
	border-radius: 12px;
	padding: 15px;
	margin-bottom: 80px;
}

.advice-list {
	margin-top: 10px;
}

.advice-item {
	display: flex;
	align-items: center;
	padding: 12px 0;
	border-bottom: 1px solid #eee;
}

.advice-item:last-child {
	border-bottom: none;
}

.advice-icon {
	width: 30px;
	height: 30px;
	margin-right: 10px;
}

.advice-content {
	flex: 1;
}

.advice-title {
	font-size: 14px;
	color: #333;
	margin-bottom: 5px;
}

.advice-text {
	font-size: 12px;
	color: #666;
	line-height: 1.4;
}

.bottom-actions {
	position: fixed;
	bottom: 20px;
	left: 20px;
	right: 20px;
	display: flex;
	justify-content: space-between;
}

.action-btn {
	width: 48%;
	height: 44px;
	border-radius: 22px;
	font-size: 16px;
	line-height: 44px;
	background-color: #007aff;
	color: #fff;
}

.history {
	background-color: #fff;
	color: #007aff;
	border: 1px solid #007aff;
}
</style> 