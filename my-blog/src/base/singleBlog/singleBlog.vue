<template>
  <div>
    <article class="blog-wrapper" v-for="(item, index) in dailyBlog">
          <div class="time">
            <div class="dayMonth">
              <p class="day">{{item.day}}</p>
              <p class="month">{{item.month + 1}}月</p>
            </div>
            <div class="year">{{item.year}}</div>
          </div>
          <div class="content">
            <div class="picArea" v-show="item.pic">
              <img :src="item.pic" class="pic">
            </div>
            <p class="desc">{{item.blogContent}}</p>
            <div class="tag">
              <span v-for='tag in getLabel(item)'>●  {{tag}}</span>
            </div>
            <div class="label">
                <span >阅读({{item.reading}})</span>
                <span>评论({{item.review}})</span>
                <span @click="openBlog(item)" class="text-link" v-show="isLink">全文链接</span>
            </div>

          </div>
    </article>
  </div>
  
</template>

<script>
export default {
  name: 'dailyBlogDetail',

  props: {
    dailyBlog: {
        type:Array,
        default:[]
    },
    isLink: {
      type:Boolean,
      default: true
    }
  },
  methods: {
    openBlog(item) {
      this.$store.commit('changeDailyBlogId', {
        id: item.id,
        reading: item.reading
      })
      this.$router.push({
        path:`/dailyBlogDetail/${item.id}`
      })
    },
    getLabel(data) {
        return data.label.split('/')
    }
  }
  
}
</script>

<style scoped lang="less">
    .bgImage (@src) {
        background-image: url(@src);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

   .time() {
      color: #828d95;
      text-align: center;
   }

   @marginTop:4rem;

   .blog-wrapper {
          padding: 2rem;
          display: flex;
          align-items: center;
         /* border-bottom:1px dashed #828d95;*/
          .time {
            width: 80px;
            height: 110px;
            .dayMonth {
              width: 74px;
              height: 74px;
              border-radius:50%;
              border:3px solid #828d95;
              font-size:2rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .day {
                .time();
              }
              .month {
                .time();
                font-size:1.2rem;
              }
            }
            .year {
              .time();
              color: #ccc;
              font-size:1.5rem;
              padding-top:1rem;
            }
          }
          .content {
            border-bottom:1px dashed #828d95; 
            .picArea {
              width: 70%;
              padding: 2rem;
              .pic {
                width: 100%;
              }

            }
            .desc {
              width: 80%;
              padding: 2rem;
              line-height: 30px;

            }
            .tag {
              display: flex;
              padding: 0 2rem;
              span {
                background-color: #828d95;
                border-radius:15px;
                font-size: 10px;
                padding:2px 10px;
                margin-right:1rem;
                color:#fff;

              }
            }
            .label {
              font-size: 10px;
              padding: 2rem;
              span {
                margin-right:20px;
              }
              .text-link {
                cursor: pointer;
              }
            }
          }
   }
</style>