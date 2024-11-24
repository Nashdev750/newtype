import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  buttonText?: string;
}

export default function CommentForm({ 
  onSubmit,
  onCancel,
  placeholder = "Write a comment...",
  buttonText = "Comment"
}: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-[#232323] text-white p-3 rounded-lg mb-2 border border-[#404040] focus:border-[#e2b714] focus:outline-none resize-none"
        autoFocus
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={!content.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-[#e2b714] hover:bg-[#c69f11] disabled:opacity-50 disabled:hover:bg-[#e2b714] text-black font-medium rounded-lg transition-colors"
        >
          <Send size={16} />
          {buttonText}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-[#404040] hover:bg-[#525252] text-white font-medium rounded-lg transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}