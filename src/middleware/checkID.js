const checkID = (req, res, next) => {
    try{
        var id = req.params.id; 

        if(id == null){
            throw "id not found"; 
        }
        else next(); 
    }
    catch(err){
        res.status(500).send({ error: err, message: "failure", data: null });
    }
};
  
module.exports = checkID;
  