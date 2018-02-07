import React from 'react';

const ItemComment = ({itemComment}) => {
  return (
    <div>
      {itemComment.user.name}: {itemComment.content}
    </div>
  );
};

export default ItemComment;