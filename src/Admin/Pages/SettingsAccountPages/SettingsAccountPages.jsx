import SettingStructure from '../../Components/SettingStructure/SettingStructure'
import { Outlet } from "react-router-dom"

export default function SettingsAccountPages() {
    let navbar = [
        {path: "profile", name:"Profile"},
        {path: "password", name:"Password"}
    ]
  return (
        <SettingStructure navbar={navbar}>
          <Outlet/>
        </SettingStructure>
  )
}
