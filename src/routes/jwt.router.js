import { Router } from "express";
import { comparePasswords, generateToken } from "../utils.js";
import { userModel } from "../persistencia/models/user.model.js";
import { jwtValidation } from "../middleware/jwt.middlewarte.js";
import passport from "passport";

const router = Router();

router.post('/login', async(req, res)=>{
    console.log(req.body);
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        const isPassword = await comparePasswords(password, user.password);
        if(isPassword){
            const token = generateToken(user);
            return res.cookie('token', token, {httpOnly: true}).json({token});
        }
    } else {
        res.json({message: "No vale xd"})
    }
})

router.get('/validation', jwtValidation, (req, res)=>{
    res.send({message: req.user});
})

router.get('/validationJwtPassport', passport.authenticate('jwtCookies', {session:false}), (req, res)=>{
    console.log(req);
    res.send({message: "SIUUUUUUUUUUUUUUUUUUUUUUUUU"});
})

export default router; 