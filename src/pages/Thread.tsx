import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import FeedsMenu from '../components/FeedsMenu';
import { Header } from '../components/Header';
import { http } from '../helpers/utils';


// Mock data
const mockPosts = [
  {
    id: '1',
    title: 'Just hit 150 WPM! 🚀',
    content: 'After months of practice, I finally reached 150 WPM with 98% accuracy. Here are some tips that helped me improve...',
    author: {
      id: '1',
      username: 'speedtyper',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    createdAt: new Date('2024-03-10T10:00:00'),
    likes: 42,
    tags: ['achievement', 'tips', 'practice'],
    comments: [
      {
        id: '1',
        content: 'Congratulations! That\'s impressive progress!',
        author: {
          id: '2',
          username: 'typemaster',
          avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
        },
        createdAt: new Date('2024-03-10T10:30:00'),
        likes: 12,
      },
    ],
  },
  {
    id: '2',
    title: 'New Personal Best on English 1k',
    content: 'Just completed the English 1k test with my highest score yet! The key was focusing on accuracy first, then gradually building up speed.',
    author: {
      id: '3',
      username: 'keyboardwarrior',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    },
    createdAt: new Date('2024-03-09T15:20:00'),
    likes: 28,
    tags: ['english1k', 'achievement', 'progress'],
    comments: [],
  },
  {
    id: '2',
    title: 'New Personal Best on English 1k',
    content: 'Just completed the English 1k test with my highest score yet! The key was focusing on accuracy first, then gradually building up speed.',
    author: {
      id: '3',
      username: 'keyboardwarrior',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    },
    createdAt: new Date('2024-03-09T15:20:00'),
    likes: 28,
    tags: ['english1k', 'achievement', 'progress'],
    comments: [],
  },
  {
    id: '2',
    title: 'New Personal Best on English 1k',
    content: 'Just completed the English 1k test with my highest score yet! The key was focusing on accuracy first, then gradually building up speed.',
    author: {
      id: '3',
      username: 'keyboardwarrior',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    },
    createdAt: new Date('2024-03-09T15:20:00'),
    likes: 28,
    tags: ['english1k', 'achievement', 'progress'],
    comments: [],
  },
];

function Thread() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        http.get('/posts')
        .then(resp=>{
            setPosts(resp.data.posts)
        })
    },[])
  return (
    <>
    
    <div className="min-h-screen bg-[#232323] text-white p-4 md:p-8">
      <Header/>
      <div className="max-w-[850px] mx-auto mt-4">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare size={32} className="text-[#e2b714]" />
          <h1 className="text-2xl font-bold">MonkeyType Community</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CreatePost setPosts = {setPosts}/>
            <div className="space-y-6">
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          </div>
          
          <div className="order-first lg:order-last">
            <div className="sticky top-8">
              <FeedsMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Thread;