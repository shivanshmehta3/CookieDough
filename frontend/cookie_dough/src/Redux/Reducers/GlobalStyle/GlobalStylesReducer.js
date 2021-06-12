import {aTypeUpdateHeaderHeight, aTypeCategoryFieldHeight, aTypeIsDocReady} from './ActionCreater';

let initialState = {
    isDocumentReady: false,
    headerHeight:0,
    categoryFieldHeight: 0
}

function globalStylesReducer(state = initialState, action){
    switch(action.type){
        case aTypeUpdateHeaderHeight:{
            return {...state, headerHeight: action.val};
        }
        case aTypeCategoryFieldHeight:{
            let headerHeight = state.headerHeight;
            return {...state, categoryFieldHeight: headerHeight + action.val};
        }
        case aTypeIsDocReady:{
            return {...state, isDocumentReady: action.val}
        }
        default:{
            return state;
        }
    }
}

export default globalStylesReducer;