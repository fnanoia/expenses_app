export const Home = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center ">

      <h2 className="text-3xl font-bold">Welcome to expenses_app!</h2>

      <div >Do not have an account yet?</div>
      <p>
        <a href="/register">Register</a>
      </p>

      <div>Already registered?</div>
      <p>
        <a href="/login">Login</a>
      </p>
    </div>
    </>
  );
};
