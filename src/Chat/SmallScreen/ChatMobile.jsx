import { Divider, Typography, TextField, IconButton, Card, CardContent } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { io } from "socket.io-client";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import apiUrl from '../../apiURL';
import axios from 'axios';

const socket = io('http://localhost:5500')


function ChatMobile() {

    const { id } = useParams();

    useEffect(async () => {
        const token = Cookies.get('access_token');
        const decodedToken = await axios.get(`${apiUrl}/token-id/${token}`);
        socket.emit('add-user', {
            socketID: socket.id,
            mongoID: decodedToken.data.decodedToken.id
        });

        socket.emit('connect-personal', {
            mongoID: '64aa74e81cc043c81278a2c6'
        })


    }, [])

    socket.on('connect-personal-callback', data => {
        console.log(data)
    })
    return (
        <>
            <div className="header" style={{ "display": "flex", "alignItems": "center", "marginTop": "5px" }}>
                <div className="profile-picture-container">
                    <img width={"50px"} src={`https://api.multiavatar.com/MD Samiul Islam.svg?apikey=Ep1hDx95XQR26B`} />
                </div>
                <div className="username-details-container" style={{ "marginLeft": "15px" }}>
                    <div className="username">
                        <Typography variant='h6'>Username</Typography>
                    </div>
                    <div className="presence">
                        Online
                    </div>
                </div>
            </div>
            <Divider style={{ "marginTop": "10px" }} color="white" />
            <div className="body" style={{ overflow: "auto", "height": "73vh" }}>
                <div className="incoming-chat" style={{ "paddingTop": "10px", "paddingBottom": "10px" }}>
                    <Card style={{ width: "fit-content" }}>
                        <CardContent>
                            <div className="content-container" style={{ "fontSize": "18px" }}>Incoming Chat</div>
                            <div className="timestamp-container" style={{ fontSize: "small" }}>1:24 pm</div>
                        </CardContent>
                    </Card>

                </div>
                <div className="outgoing-chat" style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Card style={{ width: "fit-content" }}>
                        <CardContent>
                            <div className="content-container" style={{ "fontSize": "18px" }}>Outgoing Chat</div>
                            <div className="info-container" style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between" }}>
                                <div className="timestamp-container" style={{ fontSize: "small" }}>1:29 pm</div>
                                <div className="seen-status"><DoneAllIcon /></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
            <div className="footer" style={{ display: "flex", alignItems: "center", position: "fixed", bottom: "0", left: "0", width: "100%", padding: "10px" }}>
                <TextField id="standard-basic" label="Type your message here..." variant="outlined" fullWidth />
                <IconButton onClick={() => {
                    //sending an event
                }}>
                    <SendIcon />
                </IconButton>
            </div>
        </>
    )
}

export default ChatMobile