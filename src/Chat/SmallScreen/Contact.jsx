import React, { useEffect } from 'react';
import { Card, CardActionArea, CardContent, Divider, Typography, TextField } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useState } from 'react';
import apiUrl from "../../apiURL";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

function Contact() {

    const navigate = useNavigate()

    const [myAvatar, setMyAvatar] = useState('');
    const [myName, setmyName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [myID, setmyID] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myContacts, setMyContacts] = useState([]);

    const searchUser = async (username) => {
        setLoading(true);
        if (username !== "") {
            try {
                const res = await axios.get(`${apiUrl}/app/search-user/${username}`);
                setSearchUsers(res.data.users);
            } catch (error) {
                console.log(error);
                alert('Error occurred. Please check the console.');
            }
        } else {
            setSearchUsers([]);
        }
        setLoading(false);
    };

    const fetchContacts = async () => {
        const token = Cookies.get('access_token');
        const res = await axios.get(`${apiUrl}/app/get-contacts/${token}`);
        if (res.data.message === "OK") {
            setMyAvatar(res.data.data.avatarURL);
            setmyName(res.data.data.username);
            setMyContacts(res.data.data.contacts);
            setmyID(res.data.myID);
        }
    };


    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <>
            {isLoading ? (<LinearProgress />) : null}
            <div className="header-container" style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                <div className="profile-pic-container">
                    <img src={myAvatar} width="50px" alt="Profile" />
                </div>
                <div className="my-name-container" style={{ marginLeft: "20px" }}>
                    <Typography variant="h6">{myName}</Typography>
                </div>
            </div>
            <Divider color="white" />
            <div style={{ marginTop: "20px" }}></div>
            <TextField
                onChange={async (e) => {
                    await searchUser(e.target.value);
                }}
                id="standard-basic"
                label="Search Users ..."
                variant="standard"
                fullWidth
            />
            <div style={{ marginTop: "20px" }}></div>
            {loading ? <div style={{ textAlign: "center" }}><CircularProgress /></div> : null}
            {searchUsers ? (
                <>
                    {searchUsers.map((item) => (
                        <Card key={(myID + item._id)} onClick={async () => {
                            setIsLoading(true);
                            const token = Cookies.get('access_token');
                            //add a new contact
                            const res = await axios.post(`${apiUrl}/app/add-contact`, {
                                token: token,
                                contactID: item._id
                            })

                            //updating contact on other end
                            const otherUpdate = await axios.post(`${apiUrl}/app/update-other-contact`, {
                                token: token,
                                contactID: item._id
                            })

                            if (res.data.message == "OK") {
                                if (res.data.message == "OK") {
                                    //create new chat with this user
                                    const Chatres = await axios.post(`${apiUrl}/app/chat/create-new-chat`, {
                                        token: token,
                                        toID: res.data.contactID
                                    });
                                    if (Chatres.data.message == "OK") {
                                        //navigating to respective chat
                                        console.log('/chats/' + (myID + res.data.contactID) + '/' + (res.data.contactID))
                                    }
                                }
                            }



                            setIsLoading(false);


                        }}>
                            <CardActionArea>
                                <CardContent>
                                    <div className="contact-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div className="contact-start">
                                            <div className="profile-pic-container">
                                                <img src={item.avatarURL} width="50px" alt="Profile" />
                                            </div>
                                        </div>
                                        <div className="contact-mid">
                                            <div className="username-container" style={{ fontSize: "large" }}>
                                                {item.username}
                                            </div>
                                            <div className="last-message-container">
                                                This is the last message
                                            </div>
                                        </div>
                                        <div className="contact-end">
                                            <div className="present-status">
                                                <CircleIcon fontSize="small" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    ))}

                </>
            ) : null}


            {myContacts.length > 0 ? (
                <>
                    {myContacts.map((item) => (
                        <Card key={(myID + item._id)} onClick={() => {
                            console.log(myID, item._id)
                            console.log('/chats/' + (myID + item.contactID) + '/' + (item.contactID))
                        }}>
                            <CardActionArea>
                                <CardContent>
                                    <div className="contact-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div className="contact-start">
                                            <div className="profile-pic-container">
                                                <img src={item.userAvatarURL
                                                } width="50px" alt="Profile" />
                                            </div>
                                        </div>
                                        <div className="contact-mid">
                                            <div className="username-container" style={{ fontSize: "large" }}>
                                                {item.username}
                                            </div>
                                            <div className="last-message-container">
                                                This is the last message
                                            </div>
                                        </div>
                                        <div className="contact-end">
                                            <div className="present-status">
                                                <CircleIcon fontSize="small" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </>
            ) : null}
        </>
    );
}

export default Contact;
