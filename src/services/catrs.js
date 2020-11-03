import { get, post } from '@/utils/request';

/**
 * 获取购物车数据
 */
export function loadCartsAPI() {
  return get("/api/v1/shop_carts");
}

/**
 * 加入购物车
 */
export function addCartAPI(product, quantity = 1) {
  return post("/api/v1/shop_carts", {
    product,
    quantity,
  });
}