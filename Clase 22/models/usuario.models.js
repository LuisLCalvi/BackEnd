const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
	username: { type: String, required: true,  unique: true },
	password: { type: String, required: true },
	address: { type: String, required: true, },
});
const usuarioModel = mongoose.model("Usuarios", UserSchema);

module.exports =  usuarioModel;
