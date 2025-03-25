<template>
	<view class="container">
		<!-- 用户信息 -->
		<view class="user-info">
			<image class="avatar" src="/static/icons/profile/avatar.png" />
			<view class="user-details">
				<text class="username">老王</text>
				<text class="user-id">ID: 888888</text>
			</view>
		</view>

		<!-- 功能区域 -->
		<view class="section">
			<text class="section-title">我的服务</text>
			<view class="function-grid">
				<view class="function-item" v-for="(item, index) in functions" :key="index" @click="handleFunction(item)">
					<image class="function-icon" :src="`/static/icons/profile/${index + 1}.png`" />
					<text class="function-text">{{ item.name }}</text>
				</view>
			</view>
		</view>

		<!-- 设置选项 -->
		<view class="section">
			<text class="section-title">设置</text>
			<view class="settings">
				<view class="setting-item" v-for="(setting, index) in settings" :key="index" @click="handleSetting(setting)">
					<view class="setting-left">
						<image class="setting-icon" :src="`/static/icons/profile/${index + 11}.png`" />
						<text class="setting-text">{{ setting.name }}</text>
					</view>
					<image class="arrow-icon" src="/static/icons/arrow.png" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>

import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'profile',
	data() {
		return {
			functions: [
				{ name: '我的订单', icon: rb + '/icons/profile/1.png' },
				{ name: '我的收藏', icon: rb + '/icons/profile/2.png' },
				{ name: '联系客服', icon: rb + '/icons/profile/3.png' }
			],
			settings: [
				{ name: '个人信息', icon: rb + '/icons/profile/11.png' },
				{ name: '消息通知', icon: rb + '/icons/profile/12.png' },
				{ name: '隐私设置', icon: rb + '/icons/profile/13.png' },
				{ name: '帮助中心', icon: rb + '/icons/profile/14.png' }
			]
		};
	},
	methods: {
		handleFunction(item) {
			console.log('Function clicked:', item.name);
		},
		handleSetting(setting) {
			console.log('Setting clicked:', setting.name);
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
	background-color: #f5f5f5;
}

.user-info {
	display: flex;
	align-items: center;
	width: 100%;
	padding: 20px;
	background-color: white;
	margin-bottom: 20px;
	border-radius: 15px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar {
	width: 80px;
	height: 80px;
	border-radius: 40px;
	margin-right: 20px;
	border: 2px solid #f0f0f0;
}

.user-details {
	display: flex;
	flex-direction: column;
}

.username {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	margin-bottom: 5px;
}

.user-id {
	font-size: 16px;
	color: #666;
}

.section {
	width: 100%;
	background-color: white;
	margin-bottom: 20px;
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 20px;
	font-weight: bold;
	margin: 20px 0;
	color: #333;
	text-align: center;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.section-title:before, .section-title:after {
	content: '';
	flex: 0.1;
	height: 1px;
	background-color: #333;
	margin: 0 10px;
}

.function-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10px 0;
}

.function-item {
	width: 23%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
	padding: 15px 5px;
	background-color: #f8f8f8;
	border-radius: 10px;
}

.function-icon {
	width: 40px;
	height: 40px;
	margin-bottom: 10px;
}

.function-text {
	font-size: 16px;
	color: #333;
	text-align: center;
}

.settings {
	width: 100%;
}

.setting-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 10px;
	border-bottom: 1px solid #eee;
}

.setting-item:last-child {
	border-bottom: none;
}

.setting-left {
	display: flex;
	align-items: center;
}

.setting-icon {
	width: 24px;
	height: 24px;
	margin-right: 15px;
}

.setting-text {
	font-size: 18px;
	color: #333;
}

.arrow-icon {
	width: 20px;
	height: 20px;
}
</style> 