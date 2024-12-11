import imgtest from "../../../assets/images/doctor1.png";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as React from "react";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateTime from "./DateTime";
import InformationForm from "./InformationForm";
import InformationConfirm from "./InformationConfirm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getListDoctorSchedule, getTimeDoctorSchedule } from "../../../services/scheduleService";
import { getUserById } from "../../../services/userService";
import { getServiceById } from "../../../services/specialtiesService";
import { postCreateBooking } from "../../../services/bookingService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const DoctorInfo = (props) => {

  const { id } = useParams();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.account.id);
  // const userId = "2";
  const serviceId = "1";

  const steps = ["Chọn thời gian", "Kiểm tra thông tin"];
  const [listTime, setListTime] = useState([]);


  const account = {
    name: "John Doe",
    cccd: "1234567890",
    gender: "male",
    phone: "0987654321",
    email: "john.doe@example.com",
  };

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [calendarId, setCalendarId] = useState("");

  const [name, setName] = useState("");
  const [cccd, setCCCD] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameService, setNameService] = useState("");
  const [priceService, setPriceService] = useState(0);

  const [doctorName, setDoctorName] = useState("");
  const [specialtyName, setSpecialtyName] = useState("");


  const fetchServiceInfo = async () => {
    let result = await getServiceById(serviceId);
    if (result.success) {
      setNameService(result.data.name);
      setPriceService(result.data.price);
    }
    else {
      console.log(result.message);
    }
  }

  const fetchScheduleDoctor = async () => {
    let formattedDate = selectedDate.format('YYYY-MM-DD');
    let result = await getTimeDoctorSchedule(id, formattedDate);
    if (result.success && result.data) {
      let schedule = result.data.timeBookings.sort((a, b) => {
        return parseInt(a.time_Id) - parseInt(b.time_Id);
      });
      setListTime(schedule);
    } else {
      setListTime([])
      console.log(result.message);
    }
  }

  const fetchCalendarId = async () => {
    let formattedDate = selectedDate.format('YYYY-MM-DD');
    let result = await getListDoctorSchedule(id, formattedDate);
    if (result.success) {
      let schedule = result.data;
      let findCalendarId = schedule.find((item) => item.time_Id === selectedId);
      setCalendarId(findCalendarId.calendar_Id);
    }
    else {
      console.log(result.message);
    }
  }

  const fetchDoctorInfo = async () => {
    let result = await getUserById(id);
    if (result.success) {
      setDoctorName(result.data.fullName);
      setSpecialtyName(result.data.specialist_Name);
    }
    else {
      console.log(result.message);
    }
  }

  useEffect(() => {
    fetchServiceInfo();
    fetchScheduleDoctor();
    fetchDoctorInfo();
    if (selectedId) {
      fetchCalendarId();
    }
  }, [selectedDate, selectedId]);


  const fetchInfoCustomer = async () => {
    let result = await getUserById(userId);
    if (result.success) {
      setName(result.data.fullName);
      setCCCD(result.data.iD_Number);
      setGender(result.data.gender);
      setPhone(result.data.phone);
      setEmail(result.data.email);
    }
    else {
      console.log(result.message);
    }
  }

  useEffect(() => {
    // setName(account.name);
    // setCCCD(account.cccd);
    // setGender(account.gender);
    // setPhone(account.phone);
    // setEmail(account.email);
    fetchInfoCustomer();
  }, [activeStep]);

  // console.log(selectedTime, selectedDate)

  const handleNext = async () => {
    if (activeStep === 1) {
      let result = await postCreateBooking(calendarId, userId, "Đặt khám tổng quát chuyên khoa");
      if (result.success) {
        toast.success("Đặt khám thành công");
        navigate("/booking-success");
        return;
      }
      else {
        toast.error(result.message);
      }

    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-center gap-8 mt-20">
        <img src={imgtest} className="w-32 h-32 rounded-full" />
        <div className="flex flex-col gap-3 ">
          <div className="text-3xl font-serif font-semibold">
            Bác sĩ : {doctorName ? doctorName : "Không tìm thấy bác sĩ"}
          </div>
          <div className="flex items-center gap-2 text-sm font-light">
            <LocalPharmacyIcon />
            Chuyên khoa : {specialtyName ? specialtyName : "Không tìm thấy bác sĩ"}
          </div>
          {activeStep === 1 || activeStep === 2 ? (
            <div className="flex items-center gap-2 text-sm font-light">
              <CalendarMonthIcon />
              {dayjs(selectedDate).format("DD/MM/YYYY")} - {selectedTime}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="text-2xl font-serif font-semibold my-16">
        {nameService}
      </div>
      <Box
        sx={{
          width: "100%",
          paddingX: "150px",
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 ? (
              <div>
                <DateTime
                  listTime={listTime}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  setSelectedTime={setSelectedTime}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              </div>
            ) : activeStep === 1 ? (
              <div className="flex justify-center">
                <InformationConfirm
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
                  cccd={cccd}
                  setCCCD={setCCCD}
                  email={email}
                  setEmail={setEmail}
                  gender={gender}
                  setGender={setGender}
                  priceService={priceService}
                />
              </div>
            ) : null}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep === 0 ? (
              <></>
            ) : (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  borderRadius: "5px",
                  padding: "10px 20px",
                  backgroundColor: "white",
                  color: "black",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                Quay lại
              </Button>
            )}
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              sx={{
                borderRadius: "5px",
                padding: "10px 20px",
                backgroundColor: "white",
                color: "black",
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              {activeStep === steps.length - 1 ? "Đặt Lịch" : "Tiếp Theo"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
    </div>
  );
};

export default DoctorInfo;
