import * as Actions from "./types";
import axios from "axios";
import { apiHost } from "../../../constants";


export const addBook = (values, history) => {
    return dispatch => {
        axios.post(`${apiHost}/books`, values).then((result) => {
            dispatch({ type: Actions.ADD_BOOK, payload: result.data })
            history.push("/");
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const updateBook = (bookId, values, history) => {
    return dispatch => {
        axios.put(`${apiHost}/books/${bookId}`, values).then(result => {
            dispatch({ type: Actions.UPDATE_BOOK });
            history.push("/");
        }).catch(err => {
            console.log(err);
        })
    }
}

export const getBooks = () => {
    return dispatch => {
        dispatch({ type: Actions.LOAD_BOOKS });
        axios.get(`${apiHost}/books`).then((result) => {
            dispatch({ type: Actions.SET_BOOKS, payload: result.data })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const setFilter = (filter) => {
    return dispatch => {
        dispatch({ type: Actions.SET_FILTER, payload: filter })
    }
};

export const searchBooks = (searchTerm) => {
    return dispatch => {
        dispatch({
            type: Actions.SEARCH_BOOKS,
            payload: searchTerm

        });
    }
};

export const searchBy = (dropdownValue) => {
    return dispatch => {
        dispatch({
            type: Actions.SEARCH_BY,
            payload: dropdownValue
        })
    }
}

export const sortBooks = (sortTerm) => {
    return dispatch => {
        dispatch({
            type: Actions.SORT_BOOKS,
            payload: sortTerm
        });
    }
};

export const selectDirection = (direction) => {
    return dispatch => {
        dispatch({
            type: Actions.SELECT_DIRECTION,
            payload: direction
        })
    }
}