import axios from 'axios';

const aTypeGetCookieData = 'GetCookieData';
const aTypeGetCookieCategories = 'GetCookieCategories';
const aTypeIncShowLoaderCount = 'IncShowLoaderCount';
const aTypeDecShowLoaderCount = 'DecShowLoaderCount';
const aTypeSetError = 'SetError';
const aTypeRemoveError = 'RemoveError';
const aTypeSetCurrentPath = 'SetCurrentPath';

function getCookieData(val){
    return {
        type: aTypeGetCookieData,
        val
    }
}

function getCookieCategories(val){
    return {
        type: aTypeGetCookieCategories,
        val
    }
}

function incShowLoaderCount(){
    return {
        type: aTypeIncShowLoaderCount
    }
}

function decShowLoaderCount(){
    return {
        type: aTypeDecShowLoaderCount
    }
}

function setError(errorMsg){
    return{
        type: aTypeSetError,
        errorMsg
    }
}
function removeError(){
    return{
        type: aTypeRemoveError
    }
}

function setCurrentPath(val){
    return{
        type: aTypeSetCurrentPath,
        val
    }
}

function getCookieCategoriesAsync(){
    const getCategoriesUrl = 'http://localhost:3001/cookie/categories';
    return (dispatch)=>{
        dispatch(incShowLoaderCount());
        axios.get(getCategoriesUrl, {
            timeout: 5000
        })
        .then((res)=>{
            setTimeout(()=>{
                dispatch(getCookieCategories(res.data.categoryNames));
            },2000);
        })
        .catch((e)=>{
            dispatch(setError(e.message));
            console.log(e.message);
        })
        .finally(()=>{
            setTimeout(()=>{
                dispatch(decShowLoaderCount());
            },2000);
        });
    }
}

function getCookieDataAsync(){
    const getCookiesUrl = 'http://localhost:3001/cookie/getAll';
    return (dispatch)=>{
        dispatch(incShowLoaderCount());
        console.log('called');
        axios.get(getCookiesUrl, {
            timeout: 5000
        })
        .then((res)=>{
            setTimeout(()=>{
                dispatch(getCookieData(res.data)); 
            },1000);
        })
        .catch((e)=>{
            dispatch(setError(e.message));
            console.log(e.message);
        })
        .finally(()=>{
            setTimeout(()=>{
                dispatch(decShowLoaderCount());
            },1000);
        });
    }
}

export {
        aTypeGetCookieData,
        aTypeGetCookieCategories,
        aTypeIncShowLoaderCount,
        aTypeDecShowLoaderCount,
        aTypeRemoveError,
        aTypeSetError,
        aTypeSetCurrentPath,
        incShowLoaderCount,
        decShowLoaderCount,
        getCookieDataAsync,
        getCookieCategoriesAsync,
        setError,
        removeError,
        setCurrentPath
    }