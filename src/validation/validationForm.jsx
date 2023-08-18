import * as yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {  baseURL } from "../services/AxiosApi";

const digit = /^\d+$/; // Only Digit are allowed for this field.
const alphaNumeric = /^[a-zA-Z0-9_]*$/; // Only alphabets and numeric are allowed for this field.
const alphaWithSpace = /^[aA-zZ\s]+$/; // Only alphabets are allowed for this field with "Space".
const alphaWithOutSpace = /^[A-Za-z]*$/; // Only alphabets are allowed for this field without "Space".
const alphaNumericWithSpace = /^[a-zA-Z0-9_\s]+$/; // Only alphabets  and numeric are allowed for this field with "Space".
const alphaNumericWithOutSpace = /^[a-zA-Z0-9_]*$/; // Only alphabets  and numeric are allowed for this field without "Space".
/*=========> Validation for Login Form ==========>*/
export const staticToken =
  "eyJhb5cCI6IkpXVCJ9.eyJzdWIiOiJEZXB0IiwiZW1hRhaHViLmVtcDA5QGdtYWlsLmNvbSIsImp0aSI6ImgzMy05MDAwLTE0ObG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0In0AsqYeezwXWqsL6WLZulQ9bwI";
export const loginValidation = yup.object({
  /*=========> Login Information Validation ==========>*/
  userName: yup
    .string()
    .email("Email should be valid and contain @")
    .required("Please Enter Username"),
  userNamePassword: yup.string().required("Please Enter your password"),
  //.min(8, "Password must be at least 8 characters.")
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
  //   "Password should be of 8-15 characters including atleast 1 special, 1 lower, 1 upper character and 1 digit."
  // )
  roleType: yup.string().required("Please Select Role"),
});
export const EmployerJobFairLoginValidation = yup.object({
  /*=========> Login Information Validation ==========>*/
  userId: yup.string().required("Please Enter Username"),
  userPassword: yup
    .string()
    .required("Please Enter your password")
    .min(8, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      "Password should be of 8-15 characters including atleast 1 special, 1 lower, 1 upper character and 1 digit."
    ),
});
export const slotBookingValidation = yup.object({
  /*=========> Login Information Validation ==========>*/

  RegistrationId: yup
    .string()
    .required("Please Enter Registration No")
    .max(10, "Please enter valid registration no.")
    .min(10, "Please enter valid registration no.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Registration no must be only digits"
    ),
  Dob: yup.string().required("Enter Date of Birth"),
});
/*=========> Validation for Login ForgotPassword Form ==========>*/
export const ForgotPasswordValidation = yup.object({
  /*=========> Login Information Validation ==========>*/
  role: yup.string().required("Please Select Role Type"),
  rid: yup
    .string()
    .required("Please enter registration no.")
    .max(12, "Please enter valid registration no.")
    .min(10, "Please enter valid registration no.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Registration no must be only digits"
    ),
  mobile: yup
    .string()
    .required("Please enter mobile no")
    .matches(/^[0-9]+$/, "Mobile no must be only digits")
    .max(10, "Please Enter Valid Mobile No.")
    .min(10, "Please Enter Valid Mobile No.")

    .test(
      "Unique mobile no",
      "Mobile No not Exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${baseURL}/Registration/isalreadysignedmobile?mobile=${value}`
              )
              .then((res) => {
                resolve(!res.data);
                console.warn("res.data", res.data);
                if (res.data === true) {
                  alert(
                    "Mobile No is not Exists, Please Enter Registered Mobile No"
                  );
                }
              });
          });
        }
      }
    ),
  mobileOTP: yup
    .string()
    .required("Please Enter OTP")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone No Must be only digits"
    )
    .min(6, "Must be equal to 6 characters")
    .max(6, "Must be equal to 6 characters"),
  newPassword: yup
    .string()
    .required("Please Enter your password")
    .min(8, "Password must be at least 8 characters.")
    .max(15, "Password must be 15 characters at maximum")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\?\*])(?=.{8,})/,
      "Password should be of 8-15 characters including atleast 1 special, 1 lower, 1 upper character and 1 digit."
    ),
  newConfirmPassword: yup
    .string()
    .required("Please Enter your confirm password")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

/*=========> Validation for Registration Form ==========>*/

