<template>
  <div>
		<cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
		<cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
	import CartList from './childComps/CartList.vue'
	import CartNavBar from './childComps/CartNavBar.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
  export default{
    name:'Cart',
		components: {
			CartNavBar,
			CartList,
			CartBottomBar
		}
  }
</script>

<style>
</style>
