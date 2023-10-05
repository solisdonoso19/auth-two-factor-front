"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./auth.module.scss";
import axios from "axios";
export default function AuthComponent() {
  const router = useRouter();
  // Determinate if the login is success
  const [loginSuccess, setLoginSuccess] = useState(false);
  //show login Form or create form
  const [isLogin, setIsLogin] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [createData, setCreateData] = useState({
    email: "",
    user: "",
    pass: "",
    pass2: "",
  });
  const [otpCode, setOtpCode] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState(0);
  const switchToLogin = (o: boolean) => {
    setIsLogin(o);
  };
  //Logic to create user
  const createAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (createData.pass !== createData.pass2) {
      alert("The password doesn't match");
    } else {
      const params = {
        user: createData.user,
        email: createData.email,
        password: createData.pass,
      };
      axios
        .post("http://3.86.193.14:443/api/create_user/", params, config)
        .then((res) => {
          if (res) {
            setIsLogin(true);
          }
        })
        .catch((r) => console.log(r));
    }
  };

  const onHandleChangeCreate = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreateData({ ...createData, [name]: value });
  };
  //Logic to do the login
  const auth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginData);
    axios
      .post("http://3.86.193.14:443/api/login/", loginData)
      .then((res) => {
        const login = res.data;
        setUserId(login.id);
        if (login.login) {
          setLoginSuccess(true);
        } else {
          alert("El usuario o la contraseña estan mal, intente de nuevo");
        }
      })
      .catch((r) => console.log(r));
  };

  const onHandleChangeAuth = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  // Logic to validate the otp
  const otp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otpCode !== undefined) {
      const param = {
        id: userId,
        otp: otpCode,
      };
      console.log(param);
      axios.post("http://3.86.193.14:443/api/otp/", param).then((res) => {
        console.log(res.data);
        if (res.data.login) {
          router.push("./dashboard");
        } else {
          alert("The Code is wrong");
        }
      });
    } else {
      alert("Field OTP is Empty");
    }
  };

  const onHandleChangeOtp = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setOtpCode(value);
  };
  return (
    <div className={styles.root + " w-full h-screen p-5 grid grid-cols-2"}>
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1510480669382-4e47ca29a6ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          backgroundRepeat: "no-repeat",
          WebkitBackgroundSize: "cover",
          borderRadius: "4px",
        }}
      ></div>
      <div
        className={
          styles.loginContainer +
          " flex flex-col justify-center w-full h-full p-[8rem]"
        }
      >
        {!loginSuccess ? (
          <div>
            {!isLogin ? (
              <form onSubmit={createAccount}>
                <h1>Create an Account</h1>
                <h5>
                  Already have an account?
                  <span>
                    <a
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => switchToLogin(true)}
                    >
                      Sing In
                    </a>
                  </span>
                </h5>
                <p className="mt-[30px]">Email</p>
                <input
                  value={createData.email}
                  onChange={onHandleChangeCreate}
                  name="email"
                  type="email"
                />
                <p>Username</p>
                <input
                  value={createData.user}
                  onChange={onHandleChangeCreate}
                  name="user"
                  type="text"
                />
                <p>Password</p>
                <input
                  value={createData.pass}
                  onChange={onHandleChangeCreate}
                  name="pass"
                  type="password"
                />
                <p>Confirm Password</p>
                <input
                  value={createData.pass2}
                  onChange={onHandleChangeCreate}
                  name="pass2"
                  type="password"
                />
                <button type="submit">Create Account</button>
              </form>
            ) : (
              <form onSubmit={auth}>
                <h1>Login</h1>
                <h5>
                  Don`t have an account?
                  <span>
                    <a
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => switchToLogin(false)}
                    >
                      Sing In
                    </a>
                  </span>
                </h5>
                <p className="mt-[30px]">Username</p>
                <input
                  value={loginData.user}
                  onChange={onHandleChangeAuth}
                  name="user"
                  type="text"
                />
                <p>Password</p>
                <input
                  value={loginData.password}
                  onChange={onHandleChangeAuth}
                  name="password"
                  type="password"
                />
                <button type="submit">Login</button>
              </form>
            )}
          </div>
        ) : (
          <div>
            <form onSubmit={otp}>
              <h1>Auth Two-Factor OTP</h1>
              <h5>We send you an email with a OTP code</h5>
              <p className="mt-[30px]">OTP</p>
              <input
                value={otpCode}
                onChange={onHandleChangeOtp}
                name="OTP"
                type="number"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
      <p
        style={{
          position: "absolute",
          bottom: "25px",
          right: "25px",
          color: "rgb(78,78,78)",
        }}
      >
        Created by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/solisdonoso19/">
          Carlos Ivan Solis Donoso 👨🏻‍💻
        </a>
      </p>
    </div>
  );
}
