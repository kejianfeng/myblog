import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import EditBlog from 'components/editblog/editblog'
import Blog from 'components/blog/blog'
import Edit from 'components/edit/edit'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
    	path:'/home',
    	component:Home
    },
    {
    	path:'/editblog',
    	component:EditBlog
    },
    {
      path:'/blog',
      component:Blog
    },
    {
      path:'/edit',
      component:Edit
    }
  ]
})
