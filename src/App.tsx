import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeaderboardPage from './pages/Leaderboard';
import TypingTestPage from './pages/TypingTest';
import Account from './pages/Account';
import ProfilePage from './pages/Profile';
import Thread from './pages/Thread';
import Sitemap from './pages/Sitemap';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TypingTestPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/account" element={<Account/>} />
          <Route path="/profile/:account" element={<ProfilePage/>} />
          <Route path="/community/thread" element={<Thread/>} />
          <Route path="/sitemap" element={<Sitemap/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;