import SettingStructure from '../../Components/SettingStructure/SettingStructure'
import { Outlet } from "react-router-dom"

export default function SettingsShippingPages() {
    let navbar = [
        {path: "methods", name:"Shipping methods"},
        {path: "new", name:"New method"},
    ]
  return (
        <SettingStructure navbar={navbar}>
          <Outlet/>
        </SettingStructure>
  )
}
