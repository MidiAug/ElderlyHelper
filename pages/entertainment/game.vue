<template>
	<view class="container">
		<view class="game-header">
			<text class="game-title">{{ gameName }}</text>
		</view>
		<view class="game-content">
			<image class="coming-soon" src="/static/images/entertainment/coming-soon.png" mode="aspectFit"></image>
			<text class="message">游戏开发中，敬请期待...</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			gameName: ''
		}
	},
	onLoad(options) {
		if (options.name) {
			this.gameName = options.name
			uni.setNavigationBarTitle({
				title: this.gameName
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

.game-header {
	padding: 20px;
	background-color: #fff;
	border-bottom: 1px solid #eee;
}

.game-title {
	font-size: 20px;
	font-weight: bold;
	color: #333;
}

.game-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
}

.coming-soon {
	width: 200px;
	height: 200px;
	margin-bottom: 20px;
}

.message {
	font-size: 16px;
	color: #666;
	text-align: center;
}
</style> 