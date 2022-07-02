module.exports.errorHandler = (err, req, res, next) => {
  let new_err = {};

  if (err.name === "SequelizeForeignKeyConstraintError") {
    new_err["message"] = `cannot find the specified ${err.fields[0]}`;
  } else if (err.name === "SequelizeValidationError") {
    new_err["type"] = `${err.errors[0].type} on ${err.errors[0].path}`;
    new_err["message"] = err.errors[0].message;
  } else new_err = err;
  // console.log(err)
  //! auth controller errors are not handled yet
  //! don't know if there are other possible sequelize errors?

  res.status(500).send({ error: new_err, message: "failure", data: null });
};
