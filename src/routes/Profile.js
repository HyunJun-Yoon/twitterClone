import { authService, dbService } from 'fBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyTweet = async () => {
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
    console.log(tweets.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    getMyTweet();
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
    }
    refreshUser();
  };

  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type='text'
          placeholder='Display Name'
          value={newDisplayName}
        />
        <input type='submit' value='Update Profile' />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
