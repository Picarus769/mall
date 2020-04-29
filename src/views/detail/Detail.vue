<template>
	
	<div id="detail">
		<detail-nav-bar class="nav" @navClick="navClick" ref="nav"></detail-nav-bar>
		<scroll class="content"
						ref="scroll"
						:probeType="3"
						@scroll="contentScroll">
			<detail-swiper :topImages="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :imagesInfo="detailInfo" @goodsimgLoad="goodsImgLoad"></detail-goods-info>
			<detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
			<goods-list ref="recommend" :goods="recommend"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="showBackTop"></back-top>
		<bottom-bar @addToCart="addCart"></bottom-bar>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import BottomBar from './childComps/BottomBar.vue'
	
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	import {debounce} from '../../common/utils.js'
	import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
	
	import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail.js'
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			Scroll,
			GoodsList,
			BottomBar
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommend: [],
				themeY: [],
				currentIndex: 0
				// itemImgListener: null,
			}
		},
		created() {
			this.iid = this.$route.params.iid
			getDetail(this.iid).then(res => {
				console.log(res)
				const data = res.result
				this.topImages = data.itemInfo.topImages
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				this.shop = new Shop(data.shopInfo)
				this.detailInfo = data.detailInfo
				this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
				if (data.rate.cRate !== 0) {
				  this.commentInfo = data.rate.list[0] || {};
				}
			})
			getRecommend().then(res => {
				this.recommend = res.data.list
				
			})
				
			
		},
		mounted() {
			// const refresh = debounce(this.$refs.scroll.refresh, 100)
			
			// this.$bus.$on('itemImgLoad', () => {
			// 	refresh()
				// const getOffsetTop = debounce(pushOffsetTop, 100)
				// getOffsetTop()
				
			// })
			
		},
		destroyed() {
			
		},
		methods: {
			navClick(index) {
				this.$refs.scroll.scrollTo(0, -this.themeY[index], 100)
			},
			goodsImgLoad() {
				this.newRefresh()
				
				this.themeY = []
				this.themeY.push(0)
				this.themeY.push(this.$refs.param.$el.offsetTop)
				this.themeY.push(this.$refs.comment.$el.offsetTop)
				this.themeY.push(this.$refs.recommend.$el.offsetTop - 51)
				console.log(this.themeY)
			},
			contentScroll(position) {
				this.showBackTop = (-position.y) > 1000
				const positionY = -position.y
				for(let i = 0; i < this.themeY.length; i++) {
					if((this.currentIndex !== i) &&((i < this.themeY.length && positionY >= this.themeY[i] && positionY < this.themeY[i+1]) || (i === this.themeY.length - 1 && positionY >= this.themeY[i]))) {
						this.currentIndex = i
						this.$refs.nav.currentIndex = this.currentIndex
					}
				}
				// this.themeY.push(Math.MAX_VALUE)
				// for(let i = 0; i < this.themeY.length; i++) {
				// 	if((this.currentIndex !== i) &&(i < this.themeY.length && positionY >= this.themeY[i] && positionY < this.themeY[i+1])) {
				// 		this.currentIndex = i
				// 		this.$refs.nav.currentIndex = this.currentIndex
				// 	}
				// }
			},
			addCart() {
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.lowNowPrice
				product.iid = this.iid
				this.$store.dispatch('addCart', product).then(res => {
					this.$toast.show(res, 1500)
				})
			}
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.content {
		margin-top: 50px;
		height: calc(100% - 101px);
		overflow: hidden;
	}
	.nav {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 9;
		background-color: #fff;
	}
</style>
