const knex = require('../dbConfig.js').knex;
const ItemComment = require('../ModelsDB/itemComments.js');
const conn = require('../dbConfig.js').conn;

itemCommentsController = {
  addItemComment: function(itemComment, cb) {
    const { content, user_id, item_id, event_id } = itemComment;

    conn.query(
      `INSERT INTO itemComments (content, user_id, item_id, event_id) VALUES ('${content}', ${user_id}, ${item_id}, ${event_id})`,
      (err, result) => {
        if (err) {
          cb(err, null);
        } else {
          conn.query(
            `SELECT * FROM itemComments WHERE id = ${result.insertId}`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                cb(null, result[0]);
              }
            }
          );
        }
      }
    );
  },
  incrementLike: function(id, cb) {
    conn.query(
      `SELECT likes FROM itemComments WHERE id = ${id}`,
      (err, result, fields) => {
        if (err) {
          cb(err, null);
        } else {
          let votes = result[0].likes + 1;
          conn.query(
            `UPDATE itemComments SET likes = ${votes} WHERE id = ${id}`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                conn.query(
                  `SELECT * FROM itemComments WHERE id = ${id}`,
                  (err, result) => {
                    if (err) {
                      cb(err, null);
                    } else {
                      cb(null, result[0]);
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
  decrementLike: function(id, cb) {
    conn.query(
      `SELECT likes FROM itemComments WHERE id = ${id}`,
      (err, result, fields) => {
        if (err) {
          cb(err, null);
        } else {
          let votes = result[0].likes - 1;
          conn.query(
            `UPDATE itemComments SET likes = ${votes} WHERE id = ${id}`,
            (err, result) => {
              if (err) {
                cb(err, null);
              } else {
                conn.query(
                  `SELECT * FROM itemComments WHERE id = ${id}`,
                  (err, result) => {
                    if (err) {
                      cb(err, null);
                    } else {
                      cb(null, result[0]);
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
  getItemCommentsByItemId: function(item_id, cb) {
    conn.query(
      `SELECT * FROM itemComments WHERE item_id = ${item_id}`,
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
module.exports = itemCommentsController;
