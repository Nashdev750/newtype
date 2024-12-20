import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Login from '../components/Login';
import NicknameSetup from '../components/NickNameSetUp';
import Profile from '../components/Profile';
import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { base_url } from '../constants/utils';
import {Helmet} from 'react-helmet'

const Account = ()=>{
    const [ user, setUser ] = useState<any>();
    const { profile, setProfile } = useAuth(); 
    const [loading, setLoading] = useState<boolean>(true)
    const[ auth, setAuth] = useState<boolean>(false)
    const responseMessage = (response:any) => {
        handleLogin(response)
    };
    const errorMessage = () => {
        console.log('error');
    };
    const handleLogin = async (user:any)=>{
        try {
            const response = await axios.post(base_url+'/auth/google', user);
            setProfile(response.data)
            setAuth(true)
            setLoading(false)
          } catch (error) {
            console.error('Error during authentication:', error);
            setAuth(false)
            setLoading(false)
          }
    }
    useEffect(() => {
            if(auth) return
            console.log('user')
            if (profile) {
                handleLogin({credential: profile.user.lastToken})
            }else{
                setLoading(false)
            }
        },[ profile ]);

    if (loading) {
        return <div className="min-h-screen bg-base-bg text-base-text flex items-center justify-center">Loading...</div>;
      }
    if(!auth) return <Login onSuccess={responseMessage}/>
return (
    
    <div className="min-h-screen bg-[#323437] text-[#646669] flex flex-col">
        
         <Helmet>
                <title>Monkeytype | Account</title>
                <link rel="canonical" href="https://monkeytype.live/account" />
          </Helmet>
    <Header/>
    {auth && 
    <Profile/>
    }
    
    </div>

)
}

export default Account