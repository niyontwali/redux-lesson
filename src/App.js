import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "./redux/features/auth/authSlice";

import './App.css';
import { getBlogs } from './redux/features/blogs/blogsSlice';
import notificationToast from './utils/notifications';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // dispatch
  const dispatch = useDispatch();

  // redux states
  const { message, isSuccess } = useSelector(state => state.auth);
  const { blogs } = useSelector(state => state.blogs);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email, password
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (isSuccess) {
      notificationToast("Successful", "success", "bottomLeft")
      dispatch(reset());
    }

  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);


  return (
    <div >
      <h1>{message}</h1>
      <label htmlFor="">Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="">Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={onSubmit}>Login</button>
      <div className='book-container'>
        {blogs && blogs.map((blog) => (
          <div key={blog.id} className="book-card">
            <img src={`${process.env.REACT_APP_API_KEY }/${blog.image}`} alt={blog.title} className="book-image" />
            <div className="book-details">
              <h3 className="book-title">{blog.title}</h3>
              <p className="book-author">By: {blog.author}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
