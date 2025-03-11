<template>
	<view class="chat-container">
		<!-- 聊天记录区域 -->
		<scroll-view class="chat-list" scroll-y :scroll-top="scrollTop" @scrolltolower="loadMore">
			<view class="chat-wrapper">
				<view class="chat-item" v-for="message in currentChat" :key="message.id">
					<view :class="['message-wrapper', message.type]">
						<image v-if="message.type === 'received'" class="avatar" :src="contactAvatar" />
						<view class="message-content">
							<text class="message-text">{{ message.content }}</text>
							<text :class="['message-time', message.type]">{{ message.time }}</text>
						</view>
						<image v-if="message.type === 'sent'" class="avatar" src="/static/icons/video/my-avatar.png" />
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 输入区域 -->
		<view class="input-area">
			<input type="text" class="message-input" v-model="inputMessage" placeholder="输入消息..." />
			<button class="send-btn" @tap="sendMessage">发送</button>
		</view>
	</view>
</template>

<script>
import { chatData } from './chatData.js'

export default {
	data() {
		return {
			contactId: null,
			contactAvatar: '',
			currentChat: [],
			inputMessage: '',
			scrollTop: 0
		}
	},
	onLoad(options) {
		if (options.contactId) {
			this.contactId = parseInt(options.contactId);
			this.contactAvatar = `/static/icons/entertainment/role${this.contactId}.png`;
			this.loadChatHistory();
		}
	},
	methods: {
		loadChatHistory() {
			if (chatData[this.contactId]) {
				this.currentChat = chatData[this.contactId].messages;
				this.$nextTick(() => {
					this.scrollToBottom();
				});
			}
		},
		sendMessage() {
			if (!this.inputMessage.trim()) return;
			
			const newMessage = {
				id: this.currentChat.length + 1,
				type: 'sent',
				content: this.inputMessage,
				time: this.getCurrentTime()
			};
			
			this.currentChat.push(newMessage);
			this.inputMessage = '';
			
			this.$nextTick(() => {
				this.scrollToBottom();
			});
		},
		getCurrentTime() {
			const now = new Date();
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		},
		scrollToBottom() {
			// 模拟一个很大的值来滚动到底部
			this.scrollTop = 99999;
		},
		loadMore() {
			// 实现加载更多历史消息的逻辑
			console.log('加载更多消息');
		}
	}
}
</script>

<style scoped>
.chat-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f5f5f5;
}

.chat-list {
	flex: 1;
	padding: 15px;
}

.chat-wrapper {
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

.chat-item {
	margin-bottom: 15px;
}

.message-wrapper {
	display: flex;
	align-items: flex-start;
	margin-bottom: 10px;
}

.message-wrapper.received {
	justify-content: flex-start;
}

.message-wrapper.sent {
	justify-content: flex-end;
}

.avatar {
	width: 40px;
	height: 40px;
	border-radius: 20px;
	margin: 0 10px;
}

.message-content {
	max-width: 70%;
	display: flex;
	flex-direction: column;
}

.message-text {
	padding: 10px 15px;
	border-radius: 12px;
	font-size: 14px;
	line-height: 1.4;
	word-break: break-all;
}

.received .message-text {
	background-color: #fff;
	color: #333;
}

.sent .message-text {
	background-color: #ED5D29;
	color: #fff;
}

.message-time {
	font-size: 12px;
	color: #999;
	margin-top: 5px;
}

.message-time.received {
	align-self: flex-start;
}

.message-time.sent {
	align-self: flex-end;
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
	padding: 0 15px;
	border-radius: 18px;
	background-color: #f5f5f5;
	font-size: 14px;
	margin-right: 10px;
}

.send-btn {
	width: 70px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 18px;
	font-size: 14px;
}
</style> 