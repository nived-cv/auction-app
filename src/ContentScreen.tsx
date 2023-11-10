
import { AuctionItems } from "./AuctionItems"
import { AuctionUsers } from "./AuctionUsers"
import { useState, useRef } from 'react'
import './css/content-screen.css'

type user = {
    id : number
    name : string
}

type Messagepass = {
    displayMessage : (message: string) => void
}

export const ContentScreen = () =>{

    const [user,setUser] = useState <user> ({} as user)
    const passCurrentUser = (user : user) =>  setUser(user)
    const msgScreen = useRef<HTMLDivElement>(null)
    const msg = useRef<HTMLDivElement>(null)

    const displayMessage = (message : string) => {

        msg.current!.innerText = message
        msgScreen.current!.classList.remove("hide")
        setTimeout(()=>{msgScreen.current!.classList.add("hide")},2500)
    }

    return (
    <div>
        <div className="message-screen hide" ref = { msgScreen }>
            <p className="message" ref = { msg }> message</p>
        </div>

        <AuctionItems props = {user} Messagepass ={displayMessage} />
        <AuctionUsers passCurrentUser = {passCurrentUser}/>

    </div>
    )
}