import Request from '../Request';
import AllLoan from '../AllLoan';
import GetRepayment from '../GetRepayment';
import './index.css';

const basUrl = 'https://okigwecreations.online/api/';

const Section = ({ current }) => {
  const screenObject = {
    request: <Request />,
    all: <AllLoan />,
    get: <GetRepayment />,
  };

  const textTitle = () => {
    if(current === 'request') {
      return 'Request a loan'
    }

    if(current === 'all') {
      return 'All loan request'
    }

    if(current ===  'get') {
      return 'Get repayment schedule'
    }
  }

  return (
    <section className="section">
      <main className='main'>
        <h1 className="main-h1">{textTitle()}</h1>
        {screenObject[current]}
      </main>
    </section>
  )
};


export default Section;