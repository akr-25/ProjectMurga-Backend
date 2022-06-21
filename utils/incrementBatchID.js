exports.incrementBatchID = function(count, type, sub_type){
    let id = type[0] + sub_type[0] + "-" + (count+1); 
    return id; 
}