export const RegistrationFormValidation = yup.object({
  /*=========> Basic Information Validation ==========>*/
  rFname: yup
    .string()
    .required("Please Enter First Name")
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),
  mFname: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field "),
  rLname: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field "),
  fatRname: yup
    .string()
    .required("Please Enter Father's Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  motRFname: yup
    .string()
    .required("Please Enter Mother's Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  rDob: yup
    .string()
    .required("Please Select Date of Birth")
    // .matches(
    //   /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
    //   "Date of Birth must be a valid date in the format DD-MM-YYYY"
    // )
    .test(
      "Unique Date of Birth No",
      "You must be 14 yrs Old to Register", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            //debugger
            axios
              .get(`${baseURL}/Registration/isunderage?dob=${value}`)
              .then((res) => {
                resolve(res.data);
                //console.warn("res.data", res.data);
                // if (res.data === true) {
                //   alert("Mobile no already exists, Please Enter Another Mobile No");
                // }
              });
          });
        }
      }
    ),

  gender: yup.string().required("Please select gender"),
  maritalStatus: yup.string().required("Please Select Marital Status"),
  urbanRural: yup.string().required("Please Select Urban/Rural"),
  religion: yup.string().required("Please Select Religion"),
  category: yup.string().required("Please Select Category"),
  cCertificateNo: yup.string().when("category", (val, schema) => {
    if (val === "1") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Enter Category Certificate No")
        .matches(
          /^[a-zA-Z0-9_]*$/,
          "Special Characters are not allowed for this field "
        )
        .max(15, "Must be less than 15 characters")
        .min(10, "Must be greater than 10 characters");
  }),
  cIssuedBy: yup.string().when("category", (val, schema) => {
    if (val === "1") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Certificate Issued By");
  }),
  disability: yup.string().required("Please Select Any Disability"),

  dtype: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Disability Type");
  }),

  dStype: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Disability Sub Type ");
  }),

  dDisabilePer: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Enter Disability %")
        .test(
          "dDisabilePers",
          "Disability % Between 40 .. 100", // <- key, message
          function (value) {
            if (value !== "") {
              let dper = parseInt(value, 10);
              if (dper >= 40 && dper <= 100) {
                return true;
              } else return false;
            }
          }
        );
  }),

  dCertificateNo: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Enter Disability Certificate No")
        .matches(
          /^[a-zA-Z0-9_]*$/,
          "Special Characters are not allowed for this field "
        )
        .max(15, "Must be less than 15 characters")
        .min(10, "Must be greater than 10 characters");
  }),

  dIssuedBy: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Issued By");
  }),
  exServiceman: yup.string().required("Please Select Ex Serviceman"),

  exNameForce: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Name Of Force");
  }),

  exDJoining: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Select Date of Joining")
        .test(
          "exDJoining",
          "Date of Joining must be less than Date of Discharge",
          function (value) {
            if (value !== "" && value !== undefined) {
              //let D1 = this.resolve(yup.ref("exDJoining")).split('-');
              let D1 = this.resolve(yup.ref("exDJoining"));
              let D2 = this.resolve(yup.ref("exDDischarge"));
              if (D2 !== "") {
                return D2 >= D1 ? true : false;
              } else {
                return true;
              }
            }
          }
        );
  }),

  exDDischarge: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Select Date of Discharge")
        .test(
          "exDDischarge",
          "Date of Discharge must be greater than Date of Joining",
          function (value) {
            if (value !== "" && value !== undefined) {
              //let D1 = this.resolve(yup.ref("exDJoining")).split('-');
              let D1 = this.resolve(yup.ref("exDJoining"));
              let D2 = this.resolve(yup.ref("exDDischarge"));
              // alert(D1);
              return D2 >= D1 ? true : false;
            }
          }
        );
  }),

  //exDJoining: yup
  //    .string()
  //    .when(
  //        "exDDischarge",
  //        (endDate, schema) =>
  //            endDate &&
  //            schema.max(
  //                endDate,
  //                "Date of Joining must be less than Date of Discharge"
  //            )
  //    ),

  //exDDischarge: yup
  //    .string()
  //    .min(
  //        yup.ref("exDJoining"),
  //        "Date of Discharge must be grater than Date of Joining"
  //    ),

  // exDJoining: yup.date().when("exDDischarge", (endDate, schema) => endDate && schema.max( endDate, "Date of Joining must be less than Date of Discharge"  )  ),

  // exDDischarge: yup.date().min(yup.ref("exDJoining"), "Date of Discharge must be grater than Date of Joining"),

  exRank: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Rank");
  }),
  rankReasonsDischarge: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Reason for Discharge");
  }),
  exRegiServNo: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Enter Regi/Serv.No")
        .matches(
          /^[a-zA-Z0-9_]*$/,
          "Special Characters are not allowed for this field "
        )
        .max(15, "Must be less than 15 characters")
        .min(10, "Must be greater than 10 characters");
  }),
  paExServicePersonnel: yup
    .string()
    .required("Please Select Any Ex-Service Personnel "),
  paExSerCertificateNo: yup
    .string()
    .when("paExServicePersonnel", (val, schema) => {
      if (val === "0") {
        return yup.string().notRequired();
      } else
        return yup
          .string()
          .required("Please Enter Priority Certificate No.")
          .matches(
            /^[a-zA-Z0-9_]*$/,
            "Special Characters are not allowed for this field "
          )
          .max(15, "Must be less than 15 characters")
          .min(10, "Must be greater than 10 characters");
    }),
  acceptTerm: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  /*=========>     Declaration Regarding Physical Fitness  ==========>*/

  phHeight: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Height should have digits only"),
  phWeight: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Weight should have digits only"),
  phChest: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Chest should have digits only"),

  /*=========> Correspondance Address Validation ==========>*/

  address: yup.string().required("Please Enter Correspondance Address"),
  locality: yup.string().required("Please Enter Correspondance Locality"),
  st_Code: yup.string().required("Please Select Correspondance State"),
  pin: yup
    .string()
    .required("Please Enter Correspondance Pin")
    .matches(/^\d+$/, "Pin should have digits only")
    .min(6),
  // mobile: yup
  //   .string()
  //   .required("Please enter mobile no")
  //   .matches(/^[0-9]+$/, "Phone No Must be only digits"),
  mobile: yup
    .string()
    .required("Please enter mobile no")
    .min(10, "Mobile No Must be 10 characters")
    .max(10, "Mobile No Must be 10 characters")
    .matches(/^[0-9]+$/, "Mobile no must be only digits")
    .test(
      "Unique mobile no",
      "Mobile no already exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            //debugger
            axios
              .get(
                `${baseURL}/Registration/isalreadysignedmobile?mobile=${value}`
              )
              .then((res) => {
                resolve(res.data);
                //console.warn("res.data",res.data)
                if (res.data === false) {
                  // alert("Mobile no already exists, Please Enter Another Mobile No");
                }
              });
          });
        }
      }
    ),
  email: yup
    .string()
    .email("Email should be valid and contain @")
    .lowercase("CNWHVLK")
    .max(50, "Must be less  than 50 characters")
    .required("Please Enter Email Id")
    .test(
      "Unique Email",
      "Email ID already Exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            //debugger
            axios
              .get(
                `${baseURL}/Registration/isalreadysignedemail?email=${value}`
              )
              .then((res) => {
                resolve(res.data);
                //console.warn("res.data",res.data)
                if (res.data === false) {
                  // alert("Email ID already Exists, Please Enter Another Email Id");
                }
              });
          });
        }
      }
    ),

  tel: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Telephone No Must be only digits"),

  /*=========> Permanent Address Validation ==========>*/

  address2: yup.string().required("Please Enter Permanent Address"),
  locality2: yup.string().required("Please Enter Permanent Locality"),
  st_Code2: yup.string().required("Please Select Permanent State"),
  pin2: yup
    .string()
    .required("Please Enter Permanent Pin")
    .matches(/^\d+$/, "The field should have digits only")
    .min(6, "Pin Must be 6 digits"),
  mobile2: yup
    .string()
    .required("Please enter mobile no")
    .min(10, "Mobile No Must be 10 characters")
    .max(10, "Mobile No Must be 10 characters")
    // .matches(
    //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    //   "Phone number is not valid"
    // )
    .matches(/^[0-9]+$/, "Phone No Must be only digits"),

  ct_Code: yup.string().required("Please Enter Permanent City"),
  tel2: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Telephone No Must be only digits"),
  emailOtp: yup
    .string()
    .required("Please Enter Email OTP")
    .max(6, "Email Otp must be at most 6 characters")
    .matches(/^\d*$/, "Email OTP Must be only digits"),

  mobileOtp: yup
    .string()
    .required("Please Enter Mobile OTP")
    .max(6, "Mobile Otp must be at most 6 characters")
    .matches(/^\d*$/, "Mobile OTP Must be only digits"),
});

export const ChangePasswordValidation = yup.object({
  /*=========> Change Password Validation ==========>*/
  oldPassword: yup
    .string()
    .required("Please Enter Old password")
    .min(6, "Password must be 6 characters at minimum"),
  NewPassword: yup
    .string()
    .required("Please Enter New password")
    .min(6, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should be of 8-15 characters including atleast 1 special, 1 lower, 1 upper character and 1 digit."
    ),
  NewConfirmPassword: yup
    .string()
    .required("Please Enter confirm New password")
    .oneOf([yup.ref("NewPassword"), null], "Passwords does not match"),
});
export const ChangePasswordValidationDept = yup.object({
  /*=========> Change Password Validation ==========>*/
  oldPassword: yup
    .string()
    .required("Please Enter Old password")
    .min(6, "Password must be 6 characters at minimum"),
  NewPassword: yup
    .string()
    .required("Please Enter New password")
    .min(6, "Password must be at least 8 characters."),

  NewConfirmPassword: yup
    .string()
    .required("Please Enter confirm New password")
    .oneOf([yup.ref("NewPassword"), null], "Passwords does not match"),
});

/*=========> Validation for Update Candidate Profile Form ==========>*/

