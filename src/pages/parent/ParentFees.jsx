import React, { useMemo, useState } from "react";

import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaDownload,
  FaTimes,
  FaUniversity,
  FaMobileAlt,
  FaShieldAlt,
  FaLock,
  FaReceipt,
  FaWallet,
  FaChevronRight,
  FaExclamationCircle,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaRedoAlt,
} from "react-icons/fa";

import "./ParentFees.css";

/* =========================================================
   AB PUBLIC SCHOOL
   PARENT FEES
   FRONTEND PAYMENT FLOW
   ========================================================= */

/*
  IMPORTANT:
  Is demo UPI ID ko apni actual school UPI ID se replace karna.
*/
const SCHOOL_UPI_ID = "abpublicschool@upi";
const SCHOOL_PAYEE_NAME = "AB Public School";

/* =========================================================
   PAYMENT METHODS
   ========================================================= */

const paymentMethods = [
  {
    id: "upi",
    title: "UPI Payment",
    description: "Google Pay, PhonePe, Paytm & UPI",
    icon: FaMobileAlt,
  },
  {
    id: "card",
    title: "Debit / Credit Card",
    description: "Frontend card payment demo",
    icon: FaCreditCard,
  },
  {
    id: "netbanking",
    title: "Net Banking",
    description: "Choose your preferred bank",
    icon: FaUniversity,
  },
];

/* =========================================================
   UPI APPS
   ========================================================= */

const upiApps = [
  {
    id: "gpay",
    name: "Google Pay",
    shortName: "G",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    shortName: "P",
  },
  {
    id: "paytm",
    name: "Paytm",
    shortName: "Pay",
  },
  {
    id: "upi-id",
    name: "UPI ID",
    shortName: "@",
  },
];

/* =========================================================
   BANKS
   ========================================================= */

