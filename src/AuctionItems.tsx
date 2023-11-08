import { useReducer } from "react"


let auctionItems = [
    {"id": 1,"name" : "vessel" , "start-bid": 1000,
     "current-bid":1000, "bid-person":""},
     {"id": 2,"name" : "Pot" , "start-bid": 2000,
     "current-bid":2000, "bid_person":""},
]

type actionArg ={
    id : number;
    bid : number;
    bid_person : string
}

const reducer = (state : {}[], action : actionArg) =>{
    
    switch(action.id){


        default : return state
    }
}

export const AuctionItems = () =>{



    let [itemDetails, itemDispatch] = useReducer(reducer,AuctionItems)

    return(
        <div className = "auction-items-list">

                
        </div>
    )
}