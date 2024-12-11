import { Button } from "@mui/material";
import teethImg from "../../assets/images/teeth-1.png";
import HomePage1 from "../../assets/images/Homepage-1.png";
import HomePage2 from "../../assets/images/Homepage-2.png";
import HomePage3 from "../../assets/images/Homepage-3.png";
import HomePage4 from "../../assets/images/Homepage-4.png";
import video from "../../assets/images/video.mp4";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import DoctorSlide from "./DoctorSlide";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpecialties } from "../../services/specialtiesService";

const HomePage = (props) => {

  const [specialtiesList, setSpecialtiesList] = useState([])

  const fetchSpecialList = async () => {
    let result = await getSpecialties();
    if (result.success) {
      setSpecialtiesList(result.data.data.slice(0, 3));
    } else {
      console.log(result.message);
    }
  }

  useEffect(() => {
    fetchSpecialList()
  }, [])

  console.log(specialtiesList)

  return (
    <div>
      <div className="flex justify-center items-center px-48 mx-10 mt-10 ">
        <div className="w-3/5 flex flex-col gap-4">
          <div className="font-serif text-6xl font-medium">
            Sức khỏe răng miệng của bạn lịch hẹn chỉ cách một chạm!
          </div>
          <div className="w-3/4 font-roboto font-light ">
            Chúng tôi chỉ sử dụng những vật liệu chất lượng cao nhất để mang đến
            sự chăm sóc tốt nhất cho bệnh nhân. Vì vậy, hãy yên tâm và đặt lịch
            hẹn ngay hôm nay
          </div>
          <div className="mt-5 flex gap-16">
            <Button
              variant="outlined"
              href="/specialties"
              sx={{
                color: "white",
                backgroundColor: "#4C99FF",
                padding: "0px 25px",
                fontSize: "14px",
                fontFamily: "Roboto Slab, serif",
                fontWeight: "600",
                borderRadius: "10px",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Đặt lịch ngay
            </Button>
            <div className="flex justify-center items-center gap-3">
              <div className="border-solid w-12 h-12 border rounded-xl border-sky-400 flex justify-center items-center">
                <PhoneInTalkOutlinedIcon
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#E6F6FE",
                    color: "#1376F8",
                    fontSize: "34px",
                    padding: "5px",
                  }}
                />
              </div>
              <div>
                <div className="text-base font-roboto text-blue-500">
                  Dental 24H Emergency
                </div>
                <div className="font-roboto text-sm font-medium">
                  0900-78601
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img className="w-96" src={HomePage1} />
        </div>
      </div>
      <div className="flex justify-center items-center px-24 mx-10 mt-5">
        <div className="flex justify-center items-center w-full gap-12 px-12 rounded-md bg-sky-200 drop-shadow-md">
          {specialtiesList && specialtiesList.length > 2 ?
            specialtiesList.map((specialties, index) => {
              return (
                <div
                  className="flex w-1/3 h-72 flex-col justify-center items-center pt-4 pb-12 px-8 rounded-2xl my-10 bg-white drop-shadow-md"
                >
                  <div className="flex justify-center items-center w-14 h-14 rounded-full bg-sky-300 drop-shadow">
                    <img src={teethImg} className="w-8 h-8" />
                  </div>
                  <div className="font-serif font-semibold text-xl mt-4">
                    {specialties.name}
                  </div>
                  <div className="text-center font-extralight text-sm mt-2">
                    {specialties.description}
                  </div>
                </div>
              )
            })
            :
            <>
              <div className="flex w-1/3 h-72 flex-col justify-center items-center pt-4 pb-12 px-8 rounded-2xl my-10 bg-white drop-shadow-md">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-sky-300 drop-shadow">
                  <img src={teethImg} className="w-8 h-8" />
                </div>
                <div className="font-serif font-semibold text-xl mt-4">
                  Nha khoa tổng quát
                </div>
                <div className="text-center font-extralight text-sm mt-2">
                  Khám, chẩn đoán và điều trị các vấn đề răng miệng cơ bản, đồng
                  thời tư vấn về cách chăm sóc răng miệng
                </div>
              </div>
              <div className="flex w-1/3 h-72 flex-col justify-center items-center pt-4 pb-12 px-8 rounded-2xl my-10 bg-white drop-shadow-md">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-sky-300 drop-shadow">
                  <img src={teethImg} className="w-8 h-8" />
                </div>
                <div className="font-serif font-semibold text-xl mt-4">
                  Nha khoa trẻ em
                </div>
                <div className="text-center font-extralight text-sm mt-2">
                  Khám, điều trị và tư vấn về răng miệng cho trẻ, đồng thời giáo dục
                  trẻ em và phụ huynh về cách chăm sóc răng miệng
                </div>
              </div>
              <div className="flex w-1/3 h-72 flex-col justify-center items-center pt-4 pb-12 px-8 rounded-2xl my-10 bg-white drop-shadow-md">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-sky-300 drop-shadow">
                  <img src={teethImg} className="w-8 h-8" />
                </div>
                <div className="font-serif font-semibold text-xl mt-4">
                  Nha khoa thẩm mỹ
                </div>
                <div className="text-center font-extralight text-sm mt-2">
                  Cung cấp các dịch vụ như tẩy trắng răng, bọc răng sứ và veneer để
                  tạo ra nụ cười hoàn hảo
                </div>
              </div>
            </>
          }

        </div>
      </div>
      <div className="flex gap-5 items-center justify-center px-48 py-10 mx-10 mt-5">
        <div className="w-3/5 ">
          <div className="w-4/5 font-serif font-semibold text-4xl">
            Nha Khoa Tổng Quát: Chăm Sóc Răng Miệng Toàn Diện Cho Mọi Lứa Tuổi
          </div>
          <div className="w-4/5 font-light text-base mt-6">
            Nha khoa tổng quát là nền tảng của sức khỏe răng miệng, với các dịch
            vụ từ kiểm tra định kỳ đến điều trị bệnh lý phổ biến như sâu răng,
            viêm lợi và làm sạch răng.Tại đây, chúng tôi cung cấp những giải
            pháp chăm sóc răng miệng toàn diện, giúp bảo vệ sức khỏe răng miệng
            và ngăn ngừa các vấn đề tiềm ẩn
          </div>
          <div>
            <Button
              variant="outlined"
              href="/specialties"
              sx={{
                color: "white",
                backgroundColor: "#4C99FF",
                padding: "10px 25px",
                fontSize: "14px",
                fontFamily: "Roboto Slab, serif",
                fontWeight: "600",
                borderRadius: "10px",
                marginTop: "30px",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Chi tiết các dịch vụ
            </Button>
          </div>
        </div>
        <div className="w-1/3">
          <img src={HomePage2} className="w-96 rounded-xl" />
        </div>
      </div>
      <div className="flex px-24 mx-10 mt-5">
        <div className="flex justify-center items-center w-full gap-12 rounded-md bg-sky-200 drop-shadow-md">
          <div className="w-2/3 h-full mt-20 ml-20">
            <div className="relative w-48 h-48 left-44">
              <div className="absolute w-96 h-80 bg-gradient-to-r from-blue-100 to-cyan-300 top-0 right-0 rounded-xl"></div>
              <div className="absolute w-96 h-80 top-6 right-6">
                <img src={HomePage3} className=" w-96 h-80 rounded-xl" />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-10 pr-14">
            <div className="w-full font-serif font-semibold text-4xl">
              Nha Khoa Trẻ Em: Khởi Đầu Cho Nụ Cười Khỏe Đẹp Từ Tuổi Thơ
            </div>
            <div className="w-4/5 font-light text-base mt-6">
              Nha khoa trẻ em tập trung vào việc chăm sóc và bảo vệ sức khỏe
              răng miệng cho trẻ ngay từ những năm tháng đầu đời.
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-1 text-sm font-light">
                <GppGoodOutlinedIcon
                  sx={{
                    color: "#008CFF",
                    width: "30px",
                  }}
                />
                Kiểm tra định kỳ
              </div>
              <div className="flex items-center gap-1 text-sm font-light">
                <GppGoodOutlinedIcon
                  sx={{
                    color: "#008CFF",
                    width: "30px",
                  }}
                />
                Phòng ngừa sâu răng
              </div>
              <div className="flex items-center gap-1 text-sm font-light">
                <GppGoodOutlinedIcon
                  sx={{
                    color: "#008CFF",
                    width: "30px",
                  }}
                />
                Điều chỉnh răng miệng
              </div>
              <div className="flex items-center gap-1 text-sm font-light">
                <GppGoodOutlinedIcon
                  sx={{
                    color: "#008CFF",
                    width: "30px",
                  }}
                />
                Đội ngũ bác sĩ thân thiện, giàu kinh nghiệm
              </div>
            </div>
            <div className="mb-10">
              <Button
                variant="outlined"
                href="/specialties"
                sx={{
                  color: "white",
                  backgroundColor: "#4C99FF",
                  padding: "10px 25px",
                  fontSize: "14px",
                  fontFamily: "Roboto Slab, serif",
                  fontWeight: "600",
                  borderRadius: "10px",
                  marginTop: "30px",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                Chi tiết các dịch vụ
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center justify-center px-48 py-10 mx-10 mt-10">
        <div className="w-4/5 mt-10 ">
          <div className="w-full font-serif font-semibold text-4xl">
            Nha Khoa Thẩm Mỹ: Tự Tin Với Nụ Cười Hoàn Hảo
          </div>
          <div className="w-4/5 font-light text-base mt-6">
            Nha khoa thẩm mỹ mang đến những giải pháp tối ưu để cải thiện thẩm
            mỹ răng miệng, giúp bạn sở hữu nụ cười rạng rỡ và tự tin. Với công
            nghệ hiện đại và tay nghề của các chuyên gia, bạn có thể yên tâm
            nâng tầm nụ cười và phong cách riêng của mình.
          </div>
          <div>
            <Button
              variant="outlined"
              href="/specialties"
              sx={{
                color: "white",
                backgroundColor: "#4C99FF",
                padding: "10px 25px",
                fontSize: "14px",
                fontFamily: "Roboto Slab, serif",
                fontWeight: "600",
                borderRadius: "10px",
                marginTop: "30px",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Chi tiết các dịch vụ
            </Button>
          </div>
        </div>
        <div className="w-2/3 h-full ml-20">
          <div className="relative w-48 h-48 left-48 bottom-14">
            <div className="absolute w-96 h-80 bg-gradient-to-r from-blue-100 to-cyan-200 top-0 right-0 rounded-xl"></div>
            <div className="absolute w-96 h-80 top-6 right-6">
              <img src={HomePage4} className=" w-96 h-80 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-24 mx-10 mt-5">
        <div className="flex justify-center items-center flex-col w-full px-12 py-16 rounded-md bg-sky-200 drop-shadow-md">
          <div className="text-center font-serif font-semibold text-4xl">
            Gặp gỡ các chuyên gia của chúng tôi
          </div>
          <div className="w-3/5 text-center mt-2 font-light ">
            Chúng tôi chỉ sử dụng những vật liệu chất lượng tốt nhất trên thị trường để cung cấp những sản phẩm tốt nhất cho bệnh nhân.
          </div>
          <div className="w-11/12 mt-10">
            <DoctorSlide />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col px-48 mx-10 mt-28 ">
        <div className="text-center font-serif font-medium text-4xl">
          Chúng tôi đang chào đón bệnh nhân mới và rất mong được gặp bạn.
        </div>
        <div className="w-4/5 text-center mt-2 font-light ">
          Chúng tôi chỉ sử dụng những vật liệu chất lượng tốt nhất trên thị
          trường để cung cấp những sản phẩm tốt nhất cho bệnh nhân.
        </div>
        <video
          width="1000"
          height="500"
          // controls
          autoPlay
          muted
          loop
          className="mt-16 rounded-lg drop-shadow-lg"
        >
          <source src={video} type="video/mp4" />
        </video>

      </div>

    </div>
  );
};

export default HomePage;
