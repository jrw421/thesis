
const intialState = {
            id: null,
            hostId: null,
            location: '',
            description: '',
            date: '',
            currentEventRegistery: [{id: null, itemName: '', userId: null}],
            invitedGuests: [],
            attending: []
        }

export default function currentEvent(state = intialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_EVENT':
            return Object.assign({}, state, action.event)
        case 'UPDATE_LOCATION':
            return Object.assign({}, state, {
                location: action.location
            })
        case 'UPDATE_DESCRIPTION':
            return Object.assign({}, state, {
                description: action.description
            })
        case 'UPDATE_DATE':
            return Object.assign({}, state, {
                date: action.date
            })
        case 'ADD_ITEM': 
            return Object.assign({}, state, {
                currentEventRegistry: [...state.currentEventRegistery, action.item] 
            })
        case 'REMOVE_ITEM':
            return Object.assign({}, state, {
                currentEventRegistry: [...state.currentEventRegistry].splice(action.index, 1)
            })
        case 'ASSIGN_ITEM':
            let copy = [...state.currentEventRegistery];
            copy[action.index].userId = action.userId;
            return Object.assign({}, state, {
                currentEventRegistry: copy
            })
        case 'ADD_GUEST':
            return Object.assign({}, state, {
                invitedGuests: [...state.invitedGuests, action.guest] 
            })
        case 'TOGGLE_GUEST_ATTENDANCE':
            let copy = [...state.attending];
            copy[action.index].reply = !copy[action.index].reply
            return Object.assign({}, state, {
                attending: copy
            })
        default:
            return state
    }
}

// Actions
    // update location
    // update Description
    // update Dat
    // add item to registery
    // remove item from registery
    // assign item to guest
    // reassign item to guest
    // add guest
    // toggle guest from invited to attending

    store.dispatch()