
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRole, getUserByRole } from '../../../services/userService';
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRegimenByUserId } from "../../../services/regimen";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import RegimenInfo from './Modal/RegimenInfo';
import UpdateRegimen from './Modal/UpdateRegimen';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#C0C0C0",
        color: theme.palette.common.black,
        fontSize: 15,
        fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const Patient = () => {

    const location = useLocation();
    const { userId } = location.state || {};

    // console.log(userId);

    const [patientOptions, setPatientOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [listRegimen, setListRegimen] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const [openView, setOpenView] = useState(false);
    const [dataView, setDataView] = useState();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();

    const pageCount = Math.ceil(listRegimen.length / itemsPerPage);
    const currentData = listRegimen.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const fetchPatientOptions = async () => {
        let resultRole = await getRole();
        if (resultRole.success) {
            let roles = resultRole.data;
            let userRoleId = roles.find(role => role.name === "user")?.role_Id;
            let reusultPatient = await getUserByRole(userRoleId);
            if (reusultPatient.success) {
                let listPatient = reusultPatient.data.map(user => ({
                    id: user.user_Id,
                    fullName: user.fullName
                }));

                setPatientOptions(listPatient);
            }
            else {
                console.log(reusultPatient.message);
            }
        }
        else {
            console.log(resultRole.message);
        }
    }

    useEffect(() => {
        fetchPatientOptions();
        if (userId) {
            setSelectedUser(userId);
        }
    }, [])

    const fetchRegimenByUser = async () => {
        let result = await getRegimenByUserId(selectedUser);
        if (result.success) {
            setListRegimen(result.data);
            return;
        }
        else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        if (selectedUser) {
            fetchRegimenByUser();
        }
    }, [selectedUser]);

    const handleViewRegimen = (data) => {
        setDataView(data);
        setOpenView(true);
    }

    const handleUpdateRegimen = (data) => {
        setDataUpdate(data);
        setOpenUpdate(true);
    }

    return (
        <div className="flex flex-col w-full h-full py-10 px-16">
            <div className='flex justify-between items-center text-2xl font-semibold pb-5'>
                Thông tin bệnh nhân
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">Chọn bệnh nhân</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-helper"
                        value={selectedUser}
                        onChange={(event) => setSelectedUser(event.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {patientOptions.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.fullName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


            </div>
            <hr className="my-3 border-t" />
            <div className="pt-5">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">ID</StyledTableCell>
                                <StyledTableCell align="center">Tên Liệu Trình</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData &&
                                currentData.length > 0 &&
                                currentData.map((regimen, index) => {
                                    return (
                                        <StyledTableRow
                                            key={regimen.regimen_Id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                                align="center"
                                            >
                                                {index}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {regimen.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton
                                                    aria-label="info"
                                                    color="info"
                                                    onClick={() => handleViewRegimen(regimen)}
                                                >
                                                    <InfoOutlinedIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="update"
                                                    color="warning"
                                                    onClick={() => handleUpdateRegimen(regimen)}
                                                >
                                                    <UpdateOutlinedIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className=" flex items-center justify-center p-8">
                    <Pagination
                        count={pageCount}
                        variant="outlined"
                        color="primary"
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                    />
                </div>
            </div>
            <RegimenInfo
                open={openView}
                setOpen={setOpenView}
                dataView={dataView}
                setDataView={setDataView}
            />
            <UpdateRegimen
                open={openUpdate}
                setOpen={setOpenUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchRegimenByUser={fetchRegimenByUser}
            />
        </div>
    )
}

export default Patient;