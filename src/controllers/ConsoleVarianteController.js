const ConsoleVariante = require("../models/ConsoleVariante");
const connection = require("../Database");
const { update } = require("../models/ConsoleVariante");

ConsoleVariante.init(connection);

module.exports = {

    async selectWhereIdConsole(req,res){

        const id_console = req.params.id

        console.log(
            "-------------------\n"
            + id_console +
            "\n------------------"
        )

        const consoleVariante = await ConsoleVariante.findAll({
            where:{id_console : id_console}
        });

        return res.json(consoleVariante);

    },
}