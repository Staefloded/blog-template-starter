import { Link, Outlet } from "react-router-dom";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },

  {
    name: "News",
    path: "/news",
  },
];

const Layout = () => {
  return (
    <div>
      <div className="bg-gray-500 w-full h-56 flex flex-col">
        <nav className="md:container px-5 py-5 flex items-center justify-between flex-col space-y-3 md:flex-row mx-auto md:space-x-5">
          <Link to="/" className="text-gray-100 text-3xl font-extrabold">
            DEV.Blog
          </Link>
          <ul className="flex justify-end items-center space-x-4">
            {links.map((link) => (
              <li key={link.name} className="text-white font-sem-bold text-lg">
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-3xl text-center mt-10 font-bold text-gray-100">My News Site</div>
      </div>
      <div className="container mx-auto w-full px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
