
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

type notificationMapArgs = {
    user : string
    message : string
}

export const ContentScreen = () =>{

    const [user,setUser] = useState <user> ({} as user)

    const msgScreen = useRef<HTMLDivElement>(null)
    const msg = useRef<HTMLDivElement>(null)
    let [notifList,setNotifList] = useState <notificationMapArgs[]> ([] as notificationMapArgs[])
    let notificationObj = useRef<HTMLUListElement>(null)
    

    const displayMessage = (message : string) => {

        msg.current!.innerText = message
        msgScreen.current!.classList.remove("hide")
        setTimeout(()=>{msgScreen.current!.classList.add("hide")},2500)
    }

        const passCurrentUser = (user : user) =>  {
        setUser(user)
    }

    const notify = (bidder:string,message:string) =>{
        
        let modelObject = {user:'',message:''}
        modelObject.user = bidder
        modelObject.message = message
        setNotifList([...notifList,modelObject])
    }

    return (
    <div>
        <div className="message-screen hide" ref = { msgScreen }>
            <p className="message" ref = { msg }> message</p>
        </div>

        <div className = "notification">
                <h3>Notifications</h3>
                <ul className = "notifications" ref = {notificationObj}>
                   
                {
                notifList.map((notification:notificationMapArgs) => {
                    if (notification.user === user.name)
                        return <li> you {notification.message} </li>
                    else
                        return <li> {notification.user} {notification.message} </li>
                })
                }

                </ul>
        </div>

        <AuctionItems props = {user} Messagepass ={displayMessage} notify = {notify}/>
        <AuctionUsers passCurrentUser = {passCurrentUser}/>

    </div>
    )
}