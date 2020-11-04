import { get, post, del } from '@/utils/request';

/**
 * 获取购物车数据
 */
export function loadCartsAPI() {
  return get('/api/v1/shop_carts');
}

/**
 * 加入购物车
 */
export function addCartAPI(product, quantity = 1) {
  return post('/api/v1/shop_carts', {
    product,
    quantity,
  });
}
/**
 * 移除购物车
 */
export function delCartAPI(id) {
  return del('/api/v1/shop_carts/' + id);
}
