import Input from "./../../components/input";
import Button from "./../../components/button";
import "./style.css";

const LoginPage = () => {
  const goToMainPage = () => {};
  return (
    <div className="content">
      <div className="paper">
        <Input id={1} label="Username" locked={false} active={false} />
        <Input
          id={1}
          label="Password"
          type="password"
          locked={false}
          active={false}
        />
        <Button text="Log in"></Button>
      </div>
    </div>
  );
};

export default LoginPage;
