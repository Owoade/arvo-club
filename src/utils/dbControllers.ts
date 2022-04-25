import * as EP from "./endpoints" // EP means endpoints
export const createUser =(data:object,successCallback:Function)=>{
    fetch(EP.CREATE_USER, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode:"cors"
   }).then(res=> res.json()).then(data => successCallback("user successfully created"));      
}

export const getUser=(email:string,successCallback:Function)=>{
    fetch(`${EP.GET_USER}/${email}`,{mode:"cors"}).then(res=> res.json())
    .then((user:[])=>{
      successCallback(user.length > 0)
    })
}

export const  createClub=(data:object, successCallback:Function)=>{
    fetch(EP.CREATE_CLUB, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode:"cors"
   }).then(res=> res.json()).then(data => successCallback("club successfully created"));      

}
export const  createNotification=(data:object, successCallback:Function)=>{
    fetch(EP.CREATE_NOTIFICATION, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode:"cors"
   }).then(res=> res.json()).then(data => successCallback("club successfully created"));      

}
export const  createMember=(data:object)=>{
    fetch(EP.CREATE_MEMBER, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode:"cors"
   })

}
export const  createInvite=(data:object, successCallback:Function)=>{
    fetch(EP.CREATE_INVITE, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode:"cors"
   }).then(res=> res.json()).then((data:{_id:string}) => successCallback(data._id));      

}
export const getOwnedClubs=(email:string,successCallback:Function)=>{
    fetch(`${EP.GET_OWNED_CLUBS}/${email}`,{mode:"cors"}).then(res=> res.json())
    .then((dbClubs:[])=>{
      successCallback(dbClubs)
    })
}
export const getClubMembers=(clubName:string,successCallback:Function)=>{
    fetch(`${EP.GET_CLUB_MEMBERS}/${clubName}`,{mode:"cors"}).then(res=> res.json())
    .then((members:[])=>{
      successCallback(members)
    })
}
export const removeMember=({clubName,email}:{clubName:string,email:string},successCallback:Function)=>{
    fetch(`${EP.REMOVE_MEMBER}/${email}/${clubName}`,{mode:"cors"}).then(res=> res.json())
    .then(()=>{
      successCallback()
    })
}
export const getNotifications=(email:string,successCallback:Function)=>{
    fetch(`${EP.GET_USER_NOTIFICATIONS}/${email}`,{mode:"cors"}).then(res=> res.json())
    .then((notifications:[])=>{
      successCallback(notifications)
    })
}
export const getClub=(id:string,successCallback:Function)=>{
    fetch(`${EP.GET_CLUB}/${id}`,{mode:"cors"}).then(res=> res.json())
    .then((clubs:[{}])=>{
      successCallback(clubs)
    })
}
export const getInvite=(id:string,successCallback:Function)=>{
    fetch(`${EP.GET_INVITE}/${id}`,{mode:"cors"}).then(res=> res.json())
    .then((invites:[{}])=>{
      successCallback(invites)
    })
}
export const getPendingInvites=(clubName:string,successCallback:Function)=>{
    fetch(`${EP.GET_PENDING_INVITE}/${clubName}`,{mode:"cors"}).then(res=> res.json())
    .then((invites:[])=>{
      successCallback(invites)
    })
}
export const getJoinedClubs=(email:string,successCallback:Function)=>{
    fetch(`${EP.GET_JOINED_CLUBS}/${email}`,{mode:"cors"}).then(res=> res.json())
    .then((members:[])=>{
      successCallback(members)
    })
}
export const updateNotification=(data:object,successCallback?:Function)=>{
    fetch(EP.UPDATE_NOTIFICATION, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode:"cors"
   }).then(res=> res.json())
   .then(()=>{
     successCallback?.() 
   })     

}
export const updateInvite=(data:object,successCallback?:Function)=>{
    fetch(EP.UPDATE_INVITE, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode:"cors"
   })  .then(res=> res.json())
   .then(()=>{
     successCallback?.() 
   })     

}