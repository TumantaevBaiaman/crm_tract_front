import PropTypes from "prop-types";
import React, {useState} from "react";

import { withRouter, Link } from "react-router-dom";
import UserDetails from "./user-details";
import PersonalDetails from "./personal-details";
import AccountDetails from "./account-details";
import Confirmation from "./confirmation";


function MultiFormRegister() {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    step: 1,
    email: '',
    username: '',
    password: '',
    fullname: '',
    lastname: '',
    phone: '',
    address: '',
    account_name: '',
  })

  const nextStep = () => {
    setStep(step + 1);
    console.log(formData)
  };

  const prevStep = () => {
    setStep(step - 1);
    console.log(45)
  };

  const handleInputData = (value, fieldName) => {
    formData[fieldName] = value
  }

  console.log(step)
  // const { step } = this.state;
  // const { email, username, password, fullname, lastname, address, phone, account_name  } = this.state;
  // const values = { email, username, password, fullname, lastname, address, phone, account_name  }

  document.title = "Login | Skote - React Admin & Dashboard Template";

  switch (step) {
    case 1:
      return (
        <UserDetails
            nextStep={nextStep}
            handleFormData={handleInputData}
            values={formData}
        />
      )
    case 2:
      return (
        <PersonalDetails
            prevStep={ prevStep }
            nextStep={ nextStep }
            handleFormData={handleInputData}
            values={formData}
        />
      )
    case 3:
      return (
        <AccountDetails
            prevStep={ prevStep }
            nextStep={ nextStep }
            handleFormData={handleInputData}
            values={formData}
        />
      )
    case 4:
      return (
        <Confirmation
            prevStep={ prevStep }
            nextStep={ nextStep }
            values={ formData }
        />
      )
    // case 5:
    //   return (
    //     <Success
    //         prevStep={ this.prevStep }
    //         nextStep={ this.nextStep }
    //         values={ values }
    //     />
    //   )
          default:
      return (
        <div className="App">
        </div>
      );
  }
};

export default MultiFormRegister;

// MultiFormRegister.propTypes = {
//   history: PropTypes.object,
// };
