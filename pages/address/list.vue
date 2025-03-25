<template>
	<view class="container">
		<!-- 地址列表 -->
		<view class="address-list">
			<view class="address-item" v-for="(address, index) in addresses" :key="index" @tap="handleAddressClick(address)">
				<view class="address-info">
					<view class="user-info">
						<text class="name">{{ address.name }}</text>
						<text class="phone">{{ address.phone }}</text>
					</view>
					<text class="address">{{ address.address }}</text>
					<text class="tag" v-if="address.tag">{{ address.tag }}</text>
				</view>
				<view class="address-actions">
					<view class="action-item" @tap.stop="editAddress(address)">
						<image src="/static/icons/address/edit.png" class="action-icon"/>
						<text class="action-text">编辑</text>
					</view>
					<view class="action-item" @tap.stop="deleteAddress(address)">
						<image src="/static/icons/address/delete.png" class="action-icon"/>
						<text class="action-text">删除</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="addresses.length === 0">
			<image src="/static/icons/address/empty.png" class="empty-icon"/>
			<text class="empty-text">暂无地址，请添加</text>
		</view>
		
		<!-- 添加地址按钮 -->
		<button class="add-btn" @tap="addAddress">+ 新增地址</button>
	</view>
</template>

<script>
	
import config from '@/common/config.js';
const rb = config.resourceBase;

export default {
	name: 'address-list',
	data() {
		return {
			addresses: [
				{
					id: 1,
					name: '张三',
					phone: '13800138000',
					address: '北京市朝阳区某某小区1号楼2单元303室',
					tag: '家'
				},
				{
					id: 2,
					name: '李四',
					phone: '13900139000',
					address: '北京市海淀区某某大厦B座1802室',
					tag: '公司'
				}
			],
			isSelectMode: false
		}
	},
	onLoad(options) {
		// 判断是否是选择地址模式
		this.isSelectMode = options.select === 'true'
	},
	methods: {
		handleAddressClick(address) {
			if (this.isSelectMode) {
				// 选择地址模式，返回地址信息
				const pages = getCurrentPages()
				const prevPage = pages[pages.length - 2]
				if (prevPage) {
					prevPage.$vm.selectedAddress = address
					uni.navigateBack()
				}
			}
		},
		addAddress() {
			// 跳转到添加地址页面
			uni.showToast({
				title: '跳转到添加地址页面',
				icon: 'none'
			})
		},
		editAddress(address) {
			// 跳转到编辑地址页面
			uni.showToast({
				title: '跳转到编辑地址页面',
				icon: 'none'
			})
		},
		deleteAddress(address) {
			uni.showModal({
				title: '提示',
				content: '确定要删除这个地址吗？',
				success: (res) => {
					if (res.confirm) {
						// 删除地址
						this.addresses = this.addresses.filter(item => item.id !== address.id)
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		}
	}
}
</script>

<style scoped>
.container {
	padding: 15px;
	padding-bottom: 80px;
	background-color: #f5f5f5;
}

.address-list {
	margin-bottom: 15px;
}

.address-item {
	background-color: #fff;
	border-radius: 8px;
	padding: 15px;
	margin-bottom: 10px;
}

.address-info {
	margin-bottom: 15px;
}

.user-info {
	display: flex;
	margin-bottom: 8px;
}

.name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-right: 15px;
}

.phone {
	font-size: 14px;
	color: #666;
}

.address {
	font-size: 14px;
	color: #333;
	line-height: 1.4;
	margin-bottom: 8px;
}

.tag {
	display: inline-block;
	padding: 2px 8px;
	background-color: #f8f8f8;
	border-radius: 4px;
	font-size: 12px;
	color: #666;
}

.address-actions {
	display: flex;
	justify-content: flex-end;
	border-top: 1px solid #eee;
	padding-top: 15px;
}

.action-item {
	display: flex;
	align-items: center;
	margin-left: 20px;
}

.action-icon {
	width: 16px;
	height: 16px;
	margin-right: 4px;
}

.action-text {
	font-size: 14px;
	color: #666;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 0;
}

.empty-icon {
	width: 100px;
	height: 100px;
	margin-bottom: 15px;
}

.empty-text {
	font-size: 14px;
	color: #999;
}

.add-btn {
	position: fixed;
	left: 15px;
	right: 15px;
	bottom: 15px;
	height: 44px;
	line-height: 44px;
	background-color: #ED5D29;
	color: #fff;
	border-radius: 22px;
	font-size: 16px;
}
</style> 