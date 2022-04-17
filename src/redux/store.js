import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./auth/reducers";
import notificationReducer from "./notification/reducers";
import categoryReducer from "./category/reducers";
import speakerReducer from "./speaker/reducers";
import eventReducer from "./event/reducers";
import listReducer from "./list/reducers";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  category: categoryReducer,
  speaker: speakerReducer,
  event: eventReducer,
  list: listReducer,
});

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
