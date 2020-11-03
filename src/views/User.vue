<template>
  <h1>个人中心-{{ user.userName }}</h1>
</template>

<script>
import { userInfoAPI } from "@/services/auth";
export default {
  name: "user",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  async created() {
    const res = await userInfoAPI();
    console.log(res);
    this.user = res;
  },
};
</script>

<style>
</style>
