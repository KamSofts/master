import { Link, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import User from "./User";
import BooksNew from "./BooksNew";
import BooksOld from "./BooksOld";
import Login from "./Login";

export const linkList = <>
    <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/user/1">User 1</Link></li>
        <li><Link to="/user/2">User 2</Link></li>
        <li><Link to="/books/new">Books NEW</Link></li>
        <li><Link to="/books/old">Books OLD</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>
</>;

export const routeList = <>
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/user/:id" element={<User />} />
    <Route path="/books">
        <Route path="new" element={<BooksNew />} />
        <Route path="old" element={<BooksOld />} />
    </Route>
    <Route path="/login" element={<Login />} />
</>;