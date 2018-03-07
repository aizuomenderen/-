<template>
    <!--推荐商品-->
    <div class="left-220">
        <div class="bg-wrap nobg">
            <h4>推荐商品</h4>
            <ul class="side-img-list">
                <li v-for="(item,i) in list" :key="item.id">
                    <div class="img-box">
                        <!-- 侧边栏顺序逐渐加一 -->
                        <label>{{i+1}}</label>
                        <img :src="item.img_url">
                    </div>
                    <div class="txt-box">
                        <a href="/goods/show-98.html">{{item.title}}</a>
                        <!-- 时间过滤器 -->
                        <span>{{item.add_time|data}}</span>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    <!--/推荐商品-->
</template>

<script>
export default {
  props: ["list"], //接收父组件传过来的list数据
  filters: {
    //局部的过滤器
    data(tplDate) {
      //日期过滤器
      let date = new Date(tplDate);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
};
</script>

<style scoped>

</style>