<template>
	<view class="container">
		<!-- 顶部选项卡 -->
		<view class="tabs">
			<view
				v-for="(tab, index) in tabs"
				:key="index"
				:class="['tab', { active: selectedTab === index }]"
				@click="selectTab(index)"
			>
				{{ tab }}
			</view>
		</view>

		<!-- 商品展示区域 -->
		<view class="product-grid">
			<view class="product-item" v-for="(product, index) in filteredProducts" :key="index" @tap="navigateToDetail(product)">
				<image class="product-image" :src="product.image" />
				<view class="product-info">
					<text class="product-name">{{ product.name }}</text>
					<view class="price-section">
						<text class="current-price">¥{{ product.price }}</text>
						<text class="original-price">¥{{ product.originalPrice }}</text>
					</view>
					<text class="product-sales">月销 {{ product.sales }}+</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { productData } from './productData.js'
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'shop',
	data() {
		return {
			tabs: ['全部', '医护保健', '老年服饰', '老年数码'],
			selectedTab: 0,
			products: Object.values(productData).map(product => ({
				...product,
				image: rb+product.images[0] // 使用第一张图片作为列表展示
			}))
		};
	},
	computed: {
		filteredProducts() {
			let products = this.selectedTab === 0 
				? [...this.products] 
				: this.products.filter(product => product.category === this.tabs[this.selectedTab]);
			
			// 使用Fisher-Yates洗牌算法进行随机排序
			for (let i = products.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[products[i], products[j]] = [products[j], products[i]];
			}
			
			return products;
		}
	},
	methods: {
		selectTab(index) {
			this.selectedTab = index;
		},
		navigateToDetail(product) {
			uni.navigateTo({
				url: `/pages/shop/product-detail?id=${product.id}`
			});
		}
	},
	// 添加created钩子，初始化时打乱products数组顺序
	created() {
		const products = [...this.products];
		for (let i = products.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[products[i], products[j]] = [products[j], products[i]];
		}
		this.products = products;
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
	background-color: #f5f5f5;
}

.tabs {
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-bottom: 15px;
	border-bottom: 1px solid #ddd;
}

.tab {
	padding: 10px 0;
	flex-grow: 1;
	text-align: center;
	color: #333;
	cursor: pointer;
	position: relative;
}

.tab.active {
	color: #007aff;
}

.tab.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	background-color: #007aff;
}

.product-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
}

.product-item {
	width: 43%;
	background-color: white;
	margin-bottom: 15px;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.product-image {
	width: 100%;
	height: 100%;
	aspect-ratio: 1/1;
	border-radius: 10px;
	margin-bottom: 10px;
	object-fit: cover;
}

.product-image image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.product-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
}

.product-name {
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 5px;
	color: #333;
}

.price-section {
	display: flex;
	align-items: baseline;
	margin-bottom: 5px;
}

.current-price {
	font-size: 18px;
	color: #ff4400;
	font-weight: bold;
	margin-right: 8px;
}

.original-price {
	font-size: 14px;
	color: #999;
	text-decoration: line-through;
}

.product-sales {
	font-size: 14px;
	color: #666;
}
</style> 