import { Link, Outlet, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

const SellerLayout = () => {
  const { navigate, axios } = useAppContext();

  const [expandPeople, setExpandPeople] = useState(false);
  const [expandWorker, setExpandWorker] = useState(false);
  const [expandVendor, setExpandVendor] = useState(false);
  const [expandDriver, setExpandDriver] = useState(false);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const peopleGroups = [
  {
    title: "Workers 👷‍♂️",
    expand: expandWorker,
    toggle: () => setExpandWorker(!expandWorker),
    icon: assets.worker_group_icon,
    links: [
      { name: "Add Worker", path: "/seller/worker/add", icon: assets.add_icon },
      { name: "Workers List", path: "/seller/worker-list", icon: assets.worker_list_icon },
    ],
  },
  {
    title: "Vendors 🛒",
    expand: expandVendor,
    toggle: () => setExpandVendor(!expandVendor),
    icon: assets.vendor_group_icon,
    links: [
      { name: "Add Vendor", path: "/seller/vendor/add", icon: assets.add_icon },
      { name: "Vendors List", path: "/seller/vendor-list", icon: assets.vendor_list_icon },
    ],
  },
  {
    title: "Drivers 🚚",
    expand: expandDriver,
    toggle: () => setExpandDriver(!expandDriver),
    icon: assets.driver_group_icon,
    links: [
      { name: "Add Driver", path: "/seller/driver/add", icon: assets.add_icon },
      { name: "Drivers List", path: "/seller/driver-list", icon: assets.driver_list_icon },
    ],
  },
];

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/seller">
          <img src={assets.home_logo} alt="Logo" className="cursor-pointer h-11 md:w-38" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm shadow-md transition duration-200 cursor-pointer hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
          {/* Default Links */}
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-green-100 border-green text-green"
                    : "hover:bg-gray-100/90 border-white"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-7 h-7" />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}

          {/* Manage People Section */}
          <div>
            <button
              onClick={() => setExpandPeople(!expandPeople)}
              className="flex items-center py-3 px-4 gap-3 hover:bg-gray-100/90 text-left w-full"
            >
              <img src={assets.manage_people} alt="Manage People" className="w-7 h-7" />
              <p className="md:block hidden">Manage People</p>
              <span className="ml-auto">{expandPeople ? "▲" : "▼"}</span>
            </button>

            {expandPeople && (
              <div className="pl-6 flex flex-col">
                {peopleGroups.map((group) => (
                  <div key={group.title}>
                    <button
                      onClick={group.toggle}
                      className="flex items-center py-2 px-3 gap-2 hover:bg-gray-50 text-left w-full"
                    >
                      
                      <p className="md:block hidden">{group.title}</p>
                      <span className="ml-auto">{group.expand ? "▲" : "▼"}</span>
                    </button>

                    {group.expand && (
                      <div className="pl-6 flex flex-col">
                        {group.links.map((link) => (
                          <NavLink
                            to={link.path}
                            key={link.name}
                            className={({ isActive }) =>
                              `flex items-center py-2 px-3 gap-2 
                              ${
                                isActive
                                  ? "border-r-4 md:border-r-[6px] bg-green-50 border-green text-green"
                                  : "hover:bg-gray-50 border-white"
                              }`
                            }
                          >
                            <img src={link.icon} alt={link.name} className="w-5 h-5" />
                            <p className="md:block hidden text-sm">{link.name}</p>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dashboard comes after Manage People */}
          <NavLink
            to="/seller/dashboard"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 gap-3 
              ${
                isActive
                  ? "border-r-4 md:border-r-[6px] bg-green-100 border-green text-green"
                  : "hover:bg-gray-100/90 border-white"
              }`
            }
          >
            <img src={assets.dashboard_icon} alt="Dashboard" className="w-7 h-7" />
            <p className="md:block hidden">Dashboard</p>
          </NavLink>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
