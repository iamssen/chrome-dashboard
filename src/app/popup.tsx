import React from 'react';
import { render } from 'react-dom';
import { Title } from './components/Title';

function App() {
  return (
    <Title text="Hello Popup ???? what????"/>
  );
}

render(<App/>, document.querySelector('#app'));