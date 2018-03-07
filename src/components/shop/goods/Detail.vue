<template>
  <div>
    <!-- 商品详情 -->
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">

              <!--商品图片//放大镜-->
              <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <div class="images-cover"></div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for="item in top.imglist" :key="item.id">
                          <div class="small-img">
                            <img :src="item.original_path" />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--缩略图-->
                  </div>
                  <div class="magnifier-view"></div>
                  <!--经过放大的图片显示容器-->
                </div>
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec">
                <h1>奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</h1>
                <p class="subtitle">送美诗特TA20无线话筒1套+自拍神器杆！ DTS解码数字功放 HDMI、光纤、同轴多组输入输出 USB、蓝牙播放功能</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">SD6583245641</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥5880.00</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥4880.00</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <input id="commodityChannelId" type="hidden" value="2">
                        <input id="commodityArticleId" type="hidden" value="98">
                        <input id="commodityGoodsId" type="hidden" value="0">
                        <input id="commoditySelectNum" type="text" maxlength="9" value="1" maxvalue="10" onkeydown="return checkNumber(event);">
                        <a class="add" onclick="addCartNum(1);">+</a>
                        <a class="remove" onclick="addCartNum(-1);">-</a>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">10</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                        <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息 teb栏  // -->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <el-tabs type="border-card">
                <el-tab-pane label="商品详情">
                  <div v-html="top.goodsinfo.content"></div>
                </el-tab-pane>
                <el-tab-pane label="商品评论">
                  <comment :id="id"></comment>
                </el-tab-pane>
              </el-tabs>

            </div>

          </div>
          <!--/页面左边-->

          <!-- 侧边栏 - 推荐商品列表, 抽取为公共组件 -->
          <app-aside :list="top.hotgoodslist"></app-aside>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
//引入jq插件
import "@/lib/imgzoom/css/magnifier.css";
import "@/lib/imgzoom/js/magnifier.js";
import $ from "jquery";

import AppAside from "./subcom/CommonAside.vue";

import Comment from "./subcom/CommonComment";
export default {
  components: {
    AppAside,
    Comment
  },
  data() {
    return {
      id: this.$route.params.id,
      num: 1,
      top: {
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      }
    };
  },
  methods: {
    // 根据当前id获取数据
    getTop() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        }
      });
    }
  },
  created() {
    //组价初始化完毕，数据可以用的时候才调用
    this.getTop();
  },
  $route() {
    this.id = this.$route.params.id;
    this.getTop();
  },
top(){ //显示放大镜
 var magnifierConfig = {
      magnifier: "#magnifier1", //最外层的大容器
      width: 350, //承载容器宽
      height: 350, //承载容器高
      moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
      zoom: 5 //缩放比例
    };
    setTimeout(function() {
      var _magnifier = $().imgzoon(magnifierConfig);
    }, 500);
},

  // 商品详情页面的右侧列表, 可以点击切换不同的商品进行预览
  // 然后主动发起http请求, 调用接口获取新id的数据进行视图刷新
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getTop();
    }
  }
};
</script>

<style scoped>

</style>