import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import postService from '../services/postService';
import PostCard from '../components/posts/PostCard';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await postService.getPostById(id);
                setPost(res.data.data);
            } catch (error) {
                if (error.response?.status === 404) {
                    toast.error("Post not found. It may have been deleted.");
                } else {
                    toast.error("Could not load the post. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) return <div className="py-20"><Spinner /></div>;
    if (!post) return <div className="text-center py-20 text-muted">Post not found.</div>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <PostCard post={post} refreshFeed={() => { }} />
        </div>
    );
}
