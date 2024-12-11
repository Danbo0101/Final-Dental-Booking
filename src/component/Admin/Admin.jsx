import Sidebar, { SidebarItem } from './SideBar';
import { Outlet } from "react-router-dom";
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';



const App = () => {
    return (
        <div className="flex">
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<MasksOutlinedIcon size={20} />} text="Quản lý bác sĩ" to='/admin' />
                    <SidebarItem icon={<VaccinesOutlinedIcon size={20} />} text="Quản lý chuyên khoa" to="specialties" />
                    <SidebarItem icon={<MedicalServicesOutlinedIcon size={20} />} text="Quản lý dịch vụ" to="services" /> 
                    <hr className="my-3 border-t-2" />
                    <SidebarItem icon={<SettingsOutlinedIcon size={20} />} text="Settings" >
                        <SidebarItem icon={<AccountBoxOutlinedIcon size={16} />} text="Profile" to='profile-admin' />
                        <SidebarItem icon={<VpnKeyOutlinedIcon size={16} />} text="Change Password" to="change-password" />
                    </SidebarItem>
                </Sidebar>
            </div>
            <Outlet />
        </div>
    );
};

export default App;