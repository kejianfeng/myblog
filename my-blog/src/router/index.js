import Vue from 'vue'
import Router from 'vue-router'
import FistPage from 'components/firstPage/firstPage'
import DailyBlog from 'components/dailyBlog/dailyBlog'
import About from 'components/about/about'
import MessageBoard from 'components/messageBoard/messageBoard'
import SortArticle from 'components/sortArticle/sortArticle'
import ArticleDetail from 'components/articleDetail/articleDetail'
import DailyBlogDetail from 'components/dailyBlogDetail/dailyBlogDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/firstPage'
    },
    {
      path: '/firstPage',
      name: 'firstPage',
      component:FistPage
    },
    {
      path: '/dailyBlog',
      name: 'dailyBlog',
      component:DailyBlog
    },
    {
      path: '/dailyBlogDetail/:id',
      name: 'dailyBlogDetail',
      component: DailyBlogDetail
    },
    {
      path: '/messageBoard',
      name: 'messageBoard',
      component:MessageBoard
    },
    {
      path: '/sortArticle',
      name: 'sortArticle',
      component:SortArticle
    },
    {
      path: '/about',
      name: 'about',
      component:About
    },
    {
      path: '/article/:id',
      name:'articleDetail',
      component:ArticleDetail
    }
  ]
})
