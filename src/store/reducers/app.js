import * as actionTypes from "../actions/actionTypes";

const initialState = {
    tooltip: false,
    isLoading: false
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.TOGGLE_TOOLTIP: return {...state, tooltip: action.flag}
        default: return state;
    }
};

export default reducer;