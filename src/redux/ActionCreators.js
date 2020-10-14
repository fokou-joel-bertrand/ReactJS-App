import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
   type: ActionTypes.ADD_COMMENT,
   payload: {
       dishId: dishId,
       rating: rating,
       author: author,
       comment: comment
   }
});

export const fetchDishes = () => dispatch => {
    dispatch(dishesLoding(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}

export const dishesLoding = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesFailed = errMess => ({
    type: ActionTypes.ADD_DISHES,
    payload: errMess
})