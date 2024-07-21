import { type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { getMinMax } from "../utils";
import { mockProducts } from "../mockData";

export interface FilterSliceState {
    itemsToShow: number,
    search: string,
    priceRange: number[],
    availableOnly: boolean
}

const initialState: FilterSliceState = {
    itemsToShow: 6,
    search: '',
    priceRange: getMinMax(mockProducts),
    availableOnly: false
}

export const filterSlice = createAppSlice({
    name: "filter",
    initialState,
    reducers: (create) => ({
        updateFilter: create.reducer(
            (state, action: PayloadAction<Partial<FilterSliceState>>) => {
                const filter = action.payload;
                return { ...state, ...filter };
            },
        ),
        addItemsToShow: create.reducer(
            (state, action: PayloadAction<number>) => {
                const itemsToShow = action.payload;
                return { ...state, itemsToShow: itemsToShow + 3 };
            },
        ),
    }),
    selectors: {
        selectFilter: (filter) => filter,
    },
});

export const { updateFilter, addItemsToShow } =
    filterSlice.actions;

export const { selectFilter } = filterSlice.selectors;
