import { StoreType } from './storeType';

export default interface ICoupon {
  id: number;
  title: string;
  price: number;
  percent: number;
  limit: number;
  store_type: StoreType[];
}
