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

const AllAccountPage: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <h2>All Account Page</h2>

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
                    
                    <Link
                      to={{
                        pathname: `/AllAccountPageDetails/${row.username}`,
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

export default AllAccountPage;
