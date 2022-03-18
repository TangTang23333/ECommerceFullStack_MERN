import Home from "./pages/Home.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import UserList from "./pages/UserList";
import NewUser from "./pages/NewUser";
import User from "./pages/User";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import OrderList from "./pages/OrderList";
import Order from "./pages/Order";
import ShippingList from "./pages/ShippingList";
import Shipping from "./pages/Shipping";
function App() {

  const user = useSelector(state => state.user);
  const currentUser = user?.currentUser;
  const admin = currentUser ? currentUser.isAdmin : false;

  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />


            <Route path="users"  >
              <Route index element={<UserList />} />
              <Route path=":id" element={<User />} />
              <Route path="create" element={<NewUser />} />
            </Route>


            <Route path="products" >
              <Route index element={<ProductList />} />
              <Route path=":id" element={<Product />} />
              <Route path="create" element={<NewProduct />} />
            </Route>


            <Route path="orders" >
              <Route index element={<OrderList />} />
              <Route path=":id" element={<Order />} />
              {/* <Route path="create" element={<NewOrder />} /> */}
            </Route> 

            <Route path="shipping" >
              <Route index element={<ShippingList />} />
              <Route path=":id" element={<Shipping />} />
              {/* <Route path="create" element={<NewOrder />} /> */}
            </Route>

          </Route>

        </Routes>
      </Router>

    </div>)
}


export default App;
