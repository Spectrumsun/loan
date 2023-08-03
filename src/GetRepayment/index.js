import { useState } from 'react';
import toast from 'toastr';
import Loader from '../Loading';
import { money } from '../index';

const GetRepayment = () => {
  const [transactionId, setTransactionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loans, setLoans] = useState();
  const [currentItem, setCurrentItem] = useState('form');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(transactionId.length === 0) {
      setError(true);
    } else {
      setIsLoading(true)
      let formData = new FormData();
      formData.append("action", "get_repayment_schedule");
      formData.append("transaction_id", transactionId);
      let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      };
      try {
        const fetchResponse = await fetch('https://okigwecreations.online/api/', requestOptions);
        const data = await fetchResponse.json();
        setIsLoading(false);
        toast.success(`All request`);
        setTransactionId('');
        setLoans(data);
        setCurrentItem('table')
      }catch(error) {
        setIsLoading(false);
        toast.error("An error occurred");
        return error;
      }
    }
  };

  const handleBack = () => {
    setCurrentItem('form');
  };

  const handleNameValidation = (e) => {
    setError(e.target.value.length === 0)
  }

  return (
    currentItem === 'form' ?
      <form className='main-form' onSubmit={handleSubmit}>
      <label 
        htmlFor="transactionId"
        className="main-label"
      >
        Transaction Id
      </label>
      <input 
        id="transactionId" 
        type="text" 
        name="transactionId" 
        value={transactionId}
        onChange={(e) => {
          setTransactionId(e.target.value)
          setError(e.target.value.length === 0);
        }}
        onBlur={handleNameValidation}
        className={`main-input ${error && "main-input-error"}`}
      />
      {
        error &&  <span className="error-mess"> Full name cannot be empty</span>
      }
      {
        isLoading ?
          <div className='loader-container'> 
            <Loader />
          </div>
        : <input 
            type="submit" 
            className="main-submit" 
            disabled={error}
          /> 
        }
      </form>
      : loans.length === 0 
      ? null
      : 
      <>
        <button 
          className="main-submit"
          onClick={handleBack}
        >
          Back
        </button>
        <div className="repayment-details">
          <div className="repayment-details-item"> 
            <label 
              htmlFor="transactionId"
              className="main-label"
            >
              Transaction Id
            </label>
            <input 
              id="transactionId" 
              type="text" 
              name="transactionId" 
              value={loans.TRANSACTION_ID}
              className="main-input"
              disabled
            />
          </div>
          
          <div className="repayment-details-item"> 
            <label 
              htmlFor="transactionId"
              className="main-label"
            >
              Full name
            </label>
            <input 
              id="transactionId" 
              type="text" 
              name="transactionId" 
              value={loans.FULL_NAME}
              className="main-input"
              disabled
            />
          </div>

        <div className="repayment-details-item">
          <label 
            htmlFor="transactionId"
            className="main-label"
          >
            Loan Amount
          </label>
          <input 
            id="transactionId" 
            type="text" 
            name="transactionId" 
            value={loans.LOAN_AMOUNT}
            className="main-input"
            disabled
          />
        </div>
        <div className="repayment-details-item">
          <label 
            htmlFor="transactionId"
            className="main-label"
          >
            Repayment Duration 
          </label>
          <input 
            id="transactionId" 
            type="text" 
            name="transactionId" 
            value={loans.REPAYMENT_DURATION}
            className="main-input"
            disabled
          />
        </div>
        <div className="repayment-details-item">
          <label 
            htmlFor="transactionId"
            className="main-label"
          >
            Date 
          </label>
          <input 
            id="transactionId" 
            type="text" 
            name="transactionId" 
            value={loans.DATE}
            className="main-input"
            disabled
          />
        </div>
        <div className="repayment-details-item">
            <label 
              htmlFor="transactionId"
              className="main-label"
            >
              Cumulative Repayment Amount 
            </label>
            <input 
              id="transactionId" 
              type="text" 
              name="transactionId" 
              value={loans.CUMULATIVE_REPAYMENT_AMOUNT}
              className="main-input"
              disabled
            />
          </div>
        </div>
        <div className='table-wrapper'>
          <table id="customers">
          <tr>
            <th>Transaction Id</th>
            <th>Loan Balance</th>
            <th>Month Count</th>
            <th>Expected Repayment Amount</th>
            <th>Interest</th>
            <th>Total Repayment Amount</th>
          </tr>
          {
            loans?.data?.map((d, index) => {
              return (
                  <tr key={index}>
                    <td>{d.TRANSACTION_ID}</td>
                    <td>{d.LOAN_BALANCE}</td>
                    <td className="duration">{d.MONTH_COUNT}</td>
                    <td>{d.EXPECTED_REPAYMENT_AMOUNT}</td>
                    <td>₦{money.format(d.INTEREST)}</td>
                    <td>₦{money.format(d.TOTAL_REPAYMENT_AMOUNT)}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </>
  )
};

export default GetRepayment;
