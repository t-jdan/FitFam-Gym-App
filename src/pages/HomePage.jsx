import { LoadingSpinner } from '../components/LoadingSpinner';
import {LandingPage} from '../components/Landingpage';
import React, {useState, useEffect} from 'react'

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    fetchData();
  }, [])
  return (
    <div className="App">
      {isLoading ? (
        <LoadingSpinner/>
      ) : (
        <div>
        <LandingPage />
        </div>
      )}
    </div>
  );
}

