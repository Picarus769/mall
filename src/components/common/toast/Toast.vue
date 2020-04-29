<template>
	<div class="toast-content" v-show="isShow">
		{{message}}
	</div>
</template>

<script>
	export default {
		name: "Toast",
		// props: {
		// 	isShow:{
		// 		type: Boolean,
		// 		default() {
		// 			return false
		// 		}
		// 	},
		// 	message:{
		// 		type: String,
		// 		default() {
		// 			return ''
		// 		}
		// 	},
		// },
		data() {
			return {
				isShow: false,
				message: ''
			}
		},
		methods: {
			show(message, duration=2000) {
				this.message = message
				this.isShow = true
				setTimeout(() => {
					this.message = ''
					this.isShow = false
				}, duration)
			}
		}
	}
</script>

<style>
	.toast-content {
		position: fixed;
		top: 50%;
		left: 50%; 
		transform: translate(-50%, -50%);
		padding: 8px 10px;
		color: #fff;
		background-color: rgba(0,0,0, .75);
		z-index: 1000;
	}
</style>
