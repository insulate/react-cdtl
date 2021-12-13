import React from 'react'
import Pagination from 'react-js-pagination'
import axios from 'axios'
import { Spinner, Table } from 'react-bootstrap'

const pageSize = 15;

const HospitalPage = () => {
    const [hospital, setHospital] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    // ถ้าเราอยากเก็บตัวแปรอะไรก็ตามแต่ และไม่อยากให้มันมีผลกับการ re-render ต่อให้ re-render กี่รอบ มันก็เก็บค่าปัจจุบันไว้อยู่ (useRef)
    const cancelToken = React.useRef(null);

    //pagination
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);

    async function getData(page) {
        try {
            setLoading(true);
            const resp = await axios.get(`https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`, {
                cancelToken: cancelToken.current.token // ตอนส่งให้ใส่ cancelToken ไปด้วย
            });
            setHospital(resp.data.data);
            setTotal(resp.data.meta.pagination.total);
            console.log(resp.data.data)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        // เก็บ token source ของ axios ไว้
        cancelToken.current = axios.CancelToken.source();
        getData(page);

        return () => {
            // console.log('exit product page');
            // ถ้าออกจาก component นี้ให้หยุดการทำงานของ axios
            cancelToken.current.cancel();
        }
    }, [page]);

    if (loading === true) {
        return (
            <div className='text-center mt-5'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className='text-center mt-5'>
                <p >{error.response.data.message}</p>
            </div>
        )
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }
    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-12'>
                        <h2>สถานพยาบาล</h2>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Code</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    hospital.map((p, index) => {
                                        return (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>{p.code}</td>
                                                <td>{p.h_name}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <br />
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={total}
                            pageRangeDisplayed={8}
                            onChange={handlePageChange}
                            itemClass='page-item'
                            linkClass='page-link'
                            prevPageText='ก่อนหน้า'
                            nextPageText='ต่อไป'
                            lastPageText='หน้าสุดท้าย'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HospitalPage
