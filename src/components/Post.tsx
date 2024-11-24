import React, { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Post as PostType } from '../types';
import Comment from './Comment';
import CommentForm from './CommentForm';
import Modal from './Modal';
import { http } from '../helpers/utils';

interface PostProps {
  post: any;
}

function findCommentById(comments, commentId, newreply) {
  for (let i = 0;i < comments.length;i++) {
    if (comments[i]._id === commentId) {
      comments[i].replies = [...comments[i].replies, newreply]
     break
    }
    if (comments[i].replies) {
      findCommentById(comments[i].replies, commentId, newreply);
    }
  }
}

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [localPost, setLocalPost] = useState(post);
  const commentFormRef = useRef<HTMLDivElement>(null);

  const handleComment = (content: string) => {
    const newComment = {
      content
    };

    http.post('/posts/'+post._id+'/comments', newComment)
    .then(res=>{
      setLocalPost((prev) =>{
        return {
          ...prev,
          comments:[...prev.comments, res.data]
        }
      });
      setShowComments(true)
    })

    
    setShowCommentForm(false);
  };

  const handleReply = (commentId: string, content: string) => {
    const newReply = {
      content
    };
    http.post('/posts/'+post._id+'/comments/'+commentId+'/replies',newReply)
    .then(res=>{
      setLocalPost((prev) => {
        let comments = prev.comments
        findCommentById(comments, commentId, res.data)

        return {...prev,comments}
      });
    })
   
  };

  const handleShowCommentForm = (e) => {
    e.stopPropagation()
    setShowCommentForm(true);
    setTimeout(() => {
      commentFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const PostContent = () => (
    <>
      <div className="flex items-center mb-4">
        <img
          src={localPost.author.avatar}
          alt={localPost.author.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="text-[#e2b714] font-medium">{localPost.author.username}</h3>
          <span className="text-[#666] text-sm">
            {formatDistanceToNow(localPost.createdAt)} ago
          </span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">{localPost.title}</h2>
      <p className="text-[#d1d1d1] mb-4">{localPost.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {localPost.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-full text-sm bg-[#3c3c3c] text-[#e2b714]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[#888] border-t border-[#404040] pt-4">
        <button
          onClick={(e) => {setIsLiked(!isLiked);e.stopPropagation()}}
          className={`flex items-center gap-2 hover:text-[#e2b714] transition-colors ${
            isLiked ? 'text-[#e2b714]' : ''
          }`}
        >
          <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          <span>{localPost.likes + (isLiked ? 1 : 0)}</span>
        </button>

        <button
          onClick={(e) => {setShowComments(!showComments);e.stopPropagation()}}
          className="flex items-center gap-2 hover:text-[#e2b714] transition-colors"
        >
          <MessageSquare size={20} />
          <span>{localPost.comments.length}</span>
          {showComments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <button className="flex items-center gap-2 hover:text-[#e2b714] transition-colors">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>

      {(showComments || isModalOpen) && (
        <div className="mt-4 border-t border-[#404040] pt-4">
          {!showCommentForm && (
            <button
              onClick={handleShowCommentForm}
              className="w-full text-left text-[#888] hover:text-[#e2b714] transition-colors mb-4"
            >
              Add a comment...
            </button>
          )}
          <div ref={commentFormRef}>
            {showCommentForm && (
              <CommentForm 
                onSubmit={handleComment}
                onCancel={() => setShowCommentForm(false)}
              />
            )}
          </div>
          {localPost.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onReply={handleReply} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      <div
        className="bg-[#2c2c2c] rounded-lg p-6 mb-4 shadow-lg border border-[#404040] hover:border-[#525252] transition-colors cursor-pointer"
      >
        <PostContent />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PostContent />
      </Modal>
    </>
  );
}