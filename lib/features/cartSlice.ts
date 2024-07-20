import { type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

export interface CartSliceState {
    products: { id: number, quantity: number }[]
}

const initialState: CartSliceState = {
    products: []
}

export const cartSlice = createAppSlice({
    name: "cart",
    initialState,
    reducers: (create) => ({
        addProduct: create.reducer(
            (state, action: PayloadAction<number>) => {
                const product = action.payload;
                const existingProduct = state.products.find((i) => i.id === product);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    state.products.push({ id: product, quantity: 1 })
                }
            },
        ),
        removeProduct: create.reducer(
            (state, action: PayloadAction<number>) => {
                const product = action.payload;
                const existingProduct = state.products.find((i) => i.id === product);
                if (existingProduct) {
                    if (existingProduct.quantity > 1) {
                        existingProduct.quantity -= 1;
                    } else {
                        return { ...state, products: state.products.filter((i) => i.id !== product) }
                    }
                }
            },
        ),
        deleteProduct: create.reducer(
            (state, action: PayloadAction<number>) => {
                const product = action.payload;
                return { ...state, products: state.products.filter((i) => i.id !== product) }
            },
        ),
    }),
    selectors: {
        selectCart: (cart) => cart.products,
    },
});

export const { addProduct, removeProduct, deleteProduct } =
    cartSlice.actions;

export const { selectCart } = cartSlice.selectors;
