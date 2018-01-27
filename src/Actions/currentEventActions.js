// Actions
    // update location
    // update Description
    // update Date
    // add item to registery
    // remove item from registery
    // assign item to guest
    // reassign item to guest
    // add guest
    // toggle guest from invited to attending

export const setCurrentEvent = event => {
    return {
        type: 'SET_CURRENT_EVENT',
        event
    }
}

export const updateLocation = location => {
    return {
        type: 'UPDATE_LOCATION',
        location
    }
}


export const updateDescription = description => {
    return {
        type: 'UPDATE_DESCRIPTION',
        description
    }
}

export const updateDate = date => {
    return {
        type: 'UPDATE_DATE',
        date
    }
}

export const addItem = item => {
    return {
        type: 'ADD_ITEM',
        item
    }
}

export const removeItem = index => {
    return {
        type: 'REMOVE_ITEM',
        index
    }
}

export const assignItem = userId => {
    return {
        type: 'ASSIGN_ITEM',
        userId
    }
}

export const addGuest = guest => {
    return {
        type: 'ADD_GUEST',
        guest
    }
}

export const removeGuest = index => {
    return {
        type: 'REMOVE_GUEST',
        index
    }
}