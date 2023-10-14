<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:23:56
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:23:56
-->
<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ ProductDetails.goods_price_min }}</span>
          <span class="oldprice">￥{{ ProductDetails.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ ProductDetails.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ ProductDetails.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ total }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <!-- 动态渲染用户评论的头像 -->
            <!-- 如果有头像就渲染,没有就渲染默认头像 -->
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <!-- 动态渲染用户的评分 10分就是五颗星 10/2=5 -->
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="ProductDetails.content">
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="addFn">加入购物车</div>
      <div class="btn-buy" @click="buyFn">立刻购买</div>
    </div>

    <!-- 加入购物车的弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立刻购买'">
    <div class="product">
    <div class="product-title">
      <div class="left">
        <img :src="ProductDetails.goods_image" alt="">
      </div>
      <div class="right">
        <div class="price">
          <span>¥</span>
          <span class="nowprice">{{ ProductDetails.goods_price_min }}</span>
        </div>
        <div class="count">
          <span>库存</span>
          <span>{{ ProductDetails.stock_total}}</span>
        </div>
      </div>
    </div>
    <div class="num-box">
      <span>数量</span>
      <!-- 加入购物车-数字框基本封装 -->
      <CountBox v-model="addCount"></CountBox>
    </div>

    <!-- 有库存才显示提交按钮 -->
    <div class="showbtn" v-if="ProductDetails.stock_total > 0">
      <div class="btn" v-if="mode === 'cart'">加入购物车</div>
      <div class="btn now" v-if="mode === 'buyNow'">立刻购买</div>
    </div>
    <div class="btn-none" v-else>该商品已抢完</div>
  </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProDetail, getProComments } from '@/api/product'

// 导入用户评论默认头像
import defaultImg from '@/assets/default-avatar.png'
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）

import CountBox from '@/components/CountBox.vue'
export default {
  /** 注册组件 */
  components: {
    CountBox
  },
  /** 接受父组件传值 */
  props: {},
  name: 'ProDetail',
  data () {
    return {
      images: [], // 初始化商品详情图片默认为空
      current: 0, // 商品详情图片轮播图
      // detail: {},
      ProductDetails: {}, // 商品详情

      commentList: [], // 评价列表
      total: [], // 总评价数
      defaultImg, // 用户评论默认头像

      showPannel: false, // 购物车弹层默认关闭
      mode: 'cart', // 标记弹层状态

      addCount: 1// 数字框绑定的数据
    }
  },
  /** 计算属性 */
  computed: {
    // 计算属性用于获取当前路由的商品 ID
    goodsId () {
      // 从当前路由对象 $route 中获取 params 属性
      // 然后从 params 属性中获取名为 id 的值
      return this.$route.params.id
    }
  },
  /** 监听data数据变化 */
  watch: {},
  /** 所有方法 */
  methods: {
    // 监听用户更改索引时触发的方法，用于更新当前索引
    onChange (index) {
      this.current = index
    },
    // 异步方法，用于获取商品详情数据
    async getDetail () {
      // 通过 getProDetail 函数获取商品详情，使用 this.goodsId 作为参数
      const { data: { detail } } = await getProDetail(this.goodsId)

      // 将获取到的商品详情数据存储在组件的 detail 属性中
      this.ProductDetails = detail

      // 获取商品图片信息并存储在 images 属性中
      this.images = detail.goods_images
      // 打印商品详情图片
      // console.log(this.images)
    },

    // 异步方法，用于获取商品评价数据
    async getComments () {
      // 通过 getProComments 函数获取商品评价数据，使用 this.goodsId 作为参数，同时限制展示3条评论
      const { data: { list, total } } = await getProComments(this.goodsId, 3)

      // 将获取到的商品评价列表存储在组件的 commentList 属性中
      this.commentList = list

      // 存储评价的总数
      this.total = total
    },

    // 点击“加入购物车”按钮时触发的方法
    addFn () {
      this.mode = 'cart'// 将 mode 设置为 'cart'，表示用户执行了加入购物车操作
      this.showPannel = true// 显示购物车面板
    },

    // 点击“立刻购买”按钮时触发的方法
    buyFn () {
      this.mode = 'buyNow'// 将 mode 设置为 'cart'，表示用户执行了购买操作
      this.showPannel = true// 显示购物车面板
    }
  },
  /** 创建组件时执行(有VM对象this) */
  created () {
    this.getDetail()// 封装方法获取-商品详情
    this.getComments() // 封装方法获取-商品评价
  },
  /** 加载完组件时执行(主要预处理数据) */
  mounted () {

  },
  beforeCreate () { /** 生命周期 - 创建之前 */ },
  beforeMount () { /** 生命周期 - 挂载之前 */ },
  beforeUpdate () { /** 生命周期 - 更新之前 */ },
  updated () { /** 生命周期 - 更新之后 */ },
  beforeDestroy () { /** 生命周期 - 销毁之前 */ },
  destroyed () { /** 生命周期 - 销毁完成 */ },
  activated () { /** keep-alive组件激活时调用。仅针对keep-alive组件有效 */ },
  deactivated () { /** keep-alive组件停用时调用。仅针对keep-alive组件有效 */ }
}
</script>

<style scoped lang='less'>
 /* @import url(); 引入css类 */
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
      cursor: pointer; /* 显示手型光标 */
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

// 加入购物车和立即购买弹层样式
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
</style>
