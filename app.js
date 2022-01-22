const {sequelize, User} = require('./models');

(async function(){
    await sequelize.sync({force:true});
    const cust = await User.create({user_id:"jdask"});
    await cust.createRequest({request_id:"sadsad"})
})().catch(e => {console.log(e)})