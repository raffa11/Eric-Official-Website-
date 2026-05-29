/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Competition {
  id: string; // SUMO500, SUMO3KG, etc.
  name: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  status: 'Open' | 'Closed' | 'Filling Fast';
  teamSize: { min: number; max: number };
  feeUSD: number;
  feeIDR: number;
  feeIDRText: string;
  targetAudience: string;
  techRequirements: string[];
  schedule: string;
  timeline: { step: string; date: string }[];
}

export interface Registration {
  id: string;
  competitionId: string;
  teamName: string;
  institution: string;
  teamLeader: string;
  whatsapp: string;
  members: string[]; // List of custom members
  regDate: string;
  paymentStatus: 'Pending' | 'Technical Review' | 'Approved' | 'Rejected'; // Pastel purple, pastel green, soft red, etc.
  paymentMethod: 'Card' | 'QRIS' | null;
  transactionId: string | null;
}

export interface User {
  name: string;
  email: string;
  institution?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, institution?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  triggerAuthCallback: (onSuccess: () => void) => void;
  onAuthSuccessCallback: (() => void) | null;
}

export interface RegistrationContextType {
  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, 'id' | 'regDate' | 'paymentStatus' | 'transactionId' | 'paymentMethod'>) => Registration;
  updateRegistrationPayment: (id: string, method: 'Card' | 'QRIS', transactionId: string, status: Registration['paymentStatus']) => void;
  updateStatus: (id: string, status: Registration['paymentStatus']) => void;
  currentRegistration: Registration | null;
  setCurrentRegistration: (reg: Registration | null) => void;
}
