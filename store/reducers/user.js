const initialUserState = {
    name: ''
}

export function userReducer(state=initialUserState, actions){
    switch (actions.key) {
        case 'USER_':
            return {
                ...state,
                test: actions.test
            }
        default: return state
    }
}