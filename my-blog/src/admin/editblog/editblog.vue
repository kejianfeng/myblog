<template>
  <div class="edit-article">
      <div class="wrapper">
          <p class="title">添加文章</p>
          <div class="detail">
                <div class="edit-title">
                  <label>文章标题</label> 
                  <input placeholder="请输入文章标题" class="input" ></input>
                </div>
                <div class="classify">
                    <label>文章分类</label> 
                    <select class="select" >
                        <option>javascript</option>
                        <option>css</option>
                        <option>es6</option>
                        <option>其他</option>
                    </select>
                </div>
                <div class="label-sty">
                    <label>文章标签</label>
                    <input class="input" placeholder="请输入标签，以'/'分割"/>
                </div>
                <div class="abstract">
                    <label>内容摘要</label>
                    <div contenteditable="true" class="edit-1"></div>
                </div>
                <div class="editWrapper">
                    <label>文章内容</label>
                    <div class="editArea">
                        <textarea class="origin-content" contenteditable="true" v-model='article'></textarea>

                        <div class="markdown" v-html='markedContent'></div>
                    </div>

                </div>
          </div>

      </div>

  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css'
export default {
  name: 'home',
    data() {
        return {
            article:'',
        }
    },
    computed: {
        markedContent() {
          return marked(this.article, {
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
          })
        }

    }
  
}
</script>

<style scoped lang="less">
    /* //输入框样式 */
    .inputClass () {
        margin-right:2rem;
        flex-flow: 1;
        width: 60%;
        height: 30px;
        border:1px solid #bbb;
        margin-left:1rem;
        outline: none;
    }
    .common () {
        padding: 1rem;
        display: flex;
        align-items: center;
    }
    .edit () {
        box-sizing: border-box;
        padding: 1rem;
        width:50%; 
        height: 400px;
        border: 1px solid #bbb;
        outline: none;
        overflow-y:scroll;
    }
    .edit-article {
        width: 100%;
        background: #fff;
        .title {
            background: #eee;
            width:100%;
            padding:1rem;
        }
        .detail {
            width: 100%;
            margin-left: 3rem;
        }
        .edit-title {
            .common();
            .input {
                .inputClass();
            }
        }
        .classify {
            .common();
            .select {
                width: 30%;
                height: 30px;
                border:1px solid #bbb;
                margin-left:1rem;
                outline: none;

            }
        }
        .label-sty {
            .common();
            .input {
                .inputClass()
            }
        }
        .abstract {
            .common();
            .edit-1 {
                border: 1px solid #bbb;
                width: 60%;
                height:100px;
                margin-left: 1rem;
                outline: none;
                padding: 1rem;
                box-sizing: border-box;
                
            }
        }
        .editWrapper {
            padding: 1rem;
            display: flex;
            .editArea {
                width: 60%;
                height: 400px;
                display: flex;
                padding: 0 1rem;
                .origin-content {
                    .edit ();
                    background: #eee;  
                    resize: none;
                }
                .markdown {
                    .edit ();
                    margin-left:-1px;
                }
            }

        }


    }
 
</style>
