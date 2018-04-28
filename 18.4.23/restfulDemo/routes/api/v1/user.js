'use strict';

const userCtrl = require('../../../controllers/api/v1/user');


module.exports = (router)=>{

    router.post('/user',userCtrl.addUser);

    router.delete('/user/:uId',userCtrl.deleteUser);

    router.get('/user/:uId',userCtrl.getUser);

    router.put('/user/',userCtrl.updateUser);
}
