import React from 'react';
import gql from 'graphql-tag';
import { graphql} from 'react-apollo';
import { toggleClaim } from '../mutations.js'
import GqlItemComments from './itemComments2.jsx';
import GqlVote from './vote2.jsx';

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      search: []
    }
    this.handleItemClick = this.handleItemClick.bind(this)
    this.addItemToSearch = this.addItemToSearch.bind(this);
    console.log('this.props', this.props)
  }

  componentWillMount(){
    if (this.props.claimedBy && this.props.claimedBy.id === this.props.currentUser.id){
      this.setState({
        clicked: true
      })
    }
  }

  addItemToSearch(item) {
    this.setState({search: item});
  }

  handleItemClick = e => {
    this.setState({clicked: !this.state.clicked})

    this.props.toggleClaimOfItem({
       variables: {
         id: this.props.id,
         user_id: this.props.currentUser.id
       }
     }).catch(err => err)
   };

  render() {
    const shopSVG = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"/></svg>
    const isClicked = this.state.clicked
    console.log(this.props, 'item')
      if (this.props.claimedBy !== null && this.props.claimedBy !== undefined && this.props.currentUser.id !== this.props.claimedBy.id){ 
        return(
          <div className="item" >
           <div className="item-claim">
            <div>
            {this.props.name}
            </div>
            <div className="item-claim-claimant">
            {this.props.claimedBy.name}
            </div>
           </div>
          <GqlItemComments
            itemId={this.props.id}
            userId={this.props.currentUser.id}
            eventId={this.props.eventId}
          />
          <GqlVote
            item_id={this.props.id}
            user_id={this.props.currentUser.id}
          />
        </div>
        )
      } else {
        return(
          <div className="item">
            <GqlVote
            item_id={this.props.id}
            user_id={this.props.currentUser.id}
          />   

        {isClicked ? (
        <div>
        <div className="item-claim">
        <div>
        <a onClick={e => this.handleItemClick(e)}>
              {this.props.name} 
              </a>
            </div>
            <div className="item-claim-claimant">
              {this.props.currentUser.name}
            </div>
            </div>
             
              <div
              className="item-claim-shop-svg"
                onClick={() => {
                  window.location.href = `https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=${
                    this.props.name
                  }`;
                }}
              >
                {shopSVG}
              </div>
          </div>
          ) : (
           
            <a
              onClick={e => {
                this.handleItemClick(e);
                this.addItemToSearch(this.props.name);
              }}
            >
              {this.props.name}
            </a>
          )}

          <GqlItemComments
            itemId={this.props.id}
            userId={this.props.currentUser.id}
            eventId={this.props.eventId}
          />
       
        </div>
        )
      }
    } 
}

const guestClaim = 
  graphql(toggleClaim, { name: 'toggleClaimOfItem' })(Item)

export default guestClaim
