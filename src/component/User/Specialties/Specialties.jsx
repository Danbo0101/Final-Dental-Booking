import AliceCarousel from "react-alice-carousel";
import Button from "@mui/material/Button";
import "react-alice-carousel/lib/alice-carousel.css";
import imgtest from "../../../assets/images/teeth-1.png";
import { useEffect, useState } from "react";
import SpecialtiesDoctor from "./SpecialtiesDoctor";
import { getSpecialties, getSpecialtyById } from "../../../services/specialtiesService";
import { getRole } from "../../../services/userService";
import { getSpecialtiesDoctor } from "../../../services/doctorService";



const ListSpecialties = (props) => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const [specialtiesOption, setSpecialtiesOption] = useState([]);
  const [specialtiesService, setSpecialtiesService] = useState([]);
  const [specialtiesDoctor, setSpecialtiesDoctor] = useState([]);

  const [specialtyId, setSpecialtyId] = useState(null);
  const [doctorId, setDoctorId] = useState("");

  const fetchSpecialties = async () => {
    let result = await getSpecialties();
    if (result.success) {
      setSpecialtiesOption(result.data.data);
      return;
    }
    else { console.log(result.message) }
  }

  const fetchDoctorIds = async () => {
    try {
      const result = await getRole();
      if (result.success) {
        const ids = result.data
          .filter((role) => role.name.toLowerCase() === "doctor")
          .map((role) => role.role_Id);

        setDoctorId(ids[0]);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchSpecialties();
    fetchDoctorIds();
  }, [])



  const specialtyItems = specialtiesOption.map((specialty, index) => (
    <div
      key={index}
      className="item h-96 w-96 flex justify-center items-center cursor-pointer"
      data-value={specialty.specialist_Id}
      onClick={(e) => setSpecialtyId(e.currentTarget.dataset.value)}
    >
      <div className="flex w-4/5 h-60 flex-col justify-center items-center px-8 rounded-2xl bg-white hover:bg-sky-200 drop-shadow-md">
        <div className="flex justify-center items-center w-14 h-14 rounded-full bg-sky-300 drop-shadow">
          <img src={imgtest} alt="icon" className="w-8 h-8" />
        </div>
        <div className="font-serif font-semibold text-xl mt-4">
          {specialty.name}
        </div>
        <div className="text-center font-extralight text-sm mt-2">
          {specialty.description}
        </div>
      </div>
    </div>
  ));

  const fetchSpecialtiesDoctor = async () => {
    let result = await getSpecialtiesDoctor(specialtyId, doctorId);
    if (result.success) {
      setSpecialtiesDoctor(result.data);
      return;
    }
    else { console.log(result.message) }
  }

  const fetchServiceSpecialties = async () => {
    let result = await getSpecialtyById(specialtyId);
    if (result.success) {
      setSpecialtiesService(result.data.data.service_Specialists);
      return;
    }
    else { console.log(result.message) }
  }

  useEffect(() => {
    if (specialtyId && doctorId) {
      fetchSpecialtiesDoctor();
      fetchServiceSpecialties()
    }
  }, [specialtyId])


  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-center font-serif font-bold text-4xl mt-20">
          Chuyên khoa
        </div>
        <div className="w-2/5 text-center font-light text-sm mt-3">
          Hệ thống đặt lịch khám của chúng tôi mang đến cho bạn trải nghiệm tiện
          lợi và chuyên nghiệp, giúp bạn dễ dàng lựa chọn các chuyên khoa phù
          hợp với nhu cầu sức khỏe.
        </div>
      </div>
      <div className="mt-10 mx-36 w-4/5">
        <AliceCarousel
          mouseTracking
          items={specialtyItems}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      </div>
      <hr className="mx-40 border-black-500" />
      <div className="w-full flex justify-center gap-40">
        <Button
          variant="outlined"
          href="#outlined-buttons"
          sx={{
            padding: "10px 30px",
            fontSize: "14px",
            fontFamily: "Roboto Slab, serif",
            fontWeight: "600",
            borderRadius: "10px",
            marginTop: "30px",
            backgroundColor: "#FFFFFF",
            color: "black",
            transform: "scale(0.98)",
            cursor: "default",
          }}
        >
          Danh sách bác sĩ
        </Button>

      </div>
      <SpecialtiesDoctor
        listDoctor={specialtiesDoctor}
      />
    </div>
  );
};

export default ListSpecialties;
