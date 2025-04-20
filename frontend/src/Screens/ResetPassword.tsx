import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient"; // adjust the path if needed

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Supabase sets the session from the access_token in URL hash
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        supabase.auth.getSessionFromUrl({ storeSession: true });
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert("Error resetting password: " + error.message);
    } else {
      setSubmitted(true);
      setTimeout(() => navigate("/login"), 2000); // redirect to login
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Your Password</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Set New Password</button>
        </form>
      ) : (
        <p>Password reset successfully! Redirecting to login...</p>
      )}
    </div>
  );
}

export default ResetPassword;
