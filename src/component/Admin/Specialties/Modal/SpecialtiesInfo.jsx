import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TableVirtuoso } from 'react-virtuoso';
import { Paper, Table, TableCell, TableHead, TableBody, TableRow, TableContainer } from '@mui/material';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { postUpdateAssignServices } from "../../../../services/specialtiesService";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const columns = [
  { label: 'ID', dataKey: 'service_Id', width: 100 },
  { label: 'Tên', dataKey: 'service_Name', width: 200 },
  { label: '', dataKey: 'action', width: 130 },
];

const SpecialtiesInfo = (props) => {
  const { open, dataView } = props;

  const handleClose = () => {
    if (reason !== "backdropClick") {
      onClose(event, reason);
    }
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (dataView) {
      console.log(dataView.service_Specialists)
      setRows(dataView.service_Specialists);
    }
  }, [open, dataView]);

  // const rowContent = (index, row) => (
  //   <>
  //     {columns.map((column) => {
  //       if (column.dataKey === "service_Id") {
  //         return (
  //           <TableCell key={column.dataKey} align="center">
  //             {index + 1}
  //           </TableCell>
  //         );
  //       }
  //       if (column.dataKey === "action") {
  //         return (
  //           <TableCell key={column.dataKey} align="center">
  //             <Button
  //               variant="contained"
  //               color="primary"
  //               onClick={() => handleAction(row)}
  //             >
  //               Hành động
  //             </Button>
  //           </TableCell>
  //         );
  //       }
  //       return (
  //         <TableCell key={column.dataKey} align="center">
  //           {row[column.dataKey] || "-"}
  //         </TableCell>
  //       );
  //     })}
  //   </>
  // );

  const rowContent = (index, row) => {
    if (!row) {
      return (
        <TableCell colSpan={columns.length} align="center">
          Không có dữ liệu
        </TableCell>
      );
    }
    return (
      <>
        {columns.map((column) => {
          if (column.dataKey === "service_Id") {
            return (
              <TableCell key={column.dataKey} align="center">
                {index + 1}
              </TableCell>
            );
          }
          if (column.dataKey === "action") {
            return (
              <TableCell key={column.dataKey} align="center">
                <IconButton aria-label="delete" color='error'
                  onClick={() => handleDeleteService(row.service_Id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            );
          }
          return (
            <TableCell key={column.dataKey} align="center">
              {row[column.dataKey] || "-"}
            </TableCell>
          );
        })}
      </>
    );
  }


  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableBody: React.forwardRef((props, ref) => <tbody {...props} ref={ref} />),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="center"
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const resetData = () => {
    props.setDataView("");
    props.setOpen(false);
  };

  const handleDeleteService = async (serviceId) => {
    let result = await postUpdateAssignServices(dataView.specialist_Id, serviceId)
    if (result.success) {
      toast.success("Xoá dịch vụ thành công");
      props.fetchListSpecialties();
      resetData();
      return;
    }
    else {
      toast.error(result.message);
    }
  }

  return (
    <>
      {dataView ? (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }}
            id="customized-dialog-title"
          >
            Thông tin Chuyên Khoa {dataView.name}
          </DialogTitle>
          <DialogContent dividers>
            <div className="mx-10 flex flex-col gap-5">
              <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Tên"
                value={dataView.name}
                disabled
              />
              <textarea
                className="w-full h-20 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                type="text"
                placeholder="Mô tả"
                value={dataView.description}
                disabled
              />
              <div className="w-full flex justify-center">
                <img
                  src={`data:image/jpeg;base64,${dataView.image}`}
                  className="w-52 h-48"
                />
              </div>
            </div>
            <div className="text-lg font-medium my-10 ">
              Danh sách dịch vụ
            </div>
            <Paper style={{ height: 300, width: "100%" }}>
              <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>

          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => resetData()}
            >
              Đóng
            </Button>
          </DialogActions>
        </BootstrapDialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default SpecialtiesInfo;
