import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { getDataReducer } from "./Presentation/Get/reducer";
import { addDataReducer } from "./Presentation/Post/reducer";

import { getSectionsDataReducer } from "./Sections/Get/reducer";
import { addSectionsDataReducer } from "./Sections/Post/reducer";

import { getAttributesDataReducer } from "./Attributes/Get/reducer";
import { addAttributesDataReducer } from "./Attributes/Post/reducer";

import { getUserDataReducer } from "./Auth/Get/reducer";
import { addUserDataReducer } from "./Auth/Post/reducer";
import thunk from "redux-thunk";
import { getUserTOKENReducer } from "./Auth/AuthToken/reducer";

//combine reducers
const rootReducer = combineReducers({
  get: getDataReducer,
  post: addDataReducer,
  getSections: getSectionsDataReducer,
  postSections: addSectionsDataReducer,
  getAttributes: getAttributesDataReducer,
  postAttributes: addAttributesDataReducer,
  getUser: getUserDataReducer,
  postUser: addUserDataReducer,
  token: getUserTOKENReducer,
});

//reduxtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

//store
export const store = createStore(rootReducer, enhancer);
