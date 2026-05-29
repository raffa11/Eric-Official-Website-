/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Registration, RegistrationContextType } from '../types';
import { MOCK_INITIAL_REGISTRATIONS } from '../utils/mockData';

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [currentRegistration, setCurrentRegistration] = useState<Registration | null>(null);

  // Initialize from LocalStorage or seed data
  useEffect(() => {
    const stored = localStorage.getItem('eric_registrations');
    if (stored) {
      try {
        setRegistrations(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse registrations', e);
        setRegistrations(MOCK_INITIAL_REGISTRATIONS);
      }
    } else {
      setRegistrations(MOCK_INITIAL_REGISTRATIONS);
      localStorage.setItem('eric_registrations', JSON.stringify(MOCK_INITIAL_REGISTRATIONS));
    }
  }, []);

  const addRegistration = (
    reg: Omit<Registration, 'id' | 'regDate' | 'paymentStatus' | 'transactionId' | 'paymentMethod'>
  ): Registration => {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const newReg: Registration = {
      ...reg,
      id: `REG-${randomId}`,
      regDate: new Date().toISOString(),
      paymentStatus: 'Pending',
      paymentMethod: null,
      transactionId: null,
    };

    const updated = [newReg, ...registrations];
    setRegistrations(updated);
    localStorage.setItem('eric_registrations', JSON.stringify(updated));
    setCurrentRegistration(newReg);
    return newReg;
  };

  const updateRegistrationPayment = (
    id: string,
    method: 'Card' | 'QRIS',
    transactionId: string,
    status: Registration['paymentStatus']
  ) => {
    const updated = registrations.map((r) => {
      if (r.id === id) {
        const item: Registration = {
          ...r,
          paymentMethod: method,
          transactionId: transactionId,
          paymentStatus: status,
        };
        // Update current registration state if it is the active one
        if (currentRegistration && currentRegistration.id === id) {
          setCurrentRegistration(item);
        }
        return item;
      }
      return r;
    });

    setRegistrations(updated);
    localStorage.setItem('eric_registrations', JSON.stringify(updated));
  };

  const updateStatus = (id: string, status: Registration['paymentStatus']) => {
    const updated = registrations.map((r) => {
      if (r.id === id) {
        const item: Registration = { ...r, paymentStatus: status };
        if (currentRegistration && currentRegistration.id === id) {
          setCurrentRegistration(item);
        }
        return item;
      }
      return r;
    });
    setRegistrations(updated);
    localStorage.setItem('eric_registrations', JSON.stringify(updated));
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        addRegistration,
        updateRegistrationPayment,
        updateStatus,
        currentRegistration,
        setCurrentRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrations = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistrations must be used within a RegistrationProvider');
  }
  return context;
};
