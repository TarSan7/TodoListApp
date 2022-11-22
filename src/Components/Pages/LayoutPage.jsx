import React from 'react';
import App from "../App";
import Navigation from "../Navigation";
import AboutPage from "./AboutPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ContactPage from "./ContactPage";
import PostPage from "./PostPage";
import Blog from "./Blog";

export default function LayoutPage() {
    return (
        <Router>
            <div className="todo-app-container">
                <Navigation />
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<App />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<PostPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
