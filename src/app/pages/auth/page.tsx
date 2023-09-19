import styles from "./auth.module.scss";
export default function AuthComponent() {
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
        <div>
          <h1>Create an Account</h1>
          <h5>
            Already have an account? <span>Sing In</span>
          </h5>
          <p className="mt-[30px]">Username</p>
          <input type="text" />
          <p>Password</p>
          <input type="text" />
          <p>Confirm Password</p>
          <input type="text" />
          <button type="submit">Create Account</button>
        </div>
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
