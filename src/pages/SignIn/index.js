import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <main>
        <h2>Welcome to the sign in!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/categories">Categories</Link>
      </nav>
    </div>
  );
};

export default SignIn;
