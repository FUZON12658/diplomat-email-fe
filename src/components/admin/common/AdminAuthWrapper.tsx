'use client';
import React  from 'react';

const USERNAME = '9876543210'; // Hardcoded username
const PASSWORD = 'Nepal123!@#'; // Hardcoded password

export default function AdminAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const sessionActive = sessionStorage.getItem('isAuthenticated');
    if (sessionActive) {
      setIsAuthenticated(true);
    } else {
      authenticate();
    }
  }, []);

  const authenticate = () => {
    const enteredUsername = prompt('Enter your username:');
    const enteredPassword = prompt('Enter your password:');
    if (enteredUsername === USERNAME && enteredPassword === PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect username or password!');
      authenticate();
    }
  };

  if (!isAuthenticated) {
    return null; // Show nothing until authenticated
  }

  return <>{children}</>;
}