const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Kotak Mahindra Bank",
];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const ParentFees = ({
  student,
  fees = [],
}) => {
  /* =======================================================
     STATES
     ======================================================= */

  const [selectedFee, setSelectedFee] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  const [selectedUpiApp, setSelectedUpiApp] =
    useState("gpay");

  const [customerUpiId, setCustomerUpiId] =
    useState("");

  const [selectedBank, setSelectedBank] =
    useState("");

  /*
    payment
    waiting
    checking
    not-verified
    processing
    success
  */
  const [paymentStatus, setPaymentStatus] =
    useState("payment");

  const [paymentMessage, setPaymentMessage] =
    useState("");

  const [transactionId, setTransactionId] =
    useState("");

  const [cardData, setCardData] =
    useState({
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    });

  /* =======================================================
     TOTAL CALCULATION
     ======================================================= */

  const totals = useMemo(() => {
    const total = fees.reduce(
      (sum, fee) =>
        sum + Number(fee.amount || 0),
      0
    );

    const paid = fees
      .filter(
        (fee) =>
          String(
            fee.status || ""
          ).toLowerCase() === "paid"
      )
      .reduce(
        (sum, fee) =>
          sum + Number(fee.amount || 0),
        0
      );

    return {
      total,
      paid,
      pending: total - paid,
    };
  }, [fees]);

  /* =======================================================
     FORMAT CURRENCY
     ======================================================= */

  const formatCurrency = (amount) => {
    return Number(
      amount || 0
    ).toLocaleString("en-IN");
  };

  /* =======================================================
     OPEN PAYMENT POPUP
     ======================================================= */

  const openPayment = (fee) => {
    setSelectedFee(fee);

    setPaymentMethod("upi");
    setSelectedUpiApp("gpay");

    setCustomerUpiId("");
    setSelectedBank("");

    setPaymentStatus("payment");
    setPaymentMessage("");

    setTransactionId("");

    setCardData({
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    });
  };

  /* =======================================================
     CLOSE PAYMENT POPUP
     ======================================================= */

  const closePayment = () => {
    if (
      paymentStatus === "checking" ||
      paymentStatus === "processing"
    ) {
      return;
    }

    setSelectedFee(null);
    setPaymentStatus("payment");
    setPaymentMessage("");
  };

  /* =======================================================
     UPI ID VALIDATION
     ======================================================= */

  const isValidUpiId = (value) => {
    const cleanValue =
      value.trim();

    return /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z0-9.\-_]{2,}$/.test(
      cleanValue
    );
  };

  /* =======================================================
     CREATE PAYMENT REFERENCE
     ======================================================= */

  const createPaymentReference = () => {
    return `ABPS${Date.now()}`;
  };

  /* =======================================================
     CREATE UPI URL

     pa = Payee UPI ID
     pn = Payee Name
     tr = Reference
     tn = Note
     am = Amount
     cu = Currency
     ======================================================= */

  const createUpiUrl = () => {
    if (!selectedFee) {
      return "";
    }

    const amount = Number(
      selectedFee.amount || 0
    ).toFixed(2);

    const reference =
      createPaymentReference();

    const note =
      `${
        selectedFee.title ||
        "School Fee"
      } - ${
        student?.name || "Student"
      }`;

    const params =
      new URLSearchParams();

    params.set(
      "pa",
      SCHOOL_UPI_ID
    );

    params.set(
      "pn",
      SCHOOL_PAYEE_NAME
    );

    params.set(
      "tr",
      reference
    );

    params.set(
      "tn",
      note
    );

    params.set(
      "am",
      amount
    );

    params.set(
      "cu",
      "INR"
    );

    return `upi://pay?${params.toString()}`;
  };

  /* =======================================================
     OPEN UPI APP
     ======================================================= */

  const openUpiPayment = () => {
    if (!selectedFee) {
      return;
    }

    const amount =
      Number(
        selectedFee.amount || 0
      );

    if (amount <= 0) {
      setPaymentMessage(
        "Invalid payment amount."
      );

      return;
    }

    /*
      Agar UPI ID option select hai,
      pehle UPI ID validate karenge.
    */

    if (
      selectedUpiApp === "upi-id"
    ) {
      if (
        !isValidUpiId(
          customerUpiId
        )
      ) {
        setPaymentMessage(
          "Please enter a valid UPI ID. Example: name@upi"
        );

        return;
      }
    }

    setPaymentMessage("");

    /*
      App se return hone ke baad
      waiting screen dikhni chahiye.
    */

    setPaymentStatus("waiting");

    const upiUrl =
      createUpiUrl();

    /*
      Browser UPI handler ko request dega.

      Supported mobile/tablet/device par
      UPI app/chooser open ho sakta hai.
    */

    window.location.href =
      upiUrl;
  };

  /* =======================================================
     USER SAYS PAYMENT COMPLETED
     ======================================================= */

  const confirmUpiPayment = () => {
    if (!selectedFee) {
      return;
    }

    /*
      IMPORTANT:

      User ke button click karne se
      payment ko Paid nahi bana rahe.

      Pehle checking screen show hogi.
    */

    setPaymentStatus(
      "checking"
    );

    setPaymentMessage("");

    /*
      FRONTEND-ONLY:

      Browser ke paas verified bank result
      nahi hai.

      Future backend me yahan payment status
      API call hogi.

      Example future code:

      const response = await fetch(
        `/api/payment/status/${reference}`
      );

      const data = await response.json();

      if (data.status === "SUCCESS") {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("not-verified");
      }
    */

    window.setTimeout(() => {
      setPaymentStatus(
        "not-verified"
      );
    }, 1800);
  };

  /* =======================================================
     CARD CHANGE
     ======================================================= */

  const handleCardChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    let finalValue = value;

    /* CARD NUMBER */

    if (
      name === "cardNumber"
    ) {
      const numbers =
        value
          .replace(/\D/g, "")
          .slice(0, 16);

      finalValue =
        numbers.replace(
          /(\d{4})(?=\d)/g,
          "$1 "
        );
    }

    /* EXPIRY */

    if (
      name === "expiry"
    ) {
      const numbers =
        value
          .replace(/\D/g, "")
          .slice(0, 4);

      finalValue =
        numbers.length > 2
          ? `${numbers.slice(
              0,
              2
            )}/${numbers.slice(
              2
            )}`
          : numbers;
    }

    /* CVV */

    if (
      name === "cvv"
    ) {
      finalValue =
        value
          .replace(/\D/g, "")
          .slice(0, 3);
    }

    setCardData(
      (previous) => ({
        ...previous,
        [name]: finalValue,
      })
    );
  };

  /* =======================================================
     CARD VALIDATION
     ======================================================= */

  const validateCard = () => {
    const number =
      cardData.cardNumber.replace(
        /\s/g,
        ""
      );

    if (
      number.length !== 16
    ) {
      setPaymentMessage(
        "Please enter a valid 16 digit card number."
      );

      return false;
    }

    if (
      !cardData.cardHolder.trim()
    ) {
      setPaymentMessage(
        "Please enter card holder name."
      );

      return false;
    }

    if (
      cardData.expiry.length !== 5
    ) {
      setPaymentMessage(
        "Please enter expiry date in MM/YY format."
      );

      return false;
    }

    if (
      cardData.cvv.length !== 3
    ) {
      setPaymentMessage(
        "Please enter a valid 3 digit CVV."
      );

      return false;
    }

    return true;
  };

  /* =======================================================
     CARD FRONTEND DEMO
     ======================================================= */

  const payByCard = () => {
    setPaymentMessage("");

    if (!validateCard()) {
      return;
    }

    setPaymentStatus(
      "processing"
    );

    /*
      Ye frontend card DEMO hai.

      Real card payment nahi ho rahi.
    */

    window.setTimeout(() => {
      const demoId =
        `DEMO${Date.now()
          .toString()
          .slice(-10)}`;

      setTransactionId(
        demoId
      );

      setPaymentStatus(
        "success"
      );
    }, 1500);
  };

  /* =======================================================
     NET BANKING FRONTEND DEMO
     ======================================================= */

  const payByNetBanking = () => {
    setPaymentMessage("");

    if (!selectedBank) {
      setPaymentMessage(
        "Please select your bank."
      );

      return;
    }

    setPaymentStatus(
      "processing"
    );

    window.setTimeout(() => {
      const demoId =
        `DEMO${Date.now()
          .toString()
          .slice(-10)}`;

      setTransactionId(
        demoId
      );

      setPaymentStatus(
        "success"
      );
    }, 1500);
  };

  /* =======================================================
     MAIN PAY BUTTON
     ======================================================= */

  const handlePayment = () => {
    if (
      paymentMethod === "upi"
    ) {
      openUpiPayment();
      return;
    }

    if (
      paymentMethod === "card"
    ) {
      payByCard();
      return;
    }

    if (
      paymentMethod ===
      "netbanking"
    ) {
      payByNetBanking();
    }
  };

  /* =======================================================
     BUTTON TEXT
     ======================================================= */

  const getPaymentButtonText =
    () => {
      if (
        paymentMethod === "card"
      ) {
        return "Pay by Card";
      }

      if (
        paymentMethod ===
        "netbanking"
      ) {
        return "Continue to Bank";
      }

      if (
        selectedUpiApp ===
        "gpay"
      ) {
        return "Open Google Pay";
      }

      if (
        selectedUpiApp ===
        "phonepe"
      ) {
        return "Open PhonePe";
      }

      if (
        selectedUpiApp ===
        "paytm"
      ) {
        return "Open Paytm";
      }

      return "Continue with UPI";
    };

  /* =======================================================
     METHOD NAME
     ======================================================= */

  const getPaymentMethodName =
    () => {
      if (
        paymentMethod === "card"
      ) {
        return "Debit / Credit Card";
      }

      if (
        paymentMethod ===
        "netbanking"
      ) {
        return (
          selectedBank ||
          "Net Banking"
        );
      }

      const app =
        upiApps.find(
          (item) =>
            item.id ===
            selectedUpiApp
        );

      return app?.name || "UPI";
    };

  /* =======================================================
     DOWNLOAD RECEIPT
     ======================================================= */

  const downloadReceipt = (
    fee
  ) => {
    const receipt = `
AB PUBLIC SCHOOL
--------------------------------

PAYMENT RECEIPT

Student:
${student?.name || "Student"}

Fee:
${fee?.title || "School Fee"}

Amount:
₹${formatCurrency(
      fee?.amount
    )}

Payment Method:
${getPaymentMethodName()}

Transaction ID:
${
  transactionId ||
  fee?.transactionId ||
  "N/A"
}

Status:
Paid

--------------------------------
Frontend Demo Receipt
`;

    const blob =
      new Blob(
        [receipt],
        {
          type: "text/plain",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `ABPS-${
        fee?.title ||
        "Fee"
      }-Receipt.txt`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
      url
    );
  };

  /* =======================================================
     JSX
     ======================================================= */

  return (
    <div className="pp-page">

      {/* HERO */}

      <section className="pp-page-hero">

        <div className="pp-page-hero-content">

          <span className="pp-eyebrow">
            FEE MANAGEMENT
          </span>

          <h1>
            School Fees
          </h1>

          <p>
            View school fee details,
            payment status and pending
            dues for{" "}

            <strong>
              {student?.name ||
                "your child"}
            </strong>.
          </p>

        </div>

        <div className="pp-fee-hero-icon">
          <FaMoneyBillWave />
        </div>

      </section>

      {/* SUMMARY */}

      <section className="pp-summary-grid">

        <FeeSummary
          title="Total Fees"
          amount={totals.total}
          type="total"
        />

        <FeeSummary
          title="Paid Amount"
          amount={totals.paid}
          type="paid"
        />

        <FeeSummary
          title="Pending Amount"
          amount={totals.pending}
          type="pending"
        />

      </section>

      {/* FEE RECORDS */}

      <section className="pp-card">

        <div className="pp-section-heading">

          <span>
            PAYMENT DETAILS
          </span>

          <h2>
            Fee Records
          </h2>

          <p>
            Check current fee status,
            pending payments and
            available receipts.
          </p>

        </div>

        {fees.length === 0 ? (

          <div className="pp-fees-empty">

            <FaReceipt />

            <h3>
              No Fee Records
            </h3>

            <p>
              No fee records are
              currently available.
            </p>

          </div>

        ) : (

          <div className="pp-fee-list">

            {fees.map(
              (fee) => {
                const isPaid =
                  String(
                    fee.status || ""
                  ).toLowerCase() ===
                  "paid";

                return (
                  <article
                    className="pp-fee-row"
                    key={
                      fee.id ||
                      `${fee.title}-${fee.amount}`
                    }
                  >

                    <div className="pp-fee-row-icon">
                      <FaMoneyBillWave />
                    </div>

                    <div className="pp-fee-row-main">

                      <span>
                        FEE TYPE
                      </span>

                      <h3>
                        {fee.title}
                      </h3>

                      <p>
                        Due Date:{" "}
                        {fee.dueDate ||
                          "Not specified"}
                      </p>

                    </div>

                    <div className="pp-fee-amount">

                      <span>
                        AMOUNT
                      </span>

                      <strong>
                        ₹
                        {formatCurrency(
                          fee.amount
                        )}
                      </strong>

                    </div>

                    <span
                      className={`pp-status ${
                        isPaid
                          ? "success"
                          : "warning"
                      }`}
                    >

                      {isPaid ? (
                        <FaCheckCircle />
                      ) : (
                        <FaClock />
                      )}

                      {fee.status ||
                        "Pending"}

                    </span>

                    <div className="pp-fee-actions">

                      {isPaid ? (

                        <button
                          type="button"
                          className="pp-secondary-btn"
                          onClick={() =>
                            downloadReceipt(
                              fee
                            )
                          }
                        >
                          <FaDownload />
                          Receipt
                        </button>

                      ) : (

                        <button
                          type="button"
                          className="pp-primary-btn"
                          onClick={() =>
                            openPayment(
                              fee
                            )
                          }
                        >
                          <FaCreditCard />
                          Pay Now
                        </button>

                      )}

                    </div>

                  </article>
                );
              }
            )}

          </div>

        )}

      </section>

      {/* ===================================================
          PAYMENT MODAL
          =================================================== */}

      {selectedFee && (

        <div className="pp-modal-backdrop">

          <div className="pp-payment-modal">

            {/* HEADER */}

            <div className="pp-payment-header">

              <div>

                <span className="pp-eyebrow">
                  AB PUBLIC SCHOOL
                </span>

                <h2>
                  Fee Payment
                </h2>

                <p>
                  Complete your fee
                  payment.
                </p>

              </div>

              {paymentStatus !==
                "checking" &&
                paymentStatus !==
                  "processing" && (

                  <button
                    type="button"
                    className="pp-modal-close"
                    onClick={
                      closePayment
                    }
                  >
                    <FaTimes />
                  </button>

                )}

            </div>

            {/* =================================================
                PAYMENT SCREEN
                ================================================= */}

            {paymentStatus ===
              "payment" && (

              <div className="pp-payment-layout">

                {/* SIDEBAR */}

                <aside className="pp-payment-sidebar">

                  <span className="pp-payment-side-label">
                    PAYMENT METHODS
                  </span>

                  {paymentMethods.map(
                    (method) => {
                      const Icon =
                        method.icon;

                      return (
                        <button
                          type="button"
                          key={method.id}
                          className={`pp-payment-method ${
                            paymentMethod ===
                            method.id
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            setPaymentMethod(
                              method.id
                            );

                            setPaymentMessage(
                              ""
                            );
                          }}
                        >

                          <span className="pp-method-icon">
                            <Icon />
                          </span>

                          <span className="pp-method-content">

                            <strong>
                              {method.title}
                            </strong>

                            <small>
                              {
                                method.description
                              }
                            </small>

                          </span>

                          <FaChevronRight className="pp-method-arrow" />

                        </button>
                      );
                    }
                  )}

                  <div className="pp-secure-note">

                    <FaShieldAlt />

                    <div>

                      <strong>
                        Frontend Demo
                      </strong>

                      <p>
                        UPI app handoff is
                        demonstrated here.
                      </p>

                    </div>

                  </div>

                </aside>

                {/* MAIN */}

                <main className="pp-payment-main">

                  {/* SUMMARY */}

                  <div className="pp-payment-summary">

                    <div>

                      <span>
                        PAYING FOR
                      </span>

                      <strong>
                        {
                          selectedFee.title
                        }
                      </strong>

                      <small>
                        {student?.name ||
                          "Student"}
                      </small>

                    </div>

                    <div className="pp-payment-summary-amount">

                      <span>
                        AMOUNT
                      </span>

                      <strong>
                        ₹
                        {formatCurrency(
                          selectedFee.amount
                        )}
                      </strong>

                    </div>

                  </div>

                  {/* ERROR */}

                  {paymentMessage && (

                    <div className="pp-payment-message">

                      <FaExclamationCircle />

                      <span>
                        {paymentMessage}
                      </span>

                    </div>

                  )}

                  {/* =================================================
                      UPI
                      ================================================= */}

                  {paymentMethod ===
                    "upi" && (

                    <div className="pp-payment-panel">

                      <div className="pp-payment-panel-heading">

                        <FaMobileAlt />

                        <div>

                          <h3>
                            Pay using UPI
                          </h3>

                          <p>
                            Select your
                            preferred UPI
                            option.
                          </p>

                        </div>

                      </div>

                      <div className="pp-upi-apps">

                        {upiApps.map(
                          (app) => (

                            <button
                              type="button"
                              key={app.id}
                              className={`pp-upi-app ${
                                selectedUpiApp ===
                                app.id
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => {
                                setSelectedUpiApp(
                                  app.id
                                );

                                setPaymentMessage(
                                  ""
                                );
                              }}
                            >

                              <span>
                                {
                                  app.shortName
                                }
                              </span>

                              <strong>
                                {app.name}
                              </strong>

                              <i />

                            </button>

                          )
                        )}

                      </div>

                      {selectedUpiApp !==
                        "upi-id" && (

                        <div className="pp-upi-info">

                          <FaExternalLinkAlt />

                          <div>

                            <strong>
                              {
                                upiApps.find(
                                  (app) =>
                                    app.id ===
                                    selectedUpiApp
                                )?.name
                              }{" "}
                              selected
                            </strong>

                            <p>
                              ₹
                              {formatCurrency(
                                selectedFee.amount
                              )}{" "}
                              will be added
                              automatically
                              to the UPI
                              payment request.
                            </p>

                          </div>

                        </div>

                      )}

                      {selectedUpiApp ===
                        "upi-id" && (

                        <div className="pp-field-group pp-upi-id-field">

                          <label>
                            Enter UPI ID
                          </label>

                          <div className="pp-input-wrap">

                            <FaMobileAlt />

                            <input
                              type="text"
                              value={
                                customerUpiId
                              }
                              onChange={(
                                event
                              ) => {
                                setCustomerUpiId(
                                  event.target.value
                                );

                                setPaymentMessage(
                                  ""
                                );
                              }}
                              placeholder="name@upi"
                              autoComplete="off"
                            />

                          </div>

                          <small>
                            Example:
                            name@okaxis,
                            name@ybl
                          </small>

                        </div>

                      )}

                      <div className="pp-upi-payment-preview">

                        <div>

                          <span>
                            PAYMENT TO
                          </span>

                          <strong>
                            AB Public School
                          </strong>

                        </div>

                        <div>

                          <span>
                            AMOUNT
                          </span>

                          <strong>
                            ₹
                            {formatCurrency(
                              selectedFee.amount
                            )}
                          </strong>

                        </div>

                      </div>

                    </div>

                  )}

                  {/* =================================================
                      CARD
                      ================================================= */}

                  {paymentMethod ===
                    "card" && (

                    <div className="pp-payment-panel">

                      <div className="pp-payment-panel-heading">

                        <FaCreditCard />

                        <div>

                          <h3>
                            Debit / Credit Card
                          </h3>

                          <p>
                            Frontend card
                            interface demo.
                          </p>

                        </div>

                      </div>

                      <div className="pp-card-form">

                        <div className="pp-field-group pp-field-full">

                          <label>
                            Card Number
                          </label>

                          <div className="pp-input-wrap">

                            <FaCreditCard />

                            <input
                              type="text"
                              name="cardNumber"
                              value={
                                cardData.cardNumber
                              }
                              onChange={
                                handleCardChange
                              }
                              inputMode="numeric"
                              placeholder="1234 5678 9012 3456"
                            />

                          </div>

                        </div>

                        <div className="pp-field-group pp-field-full">

                          <label>
                            Name on Card
                          </label>

                          <input
                            type="text"
                            name="cardHolder"
                            value={
                              cardData.cardHolder
                            }
                            onChange={
                              handleCardChange
                            }
                            placeholder="Card holder name"
                          />

                        </div>

                        <div className="pp-field-group">

                          <label>
                            Expiry
                          </label>

                          <input
                            type="text"
                            name="expiry"
                            value={
                              cardData.expiry
                            }
                            onChange={
                              handleCardChange
                            }
                            inputMode="numeric"
                            placeholder="MM/YY"
                          />

                        </div>

                        <div className="pp-field-group">

                          <label>
                            CVV
                          </label>

                          <div className="pp-input-wrap">

                            <FaLock />

                            <input
                              type="password"
                              name="cvv"
                              value={
                                cardData.cvv
                              }
                              onChange={
                                handleCardChange
                              }
                              inputMode="numeric"
                              placeholder="•••"
                            />

                          </div>

                        </div>

                      </div>

                      <div className="pp-demo-notice">

                        <FaShieldAlt />

                        <p>
                          Card payment is
                          frontend UI only.
                          No real card is
                          charged.
                        </p>

                      </div>

                    </div>

                  )}

                  {/* =================================================
                      NET BANKING
                      ================================================= */}

                  {paymentMethod ===
                    "netbanking" && (

                    <div className="pp-payment-panel">

                      <div className="pp-payment-panel-heading">

                        <FaUniversity />

                        <div>

                          <h3>
                            Net Banking
                          </h3>

                          <p>
                            Select your
                            preferred bank.
                          </p>

                        </div>

                      </div>

                      <div className="pp-bank-list">

                        {banks.map(
                          (bank) => (

                            <button
                              type="button"
                              key={bank}
                              className={`pp-bank-option ${
                                selectedBank ===
                                bank
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => {
                                setSelectedBank(
                                  bank
                                );

                                setPaymentMessage(
                                  ""
                                );
                              }}
                            >

                              <span>
                                <FaUniversity />
                              </span>

                              <strong>
                                {bank}
                              </strong>

                              <i />

                            </button>

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* FOOTER */}

                  <div className="pp-payment-footer">

                    <div className="pp-payment-security">

                      <FaLock />

                      <span>
                        Frontend payment
                        demonstration
                      </span>

                    </div>

                    <button
                      type="button"
                      className="pp-pay-button"
                      onClick={
                        handlePayment
                      }
                    >

                      {
                        getPaymentButtonText()
                      }

                      <span>
                        ₹
                        {formatCurrency(
                          selectedFee.amount
                        )}
                      </span>

                      <FaChevronRight />

                    </button>

                  </div>

                </main>

              </div>

            )}

            {/* =================================================
                WAITING
                ================================================= */}

            {paymentStatus ===
              "waiting" && (

              <div className="pp-upi-waiting">

                <div className="pp-waiting-icon">
                  <FaMobileAlt />
                </div>

                <span className="pp-eyebrow">
                  UPI PAYMENT
                </span>

                <h2>
                  Complete Your Payment
                </h2>

                <p>
                  Complete the payment of{" "}

                  <strong>
                    ₹
                    {formatCurrency(
                      selectedFee.amount
                    )}
                  </strong>{" "}

                  in your UPI app. After
                  completing the payment,
                  return to this page.
                </p>

                <div className="pp-waiting-summary">

                  <div>

                    <span>
                      Student
                    </span>

                    <strong>
                      {student?.name ||
                        "Student"}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Fee
                    </span>

                    <strong>
                      {
                        selectedFee.title
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Amount
                    </span>

                    <strong>
                      ₹
                      {formatCurrency(
                        selectedFee.amount
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {
                        getPaymentMethodName()
                      }
                    </strong>

                  </div>

                </div>

                <div className="pp-waiting-actions">

                  <button
                    type="button"
                    className="pp-secondary-btn"
                    onClick={
                      openUpiPayment
                    }
                  >
                    <FaExternalLinkAlt />

                    Open Payment App Again
                  </button>

                  <button
                    type="button"
                    className="pp-pay-button"
                    onClick={
                      confirmUpiPayment
                    }
                  >
                    <FaCheckCircle />

                    I Have Completed Payment
                  </button>

                  <button
                    type="button"
                    className="pp-text-button"
                    onClick={() => {
                      setPaymentStatus(
                        "payment"
                      );

                      setPaymentMessage(
                        ""
                      );
                    }}
                  >
                    <FaArrowLeft />

                    Change Payment Method
                  </button>

                </div>

              </div>

            )}

            {/* =================================================
                CHECKING
                ================================================= */}

            {paymentStatus ===
              "checking" && (

              <div className="pp-payment-checking">

                <div className="pp-checking-loader">
                  <span />
                </div>

                <span className="pp-eyebrow">
                  CHECKING PAYMENT
                </span>

                <h2>
                  Checking Your Payment
                </h2>

                <p>
                  Please wait while the
                  payment status is being
                  checked.
                </p>

                <div className="pp-checking-box">

                  <div>

                    <span>
                      Student
                    </span>

                    <strong>
                      {student?.name ||
                        "Student"}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Fee
                    </span>

                    <strong>
                      {
                        selectedFee.title
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Amount
                    </span>

                    <strong>
                      ₹
                      {formatCurrency(
                        selectedFee.amount
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {
                        getPaymentMethodName()
                      }
                    </strong>

                  </div>

                </div>

                <div className="pp-checking-note">

                  <FaShieldAlt />

                  <span>
                    Checking payment
                    status...
                  </span>

                </div>

              </div>

            )}

            {/* =================================================
                NOT VERIFIED
                ================================================= */}

            {paymentStatus ===
              "not-verified" && (

              <div className="pp-payment-notverified">

                <div className="pp-notverified-icon">
                  <FaExclamationCircle />
                </div>

                <span className="pp-eyebrow">
                  PAYMENT STATUS
                </span>

                <h2>
                  Payment Not Verified
                </h2>

                <p>
                  The frontend could not
                  verify this bank
                  transaction. If the
                  payment was not
                  completed, open your
                  payment app and try
                  again.
                </p>

                <div className="pp-notverified-summary">

                  <div>

                    <span>
                      Student
                    </span>

                    <strong>
                      {student?.name ||
                        "Student"}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Fee
                    </span>

                    <strong>
                      {
                        selectedFee.title
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Amount
                    </span>

                    <strong>
                      ₹
                      {formatCurrency(
                        selectedFee.amount
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Status
                    </span>

                    <strong className="pp-unverified-status">
                      Not Verified
                    </strong>

                  </div>

                </div>

                <div className="pp-notverified-actions">

                  <button
                    type="button"
                    className="pp-primary-btn"
                    onClick={
                      openUpiPayment
                    }
                  >
                    <FaRedoAlt />

                    Try Payment Again
                  </button>

                  <button
                    type="button"
                    className="pp-secondary-btn"
                    onClick={() => {
                      setPaymentStatus(
                        "payment"
                      );

                      setPaymentMessage(
                        ""
                      );
                    }}
                  >
                    <FaArrowLeft />

                    Change Method
                  </button>

                </div>

              </div>

            )}

            {/* =================================================
                CARD / NET BANKING PROCESSING
                ================================================= */}

            {paymentStatus ===
              "processing" && (

              <div className="pp-payment-processing">

                <div className="pp-payment-loader">
                  <span />
                </div>

                <span className="pp-eyebrow">
                  DEMO PROCESSING
                </span>

                <h2>
                  Processing Payment
                </h2>

                <p>
                  Please wait while the
                  frontend demo payment
                  is processed.
                </p>

                <div className="pp-processing-amount">

                  <span>
                    Payment Amount
                  </span>

                  <strong>
                    ₹
                    {formatCurrency(
                      selectedFee.amount
                    )}
                  </strong>

                </div>

              </div>

            )}

            {/* =================================================
                DEMO SUCCESS
                Card/Netbanking frontend demo only
                ================================================= */}

            {paymentStatus ===
              "success" && (

              <div className="pp-payment-success">

                <div className="pp-success-icon">
                  <FaCheckCircle />
                </div>

                <span className="pp-eyebrow">
                  DEMO COMPLETED
                </span>

                <h2>
                  Demo Payment Completed
                </h2>

                <p>
                  This is a frontend
                  demonstration result.
                </p>

                <div className="pp-success-receipt">

                  <div>

                    <span>
                      Student
                    </span>

                    <strong>
                      {student?.name ||
                        "Student"}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Fee
                    </span>

                    <strong>
                      {
                        selectedFee.title
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Amount
                    </span>

                    <strong>
                      ₹
                      {formatCurrency(
                        selectedFee.amount
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {
                        getPaymentMethodName()
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Demo Transaction ID
                    </span>

                    <strong>
                      {transactionId}
                    </strong>

                  </div>

                </div>

                <div className="pp-success-actions">

                  <button
                    type="button"
                    className="pp-secondary-btn"
                    onClick={() =>
                      downloadReceipt(
                        selectedFee
                      )
                    }
                  >
                    <FaDownload />
                    Demo Receipt
                  </button>

                  <button
                    type="button"
                    className="pp-primary-btn"
                    onClick={
                      closePayment
                    }
                  >
                    <FaArrowLeft />
                    Back to Fees
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
};

/* =========================================================
   SUMMARY CARD
   ========================================================= */

const FeeSummary = ({
  title,
  amount,
  type = "total",
}) => {
  return (
    <article
      className={`pp-summary-card ${type}`}
    >

      <span className="pp-summary-icon">

        {type === "paid" ? (
          <FaCheckCircle />
        ) : type === "pending" ? (
          <FaClock />
        ) : (
          <FaWallet />
        )}

      </span>

      <div>

        <strong>
          ₹
          {Number(
            amount || 0
          ).toLocaleString(
            "en-IN"
          )}
        </strong>

        <p>
          {title}
        </p>

      </div>

    </article>
  );
};

export default ParentFees;