<template>
	<view class="container">
		<!-- 医生信息 -->
		<view class="doctor-info">
			<image :src="doctor.avatar" class="doctor-avatar"/>
			<view class="doctor-details">
				<text class="doctor-name">{{ doctor.name }}</text>
				<text class="doctor-title">{{ doctor.title }}</text>
				<text class="doctor-dept">{{ doctor.department }}</text>
			</view>
		</view>
		
		<!-- 聊天区域 -->
		<scroll-view class="chat-area" scroll-y :scroll-top="scrollTop">
			<view class="message-list">
				<view v-for="(msg, index) in messages" :key="index" 
					:class="['message-item', msg.type === 'send' ? 'message-send' : 'message-receive']">
					<image :src="msg.type === 'send' ? userAvatar : doctor.avatar" class="message-avatar"/>
					<view class="message-content">
						<text class="message-text">{{ msg.content }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 输入区域 -->
		<view class="input-area">
			<input type="text" v-model="inputMessage" class="message-input" 
				placeholder="请输入消息" @confirm="sendMessage"/>
			<button class="send-btn" @tap="sendMessage">发送</button>
		</view>
	</view>
</template>

<script>
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'doctor-chat',
	data() {
		return {
			doctor: {
				name: '张医生',
				title: '主任医师',
				department: '内科',
				avatar: rb + '/images/medical/doctor1.png'
			},
			userAvatar: rb + '/icons/profile/avatar.png',
			messages: [
				{
					type: 'receive',
					content: '您好，我是张医生，请问有什么可以帮您？'
				}
			],
			inputMessage: '',
			scrollTop: 0
		}
	},
	methods: {
		sendMessage() {
			if (!this.inputMessage.trim()) return
			
			// 添加发送的消息
			this.messages.push({
				type: 'send',
				content: this.inputMessage
			})
			
			// 清空输入框
			this.inputMessage = ''
			
			// 自动回复
			setTimeout(() => {
				this.messages.push({
					type: 'receive',
					content: '好的，我明白了。建议您详细描述一下症状，这样我可以更好地为您诊断。'
				})
				this.scrollToBottom()
			}, 1000)
			
			this.scrollToBottom()
		},
		scrollToBottom() {
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				query.select('.message-list').boundingClientRect(data => {
					this.scrollTop = data.height
				}).exec()
			})
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f5f5f5;
}

.doctor-info {
	display: flex;
	align-items: center;
	padding: 15px;
	background-color: #fff;
	border-bottom: 1px solid #eee;
}

.doctor-avatar {
	width: 50px;
	height: 50px;
	border-radius: 25px;
	margin-right: 12px;
}

.doctor-details {
	flex: 1;
}

.doctor-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 4px;
}

.doctor-title {
	font-size: 14px;
	color: #666;
	margin-bottom: 2px;
}

.doctor-dept {
	font-size: 14px;
	color: #999;
}

.chat-area {
	flex: 1;
	padding: 15px;
}

.message-list {
	display: flex;
	flex-direction: column;
}

.message-item {
	display: flex;
	margin-bottom: 15px;
}

.message-send {
	flex-direction: row-reverse;
}

.message-avatar {
	width: 40px;
	height: 40px;
	border-radius: 20px;
}

.message-content {
	max-width: 70%;
	margin: 0 12px;
	padding: 10px 15px;
	border-radius: 8px;
	background-color: #fff;
}

.message-send .message-content {
	background-color: #ED5D29;
}

.message-text {
	font-size: 14px;
	color: #333;
	line-height: 1.4;
}

.message-send .message-text {
	color: #fff;
}

.input-area {
	display: flex;
	padding: 10px 15px;
	background-color: #fff;
	border-top: 1px solid #eee;
}

.message-input {
	flex: 1;
	height: 36px;
	padding: 0 12px;
	border: 1px solid #ddd;
	border-radius: 18px;
	margin-right: 10px;
	font-size: 14px;
}

.send-btn {
	width: 70px;
	height: 36px;
	line-height: 36px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 18px;
	font-size: 14px;
}
</style> 