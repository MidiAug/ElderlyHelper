<template>
	<view class="container">
		<!-- 助手头像和问候语 -->
		<view class="assistant-header">
			<image src="/static/icons/assistant/avatar.png" class="assistant-avatar"/>
			<view class="greeting">
				<text class="greeting-text">您好，我是您的智能助手</text>
				<text class="greeting-sub">有什么可以帮您的吗？</text>
			</view>
		</view>
		
		<!-- 快捷功能区 -->
		<view class="quick-actions">
			<view class="action-item" v-for="(action, index) in quickActions" :key="index" @tap="handleAction(action)">
				<image :src="action.icon" class="action-icon"/>
				<text class="action-name">{{ action.name }}</text>
			</view>
		</view>
		
		<!-- 常见问题 -->
		<view class="faq-section">
			<view class="section-title">常见问题</view>
			<view class="faq-list">
				<view class="faq-item" v-for="(faq, index) in displayedFaqs" :key="index" @tap="askQuestion(faq)">
					<text class="faq-text">{{ faq.question }}</text>
					<image src="/static/icons/assistant/arrow.png" class="arrow-icon"/>
				</view>
			</view>
		</view>

		<!-- 对话区域 -->
		<scroll-view class="chat-area" scroll-y :scroll-top="scrollTop" v-if="showAnswer">
			<view class="chat-content">
				<view class="chat-item">
					<text class="question-text">{{ currentQuestion }}</text>
					<text class="answer-text">{{ currentAnswer }}</text>
				</view>
			</view>
		</scroll-view>
		
		<!-- 语音输入按钮 -->
		<view class="voice-input">
			<button class="voice-btn" @touchstart="startVoiceInput" @touchend="endVoiceInput">
				<image src="/static/icons/assistant/voice.png" class="voice-icon"/>
				<text>按住说话</text>
			</button>
		</view>
		
		<!-- 文字输入区 -->
		<view class="text-input">
			<input type="text" v-model="inputText" placeholder="输入您的问题" class="input-box"/>
			<button class="send-btn" @tap="sendQuestion">发送</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputText: '',
			showAnswer: false,
			currentQuestion: '',
			currentAnswer: '',
			scrollTop: 0,
			quickActions: [
				{ name: '天气查询', icon: '/static/icons/assistant/weather.png' },
				{ name: '闹钟提醒', icon: '/static/icons/assistant/alarm.png' },
				{ name: '生活服务', icon: '/static/icons/assistant/service.png' },
				{ name: '紧急求助', icon: '/static/icons/assistant/emergency.png' }
			],
			displayedFaqs: [],
			allFaqs: [
				{
					question: '如何调整手机字体大小？',
					answer: '1. 打开手机设置\n2. 找到"显示"或"显示与亮度"\n3. 点击"字体大小"\n4. 拖动滑块调整字体大小\n5. 找到适合您的大小后点击确定'
				},
				{
					question: '如何设置紧急联系人？',
					answer: '1. 打开APP的"个人中心"\n2. 点击"紧急联系人设置"\n3. 点击"添加联系人"\n4. 从通讯录选择或手动输入\n5. 可以设置多个紧急联系人'
				},
				{
					question: '如何预约上门服务？',
					answer: '1. 点击首页"家庭服务"\n2. 选择需要的服务类型\n3. 选择服务时间和地点\n4. 填写具体需求\n5. 确认订单并支付'
				},
				{
					question: '怎么查看健康数据？',
					answer: '1. 点击首页"健康监测"\n2. 可以查看血压、心率等数据\n3. 点击具体项目查看历史记录\n4. 支持数据导出和分享给家人'
				},
				{
					question: '如何参加线上课程？',
					answer: '1. 点击首页"养生课堂"\n2. 选择感兴趣的课程\n3. 点击"立即观看"\n4. 可以实时互动和提问'
				},
				{
					question: '忘记密码怎么办？',
					answer: '1. 点击登录页面的"忘记密码"\n2. 输入注册手机号\n3. 获取验证码\n4. 设置新密码\n5. 使用新密码登录'
				},
				{
					question: '如何联系客服？',
					answer: '1. 点击"个人中心"\n2. 找到"联系客服"\n3. 可以选择在线咨询或拨打客服电话\n4. 服务时间：周一至周日 8:00-22:00'
				},
				{
					question: '如何添加常用地址？',
					answer: '1. 进入"个人中心"\n2. 点击"地址管理"\n3. 点击"新增地址"\n4. 填写详细信息\n5. 可以设置为默认地址'
				},
				{
					question: '如何查看附近医院？',
					answer: '1. 点击首页"老友问医"\n2. 允许获取位置信息\n3. 查看周边医院列表\n4. 可以筛选科室和距离\n5. 支持导航功能'
				},
				{
					question: '如何使用语音助手？',
					answer: '1. 点击底部的语音按钮\n2. 按住说出您的问题\n3. 松开后自动识别\n4. 等待助手回答\n5. 支持普通话和方言'
				},
				{
					question: '如何分享内容给家人？',
					answer: '1. 找到想分享的内容\n2. 点击分享图标\n3. 选择分享方式\n4. 可以发送给微信好友或家人群'
				},
				{
					question: '如何设置用药提醒？',
					answer: '1. 进入"健康监测"\n2. 点击"用药提醒"\n3. 添加新的提醒\n4. 设置用药时间和剂量\n5. 开启提醒通知'
				},
				{
					question: '如何参与互动活动？',
					answer: '1. 查看首页"活动通知"\n2. 选择感兴趣的活动\n3. 点击"我要参加"\n4. 填写参与信息\n5. 等待活动开始'
				},
				{
					question: '如何查看订单状态？',
					answer: '1. 进入"个人中心"\n2. 点击"我的订单"\n3. 可以查看所有订单\n4. 点击订单查看详情\n5. 支持取消和退款操作'
				},
				{
					question: '如何保存重要文章？',
					answer: '1. 打开想保存的文章\n2. 点击右上角收藏图标\n3. 可以添加到收藏夹\n4. 在"个人中心"查看收藏'
				},
				{
					question: '如何调整显示效果？',
					answer: '1. 进入"设置"\n2. 点击"显示设置"\n3. 可以调整亮度\n4. 可以更换主题色\n5. 可以设置深色模式'
				},
				{
					question: '如何反馈问题？',
					answer: '1. 进入"个人中心"\n2. 点击"意见反馈"\n3. 选择问题类型\n4. 描述具体问题\n5. 可以附加截图'
				},
				{
					question: '如何开启消息提醒？',
					answer: '1. 进入"设置"\n2. 点击"消息通知"\n3. 选择需要提醒的项目\n4. 设置提醒方式\n5. 保存设置'
				},
				{
					question: '如何查看学习进度？',
					answer: '1. 进入"养生课堂"\n2. 点击"我的课程"\n3. 查看学习记录\n4. 可以继续上次进度\n5. 支持学习统计'
				},
				{
					question: '如何使用紧急求助？',
					answer: '1. 点击首页"紧急求助"\n2. 选择求助类型\n3. 系统会自动拨打急救电话\n4. 同时通知紧急联系人\n5. 发送当前位置信息'
				}
			]
		}
	},
	onLoad() {
		// 页面加载时初始化问题
		this.shuffleFaqs();
		console.log('Displayed FAQs:', this.displayedFaqs); // 添加调试日志
	},
	onShow() {
		// 每次显示页面时重新随机问题
		this.shuffleFaqs();
		console.log('Reshuffled FAQs:', this.displayedFaqs); // 添加调试日志
	},
	methods: {
		handleAction(action) {
			switch(action.name) {
				case '天气查询':
					this.checkWeather()
					break
				case '闹钟提醒':
					this.setAlarm()
					break
				case '生活服务':
					this.showServices()
					break
				case '紧急求助':
					this.emergency()
					break
			}
		},
		checkWeather() {
			uni.navigateTo({
				url: '/pages/assistant/weather'
			})
		},
		setAlarm() {
			uni.navigateTo({
				url: '/pages/assistant/alarm'
			})
		},
		showServices() {
			uni.navigateTo({
				url: '/pages/assistant/services'
			})
		},
		emergency() {
			uni.showModal({
				title: '紧急求助',
				content: '是否拨打紧急联系人电话？',
				success: (res) => {
					if (res.confirm) {
						// 拨打紧急电话
						uni.makePhoneCall({
							phoneNumber: '120'
						})
					}
				}
			})
		},
		askQuestion(faq) {
			this.currentQuestion = faq.question;
			this.currentAnswer = faq.answer;
			this.showAnswer = true;
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.chat-area').boundingClientRect(data => {
					uni.pageScrollTo({
						scrollTop: data.bottom,
						duration: 300
					});
				}).exec();
			});
		},
		startVoiceInput() {
			// 开始语音输入
			uni.showToast({
				title: '开始语音输入',
				icon: 'none'
			})
		},
		endVoiceInput() {
			// 结束语音输入
			uni.showToast({
				title: '语音输入结束',
				icon: 'none'
			})
		},
		sendQuestion() {
			if (!this.inputText.trim()) {
				uni.showToast({
					title: '请输入问题',
					icon: 'none'
				})
				return
			}
			
			// 发送问题到智能助手
			uni.navigateTo({
				url: `/pages/assistant/chat?question=${encodeURIComponent(this.inputText)}`
			})
			this.inputText = ''
		},
		shuffleFaqs() {
			const shuffled = [...this.allFaqs].sort(() => Math.random() - 0.5);
			this.displayedFaqs = shuffled.slice(0, 5);
			console.log('Shuffling result:', this.displayedFaqs); // 添加调试日志
		}
	}
}
</script>

