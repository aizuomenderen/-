<template>
                <!--网友评论  抽取为公共组件-->
                <div class="comment-box">
                  <!--取得评论总数-->
                 <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="sendComments">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                       <textarea id="txtContent" v-model="commenttxt.commenttxt" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </form>
                  <ul id="commentList" class="list-box">
                    <!-- 如果有评论则下面的话隐藏掉 -->
                    <p v-if="comments.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item,i) in comments" :key="i">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{ item.add_time}}</span>
                        </div>
                        <!-- <p>testtesttest</p> -->
                         <p>{{ item.content }}</p>
                      </div>
                    </li>
       
                  </ul>

                  <!--放置页码//可以删除不要-->
                  <div class="page-box" style="margin:5px 0 0 62px">
                    <div id="pagination" class="digg">
                      <span class="disabled">« 上一页</span>
                      <span class="current">1</span>
                      <span class="disabled">下一页 »</span>
                    </div>
                  </div>
                  <!--/放置页码-->


                </div>
                <!--/网友评论-->
</template>

<script>
  export default {
  props: ['id'],
  data () {
    return {
      comments:[],
      commenttxt:{
        commenttxt:''
      }
    }
  },
  methods: {
    getComments(){//获取数据列表
      let url =`${this.$api.commentList}goods/${this.id}?pageIndex=1&pageSize=10`;
      this.$http.get(url).then(res=>{
        if(res.data.status==0){
          this.comments=res.data.message;
        }
      })
    },
    sendComments(){//发表评论
    let url = `${this.$api.comment}goods/${this.id}`;
    this.$http.post(url,this.commenttxt).then(res=>{
      if(res.data.status==0){
        this.commenttxt.commenttxt=''; // 成功后清空评论框
        this.getComments(); // 成功后刷新评论列表
      }
    })
    }
  } ,
  created () {  // 上来主动获取一次评论列表进行渲染
    this.getComments();
  } ,
 // 当用户访问新的商品时, 需要重新调接口获取新商品的评论列表进行渲染
 watch: {
   id(){
     this.getComments();
   }
 }
  };
</script>

<style scoped>

</style>