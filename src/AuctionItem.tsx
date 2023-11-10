
import './css/auction-item.css'
import { useRef } from 'react'

type mapArgs = {

    id: number
    name: string
    current_bid: number
    bid_person: string | null
    current_users : {id: number, name : string}[]
    sold : boolean
}

type props = {
    item : {id: number
        name: string
        current_bid: number
        bid_person: string | null
        current_users : {id: number, name : string}[]
        sold:boolean
    }
    selected : (e : mapArgs) => void
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

    </div>
    )
}