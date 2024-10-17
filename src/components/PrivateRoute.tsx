// src/components/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { get, getTokenFromAPI } from '../api.service'; // Import your API service to validate token

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Fetch the token stored in the backend (via the login response or in-memory session)
        const token = await getTokenFromAPI(); // Replace with your logic

        // Call your API to validate the token
        const response = await get('validate-token', { token });

        if (response.valid) {
          setIsAuthenticated(true); // Token is valid
        } else {
          setIsAuthenticated(false); // Token is invalid
        }
      } catch (error) {
        console.error('Token validation failed', error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while validating the token
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