export const UpdateCandidateFormValidation = yup.object({
  /*=========> Basic Information Validation ==========>*/
  rFname: yup
    .string()
    .required("Please Enter First Name")
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),
  mFname: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),
  rLname: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),
  fatRname: yup
    .string()
    .required("Please Enter Father's Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),
  motRFname: yup
    .string()
    .required("Please Enter Mother's Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),

  gender: yup.string().required("Please select gender"),
  maritalStatus: yup.string().required("Please Select Marital Status"),
  urbanRural: yup.string().required("Please Select Urban/Rural"),
  religion: yup.string().required("Please Select Religion"),
  category: yup.string().required("Please Select Category"),
  cCertificateNo: yup
    .string()
    .notRequired("Please Enter Category Certificate No")
    .matches(/^[a-zA-Z0-9_]*$/, "dsgsdg")
    .max(15, "Must be less than 15 characters")
    .min(10, "Must be greater than 10 characters"),
  cIssuedBy: yup.string().notRequired("Please Enter Certificate Issued By"),
  disability: yup.string().required("Field is Required"),
  dtype: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Disability Type");
  }),
  dStype: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Disability Sub Type");
  }),

  dDisabilePer: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Enter Disability %")
        .test(
          "dDisabilePers",
          "Disability % Between 40 .. 100", // <- key, message
          function (value) {
            if (value !== "") {
              let dper = parseInt(value, 10);
              if (dper >= 40 && dper <= 100) {
                return true;
              } else return false;
            }
          }
        );
  }),

  dCertificateNo: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Enter Certificate No")
        .max(15, "Must be less than 15 characters")
        .min(10, "Must be greater than 10 characters");
  }),

  dIssuedBy: yup.string().when("disability", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Issued By");
  }),
  exServiceman: yup.string().required("Field is Required"),
  exNameForce: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Name Of Force");
  }),

  exDJoining: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Select Date of Joining")
        .test(
          "exDJoining",
          "Date of Joining must be less than Date of Discharge",
          function (value) {
            if (value !== "" && value !== undefined) {
              //let D1 = this.resolve(yup.ref("exDJoining")).split('-');
              let D1 = this.resolve(yup.ref("exDJoining"));
              let D2 = this.resolve(yup.ref("exDDischarge"));
              if (D2 !== "") {
                return D2 >= D1 ? true : false;
              } else {
                return true;
              }
            }
          }
        );
  }),

  exDDischarge: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else
      return yup
        .string()
        .required("Please Select Date of Discharge")
        .test(
          "exDDischarge",
          "Date of Discharge must be greater than Date of Joining",
          function (value) {
            if (value !== "" && value !== undefined) {
              //let D1 = this.resolve(yup.ref("exDJoining")).split('-');
              let D1 = this.resolve(yup.ref("exDJoining"));
              let D2 = this.resolve(yup.ref("exDDischarge"));
              // alert(D1);
              return D2 >= D1 ? true : false;
            }
          }
        );
  }),

  exRank: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Rank");
  }),
  rankReasonsDischarge: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Reason for Discharge");
  }),
  exRegiServNo: yup.string().when("exServiceman", (val, schema) => {
    if (val === "0") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Enter Regi/Serv.No");
  }),
  //paExServicePersonnel: yup.string().required("cwe"),
  paExSerCertificateNo: yup
    .string()
    .when("paExServicePersonnel", (val, schema) => {
      if (val === "0") {
        return yup.string().notRequired();
      } else
        return yup.string().required("Please Enter Priority Certificate No.");
    }),

  /*=========>     Declaration Regarding Physical Fitness  ==========>*/
  phEyeSightError: yup.string().when("phEyeSight", (val, schema) => {
    if (val === "0") {
      return yup.string().required("Please Select EyeSight");
    } else return yup.string().notRequired();
  }),

  phHeight: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Height should have digits only"),
  phWeight: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Weight should have digits only"),
  phChest: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Chest should have digits only"),

  /*=========> Update Candidate Profile Correspondance Address Validation ==========>*/

  address: yup.string().required("Please Enter Address"),
  locality: yup.string().required("Please Enter Locality"),
  st_Code: yup.string().required("Please Select State"),
  pin: yup
    .string()
    .required("Please Enter Correspondance Pin")
    .matches(/^\d+$/, "Pin should have digits only")
    .min(6),
  mobile: yup
    .string()
    .required("Please enter mobile no")
    .min(10, "Mobile No Must be 10 characters")
    .max(10, "Mobile No Must be 10 characters")
    .matches(/^[0-9]+$/, "Phone No Must be only digits"),

  email: yup
    .string()
    .email("Email should be valid and contain @")
    .lowercase("CNWHVLK")
    .required("Please Enter Correspondance Email"),
  tel: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Telephone No Must be only digits")
    .max(11, "Must be less  than 11 characters"),

  /*=========> Update Candidate Profile Permanent Address Validation ==========>*/

  address2: yup.string().required("Please Enter Permanent Address"),
  locality2: yup.string().required("Please Enter Permanent Locality"),
  st_Code2: yup.string().required("Please Select Permanent State"),
  pin2: yup
    .string()
    .required("Please Enter Permanent Pin")
    .matches(/^\d+$/, "The field should have digits only")
    .min(6),
  mobile2: yup
    .string()
    .required("Please enter mobile no")
    .min(10, "Mobile No Must be 10 characters")
    .max(10, "Mobile No Must be 10 characters")
    // .matches(
    //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    //   "Phone number is not valid"
    // )
    .matches(/^[0-9]+$/, "Phone No Must be only digits"),
  ct_Code: yup.string().required("Please Enter Permanent City"),
  tel2: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Telephone No Must be only digits"),
});
export const EditQualificationValidation = yup.object({
  /*=========> Edit Candidate Qualification form Validation ==========>*/

  universityBoard: yup.string().required("Please Enter University Board"),
  yearofPassing: yup
    .string()
    .required("Please Enter Year of Passing")
    .matches(/^\d+$/, "Year of Passing should have digits only")
    .test(
      "yearofPassing",
      "Year of Passing must be less then or equal to Current Year / Year of Passing must be greater then or equal to 1962 ",
      function (value) {
        if (value !== "" && value !== undefined) {
          //let D1 = this.resolve(yup.ref("exDJoining")).split('-');
          let D1 = new Date().getFullYear();
          let D2 = this.resolve(yup.ref("yearofPassing"));
          let D3 = "1962";
          if (D2 > D1 || D2 < D3) {
            return false;
          } else {
            return true;
          }
        }
      }
    )
    .min(4, "Year of Passing must be at least 4 characters"),
  // .test(
  //   "len",
  //   "Must be exactly 4 characters",
  //   (val) => val && val.toString().length === 4
  // )
  // .min(new Date().getFullYear()),
  //.min(4, "Year of Passing must be at least 4 characters"),
  maxMarks: yup
    .string()
    .required("Please Enter Max Mark's")
    .matches(/^\d+$/, "Max Mark's should have digits only"),
  marksObtained: yup
    .string()
    .required("Please Enter Mark's Obtained")
    .matches(/^\d+$/, "Mark's Obtained should have digits only")
    .test(
      "test-compare a few values",
      "Marks Obtained not be greater then Max Mark's",
      function (value) {
        // beware, don't use arrow function here otherwise you would not the reference to `this` object
        let value1 = this.parent["maxMarks"]; // retrieve the value of the sibling form field with id `1st_number`
        let value2 = this.parent["marksObtained"]; // retrieve the value of the sibling form field with id `2nd_number`
        if (parseInt(value1) >= parseInt(value2)) return true;
        else return false;
      }
    ),
});

export const EditSkillsValidation = yup.object({
  /*=========> Edit Candidate Skills form  Validation ==========>*/
  experienceMonths: yup
    .string()
    .required("Please Enter Experience (in months)")
    .matches(/^\d+$/, "Experience should have digits only"),
  // remarks: yup.string().required("Please enter remarks"),
});

