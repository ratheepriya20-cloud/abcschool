import React, { useState } from "react";
import {
  FaLock,
  FaMoneyBillWave,
  FaShieldAlt,
  FaArrowRight,
  FaDownload,
  FaFileAlt,
  FaCreditCard,
  FaTimes,
  FaCheckCircle,
  FaUniversity,
  FaMobileAlt,
  FaWallet,
} from "react-icons/fa";
import "./ParentFees.css";

const ParentFees = ({
  fees = [],
  onPayment,
  onDownloadReceipt,
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const totalFees = fees.reduce(
    (total, fee) => total + Number(fee.amount || 0),
    0
  );

  const paidFees = fees
    .filter((fee) => fee.status === "Paid")
    .reduce(
      (total, fee) => total + Number(fee.amount || 0),
      0
    );

  const pendingFees = fees
    .filter((fee) => fee.status === "Pending")
    .reduce(
      (total, fee) => total + Number(fee.amount || 0),
      0
    );

  const handlePayNow = () => {
    if (pendingFees <= 0) return;
    setShowPayment(true);
  };

  const handlePaymentContinue = () => {
    if (onPayment) {
      onPayment(paymentMethod);
    }
  };

  return (
    <div className="abfees-page">

      {/* HEADER */}
      <div className="abfees-heading">
        <span className="abfees-section-label">FINANCE</span>

        <h1>Fee Management</h1>

        <p>
          View your child's fee details, payment status and
          digital receipts in one secure place.
        </p>
      </div>

      {/* STATS */}
      <div className="abfees-stat-grid">

        <div className="abfees-stat-card abfees-stat-total">
          <div className="abfees-stat-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>Total Fees</span>
            <strong>
              ₹{totalFees.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        <div className="abfees-stat-card abfees-stat-paid">
          <div className="abfees-stat-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Paid</span>
            <strong>
              ₹{paidFees.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        <div className="abfees-stat-card abfees-stat-pending">
          <div className="abfees-stat-icon">
            <FaCreditCard />
          </div>

          <div>
            <span>Pending</span>
            <strong>
              ₹{pendingFees.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

      </div>

      {/* FEE DETAILS */}
      <div className="abfees-panel">

        <div className="abfees-panel-header">
          <div>
            <span className="abfees-section-label">
              FEE DETAILS
            </span>

            <h2>Current Fee Structure</h2>

            <p>
              Detailed information about your current school fees.
            </p>
          </div>
        </div>

        <div className="abfees-list">

          {fees.length > 0 ? (
            fees.map((fee, index) => (
              <div
                className="abfees-row"
                key={fee.id || index}
              >

                <div className="abfees-icon">
                  <FaMoneyBillWave />
                </div>

                <div className="abfees-info">
                  <strong>
                    {fee.title || fee.name || "School Fee"}
                  </strong>

                  <span>
                    {fee.status === "Paid"
                      ? "Payment completed successfully"
                      : "Payment required"}
                  </span>
                </div>

                <div className="abfees-amount">
                  ₹
                  {Number(fee.amount || 0).toLocaleString(
                    "en-IN"
                  )}
                </div>

                <span
                  className={
                    fee.status === "Paid"
                      ? "abfees-status abfees-paid"
                      : "abfees-status abfees-pending"
                  }
                >
                  {fee.status}
                </span>

              </div>
            ))
          ) : (
            <div className="abfees-empty">
              <FaFileAlt />
              <strong>No fee records available</strong>
              <span>
                Fee information will appear here when available.
              </span>
            </div>
          )}

        </div>
      </div>

      {/* PAYMENT BANNER */}
      <div className="abfees-payment-banner">

        <div className="abfees-payment-info">

          <div className="abfees-payment-icon">
            <FaCreditCard />
          </div>

          <div>
            <span>Outstanding Amount</span>

            <strong>
              ₹{pendingFees.toLocaleString("en-IN")}
            </strong>

            <small>
              Secure online payment available
            </small>
          </div>

        </div>

        {pendingFees > 0 && (
          <button
            className="abfees-primary-btn"
            onClick={handlePayNow}
          >
            Pay Now
            <FaArrowRight />
          </button>
        )}

      </div>

      {/* SECURITY */}
      <div className="abfees-security-row">

        <div className="abfees-security-item">
          <div>
            <FaLock />
          </div>
          <span>Secure Payment</span>
        </div>

        <div className="abfees-security-item">
          <div>
            <FaShieldAlt />
          </div>
          <span>Protected Transaction</span>
        </div>

        <div className="abfees-security-item">
          <div>
            <FaFileAlt />
          </div>
          <span>Digital Receipt</span>
        </div>

      </div>

      {/* RECEIPTS */}
      <div className="abfees-panel abfees-receipt-panel">

        <div className="abfees-panel-header abfees-receipt-header">

          <div>
            <span className="abfees-section-label">
              RECEIPTS
            </span>

            <h2>Payment Records</h2>

            <p>
              Download your latest payment receipt for your records.
            </p>
          </div>

          <button
            className="abfees-secondary-btn"
            onClick={onDownloadReceipt}
          >
            <FaDownload />
            Download Receipt
          </button>

        </div>

        <div className="abfees-receipt-preview">

          <div className="abfees-receipt-icon">
            <FaFileAlt />
          </div>

          <div className="abfees-receipt-info">
            <strong>School Fee Payment Receipt</strong>

            <span>
              Official digital receipt • PDF format
            </span>
          </div>

          <div className="abfees-receipt-badge">
            <FaCheckCircle />
            Available
          </div>

        </div>

      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div
          className="abfees-modal-overlay"
          onClick={() => setShowPayment(false)}
        >

          <div
            className="abfees-payment-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="abfees-modal-close"
              onClick={() => setShowPayment(false)}
            >
              <FaTimes />
            </button>

            <div className="abfees-modal-top">
              <div className="abfees-modal-icon">
                <FaCreditCard />
              </div>

              <span>SECURE PAYMENT</span>

              <h2>Complete Your Payment</h2>

              <p>
                Choose your preferred payment method to continue.
              </p>
            </div>

            {/* PAYMENT SUMMARY */}
            <div className="abfees-payment-summary">

              <span>Amount Payable</span>

              <strong>
                ₹{pendingFees.toLocaleString("en-IN")}
              </strong>

            </div>

            {/* PAYMENT METHODS */}
            <div className="abfees-method-title">
              Select Payment Method
            </div>

            <div className="abfees-payment-methods">

              <button
                className={
                  paymentMethod === "upi"
                    ? "abfees-method active"
                    : "abfees-method"
                }
                onClick={() => setPaymentMethod("upi")}
              >
                <div className="abfees-method-icon">
                  <FaMobileAlt />
                </div>

                <div>
                  <strong>UPI</strong>
                  <span>Google Pay, PhonePe, Paytm</span>
                </div>

                <div className="abfees-method-check">
                  {paymentMethod === "upi" && (
                    <FaCheckCircle />
                  )}
                </div>
              </button>

              <button
                className={
                  paymentMethod === "card"
                    ? "abfees-method active"
                    : "abfees-method"
                }
                onClick={() => setPaymentMethod("card")}
              >
                <div className="abfees-method-icon">
                  <FaCreditCard />
                </div>

                <div>
                  <strong>Debit / Credit Card</strong>
                  <span>Visa, Mastercard, RuPay</span>
                </div>

                <div className="abfees-method-check">
                  {paymentMethod === "card" && (
                    <FaCheckCircle />
                  )}
                </div>
              </button>

              <button
                className={
                  paymentMethod === "netbanking"
                    ? "abfees-method active"
                    : "abfees-method"
                }
                onClick={() => setPaymentMethod("netbanking")}
              >
                <div className="abfees-method-icon">
                  <FaUniversity />
                </div>

                <div>
                  <strong>Net Banking</strong>
                  <span>All major Indian banks</span>
                </div>

                <div className="abfees-method-check">
                  {paymentMethod === "netbanking" && (
                    <FaCheckCircle />
                  )}
                </div>
              </button>

              <button
                className={
                  paymentMethod === "wallet"
                    ? "abfees-method active"
                    : "abfees-method"
                }
                onClick={() => setPaymentMethod("wallet")}
              >
                <div className="abfees-method-icon">
                  <FaWallet />
                </div>

                <div>
                  <strong>Wallet</strong>
                  <span>Available digital wallets</span>
                </div>

                <div className="abfees-method-check">
                  {paymentMethod === "wallet" && (
                    <FaCheckCircle />
                  )}
                </div>
              </button>

            </div>

            <div className="abfees-modal-security">
              <FaLock />
              <span>
                Your payment is protected with secure encryption.
              </span>
            </div>

            <button
              className="abfees-continue-payment"
              onClick={handlePaymentContinue}
            >
              Continue to Payment
              <FaArrowRight />
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ParentFees;