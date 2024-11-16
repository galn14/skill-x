// src/components/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { get } from '../api.service'; // Import your API service to validate token

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state for debugging

  useEffect(() => {
    
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
