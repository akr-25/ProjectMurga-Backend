function handleError (err, req, res, next) {
    const new_err = {} 


    if(err.name === "SequelizeForeignKeyConstraintError"){
        new_err["message"] = `cannot find the specified ${err.fields[0]}`
    }
    else if(err.name === "SequelizeValidationError"){
        new_err["type"] = `${err.errors[0].type} on ${err.errors[0].path}`
        new_err["message"] = err.errors[0].message
    }
    else new_err = err

    res.status(500).send({ error: new_err, message: "failure", data: null });
}

module.exports = handleError; 

//! ISME KYA GALTI KR DIYA? 
