<template>
  <div class="wrapper">
  	<p class="title"><i class="iconfont">&#xe66e;</i>订阅我</p>
  	<input type="text" class="nickname" placeholder="昵称">
  	<input type="text" class="email" placeholder="常用邮箱">
  	<div class="button">订阅</div>
  	<p class="tip">当有新博文发表时，将会以邮件形式通知您。所填信息不会被公开。</p>
  	<div class="info">
  		<span><i class="iconfont">&#xf1b4;</i>https://github.com/kejianfeng</span>
  		<span><i class="iconfont">&#xe657;</i>1280388574</span>
  	</div>
  	
  </div>
</template>

<script>
export default {
  name: 'subscribe',
  
}
</script>

<style scoped lang="less">
.wrapper {
	width: 100%;
	border-top: 2px solid #bbb;
	padding-top: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	.title {
		text-align: center;
		font-size: 1.2rem;
		color: #555;
		padding-bottom: 1rem;
		/*font-weight: bold;*/
		
		i {
			font-size: 1.5rem;
		}
	}
	.nickname, .email {
		width: 50%;
		height: 40px;
		background: transparent;
		outline: none;
		margin:.5rem auto;
		border: 1.5px solid #aaa;
		padding: .5rem;
	}
	.button {
		color: #fff;
		font-weight: bold;
		background: #27ae60;
		padding: .5rem 1.2rem;
		border-radius: 5px;
		margin-top: 1rem;
		cursor: pointer;
	}
	.tip {
		color: #bbb;
		margin-top: 1rem;
	}
	.info {
		width: 100%;
		height: 50px;
		background: #888;
		color: #ddd;
		margin-top: 2rem;
		line-height: 50px;
		text-align: center;
		span {
			padding-right: 2rem;
			i {
				font-size: 1.2rem;
			}
		}
	}

}


</style>