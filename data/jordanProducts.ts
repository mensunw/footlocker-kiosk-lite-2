import { JordanProduct } from '../types';

export const jordanProducts: JordanProduct[] = [
  {
    id: 'aj1-bred-toe',
    name: 'Jordan Retro 5 OG',
    price: 170,
    images: [
      "https://images.footlocker.com/is/image/EBFL2/Q7978101?wid=250&hei=250"
    ],
    shoe360Images: Array.from({ length: 36 }, (_, i) =>
      `/api/placeholder/800/800?text=AJ1+360+${i + 1}`
    ),
    colorway: 'Summit White/Black-Gym Red',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    isNewArrival: true,
    category: 'men',
  },
  {
    id: 'aj4-black-cat',
    name: 'Nike Air Diamond Turf',
    price: 200,
    images: [
      "https://images.footlocker.com/is/image/EBFL2/F2534100?wid=250&hei=250"
    ],
    shoe360Images: Array.from({ length: 36 }, (_, i) =>
      `/api/placeholder/800/800?text=AJ4+360+${i + 1}`
    ),
    colorway: 'Black/Black-Light Graphite',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    isNewArrival: true,
    category: 'men',
  },
  {
    id: 'aj3-white-cement',
    name: 'Nike Dunk Low',
    price: 190,
    images: [
      "https://images.footlocker.com/is/image/EBFL2/B9109013?wid=250&hei=250"
    ],
    shoe360Images: Array.from({ length: 36 }, (_, i) =>
      `/api/placeholder/800/800?text=AJ3+360+${i + 1}`
    ),
    colorway: 'White/Fire Red-Black-Cement Grey',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    isNewArrival: true,
    category: 'men',
  },
  {
    id: 'aj6-infrared',
    name: 'New Balance 1967R',
    price: 190,
    images: [
      "https://images.footlocker.com/is/image/EBFL2/1906RCFU?wid=250&hei=250"
    ],
    shoe360Images: Array.from({ length: 36 }, (_, i) =>
      `/api/placeholder/800/800?text=AJ6+360+${i + 1}`
    ),
    colorway: 'Black/Infrared 23-Black',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    isNewArrival: true,
    category: 'men',
  },
];

export const getNewArrivals = (): JordanProduct[] => {
  return jordanProducts.filter(product => product.isNewArrival);
};

export const getProductById = (id: string): JordanProduct | undefined => {
  return jordanProducts.find(product => product.id === id);
};