import mongoose from 'mongoose';
import User from './UserSchema';
import Cookie from './CookieSchema';
// import Cart from './CartSchema';

mongoose.connect('mongodb://localhost/cookie-dough-database');
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;

// export {User, Cookie, Cart};
export {User, Cookie};

