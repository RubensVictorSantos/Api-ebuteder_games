const brcypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Usuario = require("../models/Usuario");
const connection = require("../Database");

Usuario.init(connection);


module.exports = {

    async login(req, res) {
        const { email, senha } = req.body;

        console.log(
            "\n|************************************************************" +
            "\n|Email: " + email +
            "\n|Senha: " + senha +
            "\n|************************************************************\n"
        )

        const usuario = await Usuario.findOne({ where: { email } });

        const usuarioStringify = JSON.stringify(usuario);

        const usuarioJSON = JSON.parse(usuarioStringify);

            console.log("\n Usuario: " + usuarioStringify)

        if(usuarioJSON){
            if (brcypt.compareSync(senha, usuarioJSON.senha)) {

                const id = usuarioJSON.id_usuario;
    
                // auth ok
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });
    
                return res.json({usuario: usuario, auth: true, token: token});
    
            } else {
                return res.json({ status: "senhas não correspondem" });
    
            }
        }else{
            return res.json({ status: "Usuário não existe" });
        }
    },

    async selectAll(req, res) {
        const usuarios = await Usuario.findAll();

        return res.json(usuarios);
    },

    async selectById(req, res) {
        const id = req.params.id;
        const usuario = Usuario.findByPk(id);

        return res.json(usuario);
    },

    async selectWhereStatusOn(req, res) {
        const usuarios = Usuario.findAll({ where: { status: 1 } });

        return res.json(usuario);
    },

    async insert(req, res) {
        const { nome, email, senha, id_nivel } = req.body;

        console.log(typeof (req.body.nome));

        const emailJaCadastrado = await Usuario.findOne({ where: { email } });

        if (emailJaCadastrado == null) {

            const salt = brcypt.genSaltSync(10);

            const senhaCripto = brcypt.hashSync(senha, salt);

            const usuarioCriado = await Usuario.create({
                nome, email, senha: senhaCripto, id_nivel
            });

            return res.json(usuarioCriado);

        } else {
            return res.json({ status: "email já cadastrado" });
        }



    },

    async update(req, res) {

        console.log(
            req.body
        )

        const { id_usuario, nome, email, senha, id_nivel } = req.body;

        const salt = brcypt.genSaltSync(10);

        const senhaCripto = brcypt.hashSync(senha, salt);

        const statusUpdate = Usuario.update({
            nome, email, senhaCripto, id_nivel
        },
            {
                where: { id_usuario }
            });

        if (statusUpdate == 1) {
            const usuarioUpdated = Usuario.findByPk(id_usuario);

            return res.json(usuarioUpdated);
        } else {

            return res.json({ status: "erro ao atualizar" });
        }

    },

    async delete(req, res) {
        const id_usuario = req.params.id;

        try {
            await Usuario.destroy({ where: id_usuario });

            return res.json({ status: "Usuario deletado" });

        } catch (err) {
            console.log(err);
            return res.json({ status: "Erro ao deletar" });
        }


    }

}