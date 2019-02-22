<template>
  <div class="blog-wrapper">
    <div class="edit-wrapper">
      <textarea class="edit-area" placeholder="说点什么吧..." v-model="blogContent"></textarea>
      <div class="pic">
        <span class="iconfont">&#xe623;</span>
        <input type="file" name="photo" class="pic-button" @change='picUp' >
      </div>
    </div>
    <div class="edit-bottom">
        <div class="left">
          <span>#</span>
          <input type="text" name="label" class="label" placeholder="输入标签，以'/'分割" v-model="label">
        </div>
        <div class="right">
          <div class="button" @click.stop="deliver">发表</div>
        </div>
    </div>
    <div class="show-pic" v-show="pic">
      <span @click="deletePic">×</span>
      <img :src="pic" class="picTarget">
    </div>
    <div class="show-blog"></div>
     
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'blog',
  data() {
    return {
      pic:'',
      blogContent:'',
      label:'',
      reading:0,
      review:0,

    }
  },
  computed: {
    info() {
      return {
        blogContent: this.blogContent,
        pic: this.pic,
        label: this.label,
        reading: this.reading,
        review: this.review
      }
    }
  },
  methods: {
    picUp(e) {
     var pic = e.target.files[0];
     var reader = new FileReader();
     reader.readAsDataURL(pic);
     reader.onload = (ev) => {
      this.pic = ev.target.result;
     }
    },
    deletePic() {
      this.pic = ''
    },
    deliver() {
      axios.post('http://localhost:8010/api/saveDailyBlog',this.info).then((res) => {
        // if (res.status === 0) {
        //   console.log(res.data)
        // }
        console.log(res)
      })
    }
  }
  
}
</script>

<style scoped lang="less">

.border() {
  border: 1px solid rgb(169, 169, 169);
};

.blog-wrapper {
  width:70%;
  margin: 2rem auto;
  .edit-wrapper {
    width: 100%;
    display: flex;
    .edit-area {
      resize: none;
      height: 80px;
      width: 90%;
      .border();
      outline: none;
      box-sizing: border-box;
      padding: 1rem;
    }
    .pic {
      position: relative;
      width: 10%;
      box-sizing: border-box;
      .border();
      height: 80px;
      line-height: 80px;
      text-align: center;
      overflow: hidden;
      span {
        font-size: 40px;
        position: absolute;
        left: 0;
        right: 0;
      }
      .pic-button {
        opacity: 0;
        cursor: pointer;
      }

    }
  }
  .edit-bottom {
      width: 100%;
      height: 40px;
      padding:.5rem;
      box-sizing: border-box;
      .border();
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 70%;
        span {
          font-size: 1.5rem;
        }
        .label {
          outline: none;
          padding: .5rem;
        }
      }
      .right {
        width: 5rem;
        .button {
          height: 30px;
          margin-right: .5rem;
          background: #1aa094;
          text-align: center;
          line-height: 30px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }
  .show-pic {
    position: relative;
    width: 100%;
    height: auto;
    .border();
    padding: .5rem;
    box-sizing: border-box;
    span{
      position: absolute;
      right: .1rem;
      top: .1rem;
      font-size: 3rem;
      cursor: pointer;
    }
    .picTarget {
      width: 30%;
    }
  }
}
    
</style>
