import { authService, dbService } from 'fBase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
  const history = useHistory();
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
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
