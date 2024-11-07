import React, { useState } from 'react';
import postsData from './PostData.json';
import { v4 as uuidv4 } from 'uuid';

// Define the type for a post
interface Post {
  id: string;
  author: string;
  text: string;
}

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [newPostText, setNewPostText] = useState<string>('');

  // Handler for textarea change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostText(e.target.value);
  };

  // Handler for adding a new post
  const handleAddPost = () => {
    if (newPostText.trim()) {
      const newPost: Post = {
        id: uuidv4(),
        author: 'You', // Placeholder for author
        text: newPostText,
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
    }
  };

  return (
    <div>
      <h1>Blog posts</h1>
      <h2>Create posts</h2>
      
      {/* Input area for new post */}
      <textarea
        placeholder="Message"
        value={newPostText}
        onChange={handleTextChange}
      />
      <button onClick={handleAddPost}>Post blog</button>

      {/* Map through posts and render them */}
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{post.author}</h3>
            <p>{post.text}</p>
            <p>Likes: 0</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
