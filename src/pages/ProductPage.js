import React from 'react'
import { Table, Image, Badge, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const ProductPage = () => {
    const [product, setProduct] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // ถ้าเราอยากเก็บตัวแปรอะไรก็ตามแต่ และไม่อยากให้มันมีผลกับการ re-render ต่อให้ re-render กี่รอบ มันก็เก็บค่าปัจจุบันไว้อยู่ (useRef)
    const cancelToken = React.useRef(null);

    async function getData() {
        try {
            setLoading(true);
            const resp = await axios.get('https://api.codingthailand.com/api/course', {
                cancelToken: cancelToken.current.token // ตอนส่งให้ใส่ cancelToken ไปด้วย
            });
            setProduct(resp.data.data);
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
                        <h2>สินค้า</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Course Name</th>
                                    <th>Detail</th>
                                    <th>Created At</th>
                                    <th>Views</th>
                                    <th>Image</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.map((p, index) => {
                                        return (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>{p.title}</td>
                                                <td>{p.detail}</td>
                                                <td>
                                                    {
                                                        format(new Date(p.date), 'dd MMM yyyy', { locale: th })
                                                    }
                                                </td>
                                                <td>
                                                    <Badge variant='success'>{p.view}</Badge>
                                                </td>
                                                <td>
                                                    <Image src={p.picture} thumbnail width={75} />
                                                </td>
                                                <td>
                                                    <Link to={`/detail/${p.id}/title/${p.title}`}><BsEyeFill /></Link>
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

export default ProductPage
