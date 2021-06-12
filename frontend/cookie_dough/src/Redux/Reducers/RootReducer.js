import {combineReducers} from 'redux';
import globalStylesReducer from './GlobalStyle/GlobalStylesReducer';
import globalDataReducer from './GlobalData/GlobalDataReducer';
const rootReducer = combineReducers({
    globalStyle: globalStylesReducer,
    globalData: globalDataReducer
});
export default rootReducer;