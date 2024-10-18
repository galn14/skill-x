// src/components/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { get } from '../api.service'; // Import your API service to validate token

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state for debugging

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Check token from localStorage
        if (token) {
          // Call your API to validate the token
          const response = await get('validate-token', { token });
          if (response.valid) {
            setIsAuthenticated(true); // Token is valid
          } else {
            setError('Invalid token'); // Set error if token is invalid
            setIsAuthenticated(false); // Token is invalid
          }
        } else {
          setError('No token found'); // No token found
          setIsAuthenticated(false); // No token, so not authenticated
        }
      } catch (error) {
        setError('Token validation failed: ' + (error as Error).message); // Log the validation error
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after token validation
      }
    };

    checkToken(); // Call the function to check token validity
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while validating the token
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} /> // If authenticated, render the component
        ) : (
          <>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display validation error */}
            <Redirect to="/login" /> {/* Redirect to login if not authenticated */}
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
