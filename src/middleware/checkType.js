const checkType = (req, res, next) => {
    try{
        const {type, sub_type} = req.body;

        if(type == null || sub_type == null){
            throw "you must specify a type"
        }

        next(); 
    }
    catch(err){
        res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
    
};
  
module.exports = checkType;
  