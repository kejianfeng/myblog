<template>
  <div class="top">
      <ul class="nav-wrapper">
          <li class="nav">
              <router-link to='/firstPage'>首页</router-link>
          </li>
          <li class="nav">
                <router-link to='/dailyBlog'>行博</router-link>
          </li>
          <li class="nav">
                <router-link to='/messageBoard'>留言板</router-link>
          </li>
          <li class="nav">
                <router-link to='/sortArticle'>归档</router-link>
          </li>
          <li class="nav">
                <router-link to='/about'>关于</router-link>
          </li>
      </ul>
    
  </div>
</template>

<script>
export default {
  name: 'about',
  
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    .top {
        width: 100%;
        height: 86px;
        text-align: center;
        background-color:#262b2f;
        .nav-wrapper {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 86px;
            top: 50%;
            margin-right:10%;
            .nav {
                padding-right:4rem;
            }
        
        }
    }
    .router-link-active {
        color: #fff
    }

</style>
