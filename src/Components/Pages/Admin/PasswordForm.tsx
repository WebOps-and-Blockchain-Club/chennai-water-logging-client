import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [getData] = useState(false);

  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem("password")) {
      setPassword(localStorage.getItem("password")!);
    }
  }, []);

  return (
    <>
      {getData ? null : (
        <form>
          <label>Enter the Password</label>
          <input
            type="password"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={(e: any) => {
              localStorage.setItem("password", password);
              history.push("/submissions");
            }}
          >
            Get Data
          </button>
        </form>
      )}
    </>
  );
};

export default PasswordForm;
