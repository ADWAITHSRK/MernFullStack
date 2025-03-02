import { Layout } from "antd"
import { FaCopyright } from "react-icons/fa"
import "./Footer.css"
const Footer = () => {
    const currentYear = new Date().getFullYear()
    
  return (
    <Layout.Footer className="border-y-gray-900 text-white p-4 mt-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center">
            <span className="font-bold text-lg mr-2">ProShop</span>
            <span className="text-sm mx-2"><FaCopyright/></span>
            <span className="text-sm">{currentYear}All Rights Reserved</span>
        </div>
      </div>
    </Layout.Footer>
  )
}

export default Footer