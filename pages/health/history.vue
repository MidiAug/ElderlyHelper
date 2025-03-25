<template>
	<view class="container">
		<!-- 类型选择器 -->
		<view class="type-picker">
			<picker mode="selector" :range="types" :value="currentTypeIndex" @change="onTypeChange">
				<view class="picker-content">
					<text class="picker-text">{{ types[currentTypeIndex] }}</text>
					<text class="picker-arrow">▼</text>
				</view>
			</picker>
		</view>
		
		<!-- 时间范围选择 -->
		<view class="date-range">
			<view class="range-item" v-for="(range, index) in dateRanges" :key="index"
				:class="{ active: currentRange === range.value }" @tap="selectRange(range.value)">
				{{ range.label }}
			</view>
		</view>
		
		<!-- 历史记录列表 -->
		<view class="history-list">
			<view class="history-item" v-for="(item, index) in historyData" :key="index" @tap="viewDetail(item)">
				<view class="item-main">
					<view class="value-section">
						<text class="value">{{ item.value }}</text>
						<text class="unit">{{ item.unit }}</text>
					</view>
					<view class="status" :class="item.status">{{ item.statusText }}</view>
				</view>
				<view class="item-info">
					<text class="time">{{ item.time }}</text>
					<text class="note" v-if="item.note">{{ item.note }}</text>
				</view>
			</view>
		</view>
		
		<!-- 数据分析 -->
		<view class="analysis-section">
			<view class="section-title">数据分析</view>
			<view class="analysis-content">
				<view class="stat-item">
					<text class="stat-label">平均值</text>
					<text class="stat-value">{{ stats.average }}{{ currentUnit }}</text>
				</view>
				<view class="stat-item">
					<text class="stat-label">最高值</text>
					<text class="stat-value">{{ stats.max }}{{ currentUnit }}</text>
				</view>
				<view class="stat-item">
					<text class="stat-label">最低值</text>
					<text class="stat-value">{{ stats.min }}{{ currentUnit }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'health-history',
	data() {
		return {
			types: ['血压', '心率', '血氧', '体温'],
			currentTypeIndex: 0,
			currentUnit: 'mmHg',
			dateRanges: [
				{ label: '今天', value: 'today' },
				{ label: '本周', value: 'week' },
				{ label: '本月', value: 'month' },
				{ label: '全部', value: 'all' }
			],
			currentRange: 'week',
			historyData: [
				{
					value: '120/80',
					unit: 'mmHg',
					status: 'normal',
					statusText: '正常',
					time: '2024-03-09 08:30',
					note: '早晨空腹测量'
				},
				{
					value: '125/85',
					unit: 'mmHg',
					status: 'warning',
					statusText: '偏高',
					time: '2024-03-08 20:00',
					note: '运动后测量'
				}
			],
			stats: {
				average: '120/80',
				max: '125/85',
				min: '118/75'
			}
		}
	},
	methods: {
		onTypeChange(e) {
			this.currentTypeIndex = e.detail.value
			// 根据类型更新单位和数据
			const units = ['mmHg', '次/分', '%', '℃']
			this.currentUnit = units[this.currentTypeIndex]
			this.loadHistoryData()
		},
		selectRange(range) {
			this.currentRange = range
			this.loadHistoryData()
		},
		loadHistoryData() {
			// 根据类型和时间范围加载数据
			console.log('加载数据:', {
				type: this.types[this.currentTypeIndex],
				range: this.currentRange
			})
		},
		viewDetail(item) {
			uni.navigateTo({
				url: `/pages/health/detail?type=${this.types[this.currentTypeIndex]}`
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

.type-picker {
	background-color: #fff;
	padding: 15px;
	border-radius: 8px;
	margin-bottom: 15px;
}

.picker-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.picker-text {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.picker-arrow {
	font-size: 12px;
	color: #999;
}

.date-range {
	display: flex;
	background-color: #fff;
	padding: 10px;
	border-radius: 8px;
	margin-bottom: 15px;
}

.range-item {
	flex: 1;
	text-align: center;
	padding: 8px 0;
	font-size: 14px;
	color: #666;
	border-radius: 4px;
}

.range-item.active {
	background-color: #ED5D29;
	color: #fff;
}

.history-list {
	margin-bottom: 15px;
}

.history-item {
	background-color: #fff;
	padding: 15px;
	border-radius: 8px;
	margin-bottom: 10px;
}

.item-main {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.value-section {
	display: flex;
	align-items: baseline;
}

.value {
	font-size: 24px;
	font-weight: bold;
	color: #333;
}

.unit {
	font-size: 14px;
	color: #666;
	margin-left: 5px;
}

.status {
	padding: 4px 8px;
	border-radius: 12px;
	font-size: 12px;
}

.status.normal {
	background-color: #e8f5e9;
	color: #4caf50;
}

.status.warning {
	background-color: #fff3e0;
	color: #ff9800;
}

.status.alert {
	background-color: #ffebee;
	color: #f44336;
}

.item-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.time {
	font-size: 12px;
	color: #999;
}

.note {
	font-size: 12px;
	color: #666;
}

.analysis-section {
	background-color: #fff;
	padding: 15px;
	border-radius: 8px;
}

.section-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
	padding-left: 10px;
	border-left: 4px solid #ED5D29;
}

.analysis-content {
	display: flex;
	justify-content: space-around;
}

.stat-item {
	text-align: center;
}

.stat-label {
	font-size: 12px;
	color: #666;
	margin-bottom: 5px;
}

.stat-value {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}
</style> 