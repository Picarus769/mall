<template>
	<nav-bar class="nav">
		<div slot="center">购物车({{cartLength}})</div>
	</nav-bar>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: "CartNavBar",
		components: {
			NavBar
		},
		computed: {
			// cartLength(state) {
			// 	return this.$store.getters.cartLength
			// },
			// ...mapGetters({
			// 	length: cartLength,
			// 	list: cartList
			// }),
			...mapGetters(['cartLength', 'cartList'])
		}
	}
</script>

<style scoped="scoped">
	.nav {
		color: #fff;
		background-color: var(--color-tint);
	}
</style>
