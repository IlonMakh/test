import './styles/main.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import BreadCrumps from './components/Bread-crumps';
import SignUp from './components/SignUp';
import { useState } from 'react';
import PersonalInfo from './components/Personalnfo';
import ResultModal from './components/Result-modal';

function App() {
  const [currentStep, setCurrentStep] = useState('SignUp Info');
  return (
    <div className='app'>
      <Header />
      <main className='main'>
        <BreadCrumps step={currentStep} />
        {currentStep === 'SignUp Info' ? <SignUp setStep={setCurrentStep} /> : <PersonalInfo setStep={setCurrentStep} />}
        {currentStep === 'Result' ? <ResultModal setStep={setCurrentStep}  /> : ''}
      </main>
      <Footer />
    </div>
  );
}

export default App;
