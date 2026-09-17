
import React, { useState } from "react";
import {
  FaTimes,
  FaBookOpen,
  FaCheckCircle,
  FaExclamationCircle,
  FaBell,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaLock,
  FaCheck,
  FaChevronRight,
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaWallet,
} from "react-icons/fa";
import "./ParentModals.css";

export const AssignmentModal = ({ assignment, onClose }) => {
  if (!assignment) return null;

  return (
    <div className="abmodal-overlay" onClick={onClose}>
      <div
        className="abmodal-box"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="abmodal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="abmodal-icon abmodal-icon-book">
          <FaBookOpen />
        </div>

        <span className="abmodal-label">
          {assignment.subject}
        </span>

        <h2>{assignment.title || assignment.subject}</h2>

        <div className="abmodal-details">
          <div>
            <span>Teacher</span>
            <strong>{assignment.teacher}</strong>
          </div>

          <div>
            <span>Assigned Date</span>
            <strong>{assignment.assigned}</strong>
          </div>

          <div>
            <span>Due Date</span>
            <strong>{assignment.due}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>
              {assignment.submitted
                ? "Submitted"
                : "Pending Submission"}
            </strong>
          </div>
        </div>

        {assignment.submitted ? (
          <div className="abmodal-message abmodal-success">
            <FaCheckCircle />

            <div>
              <strong>Assignment Submitted</strong>
              <span>
                Submitted on {assignment.submittedDate}
              </span>
            </div>
          </div>
        ) : (
          <div className="abmodal-message abmodal-warning">
            <FaExclamationCircle />

            <div>
              <strong>Submission Pending</strong>
              <span>
                Please make sure the assignment is completed
                before the due date.
              </span>
            </div>
          </div>
        )}

        <button
          className="abmodal-primary-button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const NoticeModal = ({ notice, onClose }) => {
  if (!notice) return null;

  return (
    <div className="abmodal-overlay" onClick={onClose}>
      <div
        className="abmodal-box"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="abmodal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="abmodal-icon abmodal-icon-notice">
          <FaBell />
        </div>

        <span className="abmodal-label">
          {notice.category}
        </span>

        <h2>{notice.title}</h2>

        <div className="abmodal-date">
          <FaCalendarAlt />
          <span>{notice.date}</span>
        </div>

        <p className="abmodal-description">
          {notice.description || notice.content}
        </p>

        <div className="abmodal-message abmodal-success">
          <FaCheckCircle />

          <div>
            <strong>Important School Notice</strong>
            <span>
              Please keep this announcement for your
              reference.
            </span>
          </div>
        </div>

        <button
          className="abmodal-primary-button"
          onClick={onClose}
        >
          Close Notice
        </button>
      </div>
    </div>
  );
};

export const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="abmodal-overlay" onClick={onClose}>
      <div
        className="abmodal-box"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="abmodal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="abmodal-icon abmodal-icon-event">
          <FaCalendarAlt />
        </div>

        <span className="abmodal-label">
          SCHOOL EVENT
        </span>

        <h2>{event.title}</h2>

        <div className="abmodal-event-details">
          <div>
            <FaCalendarAlt />
            <span>{event.date}</span>
          </div>

          <div>
            <FaClock />
            <span>{event.time}</span>
          </div>

          <div>
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="abmodal-description">
          {event.description ||
            "Parents are welcome to participate in this school event."}
        </p>

        <div className="abmodal-message abmodal-success">
          <FaCheckCircle />

          <div>
            <strong>You're invited</strong>
            <span>
              Parents are welcome to participate in this
              school event.
            </span>
          </div>
        </div>

        <button
          className="abmodal-primary-button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const HelpModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="abmodal-overlay" onClick={onClose}>
      <div
        className="abmodal-box abmodal-help-box"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="abmodal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="abmodal-icon abmodal-icon-help">
          <FaHeadset />
        </div>

        <span className="abmodal-label">
          PARENT SUPPORT
        </span>

        <h2>How Can We Help?</h2>

        <p className="abmodal-description">
          Our school support team is available to assist you
          with parent portal and school-related queries.
        </p>

        <div className="abmodal-help-options">
          <a href="tel:0123456789">
            <div className="abmodal-help-icon">
              <FaPhoneAlt />
            </div>

            <div className="abmodal-help-content">
              <strong>Call School Office</strong>
              <span>01234 567 890</span>
            </div>

            <FaArrowRight className="abmodal-help-arrow" />
          </a>

          <a href="mailto:school@example.com">
            <div className="abmodal-help-icon">
              <FaEnvelope />
            </div>

            <div className="abmodal-help-content">
              <strong>Email Support</strong>
              <span>school@example.com</span>
            </div>

            <FaArrowRight className="abmodal-help-arrow" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const PaymentModal = ({
  show,
  onClose,
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentStep,
  paymentDone,
  proceedPayment,
}) => {
  const [upiValue, setUpiValue] = useState("");

  if (!show) return null;

  const getPaymentIcon = (id) => {
    if (
      id === "gpay" ||
      id === "phonepe" ||
      id === "paytm"
    ) {
      return <FaMobileAlt />;
    }

    if (id === "card") {
      return <FaCreditCard />;
    }

    if (id === "netbanking") {
      return <FaUniversity />;
    }

    return <FaWallet />;
  };

  return (
    <div className="abmodal-overlay">
      <div
        className="abmodal-box abmodal-payment-box"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="abmodal-close"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {paymentDone ? (
          <div className="abmodal-payment-success">
            <div className="abmodal-payment-success-icon">
              <FaCheck />
            </div>

            <span className="abmodal-label">
              PAYMENT SUCCESSFUL
            </span>

            <h2>Payment Completed</h2>

            <p className="abmodal-description">
              Your fee payment has been successfully
              processed.
            </p>

            <div className="abmodal-receipt-status">
              <span>Transaction Status</span>
              <strong>Successful</strong>
            </div>

            <button
              className="abmodal-primary-button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="abmodal-icon abmodal-icon-payment">
              <FaCreditCard />
            </div>

            <span className="abmodal-label">
              SECURE PAYMENT
            </span>

            <h2>Pay School Fees</h2>

            {paymentStep === "methods" && (
              <>
                <div className="abmodal-payment-secure">
                  <FaLock />
                  <span>
                    Secure & encrypted payment
                  </span>
                </div>

                <div className="abmodal-payment-methods">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      className={`abmodal-payment-method ${
                        selectedPaymentMethod === method.id
                          ? "abmodal-payment-method-active"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedPaymentMethod(method.id)
                      }
                    >
                      <div className="abmodal-payment-method-icon">
                        {getPaymentIcon(method.id)}
                      </div>

                      <div className="abmodal-payment-method-info">
                        <strong>{method.name}</strong>
                        <span>{method.type}</span>
                      </div>

                      <FaChevronRight />
                    </button>
                  ))}
                </div>

                {selectedPaymentMethod === "gpay" ||
                selectedPaymentMethod === "phonepe" ||
                selectedPaymentMethod === "paytm" ? (
                  <div className="abmodal-upi-field">
                    <label>UPI ID</label>

                    <input
                      type="text"
                      value={upiValue}
                      onChange={(event) =>
                        setUpiValue(event.target.value)
                      }
                      placeholder="example@upi"
                    />
                  </div>
                ) : null}

                <button
                  className="abmodal-primary-button"
                  disabled={
                    !selectedPaymentMethod ||
                    (selectedPaymentMethod === "gpay" ||
                    selectedPaymentMethod === "phonepe" ||
                    selectedPaymentMethod === "paytm"
                      ? !upiValue.trim()
                      : false)
                  }
                  onClick={proceedPayment}
                >
                  Continue
                  <FaArrowRight />
                </button>
              </>
            )}

            {paymentStep === "processing" && (
              <div className="abmodal-processing">
                <div className="abmodal-loader"></div>

                <h3>Processing Payment...</h3>

                <p>
                  Please wait while we securely process your
                  payment.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

