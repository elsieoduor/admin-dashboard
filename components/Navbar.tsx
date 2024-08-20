// import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-primary">TechAid</h1>
      <button
        // onClick={() => signOut()}
        className="bg-[#003262] text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
