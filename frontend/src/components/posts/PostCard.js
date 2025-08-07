import React, { useState, useEffect } from "react";
import {
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  TrashIcon,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import CommentSection from "./CommentSection";
import useAuth from "../../hooks/useAuth";
import { useSocket } from "../../context/SocketContext";
import postService from "../../services/postService";
import Linkify from "react-linkify";
import AlumniDetailModal from "../directory/AlumniDetailModal";
import { shareLink } from "../../utils/shareLink";

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export default function PostCard({ post, refreshFeed }) {
  const { user: loggedInUser, isAdmin } = useAuth();
  const socket = useSocket();

  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [likes, setLikes] = useState(post.likes || []);
  const [isLiked, setIsLiked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // Sync likes state with post prop
  useEffect(() => {
    setLikes(post.likes || []);
  }, [post.likes]);

  useEffect(() => {
    setIsLiked(likes.includes(loggedInUser?._id));
  }, [likes, loggedInUser?._id]);

  // Socket listeners for real-time like updates
  useEffect(() => {
    if (!socket) return;

    const handleLikeUpdate = (data) => {
      if (data.postId === post._id) {
        setLikes(data.likes);
      }
    };

    socket.on('post_liked', handleLikeUpdate);
    socket.on('post_unliked', handleLikeUpdate);

    return () => {
      socket.off('post_liked', handleLikeUpdate);
      socket.off('post_unliked', handleLikeUpdate);
    };
  }, [socket, post._id]);

  const handleLike = async () => {
    if (likeLoading) return;
    
    setLikeLoading(true);
    const originalLikes = [...likes];
    const newLikes = isLiked
      ? likes.filter((id) => id !== loggedInUser._id)
      : [...likes, loggedInUser._id];

    setLikes(newLikes); 

    try {
      const res = await postService.likePost(post._id);
      setLikes(res.data.data);
    } catch {
      toast.error("Failed to update like.");
      setLikes(originalLikes);
    } finally {
      setLikeLoading(false);
    }
  };

  const MAX_LENGTH = 400;
  const isLongPost = post.content.length > MAX_LENGTH;
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const canDelete = isAdmin || loggedInUser?._id === post.user?._id;
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.deletePost(post._id);
        toast.success("Post deleted.");
        refreshFeed();
      } catch {
        toast.error("Failed to delete post.");
      }
    }
  };

  const handleShare = async () => {
    if (isSharing) return; 
    
    setIsSharing(true);
    
    try {
      const result = await shareLink(
        `${window.location.origin}/posts/${post._id}`,
        {
          title: post.title.slice(0, 50) + (post.title.length > 50 ? "…" : ""),
          text: post.content.slice(0, 120) + (isLongPost ? "…" : ""),
        }
      );
      
      // console.log("Share result:", result);

      if (result === true) {
        toast.success("Shared successfully!");
      } else if (result === "copied") {
        toast.success("Link copied to clipboard!");
      } else {
        toast.error("Could not share. Please try again.");
      }
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Could not share. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  /* -------------------- Helpers -------------------- */
  const profileImageUrl = post.user.profilePicture?.startsWith("http")
    ? post.user.profilePicture
    : post.user.profilePicture && post.user.profilePicture !== "no-photo.jpg"
    ? `${API_URL}${post.user.profilePicture}`
    : `https://ui-avatars.com/api/?name=${post.user.fullName}&background=8344AD&color=fff`;

  /* ================================================= */
  return (
    <div className="bg-surface rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-xl border border-primary/10">
      {/* ================= HEADER ================= */}
      <div className="p-3 sm:p-4 lg:p-5">
        <div className="flex flex-wrap items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Avatar + name */}
          <button
            onClick={() => setSelectedUser(post.user)}
            className="flex items-start hover:opacity-90 flex-shrink-0"
          >
            <img
              src={profileImageUrl}
              alt={post.user.fullName}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-secondary/20"
            />
            <div className="ml-2 sm:ml-3 text-left min-w-0 flex-1">
              <p className="font-bold text-on-surface text-sm sm:text-base truncate">
                {post.user?.fullName}
              </p>
              <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted">
                <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                {post.user.role === "admin" && (
                  <span className="bg-secondary/20 text-secondary-dark px-1.5 sm:px-2 py-0.5 rounded-full text-xs flex-shrink-0">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Right-side actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <span className="bg-primary/10 text-primary text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full truncate max-w-20 sm:max-w-24">
              {post.category}
            </span>

            {canDelete && (
              <button
                onClick={handleDelete}
                title="Delete Post"
                className="p-1.5 sm:p-2 rounded-full text-muted hover:text-red-500 hover:bg-red-50 transition"
              >
                <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="space-y-3 sm:space-y-4">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-on-surface leading-tight">
            {post.title}
          </h3>

          {/* Content */}
          <div className="text-sm sm:text-base text-muted leading-relaxed whitespace-pre-wrap">
            <Linkify
              componentDecorator={(href, text, key) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold break-words"
                >
                  {text}
                </a>
              )}
            >
              {isLongPost && !isExpanded
                ? `${post.content.substring(0, MAX_LENGTH)}…`
                : post.content}
            </Linkify>
          </div>

          {isLongPost && (
            <button
              onClick={toggleExpanded}
              className="mt-2 text-sm text-primary font-semibold hover:underline"
            >
              {isExpanded ? "Show Less" : "Show More…"}
            </button>
          )}

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center gap-1.5 sm:gap-2 text-sm transition-colors ${
                  isLiked
                    ? "text-red-500"
                    : "text-muted hover:text-red-500"
                }`}
              >
                <HeartIconSolid className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  isLiked ? "fill-current" : ""
                }`} />
                <span className="hidden sm:inline">
                  {likes.length || 0} {likes.length === 1 ? "like" : "likes"}
                </span>
                <span className="sm:hidden">{likes.length || 0}</span>
              </button>

              {/* Comment Button */}
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1.5 sm:gap-2 text-sm text-muted hover:text-primary transition-colors"
              >
                <ChatBubbleOvalLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">
                  {post.comments?.length || 0} {post.comments?.length === 1 ? "comment" : "comments"}
                </span>
                <span className="sm:hidden">{post.comments?.length || 0}</span>
              </button>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              disabled={isSharing}
              className={`flex items-center gap-1.5 sm:gap-2 text-sm text-muted hover:text-primary transition-colors ${
                isSharing ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{isSharing ? "Sharing..." : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= COMMENTS SECTION ================= */}
      {showComments && (
        <CommentSection
          postId={post._id}
          comments={post.comments}
          onCommentPosted={refreshFeed}
        />
      )}

      {selectedUser && (
        <AlumniDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
