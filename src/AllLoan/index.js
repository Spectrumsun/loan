import { useState } from 'react';
import toast from 'toastr';
import Loader from '../Loading';
import { money, baseUrl } from '../index';

const AllLoan = () => {
  const [transactionId, setTransactionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loans, setLoans] = useState([]);
  const [currentItem, setCurrentItem] = useState('form');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    let formData = new FormData();
    formData.append("action", "get_all_loan_request");
    formData.append("transaction_id", transactionId);
    let requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };
    try {
      const fetchResponse = await fetch(baseUrl, requestOptions);
      const data = await fetchResponse.json();
      setIsLoading(false);
      toast.success(`All request`);
      setTransactionId('');
      setLoans(Array.isArray(data.data) ? data.data : [data.data]);
      setCurrentItem('table')
    }catch(error) {
      setIsLoading(false);
      toast.error("An error occurred");
      return error;
    }
  };

  const handleBack = () => {
    setCurrentItem('form');
  };


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
        onChange={(e) => setTransactionId(e.target.value)}
        className="main-input"
      />
      {
        isLoading ?
          <div className='loader-container'> 
            <Loader />
          </div>
          :  <input 
              type="submit" 
              className="main-submit" 
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
          <div className='table-wrapper'>
            <table id="customers">
            <tr>
              <th>Transaction Id</th>
              <th>Full Name</th>
              <th>Loan Amount</th>
              <th>Repayment Duration</th>
              <th>Date</th>
            </tr>
            {
              loans?.map((d, index) => {
                return (
                  <tr key={index}>
                    <td>{d.TRANSACTION_ID}</td>
                    <td>{d.FULL_NAME}</td>
                    <td>₦{money.format(d.LOAN_AMOUNT)}</td>
                    <td className="duration">{d.REPAYMENT_DURATION}</td>
                    <td>{d.CREATED_TIME}</td>
                  </tr>
                )
              })
            }
          </table>
          </div>
        </>
  )
};

export default AllLoan;
