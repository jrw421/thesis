const knex = require('../dbConfig.js').knex;
const Vote = require('../ModelsDB/vote.js');
const conn = require('../dbConfig.js').conn;

const VoteController = {
  upVote: function(item_id, user_id, cb) {
    // check if user has already voted on item
    conn.query(
      `select * from votes WHERE item_id = ${item_id} AND user_id = ${user_id}`,
      (err, results, fields) => {
        if (err) {
          cb(err, null);
        } else if (results.length === 0) {
          conn.query(
            `INSERT INTO votes (item_id, user_id, vote) VALUES (${item_id}, ${user_id}, 1)`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                conn.query(
                  `SELECT * from votes WHERE id = ${result.insertId}`,
                  (err, results, fields) => {
                    if (err) {
                      cb(err, null);
                    } else {
                      cb(null, results[0]);
                    }
                  }
                );
              }
            }
          );
        } else if (results[0].vote === 1) {
          // delete this vote
          conn.query(
            `DELETE FROM votes WHERE item_id = ${item_id} AND user_id = ${user_id}`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                cb(null, result);
              }
            }
          );
        } else {
          conn.query(
            `UPDATE votes SET vote = 1 WHERE item_id = ${item_id} AND user_id = ${user_id}`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                conn.query(
                  `SELECT * from votes WHERE id = ${result.insertId}`,
                  (err, results, fields) => {
                    if (err) {
                      cb(err, null);
                    } else {
                      cb(null, results[0]);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  },
  downVote: function(item_id, user_id, cb) {
    conn.query(
      `select * from votes WHERE item_id = ${item_id} AND user_id = ${user_id}`,
      (err, results, fields) => {
        if (err) {
          cb(err, null);
        } else if (results.length === 0) {
          conn.query(
            `INSERT INTO votes (item_id, user_id, vote) VALUES (${item_id}, ${user_id}, -1)`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                conn.query(
                  `SELECT * from votes WHERE id = ${result.insertId}`,
                  (err, results, fields) => {
                    if (err) {
                      cb(err, null);
                    } else {
                      cb(null, results[0]);
                    }
                  }
                );
              }
            }
          );
        } else if (results[0].vote === -1) {
          // delete this vote
          conn.query(
            `DELETE FROM votes WHERE item_id = ${item_id} AND user_id = ${user_id}`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                cb(null, result);
              }
            }
          );
        } else {
          conn.query(
            `UPDATE votes SET vote = -1 WHERE item_id = ${item_id} AND user_id = ${user_id}`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                conn.query(
                  `SELECT * from votes WHERE id = ${result.insertId}`,
                  (err, results, fields) => {
                    if (err) {
                      cb(err, null);
                    } else {
                      cb(null, results[0]);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  },
  getUpVotesForItem: function(item_id, cb) {
    conn.query(
      `SELECT * FROM votes WHERE item_id = ${item_id} AND vote = 1`,
      (err, results, fields) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
        }
      }
    );
  },
  getDownVotesForItem: function(item_id, cb) {
    conn.query(
      `SELECT * FROM votes WHERE item_id = ${item_id} AND vote = -1`,
      (err, results, fields) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
        }
      }
    );
  }
};

module.exports = VoteController;
