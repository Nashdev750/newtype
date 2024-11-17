import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';



export default function NicknameSetup({ handleLogin, user }: any) {
  const [nickname, setNickname] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true)
    await handleLogin({nickname,...user})
    setIsChecking(false)
  };

  return (
    <div className="min-h-screen bg-base-bg flex items-center justify-center p-4">
      <div className="bg-[#2A2B2D] rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-800">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Choose Your Nickname</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-base-text mb-1 text-[#616669]">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 bg-base-bg border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-950"
              placeholder="Enter your unique nickname"
              required
              minLength={3}
              maxLength={20}
            />
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isChecking}
            className="w-full bg-blue-600 text-gray-200 py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center disabled:opacity-50"
          >
            {isChecking ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Checking availability...
              </>
            ) : (
              'Set Nickname'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}