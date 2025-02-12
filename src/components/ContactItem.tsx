import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { ContactsContext } from "../Contexts";
import { useNavigate, useParams } from "react-router-dom";
import { Contact } from "../types";

function deleteContact(id:number){
    const url = `https://boolean-uk-api-server.fly.dev/sanderrasmussen/contact/${id}`;
    console.log(url)
    fetch(url, { method: 'DELETE' })
    .then(response => {
    if (response.ok) {
    console.log('Delete successful');
    } else {
    console.error('Delete failed');
    }
    })
    .catch(error => console.error('Error:', error));
}

function ContactItem(props){
    const {id}=useParams();
    const {contacts, setContacts} = useContext(ContactsContext);
    const [contact, setContact]= useState<Contact>()
    const navigate = useNavigate(); 
    const fetchContacts = async () => {
        const response = await fetch("https://boolean-uk-api-server.fly.dev/sanderrasmussen/contact")
        const jsonResponse = await response.json()
        setContacts(jsonResponse)
        console.log(contacts)
    }

    useEffect(()=>{
        setContact(contacts.find(c=> c.id===Number(id) ));
        fetchContacts();
    },[]);
    

    return (
        <div>
             
            <ul>
                <img src={contact?.profileImage} alt="profile image" />
                <li>{contact?.firstName} {contact?.lastName}</li>
                <li>{contact?.email}</li>
                <li>{contact?.city}</li>
                <li>{contact?.street}</li>
                <button onClick={()=> {deleteContact(Number(id)) ; navigate(-1)}}>Delete Contact</button>
            </ul>
        </div>
    )
}
export default ContactItem;