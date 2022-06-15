const checkDate = (req, res, next) => {
    try{
        var {from, to} = req.query;
     
        if (to == null) {
            to = new Date();
        }
        
        if(from == null){
            from = new Date();
            from.setMonth(from.getMonth() -3); 
        }

        req.query.to = to; 
        req.query.from = from; 

        next(); 
    }
    catch(err){
        res
        .status(500)
        .send({ error: err, message: "failure in checking date", data: null });
    }
    
};
  
module.exports = checkDate;
  