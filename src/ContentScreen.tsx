
import { AuctionItems } from "./AuctionItems"
import { AuctionUsers } from "./AuctionUsers"
import { useState, useRef, useEffect, useContext } from 'react'
import './css/content-screen.css'
import { createContext } from "react"

type user = {
    id: number
    name: string
    notifications: { name: string, message: string }[]
}

type mapArgs = {

    id: number
    name: string
    current_bid: number
    bid_person: string | null
    current_users: user[]
    sold: boolean
}

type contextType = {
    displayMessage : (message : string) => void
}

let auctionItems = [
    { "id": 1, "name": "vessel", "current_bid": 1000, "bid_person": null, "current_users": [], "sold": false },
    { "id": 2, "name": "Pot", "current_bid": 2000, "bid_person": null, "current_users": [], "sold": false },
]

let user_list = [
    { id: 1, name: "dasan", notifications: [] },
    { id: 2, name: "vasu", notifications: [] },
]

const MessageContext = createContext({} as contextType)

// custom hook is exported , hence dont have to write useContext(MessageContext) everywhere
export const  useAuctionContext = ()=>{
    return useContext(MessageContext)
}

export const ContentScreen = () => {

    const [users, setUsers] = useState<user[] | null>(null)
    let [currentuser, setCurrentuser] = useState<user | null>(null)
    let [auctionitems, setAuctionitems] = useState<mapArgs[] | null>(null)
    const refObj = useRef<HTMLSelectElement>(null)
    const msgObj = useRef<HTMLSpanElement>(null)
    const msgScreen = useRef<HTMLDivElement>(null)

    const selectUser = async () => {

        let currentUser = user_list.find(user => user.id === Number(refObj.current?.value))!
        setCurrentuser(currentUser)
    }

    const notify = (selected: mapArgs, value: number) => {

        let message = `bid ${value} for ${selected.name}`
        let name = currentuser?.name!
        let objModel = { "name": name, "message": message }
        let activeUsers = selected.current_users.map((item) => item.name)

        activeUsers.forEach((person) => {

            let found = users?.find((item) => item.name === person)
            found?.notifications.push(objModel)
        })

        let temp = [...users!]
        setUsers(temp)
    }

    const displayMessage = (message: string) => {

        msgObj.current!.innerText = message
        msgScreen.current?.classList.remove('hide')
        setTimeout(() => {
            msgScreen.current?.classList.add('hide')
        }, 2500)
    }

    useEffect(() => {
        setAuctionitems(auctionItems)
        setUsers(user_list)
    }, [])

    return (
        <div>
            <div className="user-list">
                <select onClick={selectUser} ref={refObj} >

                    {users?.map((user) => {
                        return <option value={user.id}> {user.name}</option>
                    })}
                </select>
            </div>

            <MessageContext.Provider value={{displayMessage}}>
                <AuctionItems items={auctionitems} setitems={setAuctionitems} onNotify={notify} user={currentuser!} />
                <AuctionUsers user={currentuser} />
            </MessageContext.Provider>

            <div className="message-screen" ref={msgScreen}>
                <span className="message" ref={msgObj}></span>
            </div>

        </div>
    )
}
