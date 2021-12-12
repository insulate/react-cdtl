import Footer from './components/Footer';
import Header from './components/Header';
import Logo from './components/Logo';
import './App.css';

function App() {
  return (
    <div className='logo'>
      <Logo />
      <Header />
      <Footer title='Google' website='www.google.com' postCode={41000} isOpen={true} />
    </div>
  );
}

export default App;
