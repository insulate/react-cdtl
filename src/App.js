import Footer from './components/Footer';
import Header from './components/Header';
import Logo from './components/Logo';

function App() {
  return (
    <div>
      <Logo />
      <Header />
      <Footer title='Google' website='www.google.com' postCode={41000} isOpen={true} />
    </div>
  );
}

export default App;
