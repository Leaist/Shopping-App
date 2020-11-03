import { get } from "@/utils/request";

/**
 * 从服务器获取商品数据
 */
export function loadProductsFromServer(params) {
  return get("/api/v1/products",params);
}