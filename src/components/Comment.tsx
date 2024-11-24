import React, { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import type { Comment as CommentType } from '../types';
import CommentForm from './CommentForm';

interface CommentProps {
  comment: any;
  onReply: (commentId: string, content: string) => void;
}

export default function Comment({ comment, onReply }: CommentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const replyFormRef = useRef<HTMLDivElement>(null);

  const handleReply = (content: string) => {
    onReply(comment._id, content);
    setShowReplyForm(false);
    setShowReplies(true)
  };

  const handleShowReplyForm = (e) => {
    e.stopPropagation()
    setShowReplyForm(true);
    setShowReplies(true);
    setTimeout(() => {
      replyFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="pl-4 border-l-2 border-[#404040] mb-4 last:mb-0">
      <div className="flex items-center mb-2">
        <img
          src={comment.author.avatar}
          alt={comment.author.username}
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <span className="text-[#e2b714] text-sm font-medium">
            {comment.author.username}
          </span>
          <span className="text-[#666] text-xs ml-2">
            {formatDistanceToNow(comment.createdAt)} ago
          </span>
        </div>
      </div>
      <p className="text-[#d1d1d1] text-sm mb-2">{comment.content}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={(e) =>{setIsLiked(!isLiked);e.stopPropagation()}}
          className={`flex items-center gap-1 text-sm hover:text-[#e2b714] transition-colors ${
            isLiked ? 'text-[#e2b714]' : 'text-[#888]'
          }`}
        >
          <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          <span>{comment.likes + (isLiked ? 1 : 0)}</span>
        </button>
        <button
          onClick={handleShowReplyForm}
          className="flex items-center gap-1 text-sm text-[#888] hover:text-[#e2b714] transition-colors"
        >
          <Reply size={16} />
          <span>Reply</span>
        </button>
        {hasReplies && (
          <button
            onClick={(e) => {setShowReplies(!showReplies);e.stopPropagation()}}
            className="flex items-center gap-1 text-sm text-[#888] hover:text-[#e2b714] transition-colors"
          >
            {showReplies ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span>{comment.replies?.length} replies</span>
          </button>
        )}
      </div>

      <div ref={replyFormRef}>
        {showReplyForm && (
          <div className="mt-2">
            <CommentForm
              onSubmit={handleReply}
              onCancel={() => setShowReplyForm(false)}
              placeholder="Write a reply..."
              buttonText="Reply"
            />
          </div>
        )}
      </div>

      {hasReplies && showReplies && (
        <div className="mt-4">
          {comment.replies?.map((reply) => (
            <Comment key={reply._id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}