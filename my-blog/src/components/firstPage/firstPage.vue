<template>
  <div class="fist-page">
    <div class="personShow">
        <img :src="pic_src"  class="pic" width="200">
        <p>纵然磨难不断 &nbsp; &nbsp;&nbsp; &nbsp;但还是要努力的</p>
    </div>
    <article class="article-wrapper" v-for='item in result'>
        <h1 class="title">{{item.title}}</h1>
        <div class="time-detail">
            <span><i class="iconfont ">&#xe62c;</i>{{item.originDate}} </span>
            <span><i class="iconfont ">&#xe628;</i>{{item.originDate}}</span>
            <span class="classify">{{item.classify}}</span>
        </div>
        <p class="desc">{{item.abstract}}</p>
        <div class="label">
            <div class="left">
                <i class="iconfont">&#xe611;</i>
                <span v-for='label in getLabel(item)'>{{label}}</span>

            </div>
            <div class="right">
                <span >阅读({{item.reading}})</span>
                <span>评论({{item.review}})</span>
                <span @click='openDetail(item)' class="link">全文链接</span>
            </div>
        </div>
    </article>
    <div class="diverPage">
        <span>上一页</span>
        <span>下一页</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fistPage',
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
        // console.log(444)
        this.$axios.get('http://localhost:8010/api/getblog').then((res) => {
            // console.log(res.data)
            this.result = res.data;
            // this.labels = res.label.split('/');
            // console.log(res)
        })
    },
    getLabel(data) {
        return data.label.split('/')
    },
    openDetail(item) {
        this.$store.commit('changeId', {id:item.id, reading:item.reading});
        // console.log(this.$store.state.id);
        this.$router.push({
            path:`/article/${item.id}`
        })
    }
  },
  data() {
      return {
            result:[],
          pic_src:'data:image/png;base64,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'
      }
  }
  
}
</script>

<style scoped lang="less">
    .fist-page {
        width:60%;
        margin: 0 auto;
        .personShow {
            text-align: center;
            background: transparent;
            padding:3rem;
        }
        .article-wrapper {
            background-color:#fff;
            padding:3rem 2rem;
        }
        .title {
            font-size: 23px;
            color: #555;
            margin-bottom: 13px;
        }
        .time-detail {
            display: flex;
            span {
                color: #555;
                font-size:10px;
                margin-right:20px;
            }
            .classify {
                color: #7594b3;
            }
        }
        .desc {
            margin: 26px 0;
            line-height: 25px;
            color: #555;
        }
        .label {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            .left {
                span {
                    margin-right:20px;
                }
            }
            .right {
                span {
                    margin-right:20px;
                }
                .link {
                    cursor:pointer;
                }
            }
        }
        .diverPage {
            margin-top: 3rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            span {
                width:100px;
                height: 30px;
                line-height:30px;
                text-align:center;
                &:hover {
                    background-color:  rgba(175, 218, 207, 0);
                    cursor: pointer;
                    color: rgb(113, 134, 167);
                }
            }
        }
    }

</style>
