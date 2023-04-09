import express from "express";
import { __dirname } from "./utils.js";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import jwtRouter from './routes/jwt.router.js';
import './persistencia/dbConfig.js';
import './passport/passportStrategies.js';

//session
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";

//solution to this: Handlebars: Access has been denied to resolve the property "title" because it is not an "own property" of its parent. You can add a runtime option to disable the check or this warning: See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for detail
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from 'handlebars';

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(__dirname+'/public'));

//still solution
const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

//session and file store 
server.use(cookieParser());
server.use(
  session({
    store: new MongoStore({
      mongoUrl: 'mongodb+srv://enrique:elmejor89@clusterguille.4in3fwr.mongodb.net/db_entregable?retryWrites=true&w=majority',
    }),
    resave: false,
    saveUninitialized: false,
    secret: "key",
    cookie: {
      maxAge: 120000,
    },
  })
)

//handlebars settings 
server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/views');

//Routers
server.get('/', (req, res)=>{
  res.redirect('/view/login');
})
server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);
server.use('/view', viewsRouter);
server.use('/user', userRouter);
server.use('/jwt', jwtRouter);

const PORT = 8080;

server.listen(PORT, ()=>{
  console.log("Connected trought PORT: " + PORT);
})