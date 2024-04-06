export const Registration = () => {
  return (
    <div className="page-container">
      <div className="form">
        <form action="/register" method="post" className="login-form">
          <p className="text"> NJIT Room Search Registration Page</p>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Student Name"
            required
          />
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Student Last Name"
            required
          />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="id"
            id="njit_id"
            name="njit_id"
            placeholder="NJIT ID"
            required
          />
          <input
            type="text"
            id="email_address"
            name="email_address"
            placeholder="Email address"
            required
          />
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            placeholder="Date of Birth"
            required
          />
          <input
            type="number"
            id="phone_number"
            name="phone_number"
            placeholder="Phone Number"
            required
          />
          <button>Create</button>
          <p className="message">
            Already registered? <a href="/login">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};
