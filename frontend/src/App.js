import React, {useState} from 'react'
import bg from './img/bg2.jpg';
import styled from 'styled-components'
import {MainLayout} from './styles/Layouts'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Incomes/Income'
import Expenses from './Components/Expenses/Expenses';
import Navigation from './Components/Navigation/Navigation';
import CurrencyConverter from './Components/CurrencyCvt/currency-convertor';
import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Income />
      case 3: 
        return <Expenses />
      case 4:
        return <CurrencyConverter />
      default: 
        return <Dashboard />
    }
  }

  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative; 
  main{
    flex: 1;
    background: #BB8493;
    backdrop-filter: blur(4.5px);
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App