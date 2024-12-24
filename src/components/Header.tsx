import React from 'react';
import { User, BarChart2, Keyboard, MessageSquare, BookOpen, Contact, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  showLeaderboard: boolean;
  onLeaderboardToggle: () => void;
}

export const Header: React.FC = () => {
  const {profile} = useAuth()
  const location = useLocation();
  return (
    <header className="w-full p-4">
      <div className="max-w-[850px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className={`flex items-center gap-2 ${location.pathname == '/'? 'text-[#e2b714]':''}`}>
          <Keyboard className="w-5 h-5" /> 
          <h1 className="text-[#d1d0c5] text-xl font-bold">MonkeyType</h1>
          </Link>
          <Link to="/leaderboard" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location.pathname == '/leaderboard'?'text-[#e2b714]':''}`}>
          <BarChart2 className="w-4 h-4" />
          leaderboard
          </Link>
          <Link to="/community/thread" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location.pathname == '/community/thread'?'text-[#e2b714]':''}`}>
          <MessageSquare className="w-4 h-4" />
          Thread
          </Link>
          <Link to="/privacy-policy" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location.pathname == '/privacy-policy'?'text-[#e2b714]':''}`}>
          <BookOpen className="w-4 h-4"/>
          Terms
          </Link>
          <Link to="/contact" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location.pathname == '/contact'?'text-[#e2b714]':''}`}>
          <Phone className="w-4 h-4"/>
          Contact Us
          </Link>
        </div>
     <Link to="/account" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
     ${location.pathname == '/account'?'text-[#e2b714]':''}`}>
     
        <User className="w-4 h-4" />
        <span>{profile?.user?.nickname ? `${profile.user.nickname.length > 8 ? 
            profile.user.nickname.slice(0, 8) + '...' : 
            profile.user.nickname}` : 'Account'}</span>
     </Link>
      </div>
    </header>
  );
};