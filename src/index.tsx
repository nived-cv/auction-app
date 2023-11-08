import React from 'react';
import ReactDOM from 'react-dom/client';
import AuctionApp from './AuctionApp';
import './css/Index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <AuctionApp />
  </>
);
