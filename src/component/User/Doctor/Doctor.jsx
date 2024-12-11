import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import imgdoctortest from "../../../assets/images/doctor1.png";
import { getServiceById } from "../../../services/specialtiesService";
import { getListDoctorSerrvice } from "../../../services/doctorService";


const ListDoctor = (props) => {

    const { id } = useParams();
    const navigate = useNavigate()


    const [service, setService] = useState("");
    const [listDoctor, setListDoctor] = useState([]);

    const fetchService = async () => {
        let result = await getServiceById(id)
        if (result.success) {
            setService(result.data);
        } else {
            console.log(result.message);
        }
    }

    const fetchListDoctor = async () => {
        let result = await getListDoctorSerrvice(id);
        if (result.success) {
            setListDoctor(result.data);
        } else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        fetchService();
        fetchListDoctor();
    }, [])




    // const listDoctor = [
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     },
    //     {
    //         image: imgdoctortest,
    //         name: "Dr. Hùng Phúc",
    //         specialty: "Chuyên khoa răng miệng",
    //         schedule: "Mon - Sun"
    //     }
    // ]

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const pageCount = Math.ceil(listDoctor.length / itemsPerPage);
    const currentData = listDoctor.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    console.log(currentData)
    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="text-center font-serif font-bold text-4xl mt-20">
                    {service ? service.name : ""}
                </div>
                <div className="w-2/5 text-center font-light text-sm mt-3">
                    {service ? service.description : ""}
                </div>
            </div>
            <div className="my-10">
                {currentData && currentData.length > 0 ?
                    currentData.map((doctor, index) => {
                        return (
                            <div className="flex justify-between items-center mx-40 mt-10 border rounded-xl px-10 py-5 bg-white drop-shadow">
                                <div className="flex items-center">
                                    <img src={`data:image/jpeg;base64,${doctor.image}`} className="w-28 h-28 rounded-full" />
                                    <div className="flex flex-col gap-1 ml-4">
                                        <div className="text-xl font-semibold font-serif">{doctor.fullName}</div>
                                        <div className="text-base font-extralight"> {doctor.specialist_Name} </div>
                                    </div>
                                </div>
                                <div className="mt-16 ml-96">
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/doctor-info/${doctor.user_Id}`)}
                                        sx={{
                                            color: "white",
                                            backgroundColor: "#4C99FF",
                                            padding: "6px 25px",
                                            fontSize: "10px",
                                            fontFamily: "Roboto Slab, serif",
                                            fontWeight: "600",
                                            borderRadius: "10px",
                                            marginLeft: "220px",
                                            "&:hover": {
                                                color: "black",
                                            },
                                        }}
                                    >
                                        Đặt lịch
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <></>
                }

            </div>
            <div className=' flex items-center justify-center'>
                <Pagination
                    count={pageCount}
                    color="primary"
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                />
            </div>
        </div>
    )
}

export default ListDoctor;