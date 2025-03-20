import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './PaymentInterface.css';

const PaymentInterface = () => {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Extract params from URL on component mount
  useEffect(() => {
    const sessionIdParam = searchParams.get('sessionId');
    const amountParam = searchParams.get('amount');
    const descriptionParam = searchParams.get('description');
    
    if (sessionIdParam) setSessionId(sessionIdParam);
    if (amountParam) setPaymentAmount(parseInt(amountParam));
    if (descriptionParam) setPaymentDescription(descriptionParam);
  }, [searchParams]);

  // Handle user details input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };
  
  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // Function to handle payment submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate API call to process payment
    setTimeout(() => {
      // In a real implementation, you would send this data to your server
      const paymentData = {
        sessionId,
        amount: paymentAmount,
        description: paymentDescription,
        userDetails,
        paymentMethod: selectedPaymentMethod,
        timestamp: new Date().toISOString()
      };
      
      console.log('Processing payment:', paymentData);
      
      // Simulate successful payment
      setPaymentStatus('success');
    }, 2000);
  };

  // Render different content based on payment status
  const renderContent = () => {
    if (paymentStatus === 'processing') {
      return (
        <div className="processing">
          <div className="spinner"></div>
          <p>Processing your payment...</p>
          <p>Please do not close this window.</p>
        </div>
      );
    } else if (paymentStatus === 'success') {
      return (
        <div className="success">
          <div className="success-icon">✓</div>
          <p>Payment Successful!</p>
          <p>Amount: ₹{paymentAmount / 100}</p>
          <p>Thank you for your payment.</p>
          <p>A confirmation has been sent to your email.</p>
        </div>
      );
    } else {
      return (
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <div className="payment-details">
            <h3>{paymentDescription}</h3>
            <p className="amount">Amount: ₹{paymentAmount / 100}</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="payment-methods">
            <h4>Choose Payment Method</h4>
            <div className="payment-options">
              <div 
                className={`payment-option ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setSelectedPaymentMethod('upi')}
              >
                <input 
                  type="radio" 
                  id="upi" 
                  name="paymentMethod" 
                  value="upi" 
                  checked={selectedPaymentMethod === 'upi'}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="upi">
                  <div className="option-icon upi-icon"></div>
                  <span>UPI</span>
                </label>
              </div>
              
              <div 
                className={`payment-option ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setSelectedPaymentMethod('card')}
              >
                <input 
                  type="radio" 
                  id="card" 
                  name="paymentMethod" 
                  value="card" 
                  checked={selectedPaymentMethod === 'card'}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="card">
                  <div className="option-icon card-icon"></div>
                  <span>Credit/Debit Card</span>
                </label>
              </div>
              
              <div 
                className={`payment-option ${selectedPaymentMethod === 'netbanking' ? 'selected' : ''}`}
                onClick={() => setSelectedPaymentMethod('netbanking')}
              >
                <input 
                  type="radio" 
                  id="netbanking" 
                  name="paymentMethod" 
                  value="netbanking" 
                  checked={selectedPaymentMethod === 'netbanking'}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="netbanking">
                  <div className="option-icon bank-icon"></div>
                  <span>Net Banking</span>
                </label>
              </div>
            </div>
          </div>
          
          {selectedPaymentMethod === 'upi' && (
            <div className="upi-input">
              <label htmlFor="upiId">UPI ID</label>
              <input 
                type="text" 
                id="upiId" 
                placeholder="yourname@upi"
                required
              />
              <div className="upi-verification">
                <button type="button" className="verify-button">Verify</button>
              </div>
            </div>
          )}
          
          {selectedPaymentMethod === 'card' && (
            <div className="card-inputs">
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="card-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry (MM/YY)</label>
                  <input 
                    type="text" 
                    id="expiry" 
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input 
                    type="password" 
                    id="cvv" 
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {selectedPaymentMethod === 'netbanking' && (
            <div className="bank-selection">
              <label>Select Your Bank</label>
              <select className="bank-dropdown" required>
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          )}
          
          <button type="submit" className="pay-button">
            Pay ₹{paymentAmount / 100}
          </button>
        </form>
      );
    }
  };

  return (
    <div className="mobile-payment-container">
      <div className="payment-header">
        <h2>Complete Your Payment</h2>
        <p className="session-id">Session ID: {sessionId}</p>
      </div>
      
      <div className="payment-content">
        {renderContent()}
      </div>
      
      <div className="payment-footer">
        <div className="secure-payment">
          <div className="lock-icon">🔒</div>
          <p>Secure Payment</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInterface;