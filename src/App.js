import './App.css';
import Header from './Pages/Shared/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import Blogs from './Pages/Blogs/Blogs';
import { useEffect, useState } from 'react';
import ShowTools from './Pages/Tools/ShowTools';
import Portfolio from './Pages/Portfolio/Portfolio';
import Purchase from './Pages/Purchase/Purchase';
import MyProfile from './Pages/Dashboard/MyProfile';
import MyReview from './Pages/Dashboard/MyReview';
import MyOrders from './Pages/Dashboard/MyOrders';
import NotFound from './Pages/NotFound/NotFound';
import AllReviews from './Pages/Reviews/AllReviews';
import ManageUsers from './Pages/Dashboard/ManageUsers';
import AddProduct from './Pages/Dashboard/AddProduct';
import RequireAdmin from './Pages/Login/RequireAdmin';
import ManageOrders from './Pages/Dashboard/ManageOrders';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="tools" element={<ShowTools></ShowTools>} />
        <Route path="allReviews" element={<AllReviews></AllReviews>} />
        <Route path="purchase/:toolId" element={<RequireAuth><Purchase /></RequireAuth>} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="blogs" element={blogs.map(blog =>
          <Blogs
            key={blog._id}
            blog={blog}>
          </Blogs>)} />
        <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} >
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="profile" element={<MyProfile></MyProfile>}></Route>
          <Route path="review" element={<MyReview></MyReview>}></Route>
          <Route path="orders" element={<MyOrders></MyOrders>}></Route>
          <Route path="manageOrders" element={<RequireAdmin><ManageOrders></ManageOrders></RequireAdmin>}></Route>
          <Route path="addProduct" element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path="manageUsers" element={<RequireAdmin><ManageUsers></ManageUsers></RequireAdmin>}></Route>
          {/* <Route path="manageProducts" element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
