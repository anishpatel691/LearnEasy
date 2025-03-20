import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './PaymentIntegration.css';

const PaymentIntegration = () => {
  const [sessionId, setSessionId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(2500); // Example amount in cents
  const [paymentDescription, setPaymentDescription] = useState('Counselling Session - 60 minutes');
  const [paymentURL, setPaymentURL] = useState('');
  
  // Admin panel states (for demonstration purposes)
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [paymentRecords, setPaymentRecords] = useState([]);

  // Generate unique session ID on component mount
  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    // Create the payment URL that will be encoded in the QR code
    // This should be your actual frontend URL where the payment interface is hosted
    const baseURL = window.location.origin; // Gets the current website URL
    const paymentPageURL = `${baseURL}/payment-interface?sessionId=${newSessionId}&amount=${paymentAmount}&description=${encodeURIComponent(paymentDescription)}`;
    setPaymentURL(paymentPageURL);
  }, [paymentAmount, paymentDescription]);

  // Generate a unique session ID for the payment
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Function to update payment amount (for admin/counselor use)
  const handleAmountChange = (e) => {
    setPaymentAmount(parseInt(e.target.value));
  };

  // Function to update payment description (for admin/counselor use)
  const handleDescriptionChange = (e) => {
    setPaymentDescription(e.target.value);
  };

  // Function to generate new QR code with updated details
  const generateNewQRCode = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    // Update the payment URL with new details
    const baseURL = window.location.origin;
    const paymentPageURL = `${baseURL}/payment-interface?sessionId=${newSessionId}&amount=${paymentAmount}&description=${encodeURIComponent(paymentDescription)}`;
    setPaymentURL(paymentPageURL);
  };

  // Toggle admin panel
  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
    
    // Simulate fetching payment records from database
    if (!showAdminPanel) {
      const mockPaymentRecords = [
        {
          id: '1',
          sessionId: 'abcdef123456',
          amount: 2500,
          description: 'Counselling Session - 60 minutes',
          status: 'completed',
          userDetails: { name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          sessionId: 'ghijkl789012',
          amount: 3500,
          description: 'Counselling Session - 90 minutes',
          status: 'pending',
          userDetails: { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
          timestamp: new Date().toISOString()
        }
      ];
      setPaymentRecords(mockPaymentRecords);
    }
  };

  return (
    <div className="payment-container">
      <h2>Counselling Payment System</h2>
      
      <div className="qr-code-container">
        <h3>Scan QR Code to Make Payment</h3>
        <p className="payment-info">Amount: ₹{paymentAmount / 100} - {paymentDescription}</p>
        
        <div className="qr-code">
          <QRCodeSVG value={paymentURL} size={200} />
        </div>
        
        <p className="scan-instructions">
          Scan this QR code with your phone's camera app to open the payment interface directly on your device.
        </p>
        
        <p className="session-id">Session ID: {sessionId}</p>
      </div>
      
      <div className="admin-controls">
        <button onClick={toggleAdminPanel} className="admin-button">
          {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
        </button>
      </div>
      
      {showAdminPanel && (
        <div className="admin-panel">
          <h3>Admin Panel</h3>
          
          <div className="admin-form">
            <div className="form-group">
              <label htmlFor="amount">Payment Amount (in cents)</label>
              <input
                type="number"
                id="amount"
                value={paymentAmount}
                onChange={handleAmountChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Payment Description</label>
              <input
                type="text"
                id="description"
                value={paymentDescription}
                onChange={handleDescriptionChange}
              />
            </div>
            
            <button onClick={generateNewQRCode} className="generate-button">
              Generate New QR Code
            </button>
          </div>
          
          <div className="payment-records">
            <h4>Recent Payment Records</h4>
            <table className="records-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {paymentRecords.map(record => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>₹{record.amount / 100}</td>
                    <td>{record.description}</td>
                    <td className={`status ${record.status}`}>{record.status}</td>
                    <td>{record.userDetails.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentIntegration;