import Sidebar, { SidebarItem } from '../Admin/SideBar';
import { Outlet } from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const HomeDoctor = () => {
    return (
        <div className="flex">
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<CalendarMonthOutlinedIcon size={20} />} text="Lịch làm việc của bác sĩ" to='/doctor' />
                    <SidebarItem icon={<PersonOutlineOutlinedIcon size={20} />} text="Thông tin bệnh nhân" to='patients' />
                    <hr className="my-3 border-t-2" />
                    {/* <SidebarItem icon={<AccountBoxOutlinedIcon size={16} />} text="Profile" to='profile-admin' />
                    <SidebarItem icon={<VpnKeyOutlinedIcon size={16} />} text="Change Password" to="change-password" /> */}
                </Sidebar>
            </div>
            <Outlet />
        </div>
    )
}

export default HomeDoctor;