export const EditWorkExperienceValidation = yup.object({
  /*=========> Edit Candidate Skills form  Validation ==========>*/

  employerName: yup.string().required("Please Enter Employer Name "),

  designation: yup.string().required("Please Enter designation"),
  //from: yup.string().required("Please Enter From Date"),
  //to: yup.string().required("Please Enter To Date"),
  salaryPM: yup
    .string()
    .required("Please Enter salary per month")
    .matches(/^[0-9]+$/, "Salary Must be only digits"),
  from: yup
    .string()
    .required("Please Select From Date")
    .test("from", "From Date must be less than To Date", function (value) {
      if (value !== "" && value !== undefined) {
        //let D1 = this.resolve(yup.ref("exDJoining")).split('-');
        let D1 = this.resolve(yup.ref("from"));
        let D2 = this.resolve(yup.ref("to"));
        if (D2 !== "") {
          return D2 >= D1 ? true : false;
        } else {
          return true;
        }
      }
    }),

  to: yup
    .string()
    .required("Please Select to Date")
    .test("to", "To Date must be greater than From Date", function (value) {
      if (value !== "" && value !== undefined) {
        //let D1 = this.resolve(yup.ref("exDJoining")).split('-');
        let D1 = this.resolve(yup.ref("from"));
        let D2 = this.resolve(yup.ref("to"));
        // alert(D1);
        return D2 >= D1 ? true : false;
      }
    }),
});

export const EditNationalLanguageValidation = yup.object({
  /*=========> Edit Candidate Skills form  Validation ==========>*/
});
export const AddPreferencesValidation = yup.object({
  minExpectedSalaryPM: yup
    .string()
    .required("Please Enter Min. Expected Salary (p.m)")
    .matches(/^[0-9]+$/, "Min. Expected Salary (p.m) Must be only digits"),
  /*=========> Edit Candidate Skills form  Validation ==========>*/
});
export const NewCandidateListSearch = yup.object({
  /*=========> New Candidate List Search ==========>*/
  Year: yup.string().required("Please select year"),
  Month: yup.string().required("Please select month"),
});

export const ValidateExistingUsers = yup.object({
  /*=========> New Candidate List Search ==========>*/

  Rid: yup.string().required("Enter JS Registration Id"),
  Name: yup.string().required("Enter Name"),
  FatherName: yup
    .string()
    .required("Enter Father's/ Husband's/ Guardian's Name"),
  Dob: yup.string().required("Enter Date of Birth"),
  Gender: yup.string().required("Select gender"),
});

export const GrievanceTrackingStatusValidation = yup.object({
  QueryId: yup
    .string()
    .required("Enter Your query id.")
    .min(14, "Please Enter Valid Query Id")
    .matches(
      alphaNumericWithOutSpace,
      "Special Characters are not allowed for this field"
    ),
});
/*=========> Department ==========>*/
export const Submitrequestaceptreject = yup.object({
  vacanciesStatus: yup.string().required("Please Select Vacancies Status"),
  remarksDte: yup.string().required("Please Enter  Remarks of the Dte."),
});
export const SetEmailMobileForCandidateType = yup.object({
  type: yup.string().required("Please Select Any One Search Type"),
  registrationId: yup.string().when("type", (val, schema) => {
    if (val === "1") {
      return yup.string().required("Please Enter Your Registration Id");
    } else return yup.string().notRequired();
  }),
});
export const CandidateDeleteSection = yup.object({
  registrationId: yup
    .string()
    .required("Please Enter Registration Id")
    .matches(/^[0-9]+$/, "Registration Id Must be only digits")
    .max(10, "Please Enter Valid Registration Id")
    .min(10, "Please Enter Valid Registration Id"),
});
export const CheckCandidateValidationForm = yup.object({
  registrationId: yup
    .string()
    .required("Please Enter Registration Id")
    .matches(/^[0-9]+$/, "Registration Id Must be only digits")
    .max(10, "Please Enter Valid Registration Id")
    .min(10, "Please Enter Valid Registration Id"),
});
export const CandidateDeleteSectionValidationForm = yup.object({
  registrationId: yup
    .string()
    .required("Please Enter Registration Id")
    .matches(/^[0-9]+$/, "Registration Id Must be only digits")
    .max(10, "Please Enter Valid Registration Id")
    .min(10, "Please Enter Valid Registration Id"),
});
export const CandidateDeletePermanentValidationForm = yup.object({
  registrationId: yup
    .string()
    .required("Please Enter Registration Id")
    .matches(/^[0-9]+$/, "Registration Id Must be only digits")
    .max(10, "Please Enter Valid Registration Id")
    .min(10, "Please Enter Valid Registration Id"),
});
export const CandidateDeleteTemporaryValidationForm = yup.object({
  registrationId: yup
    .string()
    .required("Please Enter Registration Id")
    .matches(/^[0-9]+$/, "Registration Id Must be only digits")
    .max(10, "Please Enter Valid Registration Id")
    .min(10, "Please Enter Valid Registration Id"),
  requestType: yup.string().required("Select Request Type"),
  remarks: yup
    .string()
    .required("Please enter remarks")
    .max(100, "Remarks Must Be 100 Characters"),
});

export const GenerateSponsoredList_DeptSection = yup.object({
  requestId: yup.string().required("Please Select One Request Id"),
});
export const SponsorshipDetails_DeptSection = yup.object({
  registrationId: yup
    .string()
    .required("Please Enter Your Registration Id")
    .matches(/^[0-9]+$/, "Registration Id Must be only digits")
    .max(10, "Registration Id Must be 10 digits")
    .min(10, "Registration Id Must be 10 digits"),
});

