import './App.css';
import BvgBox from './components/Dashboard/BvgBox';
import TwitterBox from './components/Dashboard/TwitterBox';
import WetterBox from './components/Dashboard/WetterBox';

function App() {
  return (
    <div>
      <div>
        <h3>Hallo From App-Component! </h3>
      </div>
      <TwitterBox></TwitterBox>
      <BvgBox></BvgBox>
      <WetterBox></WetterBox>
    </div>
  );
}

export default App;
