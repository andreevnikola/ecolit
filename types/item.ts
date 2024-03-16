import ICoupon from './coupon';
import { IUser } from './user';

export interface IItem {
  id: number;
  bought_at: Date;
  is_active: boolean;
  coupon: ICoupon;
  user: IUser;
}
