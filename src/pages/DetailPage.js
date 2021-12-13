import React from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { Spinner, Card, CardGroup } from 'react-bootstrap'

const DetailPage = () => {
    const { id, title } = useParams();

    const [detail, setDetail] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // ถ้าเราอยากเก็บตัวแปรอะไรก็ตามแต่ และไม่อยากให้มันมีผลกับการ re-render ต่อให้ re-render กี่รอบ มันก็เก็บค่าปัจจุบันไว้อยู่ (useRef)
    const cancelToken = React.useRef(null);

    async function getData(id) {
        try {
            setLoading(true);
            const resp = await axios.get('https://api.codingthailand.com/api/course/' + id, {
                cancelToken: cancelToken.current.token // ตอนส่งให้ใส่ cancelToken ไปด้วย
            });
            setDetail(resp.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        // เก็บ token source ของ axios ไว้
        cancelToken.current = axios.CancelToken.source();
        getData(id);

        return () => {
            // console.log('exit product page');
            // ถ้าออกจาก component นี้ให้หยุดการทำงานของ axios
            cancelToken.current.cancel();
        }
    }, [id]);

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
                        <Link to="/product" variant="secondary" >Back</Link>
                        <h2>{title} - {id}</h2>
                        <CardGroup>
                            {
                                detail.length > 0 ? (
                                    detail.map((d, index) => {
                                        return (
                                            <div className="col-4 mb-4 shadow-shadow-lg">
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title>{d.ch_title}</Card.Title>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <small className="text-muted">{d.ch_dateadd}</small>
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>ไม่พยข้อมูล...</p>
                                )
                            }


                        </CardGroup>
                    </div>
                </div>
            </div >
        </>
    )
}

export default DetailPage
