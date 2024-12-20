import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Leaderboard as LeaderboardComponent } from '../components/Leaderboard';
import axios from 'axios';
import { base_url } from '../constants/utils';
import {Helmet} from 'react-helmet'

export default function LeaderboardPage() {
  const [leaders,setLeaders] = useState<any[]>([])
  const getLeaders = ()=>{
      axios.get(base_url+'/leaderboard')
      .then((res:any)=>{
        console.log()
         setLeaders(res.data.leaderboard)
      })
  }
  useEffect(()=>{
    getLeaders()
  },[])
  return (
    <div className="min-h-screen bg-[#323437] text-[#646669] flex flex-col">
         <Helmet>
                <title>Monkeytype | Leaderborad</title>
                <link rel="canonical" href="https://monkeytype.live/leaderboard" />
          </Helmet>
      <Header />
      <main className="flex-1 flex flex-col items-center w-full px-6 mt-4">
        <div className="w-full max-w-[850px] flex flex-col items-center mb-12">
          <LeaderboardComponent leaders = {leaders}/>
        </div>
      </main>
    </div>
  );
} 