<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<input type="text" v-model="searchKey" placeholder="搜索服务" class="search-input"/>
		</view>
		
		<!-- 服务分类 -->
		<view class="category-section">
			<scroll-view scroll-x class="category-scroll">
				<view class="category-list">
					<view class="category-item" v-for="(category, index) in categories" :key="index"
						:class="{ active: currentCategory === category.id }" @tap="selectCategory(category)">
						{{ category.name }}
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 服务列表 -->
		<view class="service-list">
			<view class="service-item" v-for="(service, index) in filteredServices" :key="index" @tap="bookService(service)">
				<image :src="service.image" class="service-image"/>
				<view class="service-info">
					<text class="service-name">{{ service.name }}</text>
					<text class="service-desc">{{ service.description }}</text>
					<view class="service-footer">
						<view class="price-section">
							<text class="price">¥{{ service.price }}</text>
							<text class="unit">/{{ service.unit }}</text>
						</view>
						<text class="order-count">已预约{{ service.orderCount }}次</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'service-list',
	data() {
		return {
			searchKey: '',
			currentCategory: 'all',
			categories: [
				{ id: 'all', name: '全部' },
				{ id: 'clean', name: '保洁服务' },
				{ id: 'care', name: '生活照料' },
				{ id: 'medical', name: '医疗陪护' },
				{ id: 'meal', name: '助餐服务' }
			],
			services: [
				{
					id: 1,
					name: '日常保洁',
					description: '专业保洁人员上门服务，包含房间清洁、卫生打扫等',
					price: 80,
					unit: '次',
					orderCount: 258,
					category: 'clean',
					image: '/static/images/service/clean.png'
				},
				{
					id: 2,
					name: '生活照料',
					description: '专业护工提供生活照料服务，包含洗漱、穿衣等日常照料',
					price: 100,
					unit: '小时',
					orderCount: 186,
					category: 'care',
					image: '/static/images/service/care.png'
				},
				{
					id: 3,
					name: '医疗陪护',
					description: '专业护理人员陪同就医、取药等医疗相关服务',
					price: 150,
					unit: '次',
					orderCount: 126,
					category: 'medical',
					image: '/static/images/service/medical.png'
				}
			]
		}
	},
	computed: {
		filteredServices() {
			return this.services.filter(service => {
				const matchCategory = this.currentCategory === 'all' || service.category === this.currentCategory
				const matchSearch = !this.searchKey || 
					service.name.includes(this.searchKey) || 
					service.description.includes(this.searchKey)
				return matchCategory && matchSearch
			})
		}
	},
	methods: {
		selectCategory(category) {
			this.currentCategory = category.id
		},
		bookService(service) {
			uni.navigateTo({
				url: `/pages/service/booking?id=${service.id}`
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

.search-bar {
	margin-bottom: 15px;
}

.search-input {
	width: 100%;
	height: 40px;
	padding: 0 15px;
	background-color: #fff;
	border-radius: 20px;
	font-size: 14px;
}

.category-section {
	margin-bottom: 15px;
}

.category-scroll {
	white-space: nowrap;
}

.category-list {
	display: inline-flex;
	padding: 5px 0;
}

.category-item {
	padding: 8px 20px;
	margin-right: 10px;
	background-color: #fff;
	border-radius: 20px;
	font-size: 14px;
	color: #666;
}

.category-item.active {
	background-color: #ED5D29;
	color: #fff;
}

.service-list {
	margin-bottom: 15px;
}

.service-item {
	display: flex;
	padding: 15px;
	background-color: #fff;
	border-radius: 8px;
	margin-bottom: 10px;
}

.service-image {
	width: 100px;
	height: 100px;
	border-radius: 8px;
	margin-right: 15px;
}

.service-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.service-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 8px;
}

.service-desc {
	font-size: 14px;
	color: #666;
	margin-bottom: 8px;
	line-height: 1.4;
}

.service-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.price-section {
	display: flex;
	align-items: baseline;
}

.price {
	font-size: 20px;
	font-weight: bold;
	color: #ED5D29;
}

.unit {
	font-size: 14px;
	color: #999;
	margin-left: 2px;
}

.order-count {
	font-size: 12px;
	color: #999;
}
</style> 