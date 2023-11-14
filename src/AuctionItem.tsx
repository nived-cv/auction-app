
import './css/auction-item.css'
import { useRef } from 'react'
import { AuctionItemType } from './CommonTypes'


type props = {
    item : AuctionItemType
    selected : (e : AuctionItemType) => void
}

export const AuctionItem = ({item,selected}: props) =>{

    const divObj = useRef<HTMLDivElement>(null)
    if(item.sold)
     divObj.current?.classList.add('sold')

    return(
    
    <div className = 'auction-item' onClick = {() =>selected(item)} ref = {divObj}>

            <p>Name : {item.name}</p>
            <p>Bidding for : {item.current_bid}</p>
            <p>bid by : {item.bid_person}</p>
            <p>in bid : {item.current_users?.map((person) => person.name + ',')} </p>
    </div>
    )
}