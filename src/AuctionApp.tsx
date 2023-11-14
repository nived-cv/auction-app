
import React from 'react'
import { Header } from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContentScreen } from './ContentScreen'

const AuctionApp = () => {
  return (
    <div>
    
        <Header />

        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<ContentScreen />} />
          </Routes>
        </BrowserRouter>
        
    </div>
    )
}

export default AuctionApp