import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, realTimeDataBase } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (fullName.trim().length < 3) {
      alert("Full name must be at least 3 characters long.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      alert("Phone number must be numeric and between 10 to 15 digits.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const userData = { uid, email, fullName, phone, createdAt: new Date() };

      await set(ref(realTimeDataBase, `users/${uid}`), userData);

      dispatch(loginSuccess(userData));
      navigate("/dashboard");
    } catch (error) {
      alert("Error: " + error.code);
    }
  };

  return (
    <div>
      <h2 className="pagetitle">Sign Up</h2>
      <form onSubmit={handleSignup} className="Log-sign-form">
        <label>Full Name </label>
        <input
          type="text"
          placeholder="Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <br />
        <label>Phone Number </label>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
