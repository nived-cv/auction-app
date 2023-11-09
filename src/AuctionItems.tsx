import { useState } from "react"
import { AuctionItem } from "./AuctionItem";
import './css/auction-items-list.css'

let auctionItems = {
    1:{"id": 1,"name" : "vessel" , "start_bid": 1000,
     "current_bid":1000, "bid_person":""},
     2:{"id": 2,"name" : "Pot" , "start_bid": 2000,
     "current_bid":2000, "bid_person":""},
}

type mapArgs = {

    id : number
    name : string
    start_bid : number
    current_bid : number
    bid_person : string 
}

export const AuctionItems = () =>{

    let [itemDetails, setItemDetails] = useState(auctionItems)

    const selected = (selectedItem :mapArgs) =>{

            //let id = selectedItem.id
            // setItemDetails(()=>{
            //     let temp = itemDetails.1
            // })
           //     selectedItem.current_bid += 10
           

           //let prev =  Object.assign({},itemDetails)
           selectedItem.current_bid +=1
        //    let updated = {selectedItem.id : }
        //    Objects.assign
            let newDuplicate = Object.assign({},itemDetails)

           setItemDetails(newDuplicate)
           console.log(selectedItem,itemDetails)

    }

    return(
        <div className = "auction-items-list">

            {Object.values(itemDetails).map((item : mapArgs) => {
                return <AuctionItem key = {item.id} selected = {selected} item = {item}/>
            })}
            
        </div>
    )
}
// 