<style scoped>
.container {
	padding: 20px;
	padding-bottom: 30px; /* 增加底部padding，为固定元素留出空间 */
	background-color: #f5f5f5;
	min-height: 100vh;
	box-sizing: border-box;
}

.assistant-header {
	display: flex;
	align-items: center;
	margin-bottom: 30px;
	background-color: #fff;
	padding: 20px;
	border-radius: 12px;
}

.assistant-avatar {
	width: 60px;
	height: 60px;
	border-radius: 30px;
	margin-right: 15px;
}

.greeting {
	flex: 1;
}

.greeting-text {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 8px;
}

.greeting-sub {
	font-size: 14px;
	color: #666;
	display: block;
}

.quick-actions {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-bottom: 20px;
}

.action-item {
	width: 23%;
	background-color: #fff;
	border-radius: 8px;
	padding: 15px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.action-icon {
	width: 30px;
	height: 30px;
	margin-bottom: 8px;
}

.action-name {
	font-size: 14px;
	color: #333;
}

.section-title {
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 15px;
	color: #333;
}

.faq-list {
	background-color: #fff;
	border-radius: 12px;
	padding: 0 15px;
}

.faq-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 0;
	border-bottom: 1px solid #eee;
}

.faq-item:last-child {
	border-bottom: none;
}

