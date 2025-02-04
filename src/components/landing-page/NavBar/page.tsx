const NavBar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 md:px-16 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">K</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">
          Korode Salon
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 text-gray-800 font-medium">
        <a href="#" className="hover:text-gray-600">
          Home
        </a>
        <a href="#" className="hover:text-gray-600">
          Services
        </a>
        <a href="#" className="hover:text-gray-600">
          Portfolio
        </a>
        <a href="#" className="hover:text-gray-600">
          Contact
        </a>
      </div>

      {/* CTA Button */}
      <div className="flex gap-2 ">
        {" "}
        <button className="px-5 py-2 text-black"> Get Started</button>
        <button className="px-5 py-2 pointer bg-black text-white rounded-lg">
          Log in
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
