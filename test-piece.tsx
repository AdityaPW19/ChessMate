import React from 'react';
import { createRoot } from 'react-dom/client';
import { WhiteKing } from 'react-chess-pieces';

const TestPiece = () => {
  return (
    <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
      <WhiteKing />
    </div>
  );
};

// Create a test container
const testContainer = document.createElement('div');
testContainer.id = 'test-container';
testContainer.style.position = 'fixed';
testContainer.style.bottom = '10px';
testContainer.style.right = '10px';
testContainer.style.zIndex = '9999';
document.body.appendChild(testContainer);

// Render the test piece
const root = createRoot(testContainer);
root.render(<TestPiece />);

// Remove after 5 seconds
setTimeout(() => {
  document.body.removeChild(testContainer);
}, 5000);
