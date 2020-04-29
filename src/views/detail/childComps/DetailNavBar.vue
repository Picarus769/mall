<template>
	<div>
		<nav-bar>
			<div slot="left" @click="backClick">
				<img src="~assets/img/common/back.svg" alt="" class="back-img">
			</div>
			<div slot="center" class="title">
				<div v-for="(item, index) in titles"
						class="title-item"
						:class="{active: currentIndex == index}"
						@click="itemClick(index)"
						>
					{{item}}
				</div>
			</div>
		</nav-bar>
	</div>
	
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	export default {
		name: 'DetailNavBar',
		components: {
			NavBar
		},
		data() {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index
				this.$emit('navClick', index)
			},
			backClick() {
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	.title {
		display: flex;
		font-size: 13px;
		
	}
	.title-item {
		flex: 1;
		
	}
	.active {
		color: var(--color-high-text);
	}
	.back-img {
		margin-top: 12px;
	}
</style>
