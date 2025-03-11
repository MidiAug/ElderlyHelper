<template>
	<view class="container">
		<!-- 顶部搜索 -->
		<view class="search-box">
			<input type="text" placeholder="请输入症状或疾病" class="search-input"/>
			<button class="search-btn">搜索</button>
		</view>
		
		<!-- 科室分类 -->
		<view class="department-section">
			<view class="section-title">常见科室</view>
			<view class="department-grid">
				<view class="department-item" v-for="(dept, index) in departments" :key="index" @tap="selectDepartment(dept)">
					<image :src="dept.icon" class="dept-icon"/>
					<text class="dept-name">{{ dept.name }}</text>
				</view>
			</view>
		</view>
		
		<!-- 在线医生 -->
		<view class="doctor-section">
			<view class="section-title">推荐医生</view>
			<view class="doctor-list">
				<view class="doctor-item" v-for="(doctor, index) in doctors" :key="index" @tap="consultDoctor(doctor)">
					<image :src="doctor.avatar" class="doctor-avatar"/>
					<view class="doctor-info">
						<text class="doctor-name">{{ doctor.name }}</text>
						<text class="doctor-title">{{ doctor.title }}</text>
						<text class="doctor-dept">{{ doctor.department }}</text>
					</view>
					<button class="consult-btn">咨询</button>
				</view>
			</view>
		</view>
		
		<!-- 健康资讯 -->
		<view class="news-section">
			<view class="section-title">健康资讯</view>
			<view class="news-list">
				<view class="news-item" v-for="(news, index) in healthNews" :key="index" @tap="readNews(news)">
					<text class="news-title">{{ news.title }}</text>
					<text class="news-brief">{{ news.brief }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'medical',
	data() {
		return {
			departments: [
				{ name: '内科', icon: '/static/icons/medical/internal.svg' },
				{ name: '外科', icon: '/static/icons/medical/surgery.svg' },
				{ name: '骨科', icon: '/static/icons/medical/bone.svg' },
				{ name: '心内科', icon: '/static/icons/medical/heart.svg' },
				{ name: '神经内科', icon: '/static/icons/medical/nerve.svg' },
				{ name: '眼科', icon: '/static/icons/medical/eye.svg' },
				{ name: '口腔科', icon: '/static/icons/medical/dental.svg' },
				{ name: '康复科', icon: '/static/icons/medical/rehabilitation.svg' }
			],
			doctors: [
				{
					name: '张医生',
					title: '主任医师',
					department: '内科',
					avatar: '/static/images/medical/doctor1.png'
				},
				{
					name: '李医生',
					title: '副主任医师',
					department: '骨科',
					avatar: '/static/images/medical/doctor2.png'
				},
				{
					name: '王医生',
					title: '主任医师',
					department: '心内科',
					avatar: '/static/images/medical/doctor3.png'
				}
			],
			healthNews: [
				{
					title: '老年人高血压饮食指南',
					brief: '科学合理的饮食方案，助您控制血压...'
				},
				{
					title: '秋季养生小贴士',
					brief: '秋季养生要点，助您安度秋季...'
				},
				{
					title: '常见慢性病防护措施',
					brief: '预防胜于治疗，养成健康习惯...'
				}
			]
		}
	},
	methods: {
		selectDepartment(dept) {
			uni.navigateTo({
				url: `/pages/medical/department-detail?name=${dept.name}`
			})
		},
		consultDoctor(doctor) {
			uni.navigateTo({
				url: `/pages/medical/doctor-chat?id=${doctor.id}&name=${doctor.name}`
			})
		},
		readNews(news) {
			uni.navigateTo({
				url: `/pages/medical/news-detail?title=${news.title}`
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

.search-box {
	display: flex;
	margin-bottom: 20px;
}

.search-input {
	flex: 1;
	height: 40px;
	padding: 0 15px;
	border: 1px solid #ddd;
	border-radius: 20px;
	margin-right: 10px;
	font-size: 16px;
}

.search-btn {
	width: 80px;
	height: 40px;
	background-color: #007aff;
	color: white;
	border-radius: 20px;
	font-size: 16px;
	line-height: 40px;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 15px;
	color: #333;
}

.department-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 20px;
}

.department-item {
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 15px;
}

.dept-icon {
	width: 40px;
	height: 40px;
	margin-bottom: 5px;
}

.dept-name {
	font-size: 14px;
	color: #333;
}

.doctor-list {
	background-color: white;
	border-radius: 10px;
	padding: 10px;
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

.doctor-dept {
	font-size: 14px;
	color: #999;
}

.consult-btn {
	width: 80px;
	height: 36px;
	background-color: #007aff;
	color: white;
	border-radius: 18px;
	font-size: 14px;
	line-height: 36px;
}

.news-list {
	background-color: white;
	border-radius: 10px;
	padding: 10px;
}

.news-item {
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.news-item:last-child {
	border-bottom: none;
}

.news-title {
	font-size: 16px;
	color: #333;
	margin-bottom: 5px;
}

.news-brief {
	font-size: 14px;
	color: #666;
	line-height: 1.4;
}
</style> 