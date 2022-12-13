import React, { Component } from 'react'; 
import './App.css'; 
import JsonPlaceholder from './components/JsonPlaceholder';

class App extends Component { 
    render() {
        return (
            <div className="App">
                <JsonPlaceholder />
            </div>
        )
    }
}

export default App;