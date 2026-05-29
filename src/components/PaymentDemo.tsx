/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Registration, Competition } from '../types';
import { useRegistrations } from '../context/RegistrationContext';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

interface PaymentDemoProps {
  registration: Registration;
  competition: Competition;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PaymentDemo: React.FC<PaymentDemoProps> = ({
  registration,
  competition,
  onSuccess,
  onCancel
}) => {
  const { updateRegistrationPayment } = useRegistrations();
  
  const [payMethod, setPayMethod] = useState<'Card' | 'QRIS'>('Card');
  const [cardName, setCardName] = useState(registration.teamLeader);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Payment processing lifecycle states
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Securing registration');

  const formattedFee = competition.feeIDRText;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (processing) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1.25; // Slower tick for elite fintech elegance feel
          
          if (next < 35) {
            setStatusText('Securing registration');
          } else if (next >= 35 && next < 70) {
            setStatusText('Processing payment');
          } else if (next >= 70 && next < 98) {
            setStatusText('Verifying transaction');
          } else if (next >= 100) {
            clearInterval(interval);
            setProcessing(false);
            
            // Generate a premium random transaction index
            const txId = `TXN-${competition.id}-${Math.floor(1000000 + Math.random() * 9000000)}`;
            
            // Write approved status to the system context
            updateRegistrationPayment(registration.id, payMethod, txId, 'Approved');
            
            // Call success handler
            onSuccess();
            return 100;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [processing, updateRegistrationPayment, registration, competition, payMethod, onSuccess]);

  const handlePayTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (payMethod === 'Card') {
      if (!cardNumber || !cardExpiry || !cardCVV) {
        alert('Please fill in card details for mockup visualization.');
        return;
      }
    }
    setProgress(0);
    setProcessing(true);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6 bg-[#F8F7F3] text-zinc-900" id="payment-demo-container">
      {/* Fintech Card Wrapper */}
      <div className="bg-white rounded-3xl border border-black/[0.04] overflow-hidden shadow-sm p-8 space-y-8">
        
        {/* Core checkout header */}
        <div className="flex justify-between items-start border-b border-zinc-100 pb-5">
          <div>
            <span className="block text-[10px] font-mono tracking-wider text-royal font-extrabold uppercase">
              Fintech Checkout Engine
            </span>
            <h3 className="font-sans font-black text-xl text-zinc-900 leading-tight">Secure Payment Gateway</h3>
            <p className="text-[11px] text-zinc-400 font-mono mt-1">
              TEAM: {registration.teamName} // ID: {registration.id}
            </p>
          </div>
          <div className="text-right">
            <span className="block text-[11px] font-mono tracking-wider font-bold text-zinc-400 uppercase">
              Total Payable
            </span>
            <span className="block text-2xl font-sans font-black text-zinc-900">{formattedFee}</span>
            <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
              IDR Guaranteed
            </span>
          </div>
        </div>

        {/* Payment Processor Active loading screen overlay */}
        {processing ? (
          <div className="py-20 text-center space-y-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-royal/10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-gold animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <span className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase block">
                Transaction in progression
              </span>
              <h4 className="text-lg font-sans font-black text-zinc-900">{statusText}...</h4>
              <span className="text-[11px] font-mono text-zinc-500 block">Please wait. Do not close or refresh this tab.</span>
            </div>

            {/* Custom high fidelity loading bar */}
            <div className="w-full max-w-sm h-1.5 bg-zinc-105 rounded-full overflow-hidden relative">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-royal to-cobalt transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-zinc-400">{Math.floor(progress)}% VERIFIED</span>
          </div>
        ) : (
          <form onSubmit={handlePayTrigger} className="space-y-6">
            {/* Payment method selector */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-zinc-50 border border-zinc-200/50">
              <button
                type="button"
                onClick={() => setPayMethod('Card')}
                className={`py-3.5 rounded-xl font-sans font-semibold text-xs flex items-center justify-center gap-2 transition duration-300 ${
                  payMethod === 'Card'
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-transparent text-zinc-500 hover:text-zinc-800'
                }`}
                id="pm-card-btn"
              >
                <CreditCard className="w-4 h-4" />
                Credit/Debit Card
              </button>

              <button
                type="button"
                onClick={() => setPayMethod('QRIS')}
                className={`py-3.5 rounded-xl font-sans font-semibold text-xs flex items-center justify-center gap-2 transition duration-300 ${
                  payMethod === 'QRIS'
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-transparent text-zinc-500 hover:text-zinc-800'
                }`}
                id="pm-qris-btn"
              >
                <QrCode className="w-4 h-4" />
                QRIS Code Scan
              </button>
            </div>

            {/* Credit Card panel inputs */}
            {payMethod === 'Card' ? (
              <div className="space-y-4" id="card-payment-form">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rachel Adams"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-royal focus:outline-none transition text-sm text-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4111 8892 0019 4581"
                    value={cardNumber}
                    onChange={(e) => {
                      // Simple regex formatting for cc number
                      const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                      const matches = v.match(/\d{4,16}/g);
                      const match = (matches && matches[0]) || '';
                      const parts = [];

                      for (let i = 0, len = match.length; i < len; i += 4) {
                        parts.push(match.substring(i, i + 4));
                      }

                      if (parts.length > 0) {
                        setCardNumber(parts.join(' '));
                      } else {
                        setCardNumber(v);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-royal focus:outline-none transition text-sm text-zinc-800 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length > 2) {
                          val = val.substring(0, 2) + '/' + val.substring(2, 4);
                        }
                        setCardExpiry(val);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-royal focus:outline-none transition text-sm text-zinc-800 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="•••"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-royal focus:outline-none transition text-sm text-zinc-800 font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* QRIS QR Display inside general glass card */
              <div 
                className="p-6 rounded-3xl bg-zinc-950 text-white relative overflow-hidden flex flex-col items-center text-center space-y-4"
                id="qris-payment-panel"
              >
                <div className="absolute top-1/4 right-1/4 w-[120px] h-[120px] rounded-full bg-royal/20 blur-[50px]" />
                
                <h4 className="font-mono text-xs font-bold text-gold tracking-widest uppercase">
                  QRIS INDONESIAN STANDARD QR
                </h4>

                {/* Simulated high quality geometric mock QR Code */}
                <div className="w-48 h-48 bg-white p-4.5 rounded-2xl border border-white/10 flex flex-col gap-1.5 items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                  {/* Top corner alignment blocks */}
                  <div className="w-full flex-1 grid grid-cols-8 gap-1 opacity-90">
                    {Array.from({ length: 64 }).map((_, i) => {
                      // Stylize mock codes
                      const isAlignBlock = 
                        (i < 3 || (i >= 8 && i <= 10) || (i >= 16 && i <= 18)) || // Top-left
                        (i % 8 >= 5 && i < 24) || // Top-right corner
                        (i >= 48 && i % 8 < 3); // Bottom-left corner
                      
                      const isRandomDot = Math.random() > 0.45;

                      return (
                        <div 
                          key={i} 
                          className={`w-full aspect-square rounded-xs transition duration-500 ${
                            isAlignBlock 
                              ? 'bg-zinc-900 border border-zinc-700' 
                              : isRandomDot 
                                ? 'bg-zinc-900' 
                                : 'bg-transparent'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Tiny logo center overlay */}
                  <div className="absolute w-8 h-8 rounded-lg bg-royal border border-white text-[10px] font-extrabold text-white flex items-center justify-center font-mono">
                    ERIC
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-zinc-300 font-sans font-bold text-sm">
                    Scan using WhatsApp, Banking, or Fintech Apps
                  </span>
                  <p className="text-[11px] text-zinc-500 font-mono leading-relaxed max-w-sm mx-auto">
                    A secure gateway will instantly verify your payment hash upon scanning.
                  </p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <button
                type="submit"
                className="w-full py-4.5 bg-zinc-900 hover:bg-gradient-to-r hover:from-royal hover:to-cobalt hover:shadow-[0_4px_12px_rgba(0,71,171,0.25)] text-white text-xs font-mono uppercase tracking-wider font-extrabold rounded-xl transition duration-300 flex items-center justify-center gap-2"
                id="pay-submit-btn"
              >
                <ShieldCheck className="w-4.5 h-4.5" />
                {payMethod === 'Card' ? `Authenticate Transaction of ${formattedFee}` : 'I have scanned & paid QRIS'}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full text-center text-xs font-sans font-semibold text-zinc-400 hover:text-zinc-600 py-2 transition"
                id="pay-cancel-btn"
              >
                Cancel, return to form
              </button>
            </div>
          </form>
        )}

        {/* Protection assurance details */}
        <div className="flex items-center gap-3 bg-zinc-50 p-4.5 rounded-2xl border border-zinc-200/40 text-[11px] text-zinc-500 leading-relaxed">
          <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
          <div>
            <span className="block font-bold text-zinc-700">PCI-DSS Compliant Infrastructure</span>
            Your transactions are secure. Any payment made inside this sandbox is virtual and purely simulated for review.
          </div>
        </div>

      </div>
    </div>
  );
};
