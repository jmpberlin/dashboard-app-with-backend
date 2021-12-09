import './styles/App.scss';
import BvgBox from './components/Dashboard/BvgBox';
import TwitterBox from './components/Dashboard/TwitterBox';
import WetterBox from './components/Dashboard/WetterBox';

function App() {
  return (
    <div className='component-wrapper'>
      <TwitterBox></TwitterBox>
      <BvgBox></BvgBox>
      <WetterBox></WetterBox>
    </div>
  );
}

export default App;
