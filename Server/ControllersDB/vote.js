const knex = require('../dbConfig.js').knex;
const Vote = require('../ModelsDB/vote.js');

const VoteController = {
  upVote: function (item_id, user_id) {
    // check if user has already voted on item
    return knex('votes')
      .where('item_id', '=', item_id)
      .andWhere('user_id', '=', user_id)
      .then((results) => {
        if (results.length === 0) {
          return new Vote({
            item_id,
            user_id,
            vote: 1,
          })
            .save()
            .then(vote => vote)
            .catch(error => ['upvote', error]);
        } 
        
        if (results[0].vote === 1) {
          return knex('votes')
            .where('id', '=', results[0].id)
            .del()
            .then(result => result)
            .catch(error => ['upvote2', error]);
        }

        return knex('votes')
          .where('id', '=', results[0].id)
          .update({ vote: 1 })
          .then(result => result)
          .catch(error => ['upvote3', error]);
      })
      .catch(error => ['upvote3', error]);
  },
  downVote: function(item_id, user_id)  {
    return knex('votes')
      .where('item_id', '=', item_id)
      .andWhere('user_id', '=', user_id)
      .then((results) => {
        if (results.length === 0) {
          return new Vote ({
            item_id,
            user_id,
            vote: -1,
          })
            .save()
            .then(vote => vote)
            .catch(error => ['downvote', error]);
        } else if (results[0].vote === -1) {
          return knex('votes')
            .where('id', '=', results[0].id)
            .del()
            .then(result => result)
            .catch(error => ['downvote2', error]);
        }
        return knex('votes')
          .where('id', '=', results[0].id)
          .update({ vote: -1 })
          .then(result => result)
          .catch(error => ['upvote3', error]);
      })
      .catch(error => ['upvote3', error]);
  },
  getUpVotesForItem: function(item_id) {
    return knex('votes')
            .where('item_id', '=', item_id)
            .andWhere('vote', '=', 1)
            .then(results => results)
            .catch(error => ['getupvotesforitem', error])
  },
  getDownVotesForItem: function(item_id) {
    return knex('votes')
            .where('item_id', '=', item_id)
            .andWhere('vote', '=', -1)
            .then(results => results)
            .catch(error => ['getdownvoteforitem', error])
  },
  hasUserVotedForItem: function(user_id, item_id) {
    return knex('votes')
      .where('item_id', '=', item_id)
      .andWhere('user_id', '=', user_id)
      .then(results => {
        return results.length === 0 ? false : true
      })
      .catch(error => ['hasuservotedforitem', error])
  }
}

module.exports = VoteController
