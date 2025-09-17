import { JordanProduct } from '../types';

export const jordanProducts: JordanProduct[] = [
  {
    id: 'aj1-bred-toe',
    name: 'Air Jordan 1 Retro High OG "Bred Toe"',
    price: 170,
    images: [
      '/api/placeholder/400/400?text=AJ1+Bred+Toe+1',
      '/api/placeholder/400/400?text=AJ1+Bred+Toe+2',
      '/api/placeholder/400/400?text=AJ1+Bred+Toe+3',
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
    name: 'Air Jordan 4 Retro "Black Cat"',
    price: 200,
    images: [
      '/api/placeholder/400/400?text=AJ4+Black+Cat+1',
      '/api/placeholder/400/400?text=AJ4+Black+Cat+2',
      '/api/placeholder/400/400?text=AJ4+Black+Cat+3',
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
    id: 'aj11-jubilee',
    name: 'Air Jordan 11 Retro "Jubilee"',
    price: 220,
    originalPrice: 250,
    images: [
      '/api/placeholder/400/400?text=AJ11+Jubilee+1',
      '/api/placeholder/400/400?text=AJ11+Jubilee+2',
      '/api/placeholder/400/400?text=AJ11+Jubilee+3',
    ],
    shoe360Images: Array.from({ length: 36 }, (_, i) =>
      `/api/placeholder/800/800?text=AJ11+360+${i + 1}`
    ),
    colorway: 'White/Black-Metallic Silver',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    isNewArrival: false,
    category: 'men',
  },
  {
    id: 'aj3-white-cement',
    name: 'Air Jordan 3 Retro "White Cement"',
    price: 190,
    images: [
      '/api/placeholder/400/400?text=AJ3+White+Cement+1',
      '/api/placeholder/400/400?text=AJ3+White+Cement+2',
      '/api/placeholder/400/400?text=AJ3+White+Cement+3',
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
    name: 'Air Jordan 6 Retro "Infrared"',
    price: 190,
    images: [
      '/api/placeholder/400/400?text=AJ6+Infrared+1',
      '/api/placeholder/400/400?text=AJ6+Infrared+2',
      '/api/placeholder/400/400?text=AJ6+Infrared+3',
    ],
    shoe360Images: Array.from({ length: 36 }, (_, i) =>
      `/api/placeholder/800/800?text=AJ6+360+${i + 1}`
    ),
    colorway: 'Black/Infrared 23-Black',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    isNewArrival: true,
    category: 'men',
  },
  {
    id: 'aj12-taxi',
    name: 'Air Jordan 12 Retro "Taxi"',
    price: 190,
    images: [
      '/api/placeholder/400/400?text=AJ12+Taxi+1',
      '/api/placeholder/400/400?text=AJ12+Taxi+2',
      '/api/placeholder/400/400?text=AJ12+Taxi+3',
    ],
    shoe360Images: Array.from({ length: 36 }, (_, i) =>
      `/api/placeholder/800/800?text=AJ12+360+${i + 1}`
    ),
    colorway: 'White/Black-Taxi',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    isNewArrival: false,
    category: 'men',
  },
];

export const getNewArrivals = (): JordanProduct[] => {
  return jordanProducts.filter(product => product.isNewArrival);
};

export const getProductById = (id: string): JordanProduct | undefined => {
  return jordanProducts.find(product => product.id === id);
};