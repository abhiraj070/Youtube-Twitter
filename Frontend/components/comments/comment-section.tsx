'use client'

import { useState } from 'react'
import { Heart, Trash2, Reply } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  likes: number
  isLiked: boolean
  timestamp: string
  replies: Comment[]
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: 'Jamie Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jamie',
    content: 'This is absolutely amazing! Love the cinematography.',
    likes: 234,
    isLiked: false,
    timestamp: '2 hours ago',
    replies: [
      {
        id: 2,
        author: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        content: 'I totally agree! The colors are stunning.',
        likes: 45,
        isLiked: false,
        timestamp: '1 hour ago',
        replies: [],
      },
    ],
  },
  {
    id: 3,
    author: 'Alex Rivera',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    content: 'When is the next one coming out?',
    likes: 89,
    isLiked: false,
    timestamp: '30 minutes ago',
    replies: [],
  },
]

interface CommentItemProps {
  comment: Comment
  onLike: (id: number) => void
  onDelete: (id: number) => void
}

function CommentItem({ comment, onLike, onDelete }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true)

  return (
    <div className="py-3 border-b border-border/50">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{comment.author}</p>
              <p className="text-xs text-foreground/50">{comment.timestamp}</p>
            </div>
          </div>

          <p className="text-sm text-foreground mt-1">{comment.content}</p>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => onLike(comment.id)}
              className="cursor-pointer flex items-center gap-1 text-xs text-foreground/50 hover:text-accent transition"
            >
              <Heart size={14} fill={comment.isLiked ? 'currentColor' : 'none'} />
              <span>{comment.likes}</span>
            </button>

            <button className="cursor-pointer text-xs text-foreground/50 hover:text-accent transition flex items-center gap-1">
              <Reply size={14} />
              Reply
            </button>

            <button
              onClick={() => onDelete(comment.id)}
              className="cursor-pointer text-xs text-foreground/50 hover:text-destructive transition ml-auto"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-3 ml-4 border-l-2 border-border/30 pl-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} onLike={onLike} onDelete={onDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CommentSection({ videoId }: { videoId: number }) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Math.max(...comments.map((c) => c.id), 0) + 1,
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
      content: newComment,
      likes: 0,
      isLiked: false,
      timestamp: 'now',
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const handleLike = (id: number) => {
    const newLiked = new Set(likedComments)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLikedComments(newLiked)
  }

  const handleDelete = (id: number) => {
    setComments(comments.filter((c) => c.id !== id))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Comment input */}
      <div className="p-4 border-b border-border sticky top-0 bg-card">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=you" alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              className="cursor-text flex-1 px-3 py-2 bg-muted text-foreground placeholder-foreground/50 rounded border border-input focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
            <button
              onClick={handleAddComment}
              className="cursor-pointer px-4 py-2 bg-accent text-accent-foreground rounded font-semibold text-sm hover:bg-accent/90 transition disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4">
        {comments.length === 0 ? (
          <p className="text-center text-foreground/50 py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
