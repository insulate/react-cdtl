import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const schema = yup.object({
    name: yup.string().required('ชื่อหมวดหมู่ห้ามว่าง'),
}).required();


const EditPage = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    // async function getData(id) {
    //     const resp = await axios.get('https://api.codingthailand.com/api/category/' + id);
    //     // console.log(resp.data)
    //     setValue('name', resp.data.name)
    // }

    // React.useEffect(() => {
    //     getData(id);
    // }, [id]);

    const getData = React.useCallback(async () => {
        const resp = await axios.get(
            "https://api.codingthailand.com/api/category/" + id
        )
        setValue('name', resp.data.name);
    }, [id, setValue]);

    React.useEffect(() => {
        console.log()
        getData();
    }, [getData])

    const onSubmit = async (data) => {
        console.log(data);
        const apiUrl = 'https://api.codingthailand.com/api/category';
        const resp = await axios.put(apiUrl, {
            id: id,
            name: data.name
        });
        alert(resp.data.message);
        navigate('/category')

    };

    return (
        <>
            <Container className='mt-4'>
                <Row>
                    <Col xs={12} md={8}>
                        <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>หมวดหมู่ข่าว</Form.Label>
                                <Form.Control type="text"
                                    name='name'
                                    {...register("name")}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <hr />
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default EditPage
