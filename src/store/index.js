import {configureStore} from "@reduxjs/toolkit";
import userStoreReducer from "@/store/modules/user";

const store = configureStore({
    reducer: {
        userStoreReducer
    }
})
export default store