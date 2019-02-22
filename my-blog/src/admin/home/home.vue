<template>
  <div class="function">
      <div class="blog-edit common">
          <router-link to='/admin/home/editblog'>行博</router-link>
      </div>
      <div class="article-edit common">
            <router-link to='/home/articleLlist'>文章编辑</router-link>
      </div>
      <div class="draft common">草稿</div>
      <div class="user common">用户</div>
      <div class="review common">评论管理</div>
      <div class="article-list common">文章列表</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  
}
</script>

<style scoped lang="less">
    .function {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        .common {
            width: 33.33%;
            height: 100px;
            background-color:#ddd;
            margin:2rem auto ;
            line-height:100px;
            text-align:center;
        }

    }

</style>
