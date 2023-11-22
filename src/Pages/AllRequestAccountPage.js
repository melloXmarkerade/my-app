import '../App.css';
import React, { useState, useEffect } from 'react';

function RequestAccountPage() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3001/api/userAccounts');
                const data = await response.json();
                console.log('Fetched Data:', data);
                setTableData(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []); 

    return (
        <div >
            <h2>All Request Account Page</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RequestAccountPage;