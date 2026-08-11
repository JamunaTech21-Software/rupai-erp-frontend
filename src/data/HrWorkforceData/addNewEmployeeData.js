export const employeeManagementData = {
  // =====================================================
  // DROPDOWN OPTIONS
  // =====================================================

  employeeTypeOptions: [
    { id: 1, value: "permanent", label: "Permanent" },
    { id: 2, value: "probationary", label: "Probationary" },
    { id: 3, value: "contractual", label: "Contractual" },
    { id: 4, value: "temporary", label: "Temporary" },
  ],

  titleOptions: [
    { id: 1, value: "mr", label: "Mr." },
    { id: 2, value: "mrs", label: "Mrs." },
    { id: 3, value: "ms", label: "Ms." },
  ],

  departmentOptions: [
    { id: 1, value: "hr", label: "HR & Workforce Management" },
    { id: 2, value: "accounts", label: "Accounts & Finance" },
    { id: 3, value: "estate", label: "Estate Management" },
    { id: 4, value: "operations", label: "Operations" },
  ],

  designationOptions: [
    { id: 1, value: "manager", label: "Manager" },
    { id: 2, value: "assistant-manager", label: "Assistant Manager" },
    { id: 3, value: "officer", label: "Officer" },
    { id: 4, value: "executive", label: "Executive" },
  ],

  jobGradeOptions: [
    { id: 1, value: "grade-1", label: "Grade 1" },
    { id: 2, value: "grade-2", label: "Grade 2" },
    { id: 3, value: "grade-3", label: "Grade 3" },
    { id: 4, value: "grade-4", label: "Grade 4" },
  ],

  employmentTypeOptions: [
    { id: 1, value: "full-time", label: "Full Time" },
    { id: 2, value: "part-time", label: "Part Time" },
    { id: 3, value: "contract", label: "Contract" },
  ],

  workingLocationOptions: [
    { id: 1, value: "head-office", label: "Head Office" },
    { id: 2, value: "jamuna-tea-estate", label: "Jamuna Tea Estate" },
    { id: 3, value: "field-office", label: "Field Office" },
  ],

  jobNatureOptions: [
    { id: 1, value: "administrative", label: "Administrative" },
    { id: 2, value: "technical", label: "Technical" },
    { id: 3, value: "operational", label: "Operational" },
  ],

  genderOptions: [
    { id: 1, value: "male", label: "Male" },
    { id: 2, value: "female", label: "Female" },
    { id: 3, value: "other", label: "Other" },
  ],

  bloodGroupOptions: [
    { id: 1, value: "a-positive", label: "A+" },
    { id: 2, value: "a-negative", label: "A-" },
    { id: 3, value: "b-positive", label: "B+" },
    { id: 4, value: "b-negative", label: "B-" },
    { id: 5, value: "ab-positive", label: "AB+" },
    { id: 6, value: "ab-negative", label: "AB-" },
    { id: 7, value: "o-positive", label: "O+" },
    { id: 8, value: "o-negative", label: "O-" },
  ],

  maritalStatusOptions: [
    { id: 1, value: "single", label: "Single" },
    { id: 2, value: "married", label: "Married" },
    { id: 3, value: "divorced", label: "Divorced" },
    { id: 4, value: "widowed", label: "Widowed" },
  ],

  nationalityOptions: [
    { id: 1, value: "bangladeshi", label: "Bangladeshi" },
    { id: 2, value: "other", label: "Other" },
  ],

  religionOptions: [
    { id: 1, value: "islam", label: "Islam" },
    { id: 2, value: "hinduism", label: "Hinduism" },
    { id: 3, value: "buddhism", label: "Buddhism" },
    { id: 4, value: "christianity", label: "Christianity" },
    { id: 5, value: "other", label: "Other" },
  ],

  districtOptions: [
    { id: 1, value: "dhaka", label: "Dhaka" },
    { id: 2, value: "chattogram", label: "Chattogram" },
    { id: 3, value: "sylhet", label: "Sylhet" },
    { id: 4, value: "moulvibazar", label: "Moulvibazar" },
  ],

  upazilaOptions: [
    { id: 1, value: "savar", label: "Savar" },
    { id: 2, value: "dhamrai", label: "Dhamrai" },
    { id: 3, value: "kotwali", label: "Kotwali" },
    { id: 4, value: "sreemangal", label: "Sreemangal" },
  ],

  reportingToOptions: [
    { id: 1, value: "estate-manager", label: "Estate Manager" },
    { id: 2, value: "hr-manager", label: "HR Manager" },
    { id: 3, value: "department-head", label: "Department Head" },
  ],

  employeeStatusOptions: [
    { id: 1, value: "active", label: "Active" },
    { id: 2, value: "inactive", label: "Inactive" },
    { id: 3, value: "on-leave", label: "On Leave" },
  ],

  paymentMethodOptions: [
    { id: 1, value: "bank", label: "Bank Transfer" },
    { id: 2, value: "cash", label: "Cash" },
    { id: 3, value: "mobile-banking", label: "Mobile Banking" },
  ],

  bankOptions: [
    { id: 1, value: "dbbl", label: "DBBL" },
    { id: 2, value: "brac", label: "BRAC Bank" },
    { id: 3, value: "city-bank", label: "City Bank" },
  ],

  relationOptions: [
    { id: 1, value: "father", label: "Father" },
    { id: 2, value: "mother", label: "Mother" },
    { id: 3, value: "spouse", label: "Spouse" },
    { id: 4, value: "brother", label: "Brother" },
    { id: 5, value: "sister", label: "Sister" },
    { id: 6, value: "other", label: "Other" },
  ],

  // =====================================================
  // 1. BASIC INFORMATION
  // =====================================================

  basicInformationFields: [
    {
      name: "employeeId",
      label: "Employee ID",
      type: "text",
      defaultValue: "Auto Generate",
      disabled: true,
      required: true,
      placeholder: "Auto Generate",
    },

    {
      name: "employeeType",
      label: "Employee Type",
      type: "select",
      optionsKey: "employeeTypeOptions",
      required: true,
    },

    {
      name: "title",
      label: "Title",
      type: "select",
      optionsKey: "titleOptions",
      required: true,
    },

    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      required: true,
    },

    {
      name: "middleName",
      label: "Middle Name",
      type: "text",
      placeholder: "Enter Middle Name",
    },

    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
      required: true,
    },

    {
      name: "fatherName",
      label: "Father's Name",
      type: "text",
      placeholder: "Enter Father's Name",
      required: true,
    },

    {
      name: "motherName",
      label: "Mother's Name",
      type: "text",
      placeholder: "Enter Mother's Name",
      required: true,
    },

    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },

    {
      name: "gender",
      label: "Gender",
      type: "select",
      optionsKey: "genderOptions",
      required: true,
    },

    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      optionsKey: "bloodGroupOptions",
    },

    {
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      optionsKey: "maritalStatusOptions",
    },

    {
      name: "nationality",
      label: "Nationality",
      type: "select",
      optionsKey: "nationalityOptions",
      required: true,
      defaultValue: "bangladeshi",
    },

    {
      name: "religion",
      label: "Religion",
      type: "select",
      optionsKey: "religionOptions",
    },

    {
      name: "tinNo",
      label: "TIN No.",
      type: "text",
      placeholder: "Enter TIN No.",
    },

    {
      name: "nationalIdNo",
      label: "National ID No.",
      type: "text",
      placeholder: "Enter NID No.",
    },

    {
      name: "passportNo",
      label: "Passport No.",
      type: "text",
      placeholder: "Enter Passport No.",
    },

    {
      name: "drivingLicenseNo",
      label: "Driving License No.",
      type: "text",
      placeholder: "Enter DL No.",
    },
  ],

  // =====================================================
  // 2. EMPLOYMENT INFORMATION
  // =====================================================

  employmentInformationFields: [
    {
      name: "department",
      label: "Department",
      type: "select",
      optionsKey: "departmentOptions",
      required: true,
    },

    {
      name: "designation",
      label: "Designation",
      type: "select",
      optionsKey: "designationOptions",
      required: true,
    },

    {
      name: "jobGrade",
      label: "Job Grade",
      type: "select",
      optionsKey: "jobGradeOptions",
    },

    {
      name: "employmentDate",
      label: "Employment Date",
      type: "date",
      required: true,
    },

    {
      name: "probationEndDate",
      label: "Probation End Date",
      type: "date",
    },

    {
      name: "confirmationDate",
      label: "Confirmation Date",
      type: "date",
    },

    {
      name: "employmentType",
      label: "Employment Type",
      type: "select",
      optionsKey: "employmentTypeOptions",
      required: true,
    },

    {
      name: "workingLocation",
      label: "Working Location",
      type: "select",
      optionsKey: "workingLocationOptions",
      required: true,
    },

    {
      name: "jobNature",
      label: "Job Nature",
      type: "select",
      optionsKey: "jobNatureOptions",
    },

    {
      name: "reportingTo",
      label: "Reporting To",
      type: "select",
      optionsKey: "reportingToOptions",
      required: true,
    },

    {
      name: "numberOfDependents",
      label: "No. of Dependents",
      type: "number",
      defaultValue: 0,
      min: 0,
    },

    {
      name: "employeeStatus",
      label: "Employee Status",
      type: "select",
      optionsKey: "employeeStatusOptions",
      required: true,
      defaultValue: "active",
    },
  ],

  // =====================================================
  // 3. CONTACT & ADDRESS INFORMATION
  // =====================================================

  contactInformationFields: [
    {
      name: "mobileNo",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
      required: true,
    },

    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@email.com",
    },

    {
      name: "personalEmail",
      label: "Personal Email",
      type: "email",
      placeholder: "example@email.com",
    },

    {
      name: "presentAddress",
      label: "Present Address",
      type: "textarea",
      placeholder: "Enter Present Address",
      required: true,
    },

    {
      name: "permanentAddress",
      label: "Permanent Address",
      type: "textarea",
      placeholder: "Enter Permanent Address",
      required: true,
    },

    {
      name: "sameAsPermanentAddress",
      label: "Same as Permanent Address",
      type: "checkbox",
    },

    {
      name: "district",
      label: "District",
      type: "select",
      optionsKey: "districtOptions",
      required: true,
    },

    {
      name: "upazila",
      label: "Upazila",
      type: "select",
      optionsKey: "upazilaOptions",
      required: true,
    },

    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Enter Postal Code",
    },
  ],

  // =====================================================
  // 4. SALARY & PAYROLL INFORMATION
  // =====================================================

  salaryPayrollFields: [
    {
      name: "basicSalary",
      label: "Basic Salary",
      type: "number",
      placeholder: "Enter Amount",
      required: true,
    },

    {
      name: "houseRent",
      label: "House Rent",
      type: "number",
      placeholder: "Enter Amount",
    },

    {
      name: "medicalAllowance",
      label: "Medical Allowance",
      type: "number",
      placeholder: "Enter Amount",
    },

    {
      name: "conveyance",
      label: "Conveyance",
      type: "number",
      placeholder: "Enter Amount",
    },

    {
      name: "otherAllowance",
      label: "Other Allowance",
      type: "number",
      placeholder: "Enter Amount",
    },

    {
      name: "totalSalary",
      label: "Total Salary (Auto)",
      type: "number",
      defaultValue: 0,
      disabled: true,
    },

    {
      name: "paymentMethod",
      label: "Payment Method",
      type: "select",
      optionsKey: "paymentMethodOptions",
      required: true,
    },

    {
      name: "bankName",
      label: "Bank Name",
      type: "select",
      optionsKey: "bankOptions",
      required: true,
    },

    {
      name: "accountNo",
      label: "Account No.",
      type: "text",
      placeholder: "Enter Account No.",
      required: true,
    },

    {
      name: "remarks",
      label: "Remarks",
      type: "textarea",
      placeholder: "Enter Remarks (if any)",
    },
  ],

  // =====================================================
  // 5. DOCUMENTS INFORMATION
  // =====================================================

  documentFields: [
    {
      name: "nationalIdFront",
      label: "National ID Card (Front)",
      type: "file",
      accept: ".jpg,.jpeg,.png,.pdf",
    },

    {
      name: "nationalIdBack",
      label: "National ID Card (Back)",
      type: "file",
      accept: ".jpg,.jpeg,.png,.pdf",
    },

    {
      name: "passportPhoto",
      label: "Passport Size Photo",
      type: "file",
      accept: ".jpg,.jpeg,.png",
    },

    {
      name: "educationalCertificate",
      label: "Educational Certificate",
      type: "file",
      accept: ".jpg,.jpeg,.png,.pdf",
    },

    {
      name: "experienceCertificate",
      label: "Experience Certificate",
      type: "file",
      accept: ".jpg,.jpeg,.png,.pdf",
    },

    {
      name: "otherDocument",
      label: "Other Document",
      type: "file",
      accept: ".jpg,.jpeg,.png,.pdf",
    },
  ],

  // =====================================================
  // 6. SYSTEM INFORMATION
  // =====================================================

  systemInformationFields: [
    {
      name: "createdBy",
      label: "Created By",
      type: "text",
      defaultValue: "Md. Faruk Hossain",
      disabled: true,
    },

    {
      name: "createdDate",
      label: "Created Date",
      type: "text",
      defaultValue: "01-06-2026 10:30 AM",
      disabled: true,
    },

    {
      name: "updatedBy",
      label: "Updated By",
      type: "text",
      defaultValue: "-",
      disabled: true,
    },

    {
      name: "updatedDate",
      label: "Updated Date",
      type: "text",
      defaultValue: "-",
      disabled: true,
    },
  ],

  // =====================================================
  // 7. PHOTO & BIOMETRICS
  // =====================================================

  photoBiometricFields: [
    {
      name: "employeePhoto",
      label: "Employee Photo",
      type: "file",
      accept: ".jpg,.jpeg,.png",
    },

    {
      name: "employeeFace",
      label: "Employee Face (For Attendance)",
      type: "capture",
    },

    {
      name: "rightThumb",
      label: "Right Thumb Impression",
      type: "capture",
    },

    {
      name: "leftThumb",
      label: "Left Thumb Impression",
      type: "capture",
    },
  ],

  // =====================================================
  // 8. EMERGENCY CONTACT
  // =====================================================

  emergencyContactFields: [
    {
      name: "emergencyContactName",
      label: "Contact Name",
      type: "text",
      placeholder: "Enter Name",
      required: true,
    },

    {
      name: "emergencyRelation",
      label: "Relation",
      type: "select",
      optionsKey: "relationOptions",
      required: true,
    },

    {
      name: "emergencyMobile",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
      required: true,
    },

    {
      name: "emergencyAlternateMobile",
      label: "Alternate Mobile",
      type: "text",
      placeholder: "01XXXXXXXXX",
    },

    {
      name: "emergencyAddress",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Address",
    },
  ],

  // =====================================================
  // 9. NOMINEE INFORMATION
  // =====================================================

  nomineeInformationFields: [
    {
      name: "nomineeName",
      label: "Nominee Name",
      type: "text",
      placeholder: "Enter Name",
      required: true,
    },

    {
      name: "nomineeRelation",
      label: "Relation",
      type: "select",
      optionsKey: "relationOptions",
      required: true,
    },

    {
      name: "nomineeDateOfBirth",
      label: "Date of Birth",
      type: "date",
    },

    {
      name: "nomineeNationalId",
      label: "National ID No.",
      type: "text",
      placeholder: "Enter NID No.",
    },

    {
      name: "nomineeMobile",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
    },

    {
      name: "nomineeAddress",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Address",
    },
  ],
};
