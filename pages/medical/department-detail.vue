<template>
	<view class="container">
		<view class="department-info">
			<view class="department-header">
				<text class="department-name">{{ departmentName }}</text>
				<text class="department-desc">专业医疗团队为您服务</text>
			</view>
		</view>
		
		<!-- 医生列表 -->
		<view class="doctor-list">
			<view class="section-title">科室医生</view>
			<view class="doctor-item" v-for="(doctor, index) in doctors" :key="index" @tap="consultDoctor(doctor)">
				<image :src="doctor.avatar" class="doctor-avatar"/>
				<view class="doctor-info">
					<text class="doctor-name">{{ doctor.name }}</text>
					<text class="doctor-title">{{ doctor.title }}</text>
					<text class="doctor-specialty">{{ doctor.specialty }}</text>
				</view>
				<button class="consult-btn">问诊</button>
			</view>
		</view>
		
		<!-- 科室简介 -->
		<view class="intro-section">
			<view class="section-title">科室简介</view>
			<text class="intro-text">{{ departmentIntro }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'department-detail',
	data() {
		return {
			departmentName: '',
			doctors: [
				{
					name: '张医生',
					title: '主任医师',
					specialty: '擅长：高血压、冠心病等慢性病诊治',
					avatar: '/static/images/medical/doctor1.png'
				},
				{
					name: '李医生',
					title: '副主任医师',
					specialty: '擅长：糖尿病、内分泌疾病诊治',
					avatar: '/static/images/medical/doctor2.png'
				}
			],
			departmentIntro: '本科室是医院重点专科，拥有一支技术精湛、经验丰富的专业医疗团队。科室设备先进，诊疗环境舒适，致力于为患者提供优质的医疗服务。'
		}
	},
	onLoad(options) {
		if (options.name) {
			this.departmentName = options.name
			uni.setNavigationBarTitle({
				title: this.departmentName
			})
		}
	},
	methods: {
		consultDoctor(doctor) {
			uni.navigateTo({
				url: `/pages/medical/doctor-chat?id=${doctor.id}`
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

.department-info {
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
	margin-bottom: 15px;
}

.department-header {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.department-name {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	margin-bottom: 10px;
}

.department-desc {
	font-size: 16px;
	color: #666;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin: 15px 0;
}

.doctor-list {
	background-color: #fff;
	border-radius: 8px;
	padding: 15px;
	margin-bottom: 15px;
}

.doctor-item {
	display: flex;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.doctor-item:last-child {
	border-bottom: none;
}

.doctor-avatar {
	width: 60px;
	height: 60px;
	border-radius: 30px;
	margin-right: 15px;
}

.doctor-info {
	flex: 1;
}

.doctor-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 5px;
}

.doctor-title {
	font-size: 14px;
	color: #666;
	margin-bottom: 5px;
}

.doctor-specialty {
	font-size: 14px;
	color: #999;
}

.consult-btn {
	width: 80px;
	height: 36px;
	line-height: 36px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 18px;
	font-size: 14px;
}

.intro-section {
	background-color: #fff;
	border-radius: 8px;
	padding: 15px;
}

.intro-text {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
}
</style> 