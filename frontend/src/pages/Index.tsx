import { RabbitTest } from "../components/RabbitTest";

export const Index = () => {
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <p className="text"> NJIT Room Search Landing Page</p>
          <a href="/login">Login</a>
          <a href="/registration">Register</a>
        </form>
      </div>
      <RabbitTest />
    </div>
  );
};