export const UpdateCandidateSearchRegistrationId = yup.object({
  registrationId: yup.string().required("Please Enter Registration Id"),
});
export const UpdateCandidateSearchEmailId = yup.object({
  emailId: yup
    .string()
    .email("Email should be valid and contain @")
    .lowercase("CNWHVLK")
    .required("Please Enter Email Id")
    .matches(
      /^([0-9a-zA-Z]([\+\-_\.][0-9a-zA-Z]+)*)+@(([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9]{2,3})$/,
      "Invalid Email Id "
    )
    .max(50, "Must be less  than 50 characters"),
});
export const UpdateCandidateEmailId = yup.object({
  newEmailId: yup
    .string()
    .email("Email should be valid and contain @")
    .lowercase("CNWHVLK")
    .max(50, "Must be less  than 50 characters")
    .required("Please Enter Email Id")
    .test(
      "Unique Email",
      "Email ID already Exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            //debugger
            axios
              .get(
                `${baseURL}/Registration/isalreadysignedemail?email=${value}`
              )
              .then((res) => {
                resolve(res.data);
                //console.warn("res.data",res.data)
                if (res.data === false) {
                  alert(
                    "Email ID already Exists, Please Enter Another Email Id"
                  );
                }
              });
          });
        }
      }
    ),
});
export const UpdateCandidateSearchMobile = yup.object({
  mobile: yup
    .string()
    .required("Please enter mobile no")
    .max(10, "Mobile no must be 10 digits")
    .min(10, "Mobile no must be 10 digits"),
});
export const UpdateCandidateMobile = yup.object({
  mobile: yup
    .string()
    .required("Please enter mobile no")
    .matches(/^[0-9]+$/, "Mobile no must be only digits")
    .max(10, "Mobile no must be 10 digits")
    .min(10, "Mobile no must be 10 digits")

    .test(
      "Unique mobile no",
      "Mobile no already exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${baseURL}/Registration/isalreadysignedmobile?mobile=${value}`
              )
              .then((res) => {
                resolve(res.data);
                console.warn("res.data", res.data);
                if (res.data === false) {
                  alert(
                    "Mobile no is already exists, please enter another mobile no."
                  );
                }
              });
          });
        }
      }
    ),
});
export const rptsplcategoryserch = yup.object({
  Year: yup.string().required("Please select year"),
  Month: yup.string().required("Please select month"),
});
export const SponserReportFinancialYearValidation = yup.object({
  Year: yup.string().required("Please select year"),
});
export const SubmitTransferValidation = yup.object({
  rid: yup
    .string()
    .required("Please enter registration no.")
    .max(10, "Please enter valid registration no.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Registration no must be only digits"
    ),
  // name: yup
  //   .string()
  //   .required("Please enter name")
  //   .min(3, "Please enter minimum 3 characters"),
  remark: yup.string().required("Please enter remark"),
});
export const newregistrationsearchValidation = yup.object({
  gender: yup.string().required("Please select gender"),
  name: yup
    .string()
    .required("Please enter first name")
    .min(3, "Please enter minimum 3 characters"),
  // fromdate: yup.date().notRequired(),
  // toDate: yup
  //   .date()
  //   .min(yup.ref("fromdate"), "To date should be greater then from date"),
});
export const OldRegistrationSearchValidation = yup.object({
  gender: yup.string().required("Please select gender"),
  name: yup
    .string()
    .required("Please enter first name")
    .min(3, "Please enter minimum 3 characters"),
  // fromdate: yup.date().required(),
  // toDate: yup
  //   .date()
  //   .min(yup.ref("fromdate"), "To date should be greater then from date"),
});
export const RegistrationSummaryReportValidationForm = yup.object({
  fromdate: yup.date().required(),
  toDate: yup
    .date()
    .min(yup.ref("fromdate"), "To date should be greater then from date"),
});
export const JobfairDate = yup.object({
  fromdate: yup.date().required(),
  toDate: yup
    .date()
    .min(yup.ref("fromdate"), "To date should be greater then from date"),
});
export const oldregistrationsearch = yup.object({
  gender: yup.string().required("Please select gender"),
  name: yup.string().required("Please enter name"),
});
export const WhatsNewValidation = yup.object({
  whatsNewText: yup.string().required("Enter what's new text"),
});

/*=========> Request for Sponsoring Suitable Candidates Not Covered Under
            Compulsory Notification of Vacancies Act,1959 Validation Form ==========>*/

export const RequestforSponsoringSuitableCandidatesNotCoveredUnderCNVValidationForm =
  yup.object({
    jobTitlename: yup.string().required("Enter title of the Jobs"),
    noOfVacancies: yup
      .string()
      .required("Enter no of vacancies")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(6, "No Of vacancy must be less then 6 digits")
      .min(1, "No Of vacancy must be atleast 1 digits"),
    offeredPay: yup
      .string()
      .required("Enter Scale/ Pay")
      .max(15, "Offered Pay Must be less then 15 digits")
      .matches(/^[0-9]+$/, "Offered Pay Must be only digits"),
    ageFrom: yup
      .string()
      .required("Please enter age from")
      .matches(/^[0-9]+$/, "Age from must be only digits")
      .max(2, "Age from must be less than 2 digits")
      .test(
        "ageFrom",
        "Age from should be less than Age to and greater than 14 Yr's",
        function (value) {
          if (value !== "" && value !== undefined) {
            let D1 = this.resolve(yup.ref("ageFrom"));
            let D2 = this.resolve(yup.ref("ageTo"));
            if (D2 !== "" && D2 < 60) {
              if (D1 < 14) {
                return false;
              }
              return D2 >= D1 ? true : false;
            } else if (D1 < 14) {
              return false;
            } else {
              return true;
            }
          }
        }
      ),
    ageTo: yup
      .string()
      .required("Please Enter Age To")
      .matches(/^[0-9]+$/, "Age from must be only digits")
      .max(2, "Age To Must be less Then 2 digits")
      .test(
        "ageTo",
        "Age To should be greater than age from and less than 60 Yr's ",
        function (value) {
          if (value !== "" && value !== undefined) {
            let D1 = this.resolve(yup.ref("ageFrom"));
            let D2 = this.resolve(yup.ref("ageTo"));
            if (D2 > 60) {
              return false;
            }
            return D2 >= D1 ? true : false;
          } else {
          }
        }
      ),
    natureofVacancy: yup.string().required("Select nature of vacancy"),
    qualification: yup.string().notRequired("Select qualification"),
    transferrable: yup.string().required("Select transferrable"),
    with: yup.string().notRequired(),
    totalExperience: yup
      .string()
      .required("Please enter total experience ")
      .matches(/^[0-9]+$/, "Total experience year must be only digits"),
    whereTo: yup.string().when("transferrable", (val, schema) => {
      if (val === "1") {
        return yup.string().required("Please select where to");
      } else return yup.string().notRequired();
    }),
    forHowMuchTime: yup.string().when("transferrable", (val, schema) => {
      if (val === "1") {
        return yup
          .string()
          .required("Enter For How Much Time in Month's")
          .max(2, "For How Much Time must be at most 2 digits")
          .matches(/^[0-9]+$/, "For How Much Time Must be only digits");
      } else return yup.string().notRequired();
    }),

    // emailOtp: yup
    //   .string()
    //   .required("Please Enter Email OTP")
    //   .max(6, "Email Otp must be at most 6 digits")
    //   .matches(/^\d*$/, "Email OTP Must be only digits"),
    // mobileOtp: yup
    //   .string()
    //   .required("Please Enter Mobile OTP")
    //   .max(6, "Mobile Otp must be at most 6 digits")
    //   .matches(/^\d*$/, "Mobile OTP Must be only digits"),
    // criteria: yup.string().required("Please Add Criteria"),
  });

/*=========> Request for Sponsoring Suitable CandidatesCovered Under Compulsory Notification of Vacancies Act,1959
 ==========>*/

