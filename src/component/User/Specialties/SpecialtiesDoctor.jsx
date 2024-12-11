import { useState } from "react";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 0 10 0",
    ":hover": {
        backgroundColor: '#f1f3f5',
    },
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


const SpecialtiesDoctor = (props) => {

    const navigate = useNavigate()

    const { listDoctor } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const pageCount = Math.ceil(listDoctor.length / itemsPerPage);
    const currentData = listDoctor.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // console.log(currentData)

    return (
        <>
            <div className="w-full flex justify-center">
                <Box sx={{
                    width: '100%',
                    paddingY: '50px',
                    paddingX: '200px',
                }}>
                    <Grid container rowSpacing={2} columnSpacing={5}>
                        {currentData && currentData.length > 0
                            ?
                            currentData.map((doctor, index) => {
                                return (
                                    <Grid size={6}>
                                        <Item onClick={() => navigate(`/doctor-info/${doctor.user_Id}`)}>
                                            <img
                                                src={`data:image/jpeg;base64,${doctor.image}`}
                                                className="w-24 h-24 rounded-full mx-5"
                                            />
                                            <div className=''>
                                                <div className='font-bold text-xl'>Bác sĩ {doctor.name}</div>
                                                <div className='text-sm font-light'>Chuyên khoa : {doctor.specialist_Name}</div>
                                            </div>
                                        </Item>
                                    </Grid>
                                )
                            })
                            :
                            <div className="flex w-full justify-center">
                                <div className="border px-10 py-5 rounded-lg shadow-sm bg-white font-semibold">
                                    Không có bác sĩ thuộc chuyên khoa
                                </div>

                            </div>
                        }
                    </Grid>
                </Box>
            </div >
            <div className=' flex items-center justify-center'>
                <Pagination
                    count={pageCount}
                    color="primary"
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                />
            </div>
        </>
    )
}

export default SpecialtiesDoctor;