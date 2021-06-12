import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {User} from './models';
import {colName} from './models/UserSchema';
import handleError from './handlers/error';
import authRoutes from './routes/auth';
import cookieRoutes from './routes/cookie';
import cartRoutes from './routes/cart';
import {isLoggedIn, isCorrectUser} from './middlewares/auth';

dotenv.config({path: '../.env'});

const PORT = process.env.PORT_BACKEND;
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/user/auth/', authRoutes);
app.use('/cookie/', cookieRoutes);
app.use('/user/:id/cart/', isLoggedIn,isCorrectUser, cartRoutes);

// app.get('/', (req, res, next) => {
// 	User.deleteOne({[colName.EMAIL]: 'a@b.com'}).then(() => {
// 		User.create({
// 			[colName.EMAIL]: 'a@b.com',
// 			[colName.NAME]: 'a b',
// 			[colName.PASSWORD]: 'ertyui'
// 		})
// 		.then(() => {
// 			User.find({
// 				[colName.EMAIL]: 'a@b.com',
// 			})
// 			.then((resp) => {
// 				console.log('hi', resp);
// 			})
// 		});
// 	})

// })

app.use(handleError);

app.listen(PORT, () => {
	console.log(`Listening on Port: ${PORT}`);
})
