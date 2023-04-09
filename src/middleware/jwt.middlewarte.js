import jwt from 'jsonwebtoken';

export const jwtValidation = (req, res, next) => {
    const authHeader = req.get('Authorization').split(' ')[1];
    console.log(authHeader);
    const isValid = jwt.verify(authHeader, 'secretKeyJWT');
    if (isValid){
        // console.log(isValid);
        req.user = isValid.user;
        next();
    } else {
        res.json({message: "Error"})
    }
}