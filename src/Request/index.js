import { useState } from 'react';
import toast from 'toastr';
import Range from '../Range';
import Loader from '../Loading';
import { money } from '../index';

const baseUrl = 'https://okigwecreations.online/api/';

const Request = () => {
  const [successful, setSuccessful] = useState(false);
  const [transaction, setTransaction] = useState('')
  const [inputState, setInputState] = useState({
    full_name: '',
    repayment_duration: 1,
  });
  const [loanAmount, setLoanAmount] = useState(50000);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [minMax, setMinMax] = useState({
    min: 50000,
    max: 3000000,
  });
  
  const handleInput = ({ target: { name , value} }) => {
    setInputState({
      ...inputState,
      [name]: value
    });
    setError(inputState.full_name === 0)
  };


  const durations = Array(24).fill(0);

  const handleNameValidation = (e) => {
    setError(e.target.value.length === 0)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(inputState.full_name.length === 0) {
      setError(true);
    }else {
      setIsLoading(true)
      let formData = new FormData();
      formData.append("action", "request_for_loan");
      formData.append("full_name", inputState.full_name);
      formData.append("loan_amount", loanAmount);
      formData.append("repayment_duration", inputState.repayment_duration);
      let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      };
      try {
        const fetchResponse = await fetch(baseUrl, requestOptions);
        const data = await fetchResponse.json();
        setIsLoading(false);
        toast.success(`Loan request Success id ${data.transaction_id}`);
        setInputState({
          full_name: '',
          repayment_duration: 1,
        });
        setLoanAmount(50000);
        setMinMax({
          min: 50000,
          max: 3000000,
        })
        setTransaction(data.transaction_id);
        setSuccessful(true);
      }catch(error) {
        setIsLoading(false);
        toast.error("An error occurred");
        return error;
      }
    }
  };

  const handleBack = () => {
    setSuccessful(false);
  }

  return (
    !successful ?
    <form className='main-form'  onSubmit={handleSubmit} >
      <label 
        htmlFor="full_name"
        className="main-label"
      >
        Full name
      </label>
      <input 
        id="full_name" 
        type="text" 
        name="full_name" 
        value={inputState.full_name}
        onChange={handleInput}
        className={`main-input ${error && "main-input-error"}`}
        onBlur={handleNameValidation}
      />
      {
        error &&  <span className="error-mess"> Full name cannot be empty</span>
      }

      <label 
        className="main-label" 
        htmlFor="loan_amount"
      >
        Loan amount
      </label>
      <h1 className='loan-h1'>₦{money.format(loanAmount)}</h1>
      <Range setLoanAmount={setLoanAmount} minMax={minMax} />
      <br />
      <br />
      <label 
        className="main-label" 
        htmlFor="repayment_duration"
      >
        Select repayment duration
      </label>
      <select 
        name="repayment_duration" 
        className="main-input"
        onChange={handleInput}
        value={inputState.repayment_duration}
      >
        {
          durations.map((duration, index) => <option key={index} value={index + 1}>{index + 1} Month</option>)
        }
      </select>
      <br />
      <br />
      {
        isLoading ?
          <div className='loader-container'> 
            <Loader />
          </div>
        :  <input 
              type="submit" 
              className="main-submit" 
              disabled={error}
            /> 
      }
    </form>
    : <div className="main-success">
        <button 
          className="main-submit"
          onClick={handleBack}
        >
          Back
        </button>
        <h2 className="main-submit-h2">Your request was successful</h2>
        <h2 className="main-submit-h2">Transaction ID:  ${transaction}</h2>
      </div>
  )
};

export default Request;
