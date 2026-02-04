import { combineReducers } from 'redux';

import user from './user';
import ui from './ui';
import books from './books';
import authors from './authors';
import genres from './genres';
import reviews from './reviews';

export default combineReducers({
    user,
    ui,
    books,
    authors,
    genres,
    reviews,
});
