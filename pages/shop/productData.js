export const productData = {
	1: {
		id: 1,
		name: '智能血压计',
		price: 299,
		originalPrice: 399,
		sales: 1000,
		category: '医护保健',
		images: ['/static/pictures/shop/goods1.png'],
		details: [
			{ label: '品牌', value: '康福医疗' },
			{ label: '型号', value: 'BP-2023' },
			{ label: '测量方式', value: '上臂式' },
			{ label: '精确度', value: '±3mmHg' },
			{ label: '电池类型', value: 'AA电池×4' },
			{ label: '显示方式', value: '大字体LCD显示' },
			{ label: '存储容量', value: '可存储100组数据' }
		],
		recommendations: [
			'特大数字显示屏，清晰易读',
			'一键操作，简单方便',
			'语音播报功能，适合视力不佳的老年人',
			'自动存储记录，方便查看历史数据',
			'智能判断血压等级，提供健康建议'
		]
	},
	2: {
		id: 2,
		name: '便携式雾化器',
		price: 199,
		originalPrice: 299,
		sales: 800,
		category: '医护保健',
		images: ['/static/pictures/shop/goods2.png'],
		details: [
			{ label: '品牌', value: '呼吸康' },
			{ label: '型号', value: 'NB-2023' },
			{ label: '雾化方式', value: '超声波雾化' },
			{ label: '雾化效率', value: '≥0.2ml/min' },
			{ label: '电池容量', value: '1200mAh' },
			{ label: '噪音', value: '≤45分贝' },
			{ label: '使用时长', value: '连续使用4小时' }
		],
		recommendations: [
			'静音设计，使用舒适',
			'便携小巧，随时使用',
			'USB充电，方便实用',
			'操作简单，一键启动',
			'安全可靠，自动断电保护'
		]
	},
	3: {
		id: 3,
		name: '老年人助听器',
		price: 599,
		originalPrice: 799,
		sales: 500,
		category: '医护保健',
		images: ['/static/pictures/shop/goods3.png'],
		details: [
			{ label: '品牌', value: '声丽' },
			{ label: '型号', value: 'HA-2023' },
			{ label: '佩戴方式', value: '耳道式' },
			{ label: '电池类型', value: '锂电池充电' },
			{ label: '降噪等级', value: '4级智能降噪' },
			{ label: '防水等级', value: 'IPX4' },
			{ label: '使用时长', value: '连续使用8小时' }
		],
		recommendations: [
			'智能降噪，声音清晰',
			'充电方便，续航持久',
			'佩戴舒适，隐形美观',
			'防水防汗，日常防护',
			'一键操作，简单易用'
		]
	},
	4: {
		id: 4,
		name: '按摩足浴盆',
		price: 259,
		originalPrice: 359,
		sales: 1200,
		category: '医护保健',
		images: ['/static/pictures/shop/goods4.png'],
		details: [
			{ label: '品牌', value: '养足堂' },
			{ label: '型号', value: 'FT-2023' },
			{ label: '容量', value: '6L' },
			{ label: '加热功率', value: '500W' },
			{ label: '按摩方式', value: '气泡+滚轮按摩' },
			{ label: '温度范围', value: '35-45℃可调' },
			{ label: '定时功能', value: '10-60分钟可调' }
		],
		recommendations: [
			'深桶设计，足浴更舒适',
			'恒温加热，水温适宜',
			'气泡按摩，缓解疲劳',
			'一键操作，简单方便',
			'安全防漏，使用放心'
		]
	},
	5: {
		id: 5,
		name: '中老年钙片',
		price: 128,
		originalPrice: 168,
		sales: 2000,
		category: '医护保健',
		images: ['/static/pictures/shop/goods5.png'],
		details: [
			{ label: '品牌', value: '健康优选' },
			{ label: '规格', value: '60片/瓶' },
			{ label: '成分', value: '碳酸钙,维生素D3' },
			{ label: '适用人群', value: '中老年人' },
			{ label: '保质期', value: '24个月' },
			{ label: '服用方法', value: '每日1-2片' },
			{ label: '储存方法', value: '密封避光保存' }
		],
		recommendations: [
			'优质钙源，易被吸收',
			'添加维生素D，促进钙吸收',
			'小片剂型，易于吞服',
			'密封包装，保质保鲜',
			'专为老年人设计配方'
		]
	},
	6: {
		id: 6,
		name: '红外理疗仪',
		price: 399,
		originalPrice: 499,
		sales: 600,
		category: '医护保健',
		images: ['/static/pictures/shop/goods6.png'],
		details: [
			{ label: '品牌', value: '康复佳' },
			{ label: '型号', value: 'IR-2023' },
			{ label: '功率', value: '50W' },
			{ label: '波长', value: '780-1400nm' },
			{ label: '治疗范围', value: '30平方厘米' },
			{ label: '定时功能', value: '15-30分钟可调' },
			{ label: '安全认证', value: 'CE认证' }
		],
		recommendations: [
			'深层热疗，缓解疼痛',
			'智能控温，安全可靠',
			'大面积照射，效果更好',
			'定时提醒，使用安全',
			'便携设计，家用理疗'
		]
	},
	7: {
		id: 7,
		name: '中老年保暖内衣',
		price: 159,
		originalPrice: 199,
		sales: 1500,
		category: '老年服饰',
		images: ['/static/pictures/shop/goods7.png'],
		details: [
			{ label: '品牌', value: '暖馨' },
			{ label: '材质', value: '纯棉+加绒' },
			{ label: '尺码', value: 'L-XXXL' },
			{ label: '颜色', value: '灰色/藏青色' },
			{ label: '适用季节', value: '秋冬季' },
			{ label: '工艺', value: '无缝贴身' },
			{ label: '洗涤说明', value: '30℃温和洗涤' }
		],
		recommendations: [
			'加厚保暖，温暖舒适',
			'纯棉面料，亲肤透气',
			'松紧适中，贴身不勒',
			'无缝设计，穿着舒适',
			'多尺码选择，适合各类身材'
		]
	},
	8: {
		id: 8,
		name: '老年人加厚棉服',
		price: 299,
		originalPrice: 399,
		sales: 800,
		category: '老年服饰',
		images: ['/static/pictures/shop/goods8.png'],
		details: [
			{ label: '品牌', value: '暖冬' },
			{ label: '材质', value: '聚酯纤维+羽绒' },
			{ label: '填充物', value: '90%白鸭绒' },
			{ label: '尺码', value: 'M-XXXL' },
			{ label: '颜色', value: '黑色/藏青色' },
			{ label: '适用季节', value: '冬季' },
			{ label: '工艺', value: '防风防水' }
		],
		recommendations: [
			'轻盈保暖，御寒必备',
			'大码设计，穿着宽松',
			'防风防水，全面防护',
			'拉链设计，穿脱方便',
			'多口袋设计，实用便携'
		]
	},
	9: {
		id: 9,
		name: '防滑软底健步鞋',
		price: 189,
		originalPrice: 259,
		sales: 1200,
		category: '老年服饰',
		images: ['/static/pictures/shop/goods9.png'],
		details: [
			{ label: '品牌', value: '步安适' },
			{ label: '材质', value: '网布+橡胶' },
			{ label: '尺码', value: '35-44' },
			{ label: '颜色', value: '黑色/灰色' },
			{ label: '鞋底', value: '防滑橡胶' },
			{ label: '闭合方式', value: '魔术贴' },
			{ label: '适用场景', value: '运动/散步' }
		],
		recommendations: [
			'防滑耐磨，安全出行',
			'软底设计，减震护脚',
			'魔术贴设计，穿脱方便',
			'透气网布，舒适干爽',
			'轻便设计，减轻负重'
		]
	},
	10: {
		id: 10,
		name: '中老年休闲裤',
		price: 139,
		originalPrice: 199,
		sales: 1000,
		category: '老年服饰',
		images: ['/static/pictures/shop/goods10.png'],
		details: [
			{ label: '品牌', value: '舒适主义' },
			{ label: '材质', value: '棉质+弹力纤维' },
			{ label: '尺码', value: 'M-XXXL' },
			{ label: '颜色', value: '深灰/藏青' },
			{ label: '腰型', value: '松紧腰' },
			{ label: '裤型', value: '直筒' },
			{ label: '适用季节', value: '四季可穿' }
		],
		recommendations: [
			'弹力面料，活动自如',
			'松紧腰带，穿着舒适',
			'直筒设计，修饰腿型',
			'多口袋设计，实用方便',
			'易打理面料，方便清洗'
		]
	},
	11: {
		id: 11,
		name: '老年人加绒马甲',
		price: 169,
		originalPrice: 229,
		sales: 900,
		category: '老年服饰',
		images: ['/static/pictures/shop/goods11.png'],
		details: [
			{ label: '品牌', value: '暖心' },
			{ label: '材质', value: '聚酯纤维+加绒' },
			{ label: '尺码', value: 'L-XXXL' },
			{ label: '颜色', value: '黑色/藏青色' },
			{ label: '款式', value: '立领' },
			{ label: '适用季节', value: '秋冬季' },
			{ label: '清洗方式', value: '机洗手洗均可' }
		],
		recommendations: [
			'加绒保暖，温暖舒适',
			'立领设计，防风保暖',
			'无袖设计，活动方便',
			'双向拉链，穿脱容易',
			'轻便设计，日常百搭'
		]
	},
	12: {
		id: 12,
		name: '大屏老人手机',
		price: 699,
		originalPrice: 899,
		sales: 500,
		category: '老年数码',
		images: ['/static/pictures/shop/goods12.png'],
		details: [
			{ label: '品牌', value: '长辈优选' },
			{ label: '屏幕尺寸', value: '5.5英寸' },
			{ label: '电池容量', value: '3000mAh' },
			{ label: '操作系统', value: '简化安卓系统' },
			{ label: '摄像头', value: '前500万+后800万' },
			{ label: '特色功能', value: '大字体+大音量' },
			{ label: '保修期', value: '12个月' }
		],
		recommendations: [
			'大屏大字，清晰易读',
			'大音量设计，清晰通话',
			'简单操作，易于上手',
			'长待机时间，安心使用',
			'SOS紧急呼叫，安全保障'
		]
	},
	13: {
		id: 13,
		name: '老年人智能手表',
		price: 399,
		originalPrice: 499,
		sales: 700,
		category: '老年数码',
		images: ['/static/pictures/shop/goods13.png'],
		details: [
			{ label: '品牌', value: '智护' },
			{ label: '屏幕', value: '1.4英寸彩屏' },
			{ label: '防水等级', value: 'IP67' },
			{ label: '电池容量', value: '380mAh' },
			{ label: '主要功能', value: '心率监测+定位' },
			{ label: '表带材质', value: '硅胶' },
			{ label: '续航时间', value: '5-7天' }
		],
		recommendations: [
			'健康监测，实时了解',
			'一键求助，紧急呼救',
			'精准定位，安全守护',
			'大字体显示，清晰易读',
			'防水防汗，日常防护'
		]
	},
	14: {
		id: 14,
		name: '大按键遥控器',
		price: 59,
		originalPrice: 89,
		sales: 1500,
		category: '老年数码',
		images: ['/static/pictures/shop/goods14.png'],
		details: [
			{ label: '品牌', value: '易控' },
			{ label: '适用范围', value: '通用电视' },
			{ label: '按键类型', value: '大按键硅胶' },
			{ label: '供电方式', value: 'AAA电池×2' },
			{ label: '遥控距离', value: '8-10米' },
			{ label: '特色功能', value: '背光按键' },
			{ label: '材质', value: 'ABS+硅胶' }
		],
		recommendations: [
			'大按键设计，操作方便',
			'背光显示，夜间可用',
			'简单配对，即插即用',
			'防滑设计，手感舒适',
			'通用性强，兼容性好'
		]
	},
	15: {
		id: 15,
		name: '老年收音机',
		price: 129,
		originalPrice: 169,
		sales: 1100,
		category: '老年数码',
		images: ['/static/pictures/shop/goods15.png'],
		details: [
			{ label: '品牌', value: '声悦' },
			{ label: '供电方式', value: '充电+电池' },
			{ label: '功能', value: 'FM/AM+MP3' },
			{ label: '扬声器', value: '3W大喇叭' },
			{ label: '电池容量', value: '1200mAh' },
			{ label: '支持格式', value: 'MP3/WMA' },
			{ label: '特色功能', value: 'LED显示屏' }
		],
		recommendations: [
			'大喇叭设计，音质清晰',
			'多功能合一，娱乐便携',
			'简单操作，一键收听',
			'双供电模式，使用方便',
			'便携手提，随身收听'
		]
	},
	16: {
		id: 16,
		name: '放大镜阅读器',
		price: 239,
		originalPrice: 299,
		sales: 800,
		category: '老年数码',
		images: ['/static/pictures/shop/goods16.png'],
		details: [
			{ label: '品牌', value: '明视' },
			{ label: '放大倍数', value: '2-5倍可调' },
			{ label: '镜片材质', value: '光学树脂' },
			{ label: '照明方式', value: 'LED补光' },
			{ label: '供电方式', value: 'AA电池×3' },
			{ label: '镜片尺寸', value: '90mm' },
			{ label: '特色功能', value: '防蓝光设计' }
		],
		recommendations: [
			'倍数可调，清晰放大',
			'LED补光，光线充足',
			'人体工学，握持舒适',
			'防蓝光设计，保护视力',
			'轻便携带，随身阅读'
		]
	}
} 