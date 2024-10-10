import SettingStructure from '../../Components/SettingStructure/SettingStructure'
import { Outlet } from "react-router-dom"

export default function SettingsGeneralPages() {
    let navbar = [
        {path: "store-details", name:"Store Details"},
        {path: "social-media", name:"Social media"},
        {path: "address", name:"Address"},
    ]
  return (
        <SettingStructure navbar={navbar}>
          <Outlet/>
        </SettingStructure>
  )
}
