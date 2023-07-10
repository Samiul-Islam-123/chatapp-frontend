import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ChatMobile from "./SmallScreen/ChatMobile";
import ChatPC from "./LargeScreen/ChatPC";
import Contact from './SmallScreen/Contact';

function Chat() {

    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    const checkAuth = () => {
        const token = Cookies.get('access_token');
        if (!token) {
            //not logged in
            //redirecting to login page
            navigate('/auth/login')
        }

        else {
            //check screen width
            const screenWidth = window.innerWidth;
            if (screenWidth < 600) {
                //mobile
                setIsMobile(!isMobile);
            }
        }

    }

    useEffect(() => {
        checkAuth();
    }, [])

    useEffect(() => {
        console.log(isMobile)
    }, [isMobile])

    return (
        <>
            {isMobile ? (<Contact />) : (<ChatPC />)}
        </>
    )
}

export default Chat