import { FaShoppingCart, FaUser, FaTimes } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import "./Header.css";
import { Button, Badge } from "antd";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3); // Example cart items count

  return (
    <nav className="sticky px-20 py-4 top-0 z-50 flex items-center justify-between  p-4 bg-zinc-600 border-b border-gray-500 shadow-sm ">
      <div className="text-2xl font-bold text-gray-950 md:text-fuchsia-50 z-[51]">ProShop</div>

      <div className="hidden md:flex items-center gap-4 z-[51]">
        <Badge
          count={cartItems}
          style={{ backgroundColor: "Dim Gray Gray" }}
          className="mr-2"
        >
          <Button
            style={{
              backgroundColor: "Dim Gray Gray",
              color :"Black",
              height: "38px",
              borderRadius: "20px",
            }}
            className="flex items-center py-6 hover:bg-[#ff4500] transition-colors rounded-2xl"
          >
            <FaShoppingCart className="text-lg mr-2" />
            Cart
          </Button>
        </Badge>

        <Button
          style={{
            backgroundColor: "Dim Gray Gray",
            color :"Black",
            height: "38px",
            borderRadius: "20px",

          }}
          className="flex items-center py-6 hover:bg-[#ff4500] transition-colors rounded-2xl"
        >
          <FaUser className="text-lg mr-2" />
          Sign In
        </Button>
      </div>

      {/* Mobile Menu Toggle with higher z-index */}
      <div className="md:hidden z-[51]">
        <Button
          type="text"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          icon={<HiMenu className="w-6 h-6 text-[Dim Gray Gray]" />}
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-teal-50 bg-opacity-50 z-50">
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-2xl p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="text-xl font-bold text-black"> <h1 className="text-xl font-bold text-black">ProShop</h1></div>
              <FaTimes
                className="text-[Dim Gray Gray] cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                block
                style={{
                  backgroundColor: "Dim Gray Gray",
                  color :"Black",
                  height: "38px",
                }}
                className="flex items-center justify-start hover:bg-[#ff4500] py-3 px-4 rounded-lg"
                icon={<FaShoppingCart className="text-lg mr-3" />}
              >
                Cart <span className="ml-2">({cartItems})</span>
              </Button>

              <Button
                block
                style={{
                  backgroundColor: "Dim Gray Gray",
                  color :"Black",
                  height: "38px",
                }}
                className="flex items-center justify-start hover:bg-[#ff4500] py-3 px-4 rounded-lg"
                icon={<FaUser className="text-lg mr-3" />}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
