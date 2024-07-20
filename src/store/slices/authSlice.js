export const creatAuthSlice = (set)=>({
    userInfo:undefined,
    setUserInfo:(userInfo)=> set({userInfo})
})