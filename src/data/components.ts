export const age = [
  { id: 1, age: "20-25" },
  { id: 2, age: "25-30" },
  { id: 3, age: "30-35" },
  { id: 4, age: "40-45" },
  { id: 5, age: "45-50" },
];

export const roles = [
  { id: 101, name: "Admin" },
  { id: 102, name: "User" },
  { id: 103, name: "Manager" },
];

export const gender = [
  { id: 98, name: "Male" },
  { id: 99, name: "Female" },
  { id: 100, name: "Other" },
];

export const locations = [
  { id: 1, name: "New York", isSelected: true },
  { id: 2, name: "London", isSelected: false },
  { id: 3, name: "Tokyo", isSelected: false },
  { id: 4, name: "Delhi", isSelected: true },
  { id: 5, name: "Sydney", isSelected: false },
  { id: 6, name: "Milan", isSelected: false },
  { id: 7, name: "Amsterdam", isSelected: false },
];

export const experiences = [
  { id: 1, years: "1-5" },
  { id: 2, years: "5-10" },
  { id: 3, years: "10-15" },
  { id: 4, years: "15-20" },
  { id: 5, years: "20-25" },
];

export const experienceDetails = {
  companyEmails: [
    {
      id: 301,
      email: "shobhitkarnatak@amazon.com",
    },
    {
      id: 302,
      email: "shobhitkarnatak@gmail.com",
    },
    {
      id: 303,
      email: "shobhitkarnatak@tesla.com",
    },
    {
      id: 304,
      email: "shobhitkarnatak@meta.com",
    },
    {
      id: 304,
      email: "shobhitkarnatak@walmart.com",
    },
  ],

  idProof: [
    {
      id: 401,
      name: "Aadhar Card",
    },
    {
      id: 402,
      name: "Pan Card",
    },
    {
      id: 403,
      name: "Driving License",
    },
    {
      id: 404,
      name: "Passport",
    },
    {
      id: 405,
      name: "Voter ID",
    },
    {
      id: 406,
      name: "Ration Card",
    },
    {
      id: 407,
      name: "Employee ID",
    },
    {
      id: 408,
      name: "Student ID",
    },
  ],
};

export const responseData = {
  username: "Shobhit Karnatak",
  role: 103,
  age: "30-35",
  gender: "Male",
  notifications: true,
  description: "This is a short description",
  dob: "02/25/1992",
  experience: "5-10",
  isActive: true,
  experienceDetails: [
    {
      companyName: "Amazon",
      email: "shobhitkarnatak@amazon.com",
      idProof: [
        {
          id: 402,
          name: "Pan Card",
          isSelected: true,
        },
        {
          id: 404,
          name: "Passport",
          isSelected: true,
        },
      ],
    },
    {
      companyName: "Google",
      email: "shobhitkarnatak@gmail.com",
      idProof: [
        {
          id: 404,
          name: "Passport",
          isSelected: true,
        },
      ],
    },
    {
      companyName: "Tesla",
      email: "shobhitkarnatak@tesla.com",
      idProof: [
        {
          id: 401,
          name: "Aadhar Card",
        },
        {
          id: 404,
          name: "Passport",
        },
        {
          id: 405,
          name: "Voter ID",
        },
      ],
    },
  ],
};

export const HeaderInformation = [
  {
    name: "components",
    text: "Forms components with validations and submit",
  },
  {
    name: "templates",
    text: "Pre-built templates",
  },
  {
    name: "forms",
    text: "Dependent fields with validations and submit",
  },
  {
    name: "formarray",
    text: "Form array addition & deletion with validations and submit",
  },
];

export default {
  age,
  roles,
  gender,
  locations,
  experiences,
  experienceDetails,
  responseData,
  HeaderInformation,
};
