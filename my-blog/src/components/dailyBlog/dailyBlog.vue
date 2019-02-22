<template>
  <div class="dailyBlog">
    <div class="wrapper"> 
      <div class="head">
        <div>
            <h1 class="slo">淡然</h1>
            <p class="text">灯火阑珊处  孑然一身游</p>
        </div>
      </div>
      <div class="blog">
        <single-blog :dailyBlog="dailyBlog"></single-blog>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBlog from 'base/singleBlog/singleBlog' 
export default {
  name: 'dailyBlog',
  data() {
    return {
      dailyBlog:[]
    }
  },
  created() {
    this.getDailyBlog();
  },
  components:{
    SingleBlog
  },
  methods: {
    getDailyBlog() {
      this.$axios.get(' http://localhost:8010/api/getDailyBlog').then((res) => {
        this.dailyBlog = res.data
      })
    }
    // getLabel(data) {
    //     return data.label.split('/')
    // }
    // openBlog(id) {
    //   this.$router.push({
    //     path:`/dailyBlogDetail/${id}`
    //   })
    // }
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
/*      font-family: Rokkitt,arial,serif;
*/      color: #828d95;
      text-align: center;
   }
   @marginTop:4rem;

  .dailyBlog {
    width: 60%;
    margin: 0 auto;
    margin-top:@marginTop;
    .wrapper {
      width: 100%;
      background-color:#fff;
      .head {
        display: flex;
        justify-content: center;
        align-items: center;
        height:380px;
        width: 100%;
        color:#fff;
        overflow: hidden;
        .bgImage('http://www.yangzicong.com/static/4aa422f3d0103dd997a8af4c2cbfbdc6.jpg');
        .slo {
          font-size: 2rem;
          padding: 2rem;
          text-align: center;
        }
        .text {
          text-align: center;
        }
      }
      .blog {
        width: 100%;
        padding-top: 2rem;
        .blog-wrapper {
          padding: 2rem;
          display: flex;
          align-items: center;
          border-bottom:1px dashed #828d95;
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

      }

    }

  }

</style>
