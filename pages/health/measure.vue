<template>
	<view class="container">
		<!-- 测量类型选择 -->
		<view class="type-section">
			<view class="type-grid">
				<view class="type-item" v-for="(type, index) in measureTypes" :key="index" @tap="selectType(type)"
					:class="{ active: selectedType === type.id }">
					<image :src="type.icon" class="type-icon"/>
					<text class="type-name">{{ type.name }}</text>
				</view>
			</view>
		</view>
		
		<!-- 测量数据输入 -->
		<view class="measure-form" v-if="selectedType">
			<view class="form-title">{{ getSelectedType().name }}测量</view>
			
			<!-- 手动输入区域 -->
			<view class="input-section">
				<view class="input-group">
					<text class="input-label">测量值</text>
					<input type="digit" v-model="measureValue" :placeholder="'请输入' + getSelectedType().name" class="measure-input"/>
					<text class="input-unit">{{ getSelectedType().unit }}</text>
				</view>
				
				<view class="input-group">
					<text class="input-label">测量时间</text>
					<picker mode="time" :value="measureTime" @change="onTimeChange" class="time-picker">
						<view class="picker-text">{{ measureTime }}</view>
					</picker>
				</view>
				
				<view class="input-group">
					<text class="input-label">备注</text>
					<input type="text" v-model="measureNote" placeholder="添加备注（选填）" class="note-input"/>
				</view>
			</view>
			
			<!-- 智能设备连接提示 -->
			<view class="device-section">
				<view class="device-title">
					<text class="title-text">智能设备</text>
					<text class="connect-tip">连接设备自动测量</text>
				</view>
				<view class="device-list">
					<view class="device-item" @tap="connectDevice">
						<image src="/static/icons/health/device.png" class="device-icon"/>
						<view class="device-info">
							<text class="device-name">智能{{ getSelectedType().name }}仪</text>
							<text class="device-status">未连接</text>
						</view>
						<text class="connect-btn">连接</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 保存按钮 -->
		<button class="save-btn" @tap="saveMeasure" v-if="selectedType">保存测量</button>
	</view>
</template>

<script>
	
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'health-measure',
	data() {
		return {
			selectedType: '',
			measureTypes: [
				{ id: 'blood-pressure', name: '血压', unit: 'mmHg', icon: rb + '/icons/health/blood-pressure.png' },
				{ id: 'heart-rate', name: '心率', unit: '次/分', icon: rb + '/icons/health/heart-rate.png' },
				{ id: 'blood-oxygen', name: '血唐', unit: 'mmol/L', icon: rb + '/icons/health/blood-sugar.png' },
				{ id: 'temperature', name: '体温', unit: '℃', icon: rb + '/icons/health/temperature.png' }
			],
			measureValue: '',
			measureTime: '12:00',
			measureNote: ''
		}
	},
	methods: {
		selectType(type) {
			this.selectedType = type.id
			this.measureValue = ''
		},
		getSelectedType() {
			return this.measureTypes.find(type => type.id === this.selectedType)
		},
		onTimeChange(e) {
			this.measureTime = e.detail.value
		},
		connectDevice() {
			uni.showToast({
				title: '设备连接中...',
				icon: 'loading'
			})
		},
		saveMeasure() {
			if (!this.measureValue) {
				uni.showToast({
					title: '请输入测量值',
					icon: 'none'
				})
				return
			}
			
			// 保存测量数据
			const data = {
				type: this.getSelectedType().name,
				value: this.measureValue,
				unit: this.getSelectedType().unit,
				time: this.measureTime,
				note: this.measureNote
			}
			
			console.log('保存测量数据:', data)
			
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
			
			// 跳转到详情页
			uni.navigateTo({
				url: `/pages/health/detail?type=${this.getSelectedType().name}`
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

.type-section {
	background-color: #fff;
	border-radius: 8px;
	padding: 15px;
	margin-bottom: 15px;
}

.type-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 15px;
}

.type-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px 10px;
	background-color: #f8f8f8;
	border-radius: 8px;
}

.type-item.active {
	background-color: #ED5D29;
}

.type-icon {
	width: 32px;
	height: 32px;
	margin-bottom: 8px;
}

.type-name {
	font-size: 14px;
	color: #333;
}

.type-item.active .type-name {
	color: #fff;
}

.measure-form {
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
	margin-bottom: 15px;
}

.form-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 20px;
}

.input-section {
	margin-bottom: 20px;
}

.input-group {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
}

.input-label {
	width: 80px;
	font-size: 14px;
	color: #666;
}

.measure-input, .note-input {
	flex: 1;
	height: 40px;
	padding: 0 12px;
	border: 1px solid #eee;
	border-radius: 4px;
	font-size: 14px;
}

.input-unit {
	margin-left: 10px;
	font-size: 14px;
	color: #666;
}

.time-picker {
	flex: 1;
}

.picker-text {
	height: 40px;
	line-height: 40px;
	padding: 0 12px;
	border: 1px solid #eee;
	border-radius: 4px;
	font-size: 14px;
}

.device-section {
	border-top: 1px solid #eee;
	padding-top: 20px;
}

.device-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
}

.title-text {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.connect-tip {
	font-size: 12px;
	color: #999;
}

.device-item {
	display: flex;
	align-items: center;
	padding: 15px;
	background-color: #f8f8f8;
	border-radius: 8px;
}

.device-icon {
	width: 40px;
	height: 40px;
	margin-right: 12px;
}

.device-info {
	flex: 1;
}

.device-name {
	font-size: 14px;
	color: #333;
	margin-bottom: 4px;
}

.device-status {
	font-size: 12px;
	color: #999;
}

.connect-btn {
	padding: 6px 12px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 15px;
	font-size: 12px;
}

.save-btn {
	width: 100%;
	height: 44px;
	line-height: 44px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 22px;
	font-size: 16px;
}
</style> 