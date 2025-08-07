// Web Share API + Clipboard fallback utility
export async function shareLink(
  url,
  { title = document.title, text = '' } = {}
) {
  if (!url) return false;
  
//   console.log("Sharing URL:", url);
//   console.log("Share title:", title);
//   console.log("Share text:", text);

  // Check if Web Share API is available and can share
  if (navigator.share) {
    // console.log("Using Web Share API");
    try {
      const shareData = { title, text, url };
      
      // Check if the data can be shared
      if (navigator.canShare && !navigator.canShare(shareData)) {
        throw new Error("Data cannot be shared");
      }
      
      await navigator.share(shareData);
      return true;
    } catch (error) {
      console.error("Web Share API failed:", error);
      
      // If user cancels the share, don't fall back to clipboard
      if (error.name === 'AbortError') {
        return false;
      }
      
      // Fall back to clipboard for other errors
      try {
        await navigator.clipboard.writeText(url);
        return 'copied';
      } catch (clipboardError) {
        console.error("Clipboard copy failed:", clipboardError);
        return false;
      }
    }
  }

  // Fallback to clipboard copy
  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch (clipboardError) {
    console.error("Clipboard copy failed:", clipboardError);
    
    // Last resort: manual copy for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return 'copied';
    } catch (manualCopyError) {
      console.error("Manual copy failed:", manualCopyError);
      return false;
    }
  }
}
