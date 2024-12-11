import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  putUpdateDoctor,
} from "../../../../services/doctorService";
import { getSpecialties } from "../../../../services/specialtiesService";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UpdateDoctor = (props) => {
  const { open, dataUpdate } = props;

  const handleClose = () => {
    if (reason !== "backdropClick") {
      onClose(event, reason);
    }
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [fullName, setFullName] = useState("");
  const [iD_Number, setID_Number] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [specialistId, setSpecialistId] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [specialtiesList, setSpecialtiesList] = useState([]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const checkPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/[^\d]/g, "");
    let PhonePattern = /^(0|(\+84))9\d{8}$/;
    return PhonePattern.test(phoneNumber);
  };

  useEffect(() => {
    async function fetchSpecialtiesList() {
      let result = await getSpecialties();
      if (result.success) {
        setSpecialtiesList(result.data.data);
        return;
      } else {
        console.log(result.message);
      }
    }
    fetchSpecialtiesList();
  }, [open]);

  const resetData = () => {
    setFullName("");
    setID_Number("");
    setPhone("");
    setEmail("");
    setGender("");
    setBirthday("");
    setUserName("");
    setPassword("");
    setImage("");
    setPreviewImage("");
    props.setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (dataUpdate) {
        setFullName(dataUpdate.fullName);
        setID_Number(dataUpdate.iD_Number);
        setPhone(dataUpdate.phone);
        setEmail(dataUpdate.email);
        setGender(dataUpdate.gender);
        setBirthday(dataUpdate.birthday);
        setUserName(dataUpdate.username);
        setPassword(dataUpdate.password);
        setRoleId(dataUpdate.role_Id);
        setSpecialistId(dataUpdate.specialist_Id);
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
    fetchData();
  }, [dataUpdate, open]);

  const handleSubmitUpdate = async () => {
    if (!fullName) {
      toast.warn("Không được bỏ trống Tên");
      return;
    } else if (!iD_Number) {
      toast.warn("Không được bỏ trống CCCD");
      return;
    } else if (!phone) {
      toast.warn("Không được bỏ trống số điện thoại");
      return;
    } else if (!email) {
      toast.warn("Vui lòng chọn giới email");
      return;
    } else if (!gender) {
      toast.warn("Vui lòng chọn giới tính");
      return;
    } else if (!checkPhoneNumber(phone)) {
      toast.warn("Số điện thoại không hợp lệ");
      return;
    } else if (!birthday) {
      toast.warn("Vui lòng chọn ngày sinh");
      return;
    } else if (!userName) {
      toast.warn("Không được bỏ trống tên đăng nhập");
      return;
    } else if (!password) {
      toast.warn("Không được bỏ trống mật khẩu");
      return;
    }

    let result = await putUpdateDoctor(
      dataUpdate.user_Id,
      fullName,
      email,
      userName,
      password,
      birthday,
      gender,
      phone,
      iD_Number,
      roleId,
      image,
      specialistId,
      true
    );
    if (result.success) {
      toast.success("Cập nhật thông tin bác sĩ thành công");
      props.fetchDoctorList();
      resetData();
    } else {
      toast.error(result.message);
    }
  };

  return (
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
        Chỉnh sửa thông tin bác sĩ {fullName}
      </DialogTitle>
      <DialogContent dividers>
        <div className="mx-10 flex flex-col gap-5">
          <input
            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Họ và Tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            id="specialty"
            name="specialty"
            value={specialistId}
            onChange={(e) => setSpecialistId(e.target.value)}
            className="block custom-select px-8 py-3 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500 rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="" disabled>
              Chuyên Khoa
            </option>
            {specialtiesList && specialtiesList.length > 0 ? (
              specialtiesList.map((specialty) => (
                <option
                  key={specialty.specialist_Id}
                  value={specialty.specialist_Id}
                >
                  {specialty.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Không có chuyên khoa
              </option>
            )}
          </select>
          <input
            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Tên Đăng Nhập"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="" disabled>
                Giới tính
              </option>
              <option value={true}>Nam</option>
              <option value={false}>Nữ</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
              type="text"
              placeholder="CCCD"
              value={iD_Number}
              onChange={(e) => setID_Number(e.target.value)}
            />
          </div>
          <div className="flex item-center text-sm">
            <label className='"form-label label-upload' htmlFor="labelUpload">
              <AddPhotoAlternateIcon
                sx={{
                  fontSize: "30px",
                  color: "deepskyblue",
                  cursor: "pointer",
                }}
              />
              {"Thêm hình ảnh"}
            </label>
            <input
              type="file"
              id="labelUpload"
              hidden
              onChange={(event) => handleUploadImage(event)}
            />
          </div>
          <div className="w-full flex justify-center outline-dotted outline-slate-200">
            {previewImage ? (
              <img src={previewImage} className="w-32 h-32 p-2" />
            ) : (
              <></>
            )}
            {/* <span>Preview Image</span> */}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleSubmitUpdate()}
        >
          Cập nhật
        </Button>
        <Button variant="outlined" color="inherit" onClick={() => resetData()}>
          Đóng
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default UpdateDoctor;
