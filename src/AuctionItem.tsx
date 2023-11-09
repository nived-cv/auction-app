
import './css/auction-item.css'

type mapArgs = {

    id : number
    name : string
    start_bid : number
    current_bid : number
    bid_person : string 
}

type props = {
    item : {id : number
        name : string
        start_bid : number
        current_bid : number
        bid_person : string }
    selected : (e : mapArgs) => void
}

export const AuctionItem = ({item,selected}: props) =>{

    return(
    
    <div className = 'auction-item' onClick = {() =>selected(item)}>

            <p>Name : {item.name}</p>
            <p>Bidding for : {item.current_bid}</p>
            <p>bid by : {item.bid_person}</p>

    </div>
    )
}