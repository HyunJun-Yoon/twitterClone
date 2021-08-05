import { dbService } from 'fBase';
import React, { useState } from 'react';

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?');
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing(prev => !prev);

  return (
    <div>
      {editing ? (
        <>
          <form>
            <input value={newTweet} required />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          {' '}
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
