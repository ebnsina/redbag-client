import Post from './post';

function Posts({ posts, fetchPosts }) {
  return (
    <div>
      {posts.length > 0 &&
        posts?.map((post) => (
          <Post key={post._id} post={post} fetchPosts={fetchPosts} />
        ))}
    </div>
  );
}

export default Posts;
