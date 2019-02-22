<template>
	<transiton  name="warn">
		<div class="wrapper" v-show="isShow">
			<div class="warning">
   				{{text}}
  			</div>
		</div>
	</transiton>
  
</template>

<script>
export default {
  name: 'warning',
  props: {
  	text: {
  		type:String,
  		default:''
  	},
  	isShow: {
  		type:Boolean,
  		default:false
  	}
  }
  
}
</script>

<style scoped lang="less">
	.wrapper {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		.warning {
			width:150px;
			height:60px;
			background: #388E8E;
			text-align: center;
			line-height: 60px;
			color: #fff;
			font-size: 1.2rem;
		}
	}
	.name-enter, .name-leave-to {
		transform: translate3d(0, -100%, 0);
	}
	.name-enter-active, .name-leave-active {
		transition: transform 3s;
	}
	
</style>
