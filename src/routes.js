const express = require('express');
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/Multer");

const jogoController = require('./controllers/JogoController');
const consoleController = require("./controllers/ConsoleController");
const consoleVarianteController = require("./controllers/ConsoleVarianteController");
const nivelController = require("./controllers/NivelController");
const usuarioController = require("./controllers/UsuarioController");
require("dotenv-safe").config();


function verifyJWT(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  
  
      // Se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

////////rotas do jogo

routes.post("/novojogo",jogoController.create);

routes.put("/imagem/:id",multer(multerConfig).single("imagem"),jogoController.insertCaminhoImagemJogo);

routes.get("/jogos",jogoController.selectAll);

routes.get("/jogo/:id",jogoController.selectById);

routes.get("/jogosConsole/:id",jogoController.select);

routes.get("/jogosOn",jogoController.selectWhereStatusOn);

routes.put("/atualizarJogo",jogoController.update);

routes.delete("/deletarJogo/:id",jogoController.delete);


////Rotas Console

routes.post("/novoConsole",consoleController.insert);

routes.get("/allConsoles",consoleController.selectAll);

routes.get("/console/:id",consoleController.selectById);

routes.get("/consolesOn",consoleController.selectWhereStatusOn);

routes.put("/atualizarConsole",consoleController.update);

routes.delete("/deletarConsole/:id",consoleController.delete);

////Rotas Console

routes.get("/consolesVarianteIdConsole/:id",consoleVarianteController.selectWhereIdConsole);

/////Rotas dos niveis

routes.get("/allNiveis",nivelController.selectAll);

routes.get("/nivel/:id",nivelController.selectById);

routes.get("/niveisOn",nivelController.selectAllWhereStatusOn);

routes.post("/novoNivel",nivelController.insert);

routes.put("/atualizarNivel",nivelController.update);

routes.delete("/deletarNivel/:id",nivelController.delete);

//// Rotas do Usuario

routes.get("/allUsuarios",usuarioController.selectAll);

routes.get("/usuario/:id",usuarioController.selectById);

routes.get("/usuariosOn",usuarioController.selectWhereStatusOn);

routes.post("/novoUsuario",usuarioController.insert);

routes.put("/atualizarUsuario",usuarioController.update);

routes.delete("/deletarUsuario/:id",usuarioController.delete);

routes.post("/login",usuarioController.login);


module.exports = routes;