.faq-text {
	font-size: 14px;
	color: #333;
}

.arrow-icon {
	width: 16px;
	height: 16px;
}

.voice-input {
	margin: 20px 0;
	margin-bottom: 80px; /* 增加底部margin，避免被输入框遮挡 */
	display: flex;
	justify-content: center;
}

.voice-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
	height: 50px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 25px;
	font-size: 16px;
}

.voice-icon {
	width: 24px;
	height: 24px;
	margin-right: 8px;
}

.text-input {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	padding: 20px;
	background-color: #f5f5f5; /* 添加背景色 */
	border-top: 1px solid #eee; /* 添加顶部边框 */
	z-index: 100; /* 确保在最上层 */
}

.input-box {
	flex: 1;
	height: 40px;
	background-color: #fff;
	border-radius: 20px;
	padding: 0 15px;
	margin-right: 10px;
	font-size: 14px;
}

.send-btn {
	width: 70px;
	height: 40px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 20px;
	font-size: 14px;
	line-height: 40px;
}

.chat-area {
	background-color: #fff;
	border-radius: 12px;
	padding: 15px;
	margin: 20px 0;
	max-height: 300px;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	width: 100%; 
	box-sizing: border-box;
}

.chat-item {
	margin-bottom: 15px;
	width: 100%;
}

.question-text {
	font-size: 15px;
	color: #333;
	background-color: #f5f5f5;
	padding: 10px;
	border-radius: 8px;
	display: block;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
	word-break: break-all; /* 添加文字换行 */
}

.answer-text {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
	padding: 10px;
	background-color: #f8f8f8;
	border-radius: 8px;
	display: block;
	white-space: pre-line;
	width: 100%;
	box-sizing: border-box;
	word-break: break-all; /* 添加文字换行 */
}

.chat-content {
	width: 100%;
}
</style> 