<template>
  <div class="wrapper" @click="closeTag">
  	<div class="leftList">
  		<div class="top">
  			<span>全部文章({{result.length}})</span>
  			<span @click.stop="showTag">标签 <i class="iconfont" style="font-weight: bold;"> &#xe662;</i></span>
  			<div class="tag" v-show="isShow" @click.stop>
  				<p v-for='tag in result.label' class="tagItem">{{tag}}</p>
  			</div>
  		</div>
  		<div>
  			<div class="list" v-for="item in result.listContent">
  				<p class="info">{{item.time.split("-")[0]}}年{{addZero(item.time.split("-")[1])}}月 / {{item.list.length}}篇文章</p>
  				<p class="title" v-for='unit in item.list'>{{getDay(unit.originDate)}} {{unit.title}}</p>
  			</div>	
  		</div>
  		
  	</div>
  	<div class="rightList">
  		<div class="sortArea">
  			<span>分类</span>
  			<ul >
  				<li class="sort" v-for="tag in result.classify">{{tag.key}}<span>( {{tag.num}} )</span></li>
  				
  				
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script>
import {sortInfo} from 'api/assist'
export default {
  name: 'sortArticle',
  data() {
  	return {
  		isShow:false,
  		result:{},
  	}
  },
  methods: {
  	showTag() {
  		this.isShow = (this.isShow) ? false : true;
  	},
  	closeTag() {
  		this.isShow = false;
  	},
  	getSortInfo() {
  		this.$axios.get('http://localhost:8010/api/getSortInfo').then((res) => {
  			this.result = sortInfo(res.data);
  			// console.log(res.data)

  		})
  	},
  	getDay(date) {
  		var monthDay = date.split('-');
  		console.log(monthDay)
  		return `${this.addZero(monthDay[1])}-${this.addZero(monthDay[2])}`

  	},
  	addZero(date) {
  		if(parseInt(date) < 10) {
  			return `0${date}`
  		}
  		else {
  			return date
  		}
  	},

  },
  created() {
  	this.getSortInfo()
  }
  
}
</script>

<style scoped lang="less">
	.wrapper {
		width: 99%;
		height: 100%;
		background: #fff;
		margin:0 auto;
		display: flex;
		padding-bottom:5rem;
		.leftList {
			width: 70%;
			box-sizing: border-box;
			.top {
				border-bottom: 1px solid #bbb;
				width: 95%;
				height: 100px;
				line-height: 100px;
				position: relative;
				span {
					padding: 1.5rem;
					color: #666;
					cursor: pointer;
					i {
						font-size: 1rem;
					}

				}
				.tag {
					width: 450px;
					height: 230px;
					line-height: 1rem;
					border: 1px solid #bbb;
					position: absolute;
					top: 80px;
					left: 2rem;
					background:#fff;
					z-index: 100;

					.tagItem {
						background: #666;
						color: #fff;
						display: inline-block;
						/*border: 1px solid #ADD8E6;*/
						border-radius: 5px;
						margin: .5rem;
						padding: .5rem;

					}
				}
			}
			.list {
				padding-right: .5rem;
				.info {
					padding: 1.5rem;
				}
				.title {
					margin: .5rem .5rem 1rem 1.5rem;
					border-bottom: 1px dashed #bbb;
					display: inline-block;
					padding-bottom: .5rem;
					color: #666;
				}
			}
		}
		.rightList {
			width: 30%;
			box-sizing: border-box;
			padding: 2rem;
			margin-top:.5rem;
			span {
				padding-left: 1.2rem;
			}
			.sortArea {
				border-left: 1px solid #bbb;
				padding: 2rem 2rem;
				.sort {
					padding: 1.2rem;
					color: #7594b3;
					position: relative;
					span {
						position: absolute;
						right: 1.2rem;
						color: #555;

					}
			}

			}
			
		}
	}

</style>
