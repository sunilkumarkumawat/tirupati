import * as yup from "yup";

export const appointmentSchema = yup.object().shape({
  patient_name: yup.string().required("Name is required"),
  name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   gender: yup.string().required("Select gender"),
//   date: yup.date().required("Please select a date"),
//   time: yup.date().required("Please select time"),
//   mobile: yup
//     .string()
//     .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
//     .required("Mobile is required"),
//   doctor: yup.string().required("Doctor is required"),
//   injury: yup.string().nullable(),
//   appointmentStatus: yup.string().required("Status is required"),
//   visitType: yup.string().required("Visit Type is required"),
//   paymentStatus: yup.string().required("Payment Status is required"),
//   insuranceProvider: yup.string().nullable(),
//   notes: yup.string().nullable(),
});
