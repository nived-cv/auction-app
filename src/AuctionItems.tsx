
import { useContext, useRef, useState } from "react"
import { AuctionItem } from "./AuctionItem";
import './css/auction-items-list.css'
import { useAuctionContext } from "./ContentScreen";
 
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
    notifications : {name:string,message:string}[]
}

type propstype = {
    items : mapArgs[] | null
    setitems: React.Dispatch<React.SetStateAction<mapArgs[] | null>>
    onNotify : (selected: mapArgs,value:number) => void
    user : User
}

export const AuctionItems = ({items,setitems,onNotify,user}:propstype) => {

    let [selectedItem,setSelectedItem] = useState<null | mapArgs>(null)
    const amountObj = useRef<HTMLInputElement>(null)
    const formObj = useRef<HTMLDivElement>(null)
    const {displayMessage} = useAuctionContext()

    // making a state variable to store the details of selected item
    const selected = (selectedItem: mapArgs) => {
        setSelectedItem(selectedItem)
        formObj.current!.classList.remove('hide')
    }
    
    const bidEnd = (details : mapArgs) =>{

        details.sold = true
        displayMessage(`${details.name} sold to ${details.bid_person} for ${details.current_bid}`)
    }

    const handleUsers = (action :string = "remove",user_:User|null =user ) => {

        switch(action){

            case "remove"  :    let new_arr = selectedItem?.current_users.filter(item => item !== user_)
                                selectedItem!.current_users = new_arr!

                                if(new_arr!.length === 1)
                                bidEnd(selectedItem!)

                                let updateArr = [...items!]
                                setitems(updateArr)
                                break;

            case "add" :   let found = selectedItem?.current_users.indexOf(user_!)
                            if(found === -1 ){

                                selectedItem?.current_users.push(user_!)
                                let updateArr = [...items!]
                                setitems(updateArr)
                            }
                            break
        }
    }

    const validateBid = () => {

        if(selectedItem && !selectedItem.sold){
            if(amountObj.current){

                let value = Number(amountObj.current.value)
                if( value > selectedItem.current_bid){
                    
                    // submitBid
                    selectedItem.current_bid = value
                    selectedItem.bid_person = user!.name
                    handleUsers("add",user)
                    let new_arr = [...items!]
                    new_arr && setitems(new_arr)

                    onNotify(selectedItem,value)
                    amountObj.current!.value = ''
                    }
            }
            else
            displayMessage(`enter valid bid`)
        }
        else
        displayMessage(`${selectedItem!.name} sold or unavailable`)
    }

    return (
        <div className = "auction-items-container">

            <h2 >Auction Items </h2>

            <div className="auction-items-list">

                {items?.map((item: mapArgs) => {
                    return <AuctionItem key={item.id} selected={selected} item={item} />
                })}

            </div>
            
            <div className = "bid-form hide" ref= {formObj}>
                <input type = "number" min={selectedItem?.current_bid} ref = {amountObj} placeholder={String(selectedItem?.current_bid)}/>
                
                <input className="btn" type ="button" value="Bid" 
                onClick = { validateBid } disabled={ typeof user?.name === "string" ? false : true}/>
                
                <input className="btn" type ="button" value="Remove User" 
                onClick = {()=> handleUsers()} disabled={ typeof user?.name === "string" ? false : true}/>
            </div>

        </div>
    )
}