
//Testing PAGE ONLY
//Testing PAGE ONLY
//Testing PAGE ONLY
//Testing PAGE ONLY
//Testing PAGE ONLY
//Testing PAGE ONLY

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const { username } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching user details based on the username parameter from an API or database
        async function fetchUserDetails() {
            try {
                const response = await fetch(`http://localhost:3001/api/userAccounts/${username}`);
                const data = await response.json();
                setUserDetails(data); // Set user details in state
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching user details:', error);
            }
        }

        fetchUserDetails();
    }, [username]); // Fetch user details whenever the username parameter changes

    if (isLoading) {
        return <p>Loading user details...</p>;
    }

    if (!userDetails) {
        return <p>User details not found.</p>;
    }

    return (
        <div>
            <h2>User Details</h2>
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            <p>Password: {userDetails.password ? '**'.repeat(userDetails.password.length) : 'N/A'}</p>
            <p>firstName: {userDetails.firstName}</p>
            {/* Display other user details as needed */}
        </div>
    );
}

export default UserDetails;