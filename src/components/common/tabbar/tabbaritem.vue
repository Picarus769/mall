<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../assets/img/tabbar/home.svg"><div>首页</div> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <slot v-else name="item-icon-active"></slot>
    <!-- <div :class="{active:isActive}"> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>
  export default{
    name:'TabBarItem',
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !==-1;
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style>
  .tab-bar-item{
    font-size: 14px;
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    margin-top: 3px  ;
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  /* .active{
    color:red
  } */
</style>
