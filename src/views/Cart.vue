<template>
  <!-- 购物车页 -->
  <div class="Cart">
    <div class="content">
      <div class="item" v-for="item in carts" :key="item._id">
        <van-checkbox style="width: '1.5rem'" v-model="item.checked">
          <van-card
            style="flex: 1"
            :num="item.quantity"
            :price="(item.product.price / 100).toFixed(2)"
            :title="item.product.name"
            :thumb="item.product.coverImg | dalImg"
          >
          </van-card>
        </van-checkbox>
      </div>
      <van-submit-bar
        style="position: static" 
        :price="sumPrice"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { loadCartsAPI } from "../services/catrs";
export default {
  name: "Cart",
  data() {
    return {
      carts: [],
    };
  },
  computed: {
    checked: {
      set(v) {
        this.carts.forEach((item) => (item.checked = v));
      },
      get() {
        return (
          this.carts.length === this.carts.filter((item) => item.checked).length
        );
      },
    },
    sumPrice() {
      return this.carts
        .filter((item) => item.checked)
        .reduce((pre, cur) => pre + cur.product.price * cur.quantity, 0);
    },
  },
  async created() {
    const res = await loadCartsAPI();
    console.log(res);
    this.carts = res.map((item) => ({ ...item, checked: false }));
  },
  methods: {
    onSubmit() {},
  },
};
</script>

<style scoped>
.item {
  display: flex;
  justify-content: center;
  padding: 10px 9px;
}
.Cart {
  display: flex;
  flex-direction: column;
}
.Cart .content {
  flex: 1;
  overflow: auto;
}
/* .van-submit-bar{
  position: inherit;
} */
</style>