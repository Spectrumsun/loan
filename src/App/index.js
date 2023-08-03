import { useState } from 'react';

import Navbar from '../Navbar';
import Section from '../Section';

const App = () => {
  const [current, setCurrent] = useState('request');
  const [active, setActive] = useState('Request a loan');
  return (
    <>
      <Navbar 
        setActive={setActive} 
        active={active}
        setCurrent={setCurrent}
      />
      <Section 
        setActive={setActive} 
        active={active}
        current={current}
      />
    </>
  );
}

export default App;
