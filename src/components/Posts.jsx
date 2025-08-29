import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css";
import { Form } from "./Form";
export const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => curPost.id !== id);
        setData(newUpdatedPosts);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
<>
<section className="section-form">
  <Form data={data} setdata={setData}/>
</section>

    <section className="section-post">
      <ul>
        {data.map(({ id, body, title }) => (
          <li key={id}>
            <p>Title: {title}</p>
            <p>Body: {body}</p>
            <button>Edit</button>
            <button className="btn-delete" onClick={() => handleDeletePost(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
    </>
  );
};
