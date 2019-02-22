<template>
  <div>
    <div class="wrapper">
      <p class="title">{{content.title}}</p>
      <div class="label" v-show="show">
        <span><i class="iconfont ">&#xe62c;</i>{{content.originDate}}</span>
        <span><i class="iconfont ">&#xe628;</i>{{content.originDate}}</span>
        <span class="classify">{{content.classify}}</span>
      </div>
      <div class="content" v-html="content.markedContent"></div>
    </div>
    <div class="like">
      <span class="iconfont">&#xe60c;</span>
      
    </div>
    <div class="comment-board">
      <others-msg :comment="comment" :postAddress="postAddress" :saveCollection="saveCollection" :isBoard="isBoard"></others-msg>
    </div>
  </div>
</template>

<script>
import OthersMsg from 'base/othersMsg/othersMsg'
export default {
  name: 'articleDetail',
  created() {
  	this.getArticle();
  },
  data() {
  	return {
  		content:{},
      show: false,
      comment:[],
      postAddress:'saveArticleComment',
      saveCollection:'ArticleComment',
      isBoard:false,
  	}
  },
  methods: {
  	getArticle() {
  		let id = this.$store.state.id;
  		// let reading = this.$store.state.reading;
  		this.$axios.get('http://localhost:8010/api/getArticle', {
  			params: {
  				id,
  				// reading
  			}
  		}).then((response) => {
  			this.content = response.data.articleContent[0];
        this.comment = response.data.articleComment
        this.show = true;
  			console.log(this.content)
  		})
  	}
  },
  components: {
    OthersMsg
  }
  
}
</script>

<style lang="less" scoped>
  .wrapper {
    width:60%;
    margin:2rem auto;
    padding-bottom:5rem;
    background-color: #fff;
    text-align: center;
    .title {
      font-size: 3rem;
      padding-top: 2rem;
      padding-bottom: .5rem;
    }
    .label {
       span {
         color: #555;
         font-size:10px;
         margin-right:20px;
        }
       .classify {
         color: #7594b3;
        }
    }
    .content {
      text-align: left;
      padding: 1rem 2rem;
      font-size: 1.2rem;
    }

  }
  .like{
    text-align: center;
    .iconfont {
        font-size: 30px;
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border:2px solid #bbb;
        padding: 0;
        margin: 0;
        line-height: 60px;
        cursor: pointer;

    }
  }
  .comment-board {
    width: 82%;
    margin: 0 auto;
  }


</style>
