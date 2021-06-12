const aTypeUpdateHeaderHeight = 'UpdateHeaderHeight';
const aTypeCategoryFieldHeight = 'CategoryFieldHeight';
const aTypeIsDocReady = 'IsDocumentReady';

function updateHeaderHeight(val){
    return {
        type: aTypeUpdateHeaderHeight,
        val
    }
}
function updateCategoryFieldHeight(val){
    return {
        type: aTypeCategoryFieldHeight,
        val
    }
}
function updateIsDocReady(val){
    return {
        type: aTypeIsDocReady,
        val
    }
}

export {
        aTypeUpdateHeaderHeight,
        aTypeCategoryFieldHeight,
        aTypeIsDocReady,
        updateHeaderHeight,
        updateCategoryFieldHeight,
        updateIsDocReady
    }