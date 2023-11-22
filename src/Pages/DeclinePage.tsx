import '../App.css';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the database instance

interface DeclineAccounts {
    firstName: string;
    lastName: string;
    username: string;
    status: string;
  }


export default function DeclinePage() {
  const [tableData, setTableData] = useState<DeclineAccounts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

//fetch the data from firebase
useEffect(() => {
    const fetchData = async () => {
      try {
        const userAccountsRef = db.ref('DeclineUserAccounts'); // Use the ref method directly on the database instance

        userAccountsRef.on('value', (snapshot) => {
          const data: DeclineAccounts[] = [];
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            data.push(childData);
          });

          setTableData(data);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Decline Accounts</h2>
    

                {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, index) => (
                         <tr key={index}>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.username}</td>
                                <td>{row.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
    </div>

    
  );
}