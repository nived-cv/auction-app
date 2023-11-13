
import { useRef, useState } from 'react'
import './css/auction-users.css'

let user_list = [
    {id:1, name : "dasan"},
    {id:2, name : "vasu"},
]

type user = {
    id : number
    name : string
}

type args = {
    passCurrentUser : (currentUser : user) => void
}

export const AuctionUsers = ({passCurrentUser}:args) =>{

    let [userList,setUserList] = useState(user_list)

    const refObj = useRef<HTMLSelectElement>(null)

    const selectUser = async() =>{

        let currentUser = user_list.find(user => user.id === Number(refObj.current?.value))!
       passCurrentUser(currentUser)
    }

    return(
    
    <div className = "user-container">
        <div className = "user-list">

            <select onClick={selectUser} ref = {refObj} >

                {userList.map((user) =>{
                    return <option value = {user.id}> {user.name}</option>
                })}
            </select>
        </div>
    </div>    
    )
}