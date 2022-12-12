// configureStore - Թույլ է տալիս ստեղծ էլ մեր store ը
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"
//configureStore որպես առաջին արգումենտ ստանում է օբյեկտ որը ունի reducer անունով դաշտ 
// որնել իրենից ներկայացնում է օբյեկտ որի մեջ կլինեն մեր reducer ները 

export default configureStore({
    reducer: {
        todos : todoReducer
    }
})