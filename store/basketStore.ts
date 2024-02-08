import { create } from 'zustand';
import {  PersistStorage, persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export interface BasketState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const storageAdapter: PersistStorage<BasketState> = {
  getItem: (name) => AsyncStorage.getItem(name).then((res) => res ? JSON.parse(res) : null),
  setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => AsyncStorage.removeItem(name),
};

const useBasketStore = create(persist<BasketState>(
  (set) => ({
    products: [],
    items: 0,
    total: 0,
    addProduct: (product) => {
      set((state) => {
        state.items += 1;
        state.total += product.price;
        const hasProduct = state.products.find((p) => p.id === product.id);

        if (hasProduct) {
          hasProduct.quantity += 1;
          return { products: [...state.products] };
        } else {
          return { products: [...state.products, { ...product, quantity: 1 }] };
        }
      });
    },
    reduceProduct: (product) => {
      set((state) => {
        state.total -= product.price;
        state.items -= 1;
        return {
          products: state.products
            .map((p) => {
              if (p.id === product.id) {
                p.quantity -= 1;
              }
              return p;
            })
            .filter((p) => p.quantity > 0),
        };
      });
    },
    clearCart: () => set({ products: [], items: 0, total: 0 }),
  }), { 
    name: 'basketStore',
    skipHydration: true,
      storage: storageAdapter,
    }),
);

export default useBasketStore;
