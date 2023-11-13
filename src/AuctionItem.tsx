
import './css/auction-item.css'
import { useRef } from 'react'

type User = {
    id:number
    name:string
    notifications : {name:string,message:string}[]
}

type mapArgs = {

    id: number
    name: string
    current_bid: number
    bid_person: string | null
    current_users : User[]
    sold : boolean
}

type props = {
    item : {id: number
        name: string
        current_bid: number
        bid_person: string | null
        current_users : User[]
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
            <p>in bid : {item.current_users?.map((person) => person.name + ',')} </p>
    </div>
    )
}