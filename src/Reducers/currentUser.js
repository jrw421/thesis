const initialState = {
    id: null, 
    name: '', 
    email: '', 
    member_status: ''
}

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MEMBER_STATUS': 
            return Object.assign({}, state, {
                member_status: !state.member_status
            })
            default: 
                return state
    }
}

export default currentUser