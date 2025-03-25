<template>
	<view class="container">
		<view class="data-card">
			<view class="card-header">
				<text class="card-title">{{ healthData.type }}</text>
				<text class="card-date">{{ healthData.date }}</text>
			</view>
			
			<!-- 主要数据显示 -->
			<view class="data-main">
				<text class="data-value">{{ healthData.value }}</text>
				<text class="data-unit">{{ healthData.unit }}</text>
			</view>
			
			<!-- 数据状态 -->
			<view class="data-status" :class="healthData.status">
				<text class="status-text">{{ healthData.statusText }}</text>
			</view>
			
			<!-- 建议 -->
			<view class="advice-section">
				<view class="section-title">健康建议</view>
				<text class="advice-text">{{ healthData.advice }}</text>
			</view>
		</view>
		
		<!-- 趋势图表 -->
		<view class="trend-section">
			<view class="section-title">近期趋势</view>
			<view class="chart-container">
				<!-- 这里可以集成图表组件 -->
				<view class="chart-placeholder">
					<text class="placeholder-text">数据趋势图表</text>
				</view>
			</view>
		</view>
		
		<!-- 相关指标 -->
		<view class="related-section">
			<view class="section-title">相关指标</view>
			<view class="related-list">
				<view class="related-item" v-for="(item, index) in relatedData" :key="index">
					<text class="item-label">{{ item.label }}</text>
					<text class="item-value">{{ item.value }}{{ item.unit }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'health-detail',
	data() {
		return {
			healthData: {
				type: '血压',
				date: '2024-03-09 08:30',
				value: '120/80',
				unit: 'mmHg',
				status: 'normal',
				statusText: '正常范围',
				advice: '您的血压处于正常范围，建议继续保持良好的生活习惯，适量运动，控制饮食，保证充足睡眠。'
			},
			relatedData: [
				{ label: '心率', value: '75', unit: '次/分' },
				{ label: '血氧', value: '98', unit: '%' },
				{ label: '体温', value: '36.5', unit: '℃' }
			]
		}
	},
	onLoad(options) {
		// 可以根据传入的参数加载不同类型的健康数据
		if (options.type) {
			uni.setNavigationBarTitle({
				title: options.type + '详情'
			})
		}
	}
}
</script>

<style scoped>
.container {
	padding: 15px;
	background-color: #f5f5f5;
}

.data-card {
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
	margin-bottom: 15px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.card-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
}

.card-date {
	font-size: 14px;
	color: #999;
}

.data-main {
	text-align: center;
	margin-bottom: 20px;
}

.data-value {
	font-size: 36px;
	font-weight: bold;
	color: #333;
}

.data-unit {
	font-size: 16px;
	color: #666;
	margin-left: 5px;
}

.data-status {
	text-align: center;
	padding: 8px;
	border-radius: 20px;
	margin-bottom: 20px;
}

.data-status.normal {
	background-color: #e8f5e9;
}

.data-status.warning {
	background-color: #fff3e0;
}

.data-status.alert {
	background-color: #ffebee;
}

.status-text {
	font-size: 14px;
	color: #333;
}

.section-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
	padding-left: 10px;
	border-left: 4px solid #ED5D29;
}

.advice-text {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
}

.trend-section, .related-section {
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
	margin-bottom: 15px;
}

.chart-placeholder {
	height: 200px;
	background-color: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
}

.placeholder-text {
	font-size: 14px;
	color: #999;
}

.related-list {
	margin-top: 10px;
}

.related-item {
	display: flex;
	justify-content: space-between;
	padding: 12px 0;
	border-bottom: 1px solid #eee;
}

.related-item:last-child {
	border-bottom: none;
}

.item-label {
	font-size: 14px;
	color: #666;
}

.item-value {
	font-size: 14px;
	color: #333;
	font-weight: bold;
}
</style> 