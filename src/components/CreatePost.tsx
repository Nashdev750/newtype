import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';
import Modal from './Modal';
import { http } from '../helpers/utils';

export default function CreatePost({setPosts}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = { title, content, tags: tags.split(',')?.map(tag => tag.trim())?.filter(t=>t!="") }
    http.post('/posts', data)
    .then(resp=>{
        setPosts(prev=>[resp.data.post,...prev])
        setIsModalOpen(false);
    }).catch(err=>{
        setIsModalOpen(false);
    });

    setIsModalOpen(false);
    // Reset form
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-[#2c2c2c] rounded-lg p-4 mb-6 shadow-lg border border-[#404040] hover:border-[#525252] transition-colors flex items-center gap-3 text-[#888] hover:text-[#e2b714]"
      >
        <Plus size={20} />
        <span>Create a post...</span>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Post">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#232323] text-white p-3 rounded-lg border border-[#404040] focus:border-[#e2b714] focus:outline-none"
          />
          
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full bg-[#232323] text-white p-3 rounded-lg border border-[#404040] focus:border-[#e2b714] focus:outline-none resize-none"
          />

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-[#232323] text-white p-3 rounded-lg border border-[#404040] focus:border-[#e2b714] focus:outline-none"
          />

          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="flex items-center justify-center gap-2 w-full bg-[#e2b714] hover:bg-[#c69f11] disabled:opacity-50 disabled:hover:bg-[#e2b714] text-black font-medium p-3 rounded-lg transition-colors"
          >
            <Send size={20} />
            Post
          </button>
        </form>
      </Modal>
    </>
  );
}