<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
			<div>
				<i class="icon service"></i>
				<span class="text">客服</span>
			</div>
			<div>
				<i class="icon shop"></i>
				<span class="text">店铺</span>
			</div>
			<div>
				<i class="icon select"></i>
				<span class="text">收藏</span>
			</div>
		</div>
		<div class="bar-item bar-left">
			<div class="cart" @click="addToCart"><div>加入购物车</div></div>
			<div class="buy"><div>购买</div></div>
		</div>
  </div>
</template>

<script>
	
export default {
  name: "BottomBar",
	methods: {
		addToCart() {
			this.$emit('addToCart')
			
		}
	}
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
	background-color: #fff;
	display: flex;
	text-align: center;
}

.bar-item {
	flex: 1;
	display: flex;
}
.bar-item> div {
	flex: 1;
}
.text {
	font-size: 13px;
}
.bar-left .icon {
	display: block;
	width: 22px;
	height: 22px;
	margin: 6px auto 3px;
	
	background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-left .service {
	background-position: 0 -54px;
}
.bar-left .shop {
	background-position: 0 -98px;
}
.bar-left .select {
	background-position: 0 0px;
}
.cart {
	background-color: yellow;
	line-height: 50px;
}

.buy {
	background-color: var(--color-tint);
	line-height: 50px;
}

</style>