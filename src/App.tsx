import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeaderboardPage from './pages/Leaderboard';
import TypingTestPage from './pages/TypingTest';
import Account from './pages/Account';
import ProfilePage from './pages/Profile';
import Thread from './pages/Thread';
import { useAuth } from './contexts/AuthContext';
import { LoginReminder } from './components/LoginReminder';
import RicePurityTest from './pages/RicePurityTest';
import RicePuritySub from './pages/RicePuritySub';

function App() {
  const {profile} = useAuth()
  return (
    <>
      {!profile &&
      <LoginReminder/>
      
      }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TypingTestPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/account" element={<Account/>} />
          <Route path="/profile/:account" element={<ProfilePage/>} />
          <Route path="/community/thread" element={<Thread/>} />
          <Route path="/rice-purity-test" element={<RicePurityTest/>} />
          <Route path="/rice-purity" element={<RicePuritySub/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;