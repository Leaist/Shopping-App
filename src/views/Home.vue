<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item"
        ><img :src="item" alt=""
      /></van-swipe-item>
    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="value in categories"
        :key="value._id"
        :icon="value.coverImg"
        :text="value.name"
        :to="{ name: 'Hot', query: { c: value._id } }"
      />
    </van-grid>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import moon from "../assets/moon.png";
import { allCategories } from "../services/categories";

export default {
  name: "Home",
  data() {
    return {
      // moon,
      banners: [
        "http://p1.music.126.net/RK0afgOEfCI6ktF59QPt9Q==/109951165431997666.jpg",
        "http://p1.music.126.net/BoxJAIv1RkIMoKzgD6FpiA==/109951165431084423.jpg",
      ],
      categories: [], //商品分类
    };
  },
  async created() {
    const res = await allCategories();
    this.categories = res.categories;
  },
  components: {
    // HelloWorld
  },
};
</script>
<style scoped>
/* scoped 表示只在当前组件内部生效 */
.my-swipe .van-swipe-item img {
  width: 100%;
}
</style>
