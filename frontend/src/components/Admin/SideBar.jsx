import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUser, FaClipboardList, FaEdit } from "react-icons/fa";
import { MdInventory } from "react-icons/md";

function Sidebar() {
  return (
    <div>
      <div
        className="fixed mt-5 hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
      >
        <div className="px-6">
          <Link
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
            to="/"
            aria-label="Brand"
          >
            Brand
          </Link>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                to="/adminSide/dashboard"
              >
                <AiFillHome size={24} /> Dashboard
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                to="/adminside/userInfo"
              >
                <FaUser size={24} /> User
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                to="/adminside/manage-items"
              >
                <MdInventory size={24} /> Manage Items
              </Link>
            </li>
            <li className="mt-5">
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                to="/adminside/manage-orders"
              >
                <FaClipboardList size={24} /> Manage Orders
              </Link>
            </li>
            <li className="mt-5">
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                to="/adminside/EditItems"
              >
                <FaEdit size={24} /> Edit items
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
