import { useRef, useState } from "react"
import { AuctionItem } from "./AuctionItem";
import './css/auction-items-list.css'

let auctionItems = [
    { "id": 1, "name": "vessel", "start_bid": 1000, "current_bid": 1000, "bid_person": "" },
    { "id": 2, "name": "Pot", "start_bid": 2000, "current_bid": 2000, "bid_person": "" },
]

type mapArgs = {

    id: number
    name: string
    start_bid: number
    current_bid: number
    bid_person: string
}

type propstype = {
    props : {id:number,name:string}
}

//const getBid = (item : mapArgs) =>  item.current_bid

const submitBid = (item: mapArgs, amount: number, person: string, state: mapArgs[],
    setstate: React.Dispatch<React.SetStateAction<mapArgs[]>>) => {

    item.bid_person = person
    item.current_bid = amount
    let new_arr = [...state]
    setstate(new_arr)
}

export const AuctionItems = ({props}:propstype) => {

    let [itemDetails, setItemDetails] = useState(auctionItems)
    let [bidAmount,setBidAmount] = useState<null | number>(null)
    const amountObj = useRef<HTMLInputElement>(null)

    const selected = (selectedItem: mapArgs) => {

        setBidAmount(selectedItem.current_bid)
        if (amountObj.current){

            let value = Number(amountObj.current.value)
            if( value > selectedItem.current_bid)
                submitBid(selectedItem, value,props.name, itemDetails, setItemDetails)
            
            amountObj.current.value = ""
        }
    }

    return (
        <div className = "auction-items-container">
            <div className="auction-items-list">

                {itemDetails.map((item: mapArgs) => {
                    return <AuctionItem key={item.id} selected={selected} item={item} />
                })}

            </div>
            
            <div className = "bid-form">
                <input type = "number" min={bidAmount!} ref = {amountObj}/>
            </div>
        </div>
    )
}