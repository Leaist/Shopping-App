<template>
  <!-- 登录页 -->
  <div class="reg">
    <img
      style="width: 80%"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604324871518&di=cece8411484733b269c66511a98d5265&imgtype=0&src=http%3A%2F%2Fpic.baiqi008.com%2Fuploads%2Fcushrhrqx.jpeg"
      alt=""
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
        <router-link :to="{ name: 'Reg' }">没有账号，我要注册</router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Notify } from "vant";
import { loginAPI } from "@/services/auth";
import { setToken } from "@/utils/tools";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      // console.log(values);
      const u = await loginAPI(values);
      if (u.code === "success") {
        setToken(u.token);
        this.$router.push({
          name: "User",
        });
      } else {
        if (u.message == "user not found") {
          u.message = "该用户名不存在";
        }
        Notify({
          type: "warning",
          message: u.message,
        });
      }
      // console.log(u);
    },
  },
};
</script>

<style scoped>
.reg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>