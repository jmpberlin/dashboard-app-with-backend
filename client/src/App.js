import './styles/App.scss';
import BvgBox from './components/Dashboard/BvgBox';
import TwitterBox from './components/Dashboard/TwitterBox';
import WetterBox from './components/Dashboard/WetterBox';
import MapBox from './components/Dashboard/MapBox';

function App() {
  return (
    <div className='component-wrapper'>
      <TwitterBox></TwitterBox>
      <BvgBox></BvgBox>
      <WetterBox></WetterBox>
      <MapBox></MapBox>
    </div>
  );
}

export default App;
