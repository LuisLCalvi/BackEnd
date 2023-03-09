const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String, required: true, },
	age: { type: Number, required: true },
	avatar: {  },
});
const usuarioModel = mongoose.model("Usuarios", UserSchema);

module.exports =  usuarioModel;
