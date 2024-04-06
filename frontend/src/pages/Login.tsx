export const Login = () => {
  const handleLoginSubmit = () => {};
  return (
    <div className="page-container">
      <div className="form">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <p className="text"> NJIT Room Search Login Page</p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            type="njit_id"
            id="njit_id"
            name="njit_id"
            placeholder="NJIT ID"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <p className="message">
            Not registered? <a href="/registration">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};
