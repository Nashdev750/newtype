import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeaderboardPage from './pages/Leaderboard';
import TypingTestPage from './pages/TypingTest';
import Account from './pages/Account';
import ProfilePage from './pages/Profile';
import Thread from './pages/Thread';
import { useAuth } from './contexts/AuthContext';
import { LoginReminder } from './components/LoginReminder';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';

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
          <Route path="/terms" element={<Terms/>} />
          <Route path="/contact" element={<Contact/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;