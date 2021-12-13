import React from 'react'
import axios from 'axios'
import { Spinner, Table, Button } from 'react-bootstrap'
import { BsPencilFill, BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const IndexPage = () => {
    const [category, setcategory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    // ถ้าเราอยากเก็บตัวแปรอะไรก็ตามแต่ และไม่อยากให้มันมีผลกับการ re-render ต่อให้ re-render กี่รอบ มันก็เก็บค่าปัจจุบันไว้อยู่ (useRef)
    const cancelToken = React.useRef(null);

    const navigate = useNavigate();

    async function getData() {
        try {
            setLoading(true);
            const resp = await axios.get(`https://api.codingthailand.com/api/category`, {
                cancelToken: cancelToken.current.token // ตอนส่งให้ใส่ cancelToken ไปด้วย
            });
            setcategory(resp.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        // เก็บ token source ของ axios ไว้
        cancelToken.current = axios.CancelToken.source();
        getData();

        return () => {
            // console.log('exit product page');
            // ถ้าออกจาก component นี้ให้หยุดการทำงานของ axios
            cancelToken.current.cancel();
        }
    }, []);

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

    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-12'>
                        <Button className="mb-3" variant="success" onClick={() => { navigate('/category/create') }}>เพิ่มข้อมูล</Button>
                        <h2>หมวดหมู่ข่าว</h2>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>เครื่องมือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.map((p, index) => {
                                        return (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>{p.name}</td>
                                                <td>
                                                    <Button className="ml-2" variant="outline-info" size="sm"><BsPencilFill /></Button>
                                                    <Button className="ml-2" variant="outline-danger" size="sm"><BsTrash /></Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndexPage
