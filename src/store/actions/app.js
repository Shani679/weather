import * as actionTypes from "./actionTypes";

export const toggleTooltip = flag => {
    return {
        type: actionTypes.TOGGLE_TOOLTIP,
        flag
    }
}