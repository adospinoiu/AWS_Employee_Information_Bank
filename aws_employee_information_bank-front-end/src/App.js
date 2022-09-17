import './App.css';

// Import Main Components
import DataEntryComp from './DataEntryComp';
import DataViewEditComp from './DataViewEditComp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataEntryComp />

        <DataViewEditComp />
      </header>
    </div>
  );
}

export default App;
