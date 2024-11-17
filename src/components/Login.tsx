import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginProps {
  onSuccess: (response: any) => void;
}

export default function Login({ onSuccess }: LoginProps) {
  return (
    <div className="min-h-screen bg-base-bg flex items-center justify-center p-4">
      <div className="bg-[#2A2B2D] rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <div className="bg-base-bg/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-200">Welcome Back</h2>
          <p className="text-base-text mt-2 text-[#616669]">Sign in to access your account</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#2A2B2D] text-base-text text-[#616669]">Continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => {
                toast.error('Login failed. Please try again.');
              }}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
}