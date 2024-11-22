import { CartState } from "@/types/cartType";
import { MenuItem } from "@/types/restaurantType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useCartStore = create<CartState>()(persist((set) => ({
    cart: [],
    addToCart: (item: MenuItem) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: { cart: any[]; }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const exisitingItem = state.cart.find((cartItem: { _id: any; }) => cartItem._id === item._id);
            if (exisitingItem) {
                // already added in cart then inc qty
                return {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cart: state?.cart.map((cartItem: { _id: any; quantity: number; }) => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    )
                };
            } else {
                // add cart
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                }
            }
        })
    },
    clearCart: () => {
        set({ cart: [] });
    },
    removeFromTheCart: (id: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: { cart: any[]; }) => ({
            cart: state.cart.filter((item: { _id: string; }) => item._id !== id)
        }))
    },
    incrementQuantity: (id: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: { cart: any[]; }) => ({
            cart: state.cart.map((item: { _id: string; quantity: number; }) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
        }))
    },
    decrementQuantity: (id: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: { cart: any[]; }) => ({
            cart: state.cart.map((item: { _id: string; quantity: number; }) => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
        }))
    }
}),
    {
        name: 'cart-name',
        storage: createJSONStorage(() => localStorage)
    }
))