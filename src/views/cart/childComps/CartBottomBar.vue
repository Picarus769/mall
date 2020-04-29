<template>
	<div class="bottom-bar">
		<div class="all-checked">
			<check-button class="check-button" @click.native="allCheck()" :class="{check: isAllCheck}"></check-button>
			<span>全选</span>
			
		</div>
		<span class="total-price">合计：{{totalPrice}}元</span>
		<div class="calc">结算：{{checkLength}}</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton.vue'
	export default {
		name: "CartBottomBar",
		components: {
			CheckButton
		},
		computed: {
			totalPrice() {
				return this.$store.state.cartList.filter(item => {
					return item.checked
				}).reduce((pre, item) => {
					return pre + item.price * item.count
				}, 0).toFixed(2)
			},
			checkLength() {
				return this.$store.state.cartList.filter(item => {
					return item.checked
				}).length
			},
			isAllCheck() {
				if (this.$store.state.cartList.length === 0) return false
				return !this.$store.state.cartList.find(item => !item.checked)
			}
		},
		methods: {
			allCheck() {
				if(this.isAllCheck) {
					this.$store.state.cartList.forEach(item => item.checked = false)
				} else {
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		height: 40px;
		background-color: #eee;
		position: relative;
		line-height: 40px;
		display: flex;
	}
	.all-checked {
		display: flex;
		align-items: center;
		width: 60px;
		margin-left: 5px;
	}
	.check-button {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-left: 5px;
	}
	.total-price {
		margin-left: 30px;
		flex: 1;
	}
	.calc {
		width: 60px;
		color: #fff;
		background-color: red;
	}
	.check {
		background-color: #FF0000
	}
</style>
