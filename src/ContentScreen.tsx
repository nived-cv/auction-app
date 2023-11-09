import { AuctionItems } from "./AuctionItems"
import { AuctionUsers } from "./AuctionUsers"
import { useState } from 'react'

type user = {
    id : number
    name : string
}

export const ContentScreen = () =>{

    const [user,setUser] = useState <user> ({} as user)
    
    const passCurrentUser = (user : user) =>{

        setUser(user)
    }

    return (
    <div>
        <AuctionItems props = {user}/>
        <AuctionUsers passCurrentUser = {passCurrentUser}/>

    </div>
    )
}