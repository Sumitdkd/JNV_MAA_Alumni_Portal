import React, { useState } from "react";
import postService from "../../services/postService";
import toast from "react-hot-toast";

export default function PostForm({ onPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "News Update",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await postService.createPost(formData);
      toast.success("Post created successfully!");
      setFormData({ title: "", content: "", category: "News Update" });
      
      // Call the callback to refresh the feed
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <input
            name="title"
            placeholder="What's your post title?"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-primary/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm sm:text-base"
          />
        </div>
        
        <div>
          <textarea
            name="content"
            placeholder="Share your thoughts with the community..."
            rows="3"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-primary/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="flex-1 sm:flex-none px-2 sm:px-3 pr-8 sm:pr-10 py-2 sm:py-2.5 border border-primary/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs sm:text-sm"
          >
            <option value="News Update">📰 News Updates</option>
            <option value="Job Opening">💼 Job Opening</option>
            <option value="Article">📝 Article</option>
            <option value="Event">🎉 Event</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-primary/90 to-primary/80 hover:from-secondary/60 hover:to-secondary/70 hover:shadow-lg hover:text-gray-800 transform hover:scale-105"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="hidden sm:inline">Publishing...</span>
              <span className="sm:hidden">Publishing...</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden sm:inline">Publish Post</span>
              <span className="sm:hidden">Publish</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
