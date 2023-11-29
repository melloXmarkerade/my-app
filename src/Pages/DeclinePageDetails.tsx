import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';

interface UserDetails {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    birthday: string;
    username: string;
    status: string;
  }


interface  DeclinePageDetailsSC {}

const  DeclinePageDetails: React.FC< DeclinePageDetailsSC> = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const [Accepted, setAccepted] = useState(false);
  const [Declined, setDeclined] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userSnapshot = await db.ref(`userAccounts/${username}`).get();

        if (userSnapshot.exists()) {
          const userData: UserDetails = userSnapshot.val();
          setUser(userData);
          setAccepted(userData.status === 'Accepted');
          setDeclined(userData.status === 'Declined');
        } else {
          // Handle case where user does not exist
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleSave = () => {
    setEditable(false);
    // Add logic to save the edited values to the database
  };

  const handleEdit = () => {
    console.log('Edit button clicked');
    setEditable(true);
    console.log('Editable set to true');
  };
  const handleCancel = () => {
    setEditable(false);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back
  };


  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <h2>Declined User Details</h2>
    {editable ? (
      <div className='DetailForm'>
        <label>
          First Name:
          <input type="text" value={user.firstName} onChange={(e) => console.log(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={user.lastName} onChange={(e) => console.log(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={user.username} onChange={(e) => console.log(e.target.value)} />
        </label>
        <br />
        <button onClick={handleSave} className='accept'>💾</button>
        <button onClick={handleCancel} className='cancel'>✖️</button>
      </div>
    ) : (
        <div className='DetailForm'>
          <p>First Name: <span className='user-detail'>{user.firstName}</span></p>
          <p>Last Name: <span className='user-detail'>{user.lastName}</span></p>
          <p>Birthday: <span className='user-detail'>{user.birthday}</span></p>
          <p>Email: <span className='user-detail'>{user.email}</span></p>
          <p>Password: <span className='user-detail'>{user.password}</span></p>
          <p>Username: <span className='user-detail'>{user.username}</span></p>
          <p>Status: <span className='user-detail'>{user.status}</span></p>
            &nbsp;
            &nbsp;
            <button onClick={handleEdit} className='edit'>📝</button>
            &nbsp;
            &nbsp;
            <button onClick={handleBack} className='back'>←</button>
        </div>
        )}
      </div>
  );
};

export default DeclinePageDetails;

