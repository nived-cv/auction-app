
import { useRef, useState } from "react"
import { AuctionItem } from "./AuctionItem";
import './css/auction-items-list.css'

let auctionItems = [
    { "id": 1, "name": "vessel", "current_bid": 1000, "bid_person": null ,"current_users":[],"sold":false },
    { "id": 2, "name": "Pot", "current_bid": 2000, "bid_person": null ,"current_users":[],"sold":false },
]

type mapArgs = {

    id: number
    name: string
    current_bid: number
    bid_person: string | null
    current_users : User[]
    sold:boolean
}

type User = {
    id:number
    name:string
}

type propstype = {
    props : User
    Messagepass : (message:string)=>void
    notify: (bidder:string,message:string) => void
}

export const AuctionItems = ({props,Messagepass,notify}:propstype) => {

    let [itemDetails, setItemDetails] = useState(auctionItems)
    let [selectedItem,setSelectedItem] = useState<null | mapArgs>(null)
    const amountObj = useRef<HTMLInputElement>(null)
    const bidForm = useRef<HTMLDivElement>(null)

    // making a state variable to store the details of selected item
    const selected = (selectedItem: mapArgs) => {
        setSelectedItem(selectedItem)
        bidForm.current!.classList.remove('hide')
    }
    
    const bidEnd = (details : mapArgs) =>{

        Messagepass(`${details.name} sold to ${details.bid_person} for ${details.current_bid}`)
        details.sold = true
        
    }

    const handleUsers = (action :string = "remove",user:User = props) => {

        switch(action){

            case "remove"  :    let new_arr = selectedItem?.current_users.filter(item => item !== user)
                                selectedItem!.current_users = new_arr!

                                if(new_arr!.length === 1)
                                bidEnd(selectedItem!)

                                let updateArr = [...itemDetails]
                                setItemDetails(updateArr)
                                break;

            case "add" :   let found = selectedItem?.current_users.indexOf(user)
                            if(found === -1 ){

                                selectedItem?.current_users.push(user)
                                let updateArr = [...itemDetails]
                                setItemDetails(updateArr)
                            }
                            break
        }
    }

    const validateBid = () => {
        if(props){

            if(selectedItem && !selectedItem.sold){

                if(amountObj.current){

                    let value = Number(amountObj.current.value)
                    if( value > selectedItem.current_bid){
                        
                        // submitBid
                        selectedItem.current_bid = value
                        selectedItem.bid_person = props.name
                        handleUsers("add",props)
                        let new_arr = [...itemDetails]
                        setItemDetails(new_arr)

                        //Messagepass(`you bid ${value}`)
                        notify(props.name,`bid ${value}`)
                        amountObj.current!.value = ''
                    }
                }
            }
            else
            Messagepass(`${selectedItem!.name} sold or unavailable`)
        }
    }

    return (
        <div className = "auction-items-container">

            <h2 >Auction Items </h2>

            <div className="auction-items-list">

                {itemDetails.map((item: mapArgs) => {
                    return <AuctionItem key={item.id} selected={selected} item={item} />
                })}

            </div>
            
            <p className="users-in-bid">Users in Bid : {selectedItem?.current_users.map((item => {return <span>{item.name}</span>}))}</p>

            <div className = "bid-form hide" ref = {bidForm}>
                <input type = "number" min={selectedItem?.current_bid} ref = {amountObj} placeholder={String(selectedItem?.current_bid)}/>
                
                <input className="btn" type ="button" value="Bid" 
                onClick = { validateBid } disabled={ typeof props.name === "string" ? false : true}/>
                
                <input className="btn" type ="button" value="Remove User" 
                onClick = {()=> handleUsers() } disabled={ typeof props.name === "string" ? false : true}/>
            </div>

        </div>
    )
}