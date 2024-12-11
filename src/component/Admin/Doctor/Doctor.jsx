import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import CreateDoctor from "./Modal/CreateDoctor";
import DoctorInfo from "./Modal/DoctorInfo";
import DeleteDoctor from "./Modal/DeleteDoctor";
import UpdateDoctor from "./Modal/UpdateDoctor";
import { getAllUsers, getRole, getUserByRole } from "../../../services/userService";

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

const Doctor = (props) => {
  const [doctorIds, setDoctorIds] = useState("");
  const [listDoctor, setListDoctor] = useState([]);

  const fetchDoctorIds = async () => {
    try {
      const result = await getRole();
      if (result.success) {
        const ids = result.data
          .filter((role) => role.name.toLowerCase() === "doctor")
          .map((role) => role.role_Id);

        setDoctorIds(ids[0]);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchDoctorIds();
  }, [listDoctor]);

  // console.log(doctorIds)

  const fetchDoctorList = async () => {
      let result = await getUserByRole(doctorIds);
      if (result.success) {
        setListDoctor(result.data);
      } else {
        console.log(result.message);
      }
   
  };

  useEffect(() => {
    if (doctorIds) {
      fetchDoctorList();
    }
  }, [doctorIds]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const pageCount = Math.ceil(listDoctor.length / itemsPerPage);
  const currentData = listDoctor.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [openCreate, setOpenCreate] = useState(false);

  const [openView, setOpenView] = useState(false);
  const [dataView, setDataView] = useState();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();

  const [openDelete, setOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState();

  const handleViewDoctor = (data) => {
    setOpenView(true);
    setDataView(data);
  };

  const handleUpdateDoctor = (data) => {
    setOpenUpdate(true);
    setDataUpdate(data);
  };

  const handleDelteDoctor = (data) => {
    setOpenDelete(true);
    setDataDelete(data);
  };

  console.log(doctorIds)
  console.log(listDoctor)

  return (
    <div className="flex flex-col w-full h-full py-10 px-16">
      <div className="flex justify-between items-center text-2xl font-semibold pb-5">
        Quản lý Bác Sĩ
      </div>
      <hr className="my-3 border-t" />
      <div className="pt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Tên</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">SĐT</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData &&
                currentData.length > 0 &&
                currentData.map((doctor, index) => {
                  return (
                    <StyledTableRow
                      key={doctor.id}
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
                        {doctor.fullName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {doctor.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {doctor.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          aria-label="info"
                          color="info"
                          onClick={() => handleViewDoctor(doctor)}
                        >
                          <InfoOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="update"
                          color="warning"
                          onClick={() => handleUpdateDoctor(doctor)}
                        >
                          <UpdateOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDelteDoctor(doctor)}
                        >
                          <DeleteIcon />
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

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 50 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="add-doctor"
          icon={<PersonAddAlt1OutlinedIcon />}
          tooltipTitle="Thêm Bác sĩ"
          onClick={() => setOpenCreate(true)}
        ></SpeedDialAction>
      </SpeedDial>

      <CreateDoctor
        open={openCreate}
        setOpen={setOpenCreate}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        doctorIds={doctorIds}
        fetchDoctorList={fetchDoctorList}
      />

      <DoctorInfo
        open={openView}
        setOpen={setOpenView}
        doctor={dataView}
        setDataView={setDataView}
      />
      <UpdateDoctor
        open={openUpdate}
        setOpen={setOpenUpdate}
        fetchDoctorList={fetchDoctorList}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
      <DeleteDoctor
        open={openDelete}
        setOpen={setOpenDelete}
        dataDelete={dataDelete}
        setDataDelete={setDataDelete}
        fetchDoctorList={fetchDoctorList}
      />
    </div>
  );
};

export default Doctor;