export const RequestforSponsoringSuitableCandidatesCoveredUnderCNV = yup.object(
  {
    jobTitlename: yup.string().required("Enter Title of the Job"),
    noVacany: yup
      .string()
      .required("Enter no of vacancies")
      .matches(/^[0-9]+$/, "No of Vacancys Must be only digits")
      .max(6, "No of Vacancys Must be less then 6 digits")
      .min(1, "No of Vacancys Must be Atleast 1 digits")
      .test(
        "noVacany",
        "No. of Vacancies must be equal to Total of No. Reserved for SC, ST, OBC, Ex-Servicesmen and PH",
        function (value) {
          if (value !== "" && value !== undefined) {
            // if (value !== undefined) {
            let value1 = this.parent["noVacany"]; // retrieve the value of the sibling form field with id `1st_number`
            let value2 = parseInt(this.parent["reScNo"]);
            let value3 = parseInt(this.parent["reStNo"]);
            let value4 = parseInt(this.parent["reobcNo"]);
            let value5 = parseInt(this.parent["reExNo"]);
            let value6 = parseInt(this.parent["rePhNo"]);
            let value7 = parseInt(this.parent["reEWSNo"]);
            const totalValue =
              value2 + value3 + value4 + value5 + value6 + value7;
            // parseInt(value2) +
            // parseInt(value3) +
            // parseInt(value4) +
            // parseInt(value5) +
            // parseInt(value6);
            // retrieve the value of the sibling form field with id `2nd_number`
            if (totalValue > parseInt(value1)) return false;
            else if (
              parseInt(value2) > parseInt(value1) ||
              parseInt(value3) > parseInt(value1) ||
              parseInt(value4) > parseInt(value1) ||
              parseInt(value5) > parseInt(value1) ||
              parseInt(value6) > parseInt(value1) ||
              parseInt(value7) > parseInt(value1)
            ) {
              return false;
            } else return true;
          }
        }
      ),
    offeredPay: yup
      .string()
      .required("Enter Scale/ Pay")
      .max(15, "Scale/ Pay Must be less then 15 digits")
      .matches(/^[0-9]+$/, "Scale/ Pay Must be only digits"),

    //JobTitlename: yup.string().required("Enter Title of the Job"),
    natureVacany: yup.string().required("Select nature of vacancy"),
    qualification: yup.string().notRequired("Select qualification"),
    reScType: yup.string().required("Select Reserved for SC"),
    reScNo: yup.string().when("reScType", (val, schema) => {
      if (val === "1") {
        return yup
          .string()
          .required("No. Reserved for SC")
          .matches(/^\d*$/, "No. Reserved for SC Must be only digits")
          .max(6, "No. Reserved for SC  Must be less then 6 digits");
      } else return yup.string().notRequired();
    }),
    reStType: yup.string().required("Select Reserved for ST"),
    reStNo: yup.string().when("reStType", (val, schema) => {
      if (val === "1") {
        return yup
          .string()
          .required("No. Reserved for ST")
          .matches(/^\d*$/, "No. Reserved for ST Must be only digits")
          .max(6, "No. Reserved for ST Must be less then 6 digits");
      } else return yup.string().notRequired();
    }),
    reobcType: yup.string().required("Select Reserved for OBC"),
    reobcNo: yup.string().when("reobcType", (val, schema) => {
      if (val === "1") {
        return yup
          .string()
          .required("No. Reserved for OBC")
          .matches(/^\d*$/, "No. Reserved for OBC Must be only digits")
          .max(6, "No. Reserved for OBC Must be less then 6 digits");
      } else return yup.string().notRequired();
    }),
    reEWSNo: yup.string().when("reEWSType", (val, schema) => {
      if (val === "1") {
        return yup
          .string()
          .required("No. Reserved for EWS")
          .matches(/^\d*$/, "No. Reserved for EWS Must be only digits")
          .max(6, "No. Reserved for EWS  Must be less then 6 digits");
      } else return yup.string().notRequired();
    }),
    reExType: yup.string().required("Select Reserved for Ex-Servicemen"),
    reExNo: yup.string().when("reExType", (val, schema) => {
      if (val === "1") {
        return yup
          .string()
          .required("No. Reserved for Ex-Servicemen")
          .matches(
            /^\d*$/,
            "No. Reserved for Ex-Servicemen Must be only digits"
          )
          .max(6, "No. Reserved for Ex-Servicemen  Must be less then 6 digits");
      } else return yup.string().notRequired();
    }),
    rePhType: yup.string().required("Select Reserved for PH"),
    rePhNo: yup.string().when("rePhType", (val, schema) => {
      if (val === "1") {
        return yup
          .string()
          .required("No. Reserved for PH")
          .matches(/^\d*$/, "No. Reserved for PH Must be only digits")
          .max(6, "No. Reserved for PH Must be less then 6 digits");
      } else return yup.string().notRequired();
    }),
    elWomenType: yup.string().required("Select Whether Women eligible"),
    // criteria: yup.string().required("please add Qualification"),
    // emailOtp: yup
    //   .string()
    //   .required("Please Enter Email OTP")
    //   .max(6, "Email Otp must be at most 6 characters")
    //   .matches(/^\d*$/, "Email OTP Must be only digits"),

    // mobileOtp: yup
    //   .string()
    //   .required("Please Enter Mobile OTP")
    //   .max(6, "Mobile Otp must be at most 6 characters")
    //   .matches(/^\d*$/, "Mobile OTP Must be only digits"),

    ageFrom: yup
      .string()
      .required("Please enter age from")
      .matches(/^[0-9]+$/, "Age from must be only digits")
      .max(2, "Age from must be less than 2 digits")
      .test(
        "ageFrom",
        "Age From should be less than Age To and greater then 14 Yr's",
        function (value) {
          if (value !== "" && value !== undefined) {
            let D1 = this.resolve(yup.ref("ageFrom"));
            let D2 = this.resolve(yup.ref("ageTo"));
            if (D2 !== "") {
              return D2 >= D1 ? true : false;
            } else if (D1 < 14) {
              return false;
            } else {
              return true;
            }
          }
        }
      ),
    ageTo: yup
      .string()
      .required("Please Enter Age To")
      .matches(/^[0-9]+$/, "Age from must be only digits")
      .max(2, "Age To Must be less Then 2 digits")
      .test(
        "ageTo",
        "Age To should be  greater than Age From and less then 60 Yr's",
        function (value) {
          if (value !== "" && value !== undefined) {
            let D1 = this.resolve(yup.ref("ageFrom"));
            let D2 = this.resolve(yup.ref("ageTo"));
            if (D2 > 60) {
              return false;
            }
            return D2 >= D1 ? true : false;
          } else {
          }
        }
      ),
  }
);

export const DailyRegistrationDataValidationForm = yup.object({
  date: yup.string().required("Please Enter Date"),
});
export const GenerateSponsoredListValidationForm = yup.object({
  requestId: yup
    .string()
    .required("Please Enter Your Registration Id")
    .matches(/^[0-9]+$/, "Registration Id Must be only digits")
    .max(10, "Please Enter Valid Registration Id")
    .min(10, "Please Enter Valid Registration Id"),
});
/*=========> GenerateSponsoredList_RequestId Vacancy Validation Form ==========>*/

