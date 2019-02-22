<template>
  <div class="wrapper">
   <single-blog :dailyBlog="dailyBlog" :isLink="isLink" ></single-blog>
   <div class="comment" v-show='dailyBlog.length'>
   		<p class="title">评论({{totalComment.length}})</p>
   		<textarea class="deit-area" @click="changeInfo" ref="editArea" v-model="commentContent"></textarea>
   		<div v-show="showInfo" class="info">
   			<p class="nickName">您的昵称*:</p>
   			<input type="text" placeholder="必填" v-model='nickName'>
   			<p class="email">Email*:</p>
   			<input type="email" placeholder="必填" v-model='email'>
   			<div class="deliver" @click='deliver'>发表</div>
   		</div>
   		<div class="show-comment">
   			<div class="single-comment" v-for="item in totalComment">
   				<div class="user-name"><span>{{item.nickName}}</span></div>
   				<p class="user-comment">{{item.commentContent}}</p>
   				<div class="time">
   					<span>{{item.date}}</span>
   					<span>{{item.time}}</span>
   				</div>
   			</div>

   		</div>
   </div>
   	<warn :isShow="isShow" :text="text"></warn>
  </div>
</template>

<script>
import SingleBlog from 'base/singleBlog/singleBlog'
import Warn from 'base/warning/warning'
import {assignComment} from 'api/assist'
export default {
  name: 'dailyBlogDetail',
  components: {
  	SingleBlog,
  	Warn
  },
  data() {
  	return {
  		dailyBlog:[],
  		isLink:false,
  		showInfo:false,
  		commentContent:'',
  		totalComment:[],
  		nickName:'',
  		email:'',
      text:'',
      isShow: false

  	}

  },
  computed:{
  		commentInfo() {
  			return {
  				commentContent: this.commentContent,
  				nickName: this.nickName,
  				email: this.email,
  				id:this.$store.state.dailyBlogId,
  			}
  		}
  },
  created() {
  	this.getSingleBlog();
  	this.getComment();
  },
  methods: {
  	getSingleBlog() {
  		this.$axios.get('http://localhost:8010/api/getSingleBlog', {
  			params:{
  				id: this.$store.state.dailyBlogId,
  				// reading:this.$store.state.dailyBlogreading
  			}
  		}).then((res) => {
  			this.dailyBlog = res.data
  		})
  	},
  	changeInfo() {
  		this.showInfo = true;
  		this.$refs.editArea.style.height = '8rem';
  	},
  	deliver() {
      if(!this.nickName || !this.commentContent || !this.email) {
        // console.log(45)
        if (!this.nickName) {
            this.text = "请输入昵称"
        }
        else if (!this.commentContent) {
          this.text = "请输入评论内容"
        }
        else {
          this.text = "请输入邮箱"
        }

        this.showAndFade();
      }
      else {
        let re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+/
        if (!re.test(this.email)) {
          this.text = "请输入正确邮箱格式";
          this.showAndFade();
        }
        else {
          this.$axios.post('http://localhost:8010/api/saveComment', this.commentInfo).then((res) => {
            this.showTip(res);
           console.log(this.totalComment)
          })

        }
      }
      // console.log(this.isShow)
  		
  	},
  	showTip(res) {
       
       if(res.data.status === 0) {
              this.text = "发表成功"
              this.totalComment.unshift(assignComment(this.commentInfo));
              this.commentContent = '';
              this.email = '';
              this.nickName = '';
          }
        else {
          this.text = 发表失败
        }
  	  this.showAndFade();
  	},
    showAndFade() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false
      }, 3000)
    },
  	getComment() {
  		this.$axios.get('http://localhost:8010/api/getComment',{
  			params: {
  				id:this.$store.state.dailyBlogId
  			}
  		}).then((res) => {
  			this.totalComment = res.data.reverse()
  		})
  	}
  }
  
}
</script>

<style scoped lang="less">
	.wrapper {
		width:60%;
		background: #fff;
		margin: 4rem auto;
		padding-bottom: 5rem;
		.comment {
			width: 70%;
			margin-left: calc(4rem + 80px);
			p {
				padding: .5rem 0;
			}
			.deit-area {
				resize: none;
				width: 100%;
				height: 4rem;
				outline: none;
				/*border: */
			}
			.info {
				position: relative;
				input {
					width: 40%;
					height: 2rem;
					outline: none;
					border: 1px solid #aaa;
				}
				.deliver {
					padding: .5rem 2rem;
					position: absolute;
					bottom: -2rem;
					right: 0;
					background: #777;
					color: #fff;
					cursor: pointer;

				}
			}
			.show-comment {
				margin-top: 8rem;
				.single-comment {
					border-bottom: 1px dashed #999;
					padding-bottom: 1rem;
					padding-top: 1rem;
					.user-name {
						span {
							padding: .2rem;
							border-bottom: 1px dashed #999;
						}
					}
					.user-comment {
						text-indent: 1rem;
						padding-top: 1rem;
						padding-bottom: 1rem;
					}
					.time {
						color: #999;
						span {
							padding-right: .5rem
						}
					}
				}
				
			}
		}
	
	}

</style>