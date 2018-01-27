const hostingEvents = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_EVENT':
            return [...state, action.newEvent]
        case 'DELETE_EVENT':
            let copy = [...state]
            copy.splice(action.index, 1)
            return copy
        default: 
            return state
    }
}