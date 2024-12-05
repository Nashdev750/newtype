import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import FeedsMenu from '../components/FeedsMenu';
import { Header } from '../components/Header';
import { http } from '../helpers/utils';
import {Helmet} from 'react-helmet'


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
          <Helmet>
                <title>Community Thread | Monkeytype</title>
                <link rel="canonical" href="https://monkeytype.live/community/thread" />
          </Helmet>
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