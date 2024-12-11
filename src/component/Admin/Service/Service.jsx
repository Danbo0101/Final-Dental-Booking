import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
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
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { getServices } from "../../../services/specialtiesService";
import { formatCurrencyVND } from "../../../utils/general";
import CreatService from "./Modal/CreateService";
import ServiceInfo from "./Modal/ServiceInfo";
import UpdateService from "./Modal/UpdateService";
import DeleteService from "./Modal/DeleteService";

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

const Service = (props) => {
  const [listService, setListService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [openCreate, setOpenCreate] = useState(false);

  const [openView, setOpenView] = useState(false);
  const [dataView, setDataView] = useState();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();

  const [openDelete, setOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState();

  useEffect(() => {
    fetchListService();
  }, [currentPage]);

  const fetchListService = async () => {
    let result = await getServices();
    if (result.success) {
      console.log(result.data)
      setListService(result.data);
      return;
    } else {
      console.log(result.message);
    }
  };

  const pageCount = Math.ceil(listService.length / itemsPerPage);
  const currentData = listService.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewService = (data) => {
    setOpenView(true);
    setDataView(data);
  };

  const handleUpdateService = (data) => {
    setOpenUpdate(true);
    setDataUpdate(data);
  };

  const handleDeleteService = (data) => {
    setOpenDelete(true);
    setDataDelete(data);
  };

  return (
    <div className="flex flex-col w-full h-full py-10 px-16">
      <div className="flex justify-between items-center text-2xl font-semibold pb-5">
        Quản lý Dịch Vụ
        <div onClick={() => setOpenCreate(true)}>
          <LocalHospitalOutlinedIcon
            sx={{ fontSize: "30px", color: "limegreen", cursor: "pointer" }}
          />
        </div>
      </div>
      <hr className="my-3 border-t" />

      <div className="pt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Tên Dịch Vụ</StyledTableCell>
                <StyledTableCell align="center">Gía Dịch Vụ</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData &&
                currentData.length > 0 &&
                currentData.map((service, index) => {
                  return (
                    <StyledTableRow
                      key={service.service_Id}
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
                        {service.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formatCurrencyVND(service.price)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          aria-label="info"
                          color="info"
                          onClick={() => handleViewService(service)}
                        >
                          <InfoOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="update"
                          color="warning"
                          onClick={() => handleUpdateService(service)}
                        >
                          <UpdateOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteService(service)}
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

      <CreatService
        open={openCreate}
        setOpen={setOpenCreate}
        fetchListService={fetchListService}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
      />
      <ServiceInfo
        open={openView}
        setOpen={setOpenView}
        dataView={dataView}
        setDataView={setDataView}
      />
      <UpdateService
        open={openUpdate}
        setOpen={setOpenUpdate}
        fetchListService={fetchListService}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
      <DeleteService
        open={openDelete}
        setOpen={setOpenDelete}
        dataDelete={dataDelete}
        setDataDelete={setDataDelete}
        fetchListService={fetchListService}
      />
    </div>
  );
};

export default Service;
