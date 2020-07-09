import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolist: reducer
});


export type AppStateType = ReturnType<typeof rootReducer>


const store = createStore(rootReducer,applyMiddleware(thunk));

export default store