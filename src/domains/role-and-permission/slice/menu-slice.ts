import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { Menu } from "../types";

type State = {
    menuList: Menu[] | [];
};

const initialState: State = {
    menuList: [],
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenus: (state, action) => {
            state.menuList = action.payload.menuList || [];
        }
    }
});

export const { setMenus } = menuSlice.actions;
export default menuSlice.reducer;

export const getMenuList = (state: RootState) => state.menu.menuList;