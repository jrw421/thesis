const DASHBOARD_QUERY2 = gql `
  query eventQuery($id: String){
    user (hash: $id){
      guestEvent{
        id
         name
         description
         img
      }
    }
  }
`

const DashboardWithData = compose(
  graphql(DASHBOARD_QUERY2, {
    skip: (props) => (props.currentGuest.params.id === '0'),
    options: (props) => {
      return ({variables: {id: props.currentGuest.params.id}})
    },
    name: 'eventQuery'
  })


  const GUEST_QUERY = gql `
    query guestQuery ($id: String){
      user(hash: $id) {
        id
      }
    }
  `

  const ItemGuest = graphql(GUEST_QUERY, {
    skip: (props) => (typeof props.currentUser !== 'string'),
    options: (props) => ({variables: {id: props.currentUser}}),
    name: 'guestQuery'
  })(Item)
