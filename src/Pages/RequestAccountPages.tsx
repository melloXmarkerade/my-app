import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Import the database instance

interface TableRow {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthday: string;
  username: string;
  status: string;
}

const RequestAccountPage: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Accepted, setAccepted] = useState(false);
  const [Declined, setDeclined] = useState(false);
  const [OtherDataPending, setOtherDataPending] = useState(false);

  type LinkToType = {
    pathname: string;
    state: { user: TableRow };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAccountsRef = db.ref('userAccounts');
  
        userAccountsRef.on('value', (snapshot) => {
          const data: TableRow[] = [];
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            data.push(childData);
          });
  
          // Filter out users with 'Pending' status
          const filteredData = data.filter((user) => user.status === 'Pending');
  
          // Assuming each user has a 'status' attribute
          const acceptedUsers = filteredData.filter((user) => user.status === 'Accepted');
          const declinedUsers = filteredData.filter((user) => user.status === 'Declined');
          
          setTableData(filteredData);
          setAccepted(acceptedUsers.length > 0);
          setDeclined(declinedUsers.length > 0);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleDecline = async (user: TableRow) => {
    try {
      const { username, firstName, lastName } = user;
     // Reference to the existing user account
     const updateuserAccountsRef = db.ref(`userAccounts/${username}`);
  
     // Get the current status of the user
     const userSnapshot = await updateuserAccountsRef.once('value');
     const userStatus = userSnapshot.val().status;
 
     // Check if the user is already accepted
     if (userStatus !== 'Accepted') {
       // Update the status of the existing user account to 'Decline'
       console.log('Updating user with username:', username);
       await updateuserAccountsRef.update({
         status: 'Declined',
       });
       console.log('Update successful');
 
       // Set local state to reflect the changes
       setAccepted(false);
       setDeclined(true);
 
        // Add the user to the DeclineUserAccounts node
        const userAccountsRef = db.ref(`DeclineUserAccounts/`);
  
        // Generate a new unique key for the user
        const newUserRefDecline = userAccountsRef.push();
  
        // Set the user details with the status as "Decline"
        await newUserRefDecline.set({
          firstName,
          lastName,
          username,
          status: 'Accepted',
        });
    
  
        // Log success
        console.log('User added with Decline status');
      } else {
        console.log('Cannot decline an accepted user');
      }
    } catch (error) {
      // Handle the error
      console.error('Error declining user:', error);
    }
    console.log('Decline button clicked');
  };

  const handleAccept = async (user: TableRow) => {
    try {
      const { username, firstName, lastName } = user;
  
      // Reference to the existing user account
      const updateuserAccountsRef = db.ref(`userAccounts/${username}`);
  
      // Update the status of the existing user account to 'Accepted'
      console.log('Updating user with username:', username);
      await updateuserAccountsRef.update({
        status: 'Accepted',
      });
      console.log('Update successful');
  
      // Set local state to reflect the changes
      setAccepted(true);
      setDeclined(false);
  
      const userAccountsRef = db.ref(`ApprovedUserAccounts/`);
  
      // Generate a new unique key for the user
      const AccpetnewUserRef = userAccountsRef.push();
  
      // Set the user details with the status as "accepted"
      await AccpetnewUserRef.set({
        firstName,
        lastName,
        username,
        status: 'Accepted',
      });
  
      // Log success
      console.log('User added with accepted status');
    } catch (error) {
      // Handle the error
      console.error('Error accepting user:', error);
    }
    console.log('Accept button clicked');
  };
  
  return (
    <div>
      <h2>Request Account Page</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan={5}>No more request accounts</td>
              </tr>
            ) : (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.username}</td>
                  <td>{row.status}</td>
                  <td>
                    <button className="button-like-Accept" onClick={() => handleAccept(row)} disabled={row.status === 'Accepted' || row.status === 'Declined'}>✔️</button>
                      &nbsp;
                    <button className="button-like-Decline" onClick={() => handleDecline(row)} disabled={row.status === 'Accepted' || row.status === 'Declined'}>✖️</button>
                    &nbsp;
                    <Link
                      to={{
                        pathname: `/requestAccountPageDetails/${row.username}`,
                        state: { user: row },
                      } as LinkToType}
                    >
                      <b>
                        <p className="button-like">More Details</p>
                      </b>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestAccountPage;
