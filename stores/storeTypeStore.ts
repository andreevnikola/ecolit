import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { StoreType } from '~/types/storeType';
import { IUser } from '~/types/user';

export const getTypeDataFromName = (name: StoreType) => ({
  color: typeToColorMapper.get(name)!,
  type: name,
  icon: typeToIconMapper.get(name)!,
  additional: typeToAdditionalMapper.get(name)!,
});

export const storeTypesList: StoreType[] = [
  'всичко',
  'мегамаркет',
  'облекло',
  'ресторант',
  'спорт',
  'храна',
];

const typeToAdditionalMapper = new Map<StoreType, { title: string; description: string }>([
  [
    'всичко',
    {
      title: 'Всякакви стоки',
      description:
        'На тази локация има магазин продаващ всякакъв вид стоки, в който можете да пазарувате с нашите ЕкоКупони. За него важат само EcoКупоните, предназначени за употреба в магазини за всякакви стоки.',
    },
  ],
  [
    'мегамаркет',
    {
      title: 'Мегамаркет',
      description:
        'На тази локация има мегамаркет, в който можете да пазарувате с нашите ЕкоКупони. За него важат само EcoКупоните, предназначени за употреба в мегамаркети.',
    },
  ],
  [
    'облекло',
    {
      title: 'Магазин за дрехи и обувки',
      description:
        'На тази локация има магазин продаващ дрехи и обувки, в който можете да пазарувате с нашите ЕкоКупони. За него важат само EcoКупоните, предназначени за употреба в магазини за облекло.',
    },
  ],
  [
    'ресторант',
    {
      title: 'Ресторант',
      description:
        'На тази локация има ресторант, в който можете да пазарувате с нашите ЕкоКупони. За него важат само EcoКупоните, предназначени за употреба в ресторанти.',
    },
  ],
  [
    'спорт',
    {
      title: 'Магазин за спортна екипировка',
      description:
        'На тази локация има магазин продаващ спортна екипировка, облекла и обувки, в който можете да пазарувате с нашите ЕкоКупони. За него важат само EcoКупоните, предназначени за употреба в магазини за спортна екипировка.',
    },
  ],
  [
    'храна',
    {
      title: 'Хранителен магазин',
      description:
        'На тази локация има хранителен магазин, в който можете да пазарувате с нашите ЕкоКупони. За него важат само EcoКупоните, предназначени за употреба в хранителни магазини.',
    },
  ],
]);

const typeToIconMapper = new Map<StoreType, string>([
  ['всичко', 'pricetags'],
  ['мегамаркет', 'cart-outline'],
  ['облекло', 'shirt-outline'],
  ['ресторант', 'fast-food-outline'],
  ['спорт', 'baseball-outline'],
  ['храна', 'pizza-outline'],
]);

const typeToColorMapper = new Map([
  ['всичко', '98, 204, 110'],
  ['мегамаркет', '75, 204, 191'],
  ['облекло', '102, 95, 199'],
  ['ресторант', '204, 140, 57'],
  ['спорт', '178, 247, 146'],
  ['храна', '210, 230, 122'],
]);

interface IStoreType {
  type: StoreType;
  setType: (newType: StoreType) => void;
  icon: string;
  color: string;
  additional: {
    title: string;
    description: string;
  };
}

export const useStoreTypeStore = create<IStoreType>((set) => ({
  type: 'всичко',
  color: typeToColorMapper.get('всичко')!,
  icon: typeToIconMapper.get('всичко')!,
  additional: typeToAdditionalMapper.get('всичко')!,
  setType: (newType: StoreType) =>
    set({
      type: newType,
      color: typeToColorMapper.get(newType)!,
      additional: typeToAdditionalMapper.get(newType),
    }),
}));
