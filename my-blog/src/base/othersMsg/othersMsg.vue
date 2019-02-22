<template>
  <div class="comment">
   		<p class="title">留言<span >( {{comment.length}})</span></p>
   		<div class="show-comment">
   			<div class="single-comment" @mouseover="showCite(index)" @mouseout="fade(index)" v-for=" (item, index) in comment" ref="singleComment">
   				<div class="user-name">
   					<span>{{item.nickName}}</span>
   					<div class="float-label">
   						<span class="cite" ref="cite" @click="cite(item)">引用</span>
   						<span>第{{comment.length - index}}楼</span>
   					</div>
   				</div>
   				<p class="user-comment" v-html="item.commentContent"></p>
   				<div class="time">
   					<span>{{item.date}}</span>
   					<span>{{item.time}}</span>
   				</div>
   			</div>

   		</div>
   		<p class="tip">输入您的评论：</p>
   		<textarea class="deit-area" v-model="commentContent" ></textarea>
   		<div  class="info">
   			<p class="nickName">您的昵称*:</p>
   			<input type="text" placeholder="必填" v-model='nickName'>
   			<p class="email">Email*:</p>
   			<input type="email" placeholder="必填" v-model='email'>
   			<div class="deliver" @click="deliver">发表</div>
   		</div>
      <warn :isShow="isShow" :text="text"></warn>
   </div>
</template>

<script>
import {random, assignComment} from 'api/assist'
import warn from  'base/warning/warning'
export default {
  name: 'othersMsg',
  props: {
  	comment: {
  		type:Array,
  		default:[]
  	},
  	postAddress: {
  		type:String,
  		default:''
  	},
  	isBoard: {
  		type:Boolean,
  		default: true
  	},
  	saveCollection: {
  		type:String,
  		default:''
  	}
  },
  components: {
     warn
  },
  data() {
  	return {
      totalComment:this.comment,
  		email: '',
  		nickName: '',
  		commentContent: '',
  		isShow:false,
  		text:'',
  		id:'',

  	}
  },
  computed:{
  	commentInfo() {
  		return {
  			commentContent: this.commentContent,
  			nickName: this.nickName,
  			email: this.email,
  			saveCollection:this.saveCollection,
  			id:this.id
  		}
  	}
  },
  created() {
  	// console.log(this.comment);
    // this.deliver();
  },
  methods: {
  	showCite(index) {
  		this.$refs.cite[index].style.visibility = "visible"
  		// console.log(this.$refs.cite)
  	},
  	fade(index) {
  		this.$refs.cite[index].style.visibility = "hidden"
  		// console.log(this.$refs.cite)
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
          if(this.isBoard) {
          		this.id = random()
          }
          else {
          	this.id = this.$store.state.id
          }
          this.$axios.post(`http://localhost:8010/api/${this.postAddress}`, this.commentInfo).then((res) => {
            this.showTip(res);
           // console.log(this.totalComment)
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
    cite(item) {
    	this.commentContent = `<blockquote class='quote'>\n<pre>\n引用 ${item.nickName} 的发言：\n</pre>\n<p>${item.commentContent}</p></blockquote>`
    }
  }
  
}
</script>

<style scoped lang="less">
	.comment {
		width: 70%;
		margin: 1rem auto;
		background: #fff;
		padding: 1rem;
		/*margin-left: calc(4rem + 80px);*/
		.title {
			padding: .5rem 0;
			font-size: 1.2rem;
		}
		.deit-area {
			resize: none;
			width: 70%;
			height: 4rem;
			outline: none;
			margin-bottom: .5rem;
			/*border: */
		}
		.info {
			input {
				margin: .5em 0;
				padding: .2rem;
				width: 40%;
				height: 2rem;
				outline: none;
				border: 1px solid #aaa;
			}
			.deliver {
				margin-top: 1rem;
				padding: .5rem 2rem;
				background: #009688;
				color: #fff;
				cursor: pointer;
				width: 60px;
				text-align: center;
			}
		}
		.show-comment {
			margin-top: .5rem;

			.single-comment {
				border-bottom: 1px solid #999;
				margin-bottom: 2rem;
				padding-bottom: 2rem;
				padding-top: 1rem;
				.user-name {
					display: flex;
					justify-content: space-between;
					.float-label {
						font-size: 14px;
						color: #999;
						.cite {
							border-bottom: 1px solid #bbb;
							visibility:hidden;
							
						}
					}
					span {
						padding: .2rem;
						/*border-bottom: 1px dashed #999;*/
					}
				}
				.user-comment {
					text-indent: 1rem;
					padding-top: .5rem;
					padding-bottom: .5rem;
					pre {

    					font-weight: 700;
    					padding-bottom: 7px;
    					word-wrap: normal;
    					word-break: break-all;
    					word-wrap: break-word;
    					white-space: pre-line;
    				}
				}
				.time {
					color: #999;
					span {
						padding-right: .5rem
					}
				}
			}
			
		}
		.tip {
			padding-bottom: 1rem;
		}
	}

</style>
