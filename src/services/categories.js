import { get } from '@/utils/request';

/**
 * 获取所有的商品分类
 */
export function allCategories(){
  return get ('/api/v1/product_categories')
} 