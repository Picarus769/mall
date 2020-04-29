import {debounce} from './utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
	data (){
		return {
			itemImgListener: null,
			newRefresh: null
		}
	},
	mounted() {
		this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
		this.itemImgListener = () => {
			this.newRefresh()
		}
		this.$bus.$on('itemImgLoad', this.itemImgListener)
		
	}
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			showBackTop: false,
		}
	},
	methods: {
		
		backClick() {
			this.$refs.scroll.scrollTo(0, 0, 500)
		},
	}
}