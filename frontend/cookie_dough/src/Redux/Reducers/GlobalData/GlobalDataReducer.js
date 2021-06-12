import {
    aTypeGetCookieData,
    aTypeIncShowLoaderCount,
    aTypeDecShowLoaderCount, 
    aTypeGetCookieCategories,
    aTypeSetError,
    aTypeRemoveError,
    aTypeSetCurrentPath
} from './ActionCreater';

let initialState = {
    cookieData: [],
    cookieCategories: [],
    showLoaderCount: 0,
    hasError: false,
    errorMsg: '',
    currentPath: '/home'
}

function globalDataReducer(state = initialState, action){
    switch(action.type){
        case aTypeGetCookieData:{
            console.log('get cookie');
            return {...state, cookieData: action.val};
        }
        case aTypeIncShowLoaderCount:{
            console.log('inc set loader',state.showLoaderCount);
            return {...state, showLoaderCount: ++state.showLoaderCount};
        }
        case aTypeDecShowLoaderCount:{
            console.log('dec set loader', state.showLoaderCount);
            return {...state, showLoaderCount: --state.showLoaderCount};
        }
        case aTypeGetCookieCategories:{
            console.log('get categ');
            return {...state, cookieCategories: action.val};
        }
        case aTypeSetError:{
            console.log('set error');
            return {...state, errorMsg: action.errorMsg};
        }
        case aTypeRemoveError:{
            console.log('remove error');
            return {...state, errorMsg: ''};
        }
        case aTypeSetCurrentPath:{
            console.log('set current path');
            return {...state, currentPath: action.val};
        }
        default:{
            return state;
        }
    }
}

export default globalDataReducer;