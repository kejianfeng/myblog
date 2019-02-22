<template>
	<div class="wrapper">
		<div class="wrapperBox">
			<p class="about">关于我</p>
			<div class="introduce">
			   <span>柯剑烽，1996年出生于橘红之乡--化州，现就读于广东工业大学 </span>
			   <span>性格开朗，热爱舞蹈。</span>
			   <span>17年开始接触前端，被前端“即刻可见”的魅力所吸引，特别喜欢根据自己的想象把一个页面用代码实现.</span>
			   <span>有轻微纠结症，会在一个站点的logo选择中不断徘徊，也会在一个页面中使用什么标签有所犹豫</span>
			   <span>在前端学习的道路上我所不知道的还有很多，我能做的也是不断地努力不断地学习来更新自己的知识库。</span>
			</div>
			<div class="experience">
				<div class="singleArea">
					<div class="title">大学经历</div>
					<div class="detail" v-for="item in info">
						<p class="time">{{item.time}}</p>
						<div class="info">
							<p class="job">{{item.job}}</p>
							<p class="jobContent">{{item.jobContent}}</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'about',
  data() {
  	return {
  		info:[
  			{
  				time:'2015年9月',
  				job:'入读广东工业大学',
  				jobContent:'材料与能源学院 材料成型及控制工程 卓越工程师班'
  			},
  			{
  				time:'2016年10月',
  				job:'广工舞俱主席助理',
  				jobContent:'负责策划协助与举办舞俱招新、全体大会、舞会、舞展、送旧等活动'
  			},
  			{

  				time:'2017年3月',
  				job:'开始学习前端',
  				jobContent:'Bootstrap、Less、JQuery、Node、Vue等前端知识'
  			},
  			{
  				time:'2017年7月',
  				job:'进入 旗风堂信息科技有限公司 实习',
  				jobContent:'在leader带领下更广泛学习前端知识，并协助开发在线播布场景信息的h5页面应用'
  			}
  		]
  	}
  }
  
}
</script>

<style scoped lang="less">
	.wrapper {
		width: 70%;
		margin:0 auto;
		padding-bottom: 5rem;
		background: #fff;
		.wrapperBox {
			margin-left: 3rem;
			.about {
				padding-top: 3rem;
				padding-bottom:5rem;
				font-size: 1.4rem;
				font-weight: 500px;
			}
			.introduce {
				span {
					display: block;
					padding: .5rem 0;
				}
			}
			.experience {
				.singleArea {
					margin-top: 2rem;
					.title {
						padding-left: .5rem;
						border-left: 5px solid #bbb;
					}
					.detail {
						display: flex;
						align-items: center;
						margin-left: 6rem;
						padding:2rem 0;
						border-bottom: 1px solid #bbb;
						.time {
							margin:.5rem 8rem .5rem 0;
							color: #aaa;
							font-size: .9rem;
						}
						.info {
							text-align: left;
							.job {
								font-size: 1.1rem;
								padding: .8rem 0;
							}
							.jobContent {
								font-size: 10px;
								color: #aaa;
							}
						}
					}
				}
			}
		}
	} 

</style>
