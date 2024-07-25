import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    oops: {
      fontSize: '72px',
      fontWeight: 'bold',
      marginBottom: '20px',
      background: 'linear-gradient(to right, #000080, #4B0082)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    errorCode: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    message: {
      fontSize: '16px',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: 'autoPurple',
      color: 'autoPurple',
      border: 'autoPurple',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.oops}>Oops!</h1>
      <h2 style={styles.errorCode}>404 - PAGE NOT FOUND</h2>
      <p style={styles.message}>
        The page you are looking for might have been removed,
        <br />
        had its name changed or is temporarily unavailable.
      </p>
      <Link to="/" style={styles.button}>
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default PageNotFound;