import React, { useState, useEffect, useCallback, useRef } from "react";
import useAuth from "../hooks/useAuth";
import postService from "../services/postService";
import userService from "../services/userService";
import PostCard from "../components/posts/PostCard";
import PostForm from "../components/posts/PostForm";
import BirthdayCard from "../components/home/BirthdayCard";
import Spinner from "../components/common/Spinner";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBirthdays, setLoadingBirthdays] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const observer = useRef();
  const isRequestInProgress = useRef(false);
  const lastPostElementRef = useRef();

  const POSTS_PER_PAGE = 10;

  const fetchPosts = useCallback(async (page = 1, shouldRefresh = false) => {
    if (isRequestInProgress.current) return;
    
    isRequestInProgress.current = true;
    setError(null);
    
    if (page === 1) {
      setLoading(shouldRefresh ? false : true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const res = await postService.getPosts(page, POSTS_PER_PAGE);
      const newPosts = res.data.data || res.data || [];
      
      if (page === 1) {
        // First page or refresh - replace all posts
        setPosts(newPosts);
        setCurrentPage(1);
      } else {
        // Subsequent pages - append to existing posts
        setPosts(prevPosts => {
          const existingIds = new Set(prevPosts.map(post => post._id));
          const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post._id));
          return [...prevPosts, ...uniqueNewPosts];
        });
      }
      
      // Update hasMore based on response
      setHasMore(newPosts.length === POSTS_PER_PAGE);
      
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.message || "Failed to load posts");
      
      if (page === 1) {
        toast.error("Could not load posts.");
      } else {
        toast.error("Could not load more posts.");
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isRequestInProgress.current = false;
    }
  }, []);

  const fetchBirthdays = useCallback(async () => {
    setLoadingBirthdays(true);
    try {
      const res = await userService.getTodaysBirthdays();
      setBirthdays(res.data.data || []);
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      toast.error("Could not load birthday information.");
    } finally {
      setLoadingBirthdays(false);
    }
  }, []);

  // Intersection Observer for infinite scroll
  const lastPostElementObserver = useCallback(node => {
    if (loading || loadingMore || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isRequestInProgress.current) {
        setCurrentPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchPosts(nextPage);
          return nextPage;
        });
      }
    }, {
      threshold: 0.1,
      rootMargin: '200px' // Trigger earlier for smoother UX
    });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore, fetchPosts]);

  // Load more posts function for manual button
  const loadMorePosts = useCallback(() => {
    if (!loadingMore && hasMore && !isRequestInProgress.current) {
      setCurrentPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchPosts(nextPage);
        return nextPage;
      });
    }
  }, [loadingMore, hasMore, fetchPosts]);

  useEffect(() => {
    if (user) {
      fetchPosts(1, true);
      fetchBirthdays();
    }
  }, [user, fetchPosts, fetchBirthdays]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const handleDataRefresh = useCallback(() => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setHasMore(true);
    fetchPosts(1, true).finally(() => setIsRefreshing(false));
  }, [fetchPosts]);

  const handlePostCreated = useCallback(() => {
    // Add a small delay to ensure the backend has processed the new post
    setTimeout(() => {
      handleDataRefresh();
    }, 500);
  }, [handleDataRefresh]);

  const dismissBirthday = (userId) => {
    setBirthdays(birthdays.filter((b) => b._id !== userId));
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Birthday Section - Mobile: Full width, Desktop: Sidebar */}
        <div className="w-full lg:w-1/3 order-1 lg:order-2 space-y-3 sm:space-y-4">
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-secondary/20 p-3 sm:p-4 rounded-xl shadow-lg lg:sticky lg:top-24">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🎂</span>
              Happy Birthday!
            </h2>
            {loadingBirthdays ? (
              <div className="flex justify-center py-4 sm:py-6">
                <Spinner />
              </div>
            ) : birthdays.length > 0 ? (
              <div className="space-y-2">
                {birthdays.map((bdayUser) => (
                  <BirthdayCard
                    key={bdayUser._id}
                    user={bdayUser}
                    onDismiss={dismissBirthday}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4 sm:py-6 flex flex-col items-center">
                <span className="text-3xl sm:text-4xl mb-2">🎈</span>
                <p className="text-sm sm:text-base">No birthdays today</p>
              </div>
            )}
          </div>
        </div>

        {/* Posts Section - Mobile: Full width, Desktop: Main content */}
        <div className="w-full lg:w-2/3 order-2 lg:order-1 space-y-4 sm:space-y-6">
          {/* Post Creation Form */}
          <div className="bg-white border border-primary/20 p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">✍️</span>
              Create a Post
            </h2>
            <PostForm onPostCreated={handlePostCreated} />
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center">
            <button
              onClick={handleDataRefresh}
              disabled={isRefreshing}
              className={`inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm font-medium rounded-full text-white transition-all duration-200 ${
                isRefreshing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary/90 to-primary/70 hover:from-secondary/70 hover:to-secondary/70 hover:shadow-lg transform hover:scale-105 hover:text-gray-700"
              }`}
            >
              {isRefreshing ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Refreshing...</span>
                  <span className="sm:hidden">Refresh...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Refresh Feed</span>
                  <span className="sm:hidden">Refresh</span>
                </>
              )}
            </button>
          </div>

          {/* Posts Feed */}
          {loading && posts.length === 0 ? (
            <div className="flex justify-center py-8 sm:py-12">
              <div className="text-center">
                <Spinner className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-500 text-sm sm:text-base">Loading posts...</p>
              </div>
            </div>
          ) : error && posts.length === 0 ? (
            <div className="bg-red-50 border border-red-200 p-6 sm:p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">⚠️</div>
              <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-2">
                Failed to Load Posts
              </h3>
              <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
              <button
                onClick={() => fetchPosts(1, true)}
                className="inline-flex items-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {posts.map((post, index) => (
                      <PostCard key={post._id} post={post} refreshFeed={handleDataRefresh} />  
                  ))}
                  
                  {/* Loading more indicator */}
                  {loadingMore && (
                    <div className="flex justify-center py-6 sm:py-8">
                      <div className="text-center">
                        <Spinner className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2" />
                        <p className="text-gray-500 text-xs sm:text-sm">Loading more posts...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Load More Button - only show if not loading and has more posts */}
                  {!loadingMore && hasMore && posts.length > 0 && (
                    <div className="flex justify-center py-4 sm:py-6">
                      <button
                        onClick={loadMorePosts}
                        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span className="hidden sm:inline">Load More Posts</span>
                        <span className="sm:hidden">Load More</span>
                      </button>
                    </div>
                  )}
                  
                  {/* End of feed indicator */}
                  {!hasMore && !loadingMore && posts.length > 0 && (
                    <div className="text-center py-6 sm:py-8">
                      <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-full mb-3 sm:mb-4">
                        <svg className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm">You've reached the end of the feed</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 sm:p-8 rounded-xl shadow-lg text-center">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📝</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    No Posts Yet
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    The community feed is empty. Be the first to share something!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
