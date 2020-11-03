<template>
  <!-- 热卖页 -->
  <div class="hot">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card
        v-for="item in list"
        :key="item._id"
        :num="item.quantity"
        :price="(item.price / 100).toFixed(2)"
        :title="item.name"
        :thumb="item.coverImg | dalImg"
      >
        <!-- <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template> -->
        <template #footer>
          <van-button @click="buy(item)" type="danger" size="mini"
            >加入购物车</van-button
          >
          <!-- <van-button size="mini">按钮</van-button> -->
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
// import Vue from 'vue';
import { Toast } from "vant";
import { loadProductsFromServer } from "../services/products";
import { addCartAPI } from "../services/catrs";
export default {
  data() {
    return {
      list: [],
      query: {},
      loading: false, //是否正在加载，当触底的时候触发load事件，设置loading为true，当加载完成之后，设置loading为false
      finished: false, //是否加载完成,当加载到最后一页之后设置finished为true，然后触底时间不再被触发
      page: 1,
      pages: 1, //总页数
    };
  },
  async created() {
    // fetch("https://www.xiaomiyoupin.com/homepage/main/v1002?platform=pc")
    //   .then((res) => res.json())
    //   .then((res) => (this.list = res.data.recommend.floors[0].data));
  },
  methods: {
    onLoad() {
      //
      console.log("开始加载数据");
      this.loadData();
    },
    async loadData() {
      //当数据加载完成之后设置finished
      if (this.page > this.pages) {
        this.finished = true;
        return false;
      }
      this.loading = true;
      //加载数据
      // console.log("加载数据");
      // setTimeout(() => (this.loading = false), 5000);
      if (this.$route.query.c) {
        this.query.product_category = this.$route.query.c;
      }
      this.query.page = this.page; //设置查询条件的页码
      const res = await loadProductsFromServer(this.query);
      // console.log(res);
      this.pages = res.pages;
      this.page++;
      this.list = [...this.list, ...res.products];
      this.loading = false;
    },
    //eslint是一个代码规范性检测插件，可以自行配置各种操作
    // eslint-disable-next-line no-unused-vars
    async buy(item) {
      console.log("加入购物车");
      await addCartAPI(item._id, 1);
      Toast.success("加入购物车成功");
    },
  },
};
</script>

