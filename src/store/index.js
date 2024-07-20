import { create } from "zustand";
import { creatAuthSlice } from "./slices/authSlice";

export const useAppStore = create()((...a) => ({
    ...creatAuthSlice(...a),
}))