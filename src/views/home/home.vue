<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
		<tab-control class="fixed"
								:titles="titles"
								@tabClick="tabClick"
								ref="tabControl1"
								v-show="isTabFixed"
								></tab-control>
		<scroll class="content"
						ref="scroll"
						:probe-type="3"
						@scroll="contentScroll"
						:pull-up-load="true"
						@pullingUp="loadMore"
						>
			<home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
			<home-recommend :recommend="recommends"></home-recommend>
			<feature-view></feature-view>
			<tab-control :titles="titles"
									@tabClick="tabClick"
									ref="tabControl2"
									></tab-control>
			<goods-list :goods="goodsType"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="showBackTop"></back-top>
	</div>
</template>

<script>
	
	
	import NavBar from 'components/common/navbar/NavBar.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	
	import HomeSwiper	from './childComps/HomeSwiper'
	import HomeRecommend from './childComps/HomeRecommend'
	import FeatureView from './childComps/FeatureView.vue'
	
	
	import {getHomeMultidata, getHomeGoods} from 'network/home.js'
	import {debounce} from '../../common/utils.js'
	import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
	
  export default{
    name:'home',
		components:{
			NavBar,
			HomeSwiper,
			HomeRecommend,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll
			
		},
		computed: {
			goodsType() {
				return this.goods[this.currentGoodsType].list
			}
		},
		data() {
			return {
				banners: [],
				recommends: [],
				titles:['流行', '新款', '精选'],
				goods:{
					'pop':{page: 0, list: []},
					'new':{page: 0, list: []},
					'sell':{page: 0, list: []}
				},
				currentGoodsType:'pop',
				
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0,
				itemImgListener: null,
			}
		},
		mixins: [itemListenerMixin, backTopMixin],
		created() {
			this.getHomeMultidata()
			
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
		},
		mounted() {
			// const refresh = debounce(this.$refs.scroll.refresh, 300)
			// this.$bus.$on('itemImgLoad', () => {
			// 	refresh()
			// })
			
		},
		activated() {
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()
			
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},
		methods:{
			//事件监听
			
			tabClick(index) {
				this.currentGoodsType = Object.keys(this.goods)[index]
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			
			contentScroll(position) {
				this.showBackTop = (-position.y) > 1000
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			swiperImgLoad() {
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
				
			},
			loadMore() {
				this.getHomeGoods(this.currentGoodsType)
			},
			//网络请求
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type){
				
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page+=1
					
					this.$refs.scroll.finishPullUp()
				})
			}
		}
  }
</script>

<style scoped>
	#home {
		/* padding-top: 44px; */
		height: 100vh;
		padding-bottom: 49;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	.fixed{
		position: relative;
		top: 44px;
		z-index: 9;
	}
	.content {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}

</style>
