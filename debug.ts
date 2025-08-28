// This file prints logs for debugging piece issues
console.log('Debug component loaded');

// Check if react-chess-pieces is properly loaded
try {
  const pieces = require('react-chess-pieces');
  console.log('react-chess-pieces loaded:', Object.keys(pieces));
} catch (error) {
  console.error('Error loading react-chess-pieces:', error);
}

// Export a dummy function to prevent build errors
export default function debug() {
  return null;
}
