import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BlogContextProvider } from "./context/BlogContext";

const root = createRoot(document.getElementById('root'));

root.render(
    <AuthContextProvider>
        <BlogContextProvider>
            <App />
        </BlogContextProvider>
    </AuthContextProvider>
);