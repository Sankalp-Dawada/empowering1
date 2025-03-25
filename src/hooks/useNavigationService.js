// src/hooks/useNavigationService.js
import { useState } from 'react';

export const useNavigationService = () => {
  const [navigationStatus, setNavigationStatus] = useState('Inactive');

  const startSmartNavigation = () => {
    console.log('🛣️ Smart Navigation Started...');
    setNavigationStatus('Active');
  };

  const stopNavigation = () => {
    console.log('🛑 Navigation Stopped.');
    setNavigationStatus('Inactive');
  };

  return { navigationStatus, startSmartNavigation, stopNavigation };
};
