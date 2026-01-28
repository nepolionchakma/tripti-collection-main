import React, { useState } from "react";
import { IUser } from "../../types/Types";

// Define the Comment interface
export interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentsProps {
  currentUser: IUser | null;
  productId?: string; // Optional since it's not used in the component
  initialComments?: Comment[];
}

const Comments: React.FC<CommentsProps> = ({
  currentUser,
  productId,
  initialComments = [],
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Handle adding a new comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: currentUser.id.toString(),
        name: `${currentUser.first_name} ${currentUser.last_name}`,
        avatar: currentUser.picture,
      },
      text: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
    // Here you would typically call an API to save the comment
  };

  // Handle adding a reply to a comment
  const handleAddReply = (commentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentUser || !replyingTo) return;

    const reply: Comment = {
      id: Date.now().toString(),
      user: {
        id: currentUser.id.toString(),
        name: `${currentUser.first_name} ${currentUser.last_name}`,
        avatar: currentUser.picture,
      },
      text: replyText,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    setReplyText("");
    // Here you would typically call an API to save the reply
  };

  // Toggle like on a comment
  const toggleLike = (
    commentId: string,
    isReply = false,
    parentId?: string,
  ) => {
    if (isReply && parentId) {
      // Handle reply likes
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId && comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    isLiked: !reply.isLiked,
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        }),
      );
    } else {
      // Handle main comment likes
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            };
          }
          return comment;
        }),
      );
    }
    // Here you would typically call an API to update the like status
  };

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Render a single comment or reply
  const renderComment = (
    comment: Comment,
    isReply = false,
    parentId?: string,
  ) => (
    <div
      key={comment.id}
      className={`mb-4 ${isReply ? "ml-8 mt-2 pl-4 border-l-2 border-gray-200" : ""}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={comment.user.avatar || "/default-avatar.png"}
            alt={comment.user.name}
          />
        </div>
        <div className="flex-1">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">{comment.user.name}</h4>
              <span className="text-xs text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="mt-1 text-gray-700 text-sm">{comment.text}</p>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <button
                onClick={() => toggleLike(comment.id, isReply, parentId)}
                className={`flex items-center mr-4 ${comment.isLiked ? "text-red-500" : ""}`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                {comment.likes > 0 && <span>{comment.likes}</span>}
              </button>
              {!isReply && (
                <button
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                  className="flex items-center hover:text-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Reply
                </button>
              )}
            </div>
          </div>

          {/* Reply form */}
          {replyingTo === comment.id && !isReply && (
            <form
              onSubmit={(e) => handleAddReply(comment.id, e)}
              className="mt-2"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                >
                  Post
                </button>
              </div>
            </form>
          )}

          {/* Render replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map((reply) =>
                renderComment(reply, true, comment.id),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment form */}
      {currentUser ? (
        <form onSubmit={handleAddComment} className="mb-8">
          <div className="flex items-start">
            <img
              className="h-10 w-10 rounded-full object-cover mr-3"
              src={currentUser.picture || "/default-avatar.png"}
              alt={currentUser.first_name}
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-blue-50 rounded-md text-blue-700">
          <p>
            Please{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              sign in
            </a>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <p className="text-gray-500 text-center py-6">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Comments;
