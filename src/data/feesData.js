import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";


// =========================================================
// STORAGE KEY
// =========================================================

export const FEES_KEY = "abpsFees";


// =========================================================
// DEFAULT FEES DATA
// =========================================================

const defaultFees = [
  {
    id: "FEE-001",
    studentId: "STU-1001",
    feeType: "Tuition Fee",
    amount: 18000,
    status: "Paid",
    dueDate: "2026-09-15",
    paidDate: "2026-09-10",
    paymentMethod: "Online",
    transactionId: "TXN-10001",
    remarks: "Payment received successfully.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "FEE-002",
    studentId: "STU-1001",
    feeType: "Transport Fee",
    amount: 6000,
    status: "Paid",
    dueDate: "2026-09-15",
    paidDate: "2026-09-11",
    paymentMethod: "UPI",
    transactionId: "TXN-10002",
    remarks: "",
    createdAt: new Date().toISOString(),
  },

  {
    id: "FEE-003",
    studentId: "STU-1001",
    feeType: "Activity Fee",
    amount: 2500,
    status: "Pending",
    dueDate: "2026-09-30",
    paidDate: "",
    paymentMethod: "",
    transactionId: "",
    remarks: "Payment pending.",
    createdAt: new Date().toISOString(),
  },
];


// =========================================================
// GET ALL FEES
// =========================================================

export const getFees = () => {
  return readData(
    FEES_KEY,
    defaultFees
  );
};


// =========================================================
// INITIALIZE FEES
// =========================================================

export const initializeFees = () => {
  const saved =
    localStorage.getItem(
      FEES_KEY
    );

  if (!saved) {
    writeData(
      FEES_KEY,
      defaultFees
    );
  }

  return getFees();
};


// =========================================================
// ADD FEE
// =========================================================

export const addFee = (fee) => {
  try {
    const fees = getFees();

    const newFee = {
      id: createId("FEE"),

      studentId:
        fee.studentId || "",

      feeType:
        fee.feeType || "",

      amount:
        Number(fee.amount) || 0,

      status:
        fee.status || "Pending",

      dueDate:
        fee.dueDate || "",

      paidDate:
        fee.paidDate || "",

      paymentMethod:
        fee.paymentMethod || "",

      transactionId:
        fee.transactionId || "",

      remarks:
        fee.remarks || "",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };


    writeData(
      FEES_KEY,
      [
        newFee,
        ...fees,
      ]
    );


    return newFee;

  } catch (error) {
    console.error(
      "Add fee error:",
      error
    );

    return null;
  }
};


// =========================================================
// UPDATE FEE
// =========================================================

export const updateFee = (
  id,
  changes
) => {
  const updatedChanges = {
    ...changes,
  };


  // Amount hamesha number rahe

  if (
    updatedChanges.amount !==
    undefined
  ) {
    updatedChanges.amount =
      Number(
        updatedChanges.amount
      ) || 0;
  }


  return updateItemById(
    FEES_KEY,
    id,
    updatedChanges
  );
};


// =========================================================
// DELETE FEE
// THIS FIXES YOUR CURRENT ERROR
// =========================================================

export const deleteFee = (
  id
) => {
  return removeItemById(
    FEES_KEY,
    id
  );
};


// =========================================================
// GET SINGLE FEE
// =========================================================

export const getFeeById = (
  id
) => {
  return getFees().find(
    (fee) =>
      fee.id === id
  );
};


// =========================================================
// GET STUDENT FEES
// Student / Parent portal me useful
// =========================================================

export const getStudentFees = (
  studentId
) => {
  if (!studentId) {
    return [];
  }


  return getFees().filter(
    (fee) =>
      fee.studentId ===
      studentId
  );
};


// =========================================================
// GET PAID FEES
// =========================================================

export const getPaidFees = (
  studentId = null
) => {
  return getFees().filter(
    (fee) => {
      const studentMatch =
        !studentId ||
        fee.studentId ===
          studentId;

      return (
        studentMatch &&
        fee.status === "Paid"
      );
    }
  );
};


// =========================================================
// GET PENDING FEES
// =========================================================

export const getPendingFees = (
  studentId = null
) => {
  return getFees().filter(
    (fee) => {
      const studentMatch =
        !studentId ||
        fee.studentId ===
          studentId;

      return (
        studentMatch &&
        fee.status ===
          "Pending"
      );
    }
  );
};


// =========================================================
// GET TOTAL FEE AMOUNT
// =========================================================

export const getTotalFeeAmount = (
  studentId = null
) => {
  const fees =
    studentId
      ? getStudentFees(studentId)
      : getFees();


  return fees.reduce(
    (total, fee) =>
      total +
      Number(fee.amount || 0),
    0
  );
};


// =========================================================
// GET TOTAL PAID AMOUNT
// =========================================================

export const getTotalPaidAmount = (
  studentId = null
) => {
  return getPaidFees(
    studentId
  ).reduce(
    (total, fee) =>
      total +
      Number(fee.amount || 0),
    0
  );
};


// =========================================================
// GET TOTAL PENDING AMOUNT
// =========================================================

export const getTotalPendingAmount = (
  studentId = null
) => {
  return getPendingFees(
    studentId
  ).reduce(
    (total, fee) =>
      total +
      Number(fee.amount || 0),
    0
  );
};


// =========================================================
// MARK FEE AS PAID
// =========================================================

export const markFeeAsPaid = (
  id,
  paymentData = {}
) => {
  return updateFee(
    id,
    {
      status: "Paid",

      paidDate:
        paymentData.paidDate ||
        new Date()
          .toISOString()
          .split("T")[0],

      paymentMethod:
        paymentData.paymentMethod ||
        "",

      transactionId:
        paymentData.transactionId ||
        "",
    }
  );
};