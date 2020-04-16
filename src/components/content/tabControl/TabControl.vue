<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles"
			class="tab-control-item"
			:class="{active: currentIndex === index}"
			@click="itemClink(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"TabControl",
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				currentIndex:0
			}
		},
		methods:{
			itemClink(index){
				this.currentIndex = index
				this.$emit('tabClick', index)
			}
		}
	}
</script>

<style>
	.tab-control {
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background-color: #FFFFFF;
	}
	.tab-control-item {
		flex: 1;
	}
	.tab-control-item span {
		padding: 5px;
	}
	.active span{
		color: var(--color-high-text);
		border-bottom: 3px solid var(--color-tint);
	}
</style>
