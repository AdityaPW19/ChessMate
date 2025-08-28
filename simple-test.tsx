import React from 'react';
import { createRoot } from 'react-dom/client';
import { WhiteKing } from 'react-chess-pieces';

function SimpleTest() {
  return (
    <div style={{ width: '200px', height: '200px', border: '1px solid black', margin: '50px auto' }}>
      <WhiteKing />
    </div>
  );
}

// Create root element
const rootElement = document.createElement('div');
rootElement.id = 'test-root';
document.body.appendChild(rootElement);

// Mount the component
const root = createRoot(rootElement);
root.render(<SimpleTest />);
