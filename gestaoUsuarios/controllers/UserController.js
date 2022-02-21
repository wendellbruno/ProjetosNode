const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");

const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

const bcrypt = require("bcrypt");


class UserController{
    async index(req, res){
        const users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        const id = req.body.id;
        const user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(user);
        }
    }

    async create(req, res){
        const {email, name, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: "O e-mail é inválido!"})
            return;
        }

        const emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!"})
            return;
        }

        await User.create(email,password,name);
        
        res.status(200);
        res.send("Tudo OK!");
    }

    async edit(req, res){
        const {id, name, role, email} = req.body;
        const result = await User.update(id,email,name,role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK!");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req, res){
        const id = req.body.id;

        const result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        const email = req.body.email;
        const result = await PasswordToken.create(email);
        if(result.status){
           res.status(200);
           res.send("" + result.token);
        }else{
            res.status(406)
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        const token = req.body.token;
        const password = req.body.password;
        const isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        }else{
            res.status(406);
            res.send("Token inválido!");
        }
    }

    async login(req, res){
        const { id, password} = req.body;

            const user = await User.findById(id);
            try{
                if(user != undefined){
                    console.log(id, password," user ", user.id, user.password)
    
                   //gera um boleano 
                  const resultado =  await bcrypt.compare(password, user.password);

                  if(resultado){
                      const token = jwt.sign({name : user.name, role: user.role}, secret)
                      res.status(200);
                      res.json({token: token})
                  }else{
                    res.status(406)
                    res.send("Senha incorreta")
                  }
                }else{
                    res.json({status: false});
                }
            }catch(erro){
                console.log(erro)
            }
           

        }
    }

module.exports = new UserController();