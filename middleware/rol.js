const {handleHttpError}= require("../utils/handleError")
/**Array con los roles permitidos */
const checkRol = (roles) =>(req, res, next) =>{
    try{
        const {user} = req;
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle)=> rolesByUser.includes(rolSingle))

        if(!checkValueRol){
            handleHttpError(res, "USER-NOT_PERMISSIONS", 403)
            ruturn;
        }

        next();
    }catch(e){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
};

module.exports = checkRol;