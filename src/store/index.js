import { create } from "zustand";
import { creatAuthSlice } from "./slices/authSlice";
import { createChatSlice } from "./slices/chatSlice";

export const useAppStore = create()((...a) => ({
    ...creatAuthSlice(...a),
    ...createChatSlice(...a)
}))