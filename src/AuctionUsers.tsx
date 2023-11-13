
import { useRef, useState } from 'react'
import './css/auction-users.css'

type user = {
    id : number
    name : string
    notifications : {name:string,message:string}[]
}

type args = {
    user : user | null
}

export const AuctionUsers = ({user}:args) =>{

    return(
        <div>

            <div className = "notification">
                <h3>Notifications</h3>
                <ul className = "notifications">
                    {
                    user?.notifications.map((notification) =>{
                        if(user.name === notification.name)
                            return <li> you {notification.message}</li>
                        else
                            return <li> {notification.name} {notification.message}</li> 
                    })
                    }
                </ul>
            </div>

        </div>
    )
}