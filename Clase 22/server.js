const express = require("express")
const prodRouter = require("./router/productos.router");
const Producto = require ('./DAOs/productos.daos');
const Message = require ('./DAOs/mensajes.daos')
const { faker } = require("@faker-js/faker");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const carritoRouter = require('./router/carrito.router');
const { graphqlHTTP } = require("express-graphql");

const routerGraphql = require ('./router/productos.graphql')





require('dotenv').config()


const parseArgs = require("minimist")
const args = parseArgs(process.argv.slice(2), {default: {PORT: '8080'}})
const PORT = args.PORT

const {productSchema} = require('./models/producto.graph')


const newSession = require("./router/newConnect")

const router = express.Router();
const app = express();

const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const prod = new Producto();
const msg = new Message();
io.on("connection", async (socket) => {
    console.log('Usuario con id: ', socket.id, ' se ha conectado')

    let productos = await prod.getAll();
     let mensajes = await msg.getAll();

     socket.emit('messages', mensajes);

     socket.on("new-message", async (data) => {
        data.date = new Date().toLocaleDateString()
        msg.createData(data);

        console.log(data)
         io.sockets.emit("messages", mensajes);
     });


    
	socket.emit("productList", productos);


	socket.on("newProduct", async (data) => {
        await prod.createData(data);       

		io.sockets.emit("productList", productos)
	})
    socket.on("randomProduct",async(data) =>{
        await prod.createData(data);

        io.sockets.emit("productList", productos)
    })

})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.set("socketio", io);



app.use("/", newSession);
app.use("/api/productos-test", prodRouter);
app.use("/api/carritos", carritoRouter);

app.use("/api/productos", prodRouter);


app.use(
    "/graphql/prod",
    graphqlHTTP({
      schema: productSchema,
      rootValue: {
        getProduct: routerGraphql.getProductByIdGraph,
        getProducts: routerGraphql.getProductsGraph,
        createProduct: routerGraphql.createProductGraph,
        updateProduct: routerGraphql.updateProductGraph,
        deleteProduct: routerGraphql.deleteProductGraph,
      },
      graphiql: true,
    })
  );









httpServer.listen(PORT, () => console.log("servidor Levantado"));