export const GenerateSponsoredList_RequestIdValidationForm = yup.object({
  disability: yup.string().notRequired(),

  dtype: yup.string().when("disability", (val, schema) => {
    if (val === "0" || val === "") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Disability Type");
  }),

  dStype: yup.string().when("disability", (val, schema) => {
    if (val === "0" || val === "") {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select Disability Sub Type ");
  }),
  ageFrom: yup
    .string()
    .required("Please enter age from")
    .matches(/^[0-9]+$/, "Age from must be only digits")
    .max(2, "Age from must be less than 2 digits")
    .test(
      "ageFrom",
      "Age from should be less than Age to and greater than 14 Yr's",
      function (value) {
        if (value !== "" && value !== undefined) {
          let D1 = this.resolve(yup.ref("ageFrom"));
          let D2 = this.resolve(yup.ref("ageTo"));
          if (D2 !== "" && D2 < 60) {
            if (D1 < 14) {
              return false;
            }
            return D2 >= D1 ? true : false;
          } else if (D1 < 14) {
            return false;
          } else {
            return true;
          }
        }
        // if (value !== "" && value !== undefined) {
        //   let D1 = this.resolve(yup.ref("ageFrom"));
        //   let D2 = this.resolve(yup.ref("ageTo"));
        //   if (D2 !== "") {
        //     return D2 >= D1 ? true : false;
        //   } else {
        //     return true;
        //   }
        // }
      }
    ),
  ageTo: yup
    .string()
    .required("Please Enter Age To")
    .matches(/^[0-9]+$/, "Age from must be only digits")
    .max(2, "Age To Must be less Then 2 digits")
    .test(
      "ageTo",
      "Age To should be greater than age from and less than 60 Yr's",
      function (value) {
        if (value !== "" && value !== undefined) {
          let D1 = this.resolve(yup.ref("ageFrom"));
          let D2 = this.resolve(yup.ref("ageTo"));
          if (D2 > 60) {
            return false;
          }
          return D2 >= D1 ? true : false;
        } else {
        }
      }
    ),
});

/*=========> feedback Validation Form ==========>*/
export const feedbackReply = yup.object({
  dreply: yup
    .string()
    .required("Please Enter Reply Message")
    .min(20, "Must be greater than 20 characters")
    .max(2000, "Must be less than 2000 characters"),
});
export const feedback = yup.object({
  name: yup
    .string()
    .required("Please Enter First Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),
  feedbackType: yup.string().required("Please Select Type"),
  queryType: yup
    .string()
    .when("feedbackType", (val, schema) => {
      if (val === "2") {
        return yup.string().required("Please Select Query Type");
      } else return yup.string().notRequired();
    })
    .required("Please Select Query Type"),
  email: yup
    .string()
    .email("Email should be valid and contain @")
    .lowercase("CNWHVLK")
    .required("Please Enter Email Id")
    .matches(
      /^([0-9a-zA-Z]([\+\-_\.][0-9a-zA-Z]+)*)+@(([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9]{2,3})$/,
      "Invalid Email Id "
    )
    .max(50, "Must be less  than 50 characters"),
  emailOtp: yup.string().when("feedbackType", (val, schema) => {
    if (val === "2") {
      return yup
        .string()
        .required("Please Enter Email OTP")
        .max(6, "Email Otp must be at most 6 characters")
        .matches(/^\d*$/, "Email OTP Must be only digits");
    } else return yup.string().notRequired();
  }),
  query: yup
    .string()
    .required("Please Enter Queary/Message")
    .min(20, "Must be greater than 20 characters")
    .max(2000, "Must be less than 2000 characters"),
});
export const AddUserValidations = yup.object({
  userType: yup.string().required("Please Select User Type"),
  email: yup
    .string()
    .email("Email should be valid and contain @")
    .lowercase("CNWHVLK")
    .required("Please Enter Email Id")
    .matches(
      /^([0-9a-zA-Z]([\+\-_\.][0-9a-zA-Z]+)*)+@(([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9]{2,3})$/,
      "Invalid Email Id "
    )
    .max(50, "Must be less  than 50 characters"),

  name: yup.string().required("Please enter name"),
  password: yup
    .string()
    .required("Please Enter your password")
    .min(8, "Password must be at least 8 characters.")
    .max(15, "Password must be 15 characters at maximum")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\?\*])(?=.{8,})/,
      "Password should be of 8-15 characters including atleast 1 special, 1 lower, 1 upper character and 1 digit."
    ),
  confirmpassword: yup
    .string()
    .required("Please Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const EmployerRegistrationValidation = yup.object({
  organisationName: yup.string().required("Enter Organisation Name"),
  organisationType: yup.string().required("Select Organisation Type"),
  contname: yup.string().required("Enter Contact Person Name"),
  orgTanNumber: yup.string().when("organisationType", (val, schema) => {
    if (val === "1") {
      return yup
        .string()
        .required("Enter Organisation Tan Number")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Special Characters are not allowed for this field "
        )
        .min(10, "Organisation Tan Number Must be 10 characters");
    } else return yup.string().notRequired();
  }),
  gstin: yup.string().when("organisationType", (val, schema) => {
    if (val === "5") {
      return yup
        .string()
        .required("Enter GSTIN")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Special Characters are not allowed for this field "
        )
        .min(15, "GSTIN Must be 15 characters");
    } else return yup.string().notRequired();
  }),
  orgPanNo: yup.string().when("organisationType", (val, schema) => {
    if (val === "5") {
      return yup
        .string()
        .required("Enter Organisation Pan Number")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Special Characters are not allowed for this field "
        )
        .min(10, "Organisation Pan Number Must be 10 characters");
    } else return yup.string().notRequired();
  }),
  auditReportDetails: yup.string().when("organisationType", (val, schema) => {
    if (val === "5") {
      return yup.string().required("Enter Audit Report Details");
    } else return yup.string().notRequired();
  }),

  contDesignation: yup
    .string()
    .required("Enter Designation")
    .max(20, "Must be less  than 20 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Special Characters are not allowed for this field "
    ),
  email: yup.string().when("organisationType", (val, schema) => {
    if (val === "1") {
      return yup
        .string()
        .lowercase("CNWHVLK")
        .max(50, "Must be less  than 50 characters")
        .matches(
          /[A-Za-z0-9._%+-]+@+[A-Za-z0-9._%+-]+(gov.in|nic.in|[A-Za-z0-9._%+-])$/,
          "Please Enter Valid Email Id"
        )
        .required("Please Enter Email Id")
        .test(
          "Unique Email",
          "Email ID already Exists", // <- key, message
          function (value) {
            if (value !== "") {
              return new Promise((resolve, reject) => {
                //debugger
                axios
                  .get(
                    `${baseURL}/EmployerRegistration/isalreadyemailemployer?email=${value}`
                  )
                  .then((res) => {
                    resolve(res.data);
                    //console.warn("res.data",res.data)
                    if (res.data === false) {
                      // alert("Email ID already Exists, Please Enter Another Email Id");
                    }
                  });
              });
            }
          }
        );
    } else
      return yup
        .string()
        .lowercase("CNWHVLK")
        .email("Email should be valid and contain @")
        .max(50, "Must be less  than 50 characters")
        .required("Please Enter Email Id")
        .test(
          "Unique Email",
          "Email ID already Exists", // <- key, message
          function (value) {
            if (value !== "") {
              return new Promise((resolve, reject) => {
                //debugger
                axios
                  .get(
                    `${baseURL}/EmployerRegistration/isalreadyemailemployer?email=${value}`
                  )
                  .then((res) => {
                    resolve(res.data);
                    //console.warn("res.data",res.data)
                    if (res.data === false) {
                      // alert("Email ID already Exists, Please Enter Another Email Id");
                    }
                  });
              });
            }
          }
        );
  }),

  mobile: yup
    .string()
    .required("Please enter mobile no")
    .matches(/^[0-9]+$/, "Mobile no must be only digits")
    .max(10, "Please Enter Valid Mobile No.")
    .min(10, "Please Enter Valid Mobile No.")
    .test(
      "Unique mobile no",
      "Mobile No is already Exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${baseURL}/EmployerRegistration/isalreadymobilemobile?mobile=${value}`
              )
              .then((res) => {
                resolve(res.data);
                console.warn("res.data", res.data);
                // if (res.data === true) {
                //   alert(
                //     "Mobile No is not Exists, Please Enter Registered Mobile No"
                //   );
                // }
              });
          });
        }
      }
    ),
  tel: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Telephone No Must be only digits"),
  //.min(10, "Telephone No must be at least 10 digits")
  address: yup.string().required("Enter Address"),
  pin: yup
    .string()
    .required("Please Enter Pin")
    .matches(/^\d+$/, "Pin should have digits only")
    .min(6, "Pin must be at least 6 digits")
    .max(6, "Pin must be at least 6 digits"),
  district: yup.string().required("Select District"),
  state: yup.string().required("Select State"),
  emailOtp: yup
    .string()
    .required("Please Enter Email OTP")
    .max(6, "Email Otp must be at most 6 characters")
    .matches(/^\d*$/, "Email OTP Must be only digits"),

  mobileOtp: yup
    .string()
    .required("Please Enter Mobile OTP")
    .max(6, "Mobile Otp must be at most 6 characters")
    .matches(/^\d*$/, "Mobile OTP Must be only digits"),
});
export const JobFairEmployerRegistrationValidation = yup.object({
  orgName: yup
    .string()
    .required("Enter Organisation Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  orgType: yup.string().required("Select Organisation Type"),
  orgTypeOther: yup.string().when("orgType", (val, schema) => {
    if (val === "14") {
      return yup
        .string()
        .required("Enter Organisation Type Other")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ");
    } else {
      return yup.string().notRequired();
    }
  }),

  sector: yup.string().required("Select Sector Type"),
  sectorOther: yup.string().when("sector", (val, schema) => {
    if (val === "50") {
      return yup
        .string()
        .required("Enter Sector Type Other")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ");
    } else {
      return yup.string().notRequired();
    }
  }),
  eRegWith: yup.string().required("Select Employer Registered With Type"),
  eRegWithOther: yup.string().when("eRegWith", (val, schema) => {
    if (val === "4") {
      return yup
        .string()
        .required("Enter Employer Registered With Type Other")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ");
    } else {
      return yup.string().notRequired();
    }
  }),
  companyRegistrationNo: yup
    .string()
    .required("Enter Company Registration No")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Company Registration Number must be only digits"
    ),
  officeAddress: yup.string().required("Enter Address"),
  pin: yup
    .string()
    .required("Please Enter Pin")
    .matches(/^\d+$/, "Pin should have digits only")
    .min(6, "Pin must be at least 6 digits")
    .max(6, "Pin must be at least 6 digits"),
  //district: yup.string().required("Select District"),
  state: yup.string().required("Select State"),
  name: yup
    .string()
    .required("Enter name of Contact Person")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup
    .string()
    .email("Email should be valid and contain @")
    .max(50, "Must be less  than 50 characters")
    .required("Please Enter Email Id")
    .test(
      "Unique Email",
      "Email ID already Exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            //debugger
            axios
              .get(
                `${baseURL}/JobFairRegistration/isalreadysignedemailjobfair?email=${value}`
              )
              .then((res) => {
                resolve(res.data);
                //console.warn("res.data",res.data)
                if (res.data === false) {
                  // alert("Email ID already Exists, Please Enter Another Email Id");
                }
              });
          });
        }
      }
    ),
  mobile: yup
    .string()
    .required("Please enter mobile no")
    .matches(/^[0-9]+$/, "Mobile no must be only digits")
    .max(10, "Please Enter Valid Mobile No.")
    .min(10, "Please Enter Valid Mobile No."),
  landlineno: yup
    .string()
    .matches(/^\d*$/, "Telephone No Must be only digits")
    .notRequired(),

  organizationDetails: yup
    .string()
    .required("Enter Profile/Details Of Organisation"),
  emailOtp: yup
    .string()
    .required("Please Enter Email OTP")
    .max(6, "Email Otp must be at most 6 characters")
    .matches(/^\d*$/, "Email OTP Must be only digits"),
});
export const PostVacancyJObFairValidation = yup.object({
  post: yup.string().required("Enter post"),
  qualification: yup.string().required("Select qualification"),
  noVacancy: yup
    .string()
    .required("Enter no of vacancy")
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(6, "No of vacancy must be less then 6 digits")
    .min(1, "No of vacancy must be atleast 1 digits"),
  salary: yup.string().required("Select salary"),
  // interviewFromDate: yup.string().required("Select from date for interview"),
  // interviewToDate: yup.string().required("Select from date for interview"),
  interviewFromDate: yup.date().required("Select from date for interview"),
  interviewToDate: yup
    .date()
    .required("Select to date for interview")
    .min(
      yup.ref("interviewFromDate"),
      "To date should be greater then from date"
    ),
  minage: yup
    .string()
    .required("Please enter minimum age")
    .matches(/^[0-9]+$/, "Age from must be only digits")
    .max(2, "Age from must be less than 2 digits")
    .test(
      "ageFrom",
      "Minimum age should be less than maximum age and greater than 14 Yr's",
      function (value) {
        if (value !== "" && value !== undefined) {
          let D1 = this.resolve(yup.ref("minage"));
          let D2 = this.resolve(yup.ref("maxage"));
          if (D2 !== "" && D2 < 60) {
            if (D1 < 14) {
              return false;
            }
            return D2 >= D1 ? true : false;
          } else if (D1 < 14) {
            return false;
          } else {
            return true;
          }
        }
      }
    ),
  maxage: yup
    .string()
    .required("Please enter maximum age ")
    .matches(/^[0-9]+$/, "Age from must be only digits")
    .max(2, "Age To Must be less Then 2 digits")
    .test(
      "ageTo",
      "Maximum age To should be greater than minimum age and less than 60 Yr's",
      function (value) {
        if (value !== "" && value !== undefined) {
          let D1 = this.resolve(yup.ref("minage"));
          let D2 = this.resolve(yup.ref("maxage"));
          if (D2 > 60) {
            return false;
          }
          return D2 >= D1 ? true : false;
        } else {
        }
      }
    ),
  experience: yup.string().required("Select experience"),
});
export const PostPlacementjobFairValidation = yup.object({
  vId: yup.string().required("Select Vacancy"),
  totalplacement: yup
    .string()
    .required("Enter no of placement")
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(6, "No of vacancy must be less then 6 digits")
    .min(1, "No of vacancy must be atleast 1 digits"),
  totalapply: yup
    .string()
    .required("Enter total no of applied")
    .matches(/^\d*$/, "This field Must be only digits"),
  totalscreened: yup
    .string()
    .required("Enter total no of screened")
    .matches(/^\d*$/, "This field Must be only digits"),
  totalshortlist: yup
    .string()
    .required("Enter total no of shortlist")
    .matches(/^\d*$/, "This field Must be only digits"),
});
export const ForgotPasswordJobFairValidation = yup.object({
  /*=========> Login Information Validation ==========>*/
  email: yup
    .string()
    .email("Email should be valid and contain @")
    .max(50, "Must be less  than 50 characters")
    .required("Please Enter Email Id")
    .test(
      "Unique Email Id",
      "Email Id not Exists", // <- key, message
      function (value) {
        if (value !== "") {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${baseURL}/Registration/isalreadysignedemail?email=${value}`
              )
              .then((res) => {
                resolve(!res.data);
                console.warn("res.data", res.data);
                if (res.data === true) {
                  alert(
                    "Email id is not Exists, Please Enter Registered email id"
                  );
                }
              });
          });
        }
      }
    ),
  emailOtp: yup
    .string()
    .required("Please Enter Email OTP")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Email OTP Must be only digits"
    )
    .min(6, "Must be equal to 6 characters")
    .max(6, "Must be equal to 6 characters"),
  password: yup
    .string()
    .required("Please Enter your password")
    .min(8, "Password must be at least 8 characters.")
    .max(15, "Password must be 15 characters at maximum")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\?\*])(?=.{8,})/,
      "Password should be of 8-15 characters including atleast 1 special, 1 lower, 1 upper character and 1 digit."
    ),
  newConfirmPassword: yup
    .string()
    .required("Please Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
