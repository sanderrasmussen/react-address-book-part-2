import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { ContactsContext } from "../Contexts";
import { useParams } from "react-router-dom";
import { Contact } from "../types";

function ContactItem(props){
    const {id}=useParams();
    const {contacts, setContacts} = useContext(ContactsContext);
    const [contact, setContact]= useState<Contact>()

    useEffect(()=>{
        setContact(contacts.find(c=> c.id===Number(id) ));
    },[]);
  
    return (
        <div>
             
            <ul>
                <img src={contact?.profileImage} alt="profile image" />
                <li>{contact?.firstName} {contact?.lastName}</li>
                <li>{contact?.email}</li>
                <li>{contact?.city}</li>
                <li>{contact?.street}</li>
            </ul>
        </div>
    )
}
export default ContactItem;