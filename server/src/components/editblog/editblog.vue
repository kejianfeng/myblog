<template>
  <div class="edit-article">
      <div class="wrapper">
          <p class="title">添加文章</p>
          <div class="detail">
                <div class="edit-title">
                  <label >文章标题</label> 
                  <input placeholder="请输入文章标题" class="input" v-model="title" ></input>
                </div>
                <div class="classify">
                    <label>文章分类</label>
                    <select class="select" v-model="classify">
                        <option v-for="label in labelList">{{label}}</option>
                    </select>
                    <div class="addLabel" @click="toggleLabelArea">管理标签</div>
                    <div class="showLabelArea" v-show="isShow" @click="closeLabelArea">
                        <div class="labelArea" @click.stop>
                            <span class="edit" @click.stop = "showDeleteLabel">编辑</span>
                            <div class="labelList">
                                <span v-for="(item, index) in labelList" class="one">{{item}} <span class="delete" v-show="isDelete" @click="deleteLabel(index)"> × </span> </span>
                            </div>
                            <div class="addLabel-1">
                                <input type="text" class="add" v-model="newLabel">
                                <span @click.stop="addLabel">添加</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="label-sty">
                    <label>文章标签</label>
                    <input class="input" v-model='label' placeholder="请输入标签，以'/'分割"/>
                </div>
                <div class="abstract">
                    <label>内容摘要</label>
                    <textarea  class="edit-1" v-model="abstract"></textarea>
                </div>
                <div class="editmachine">
                    <p class="article-content">文章内容</p>
                    <edit v-model="article">
                    </edit>
                </div>
                <div class="deliver" @click="deliver">
                    <button >发表</button>
                </div>
                <button @click="output">输出内容</button>
          </div>

      </div>
      <div class="tip" v-show='tip'>
              <span>发表成功</span>
      </div>

  </div>
</template>

<script>
// import marked from 'marked'
import axios from 'axios'
import Edit from 'components/edit/edit'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  name: 'home',
    data() {
        return {
            title:'',
            classify:'',
            label:'',
            abstract:'',
            article:'',
            review:0,
            reading:0,
            tip:'',
            labelList:['javascript', 'css', 'es6', '算法','其他'],
            isShow:false,
            isDelete:false,
            newLabel:'',

        }
    },
    computed: {
        articleInfo() {
            return [{
                        title: this.title,
                        classify: this.classify,
                        label: this.label,
                        abstract: this.abstract,
                        review:this.review,
                        reading:this.reading
                    },
                    {
                        markedContent: this.article,
                        classify: this.classify,
                        title: this.title
                    }]
        }

    },
    components: {
        Edit
    },
    watch: {
        tip(newTip) {
            if (newTip) {
                setTimeout(() => {
                    this.tip = '';
                },2000)
            }
            else {
                return
            }
        }
    },
    methods: {
        deliver() {
            axios.post('http://localhost:8010/api/saveEdit',this.articleInfo
        ).then((res) => {
            if(res.data.status === 0) {
                this.tip = '发表成功';
                this.title='';
                this.classify='';
                this.label='';
                this.abstract='';
                this.article='';
            }
            else {
                this.tip = '对不起'
            }

            
            })
        },
        toggleLabelArea() {
            this.isShow = true;
        },
        closeLabelArea() {
            this.isShow = false;
            this.isDelete = false;
        },
        showDeleteLabel() {
            this.isDelete = true;
        },
        deleteLabel(index) {
            this.labelList.splice(index,1)
        },
        addLabel() {
            this.labelList.push(this.newLabel);
            this.newLabel = '';
        },
        output() {
            console.log(this.article)
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
        .tip {
            position:absolute;
            width:200px;
            height:100px;
            text-align: center;
            line-height: 100px;
            font-size: 2rem;
            color: #595959;
            box-sizing:border-box;
            top:50%;
            transform: translateY(-50%);
            background:#87CEEB;
            left: 50%;
            transform: translateX(-50%);
        }
        .title {
            background: #eee;
            width:100%;
            padding:1rem;
        }
        .detail {
            width: 100%;
            margin-left: 3rem;
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
                .addLabel {
                    display: inline-block;
                    padding:.5rem 2rem;
                    background: #bbb;
                    color: #fff;
                    margin-left: 50px;
                    cursor: pointer;

                }
                .showLabelArea {
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom:0;
                    right: 0;
                    /*background: rgba(0,0,0,0.2);*/
                    .labelArea {
                        width: 400px;
                        height: 400px;
                        border: 1px solid #bbb;
                        margin: 5rem auto;
                        background: #fff;
                        padding: 1rem;
                        .edit {
                            border-bottom: 1px solid #666;
                            cursor: pointer;
                        }
                        .labelList {
                            margin-top: 1rem;
                            .one {
                                display: inline-block;
                                padding: .5rem 1rem;
                                background: #bbb;
                                /*border-radius: 5px;*/
                                margin: .5rem .5rem;
                                position: relative;
                                .delete {
                                    position: absolute;
                                    display: inline-block;
                                    right: 0;
                                    top: 0rem;
                                    height: 15px;
                                    width: 15px;
                                    font-size: 20px;
                                    border:1px solid #666;
                                    border-radius: 7.5px;
                                    color: #555;
                                    cursor: pointer;
                                    text-align: center;
                                    line-height: 15px;
                                    

                                }
                            }
                        }
                        .addLabel-1 {
                            width: 70%;
                            height: 30px;
                            display: flex;
                            margin-left: .5rem;
                            margin-top: 1rem;
                            .add {
                                outline: none;
                                border:1px solid #999;
                                padding: .5rem;
                            }
                            span {
                                color: #fff;
                                background: #bbb;
                                height: 30px;
                                font-size: 10px;
                                /*box-sizing: border-box;*/
                                text-align: center;
                                line-height: 30px;
                                margin-left: 2rem;
                                padding: 0 1rem;
                            }
                        }
                    }
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
                    resize: none;
                    
                }
            }
            .editmachine {
                width: 80%;
                margin-left: 1rem;
                .article-content {
                    margin: 1rem 0;
                }
            }
            .deliver {
                text-align: center;
                height: 20px;
                button {
                    width: 5rem;
                    height: 40px;
                    outline: none;
                    border:1px solid #bbb;
                    border-radius: 5px;
                    margin: 2rem auto;
                    cursor: pointer;
                }
            }

        }


    }
 
</style>
