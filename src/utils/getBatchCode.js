exports.getBatchCode = function(type, sub_type){
    const s_type = String(type); 
    const s_sub_type = String(sub_type); 
    let id = s_type[0] + s_sub_type[0]; 
    return String(id); 
}