import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';

const schema = yup.object({
    name: yup.string().required('ชื่อ-สกุลห้ามว่าง'),
    email: yup.string().required('อีเมลห้ามว่าง').email('รูปแบบอีเมลไม่ถูกต้อง'),
    password: yup.string().required('รหัสผ่านห้ามว่าง').min(3, 'รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป'),
}).required();

function Register() {
    const { addToast } = useToasts();
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const apiUrl = 'https://api.codingthailand.com/api/register';
            const resp = await axios.post(apiUrl, {
                name: data.name,
                email: data.email,
                password: data.password
            });
            console.log(resp)
            addToast(resp.data.message, { appearance: 'success', autoDismiss: true, autoDismissTimeout: 4000 });
        } catch (error) {
            console.log(error.response.data.message)
            addToast(error.response.data.message, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 4000 });
        }
    };
    return (
        <>
            <Container className='mt-4'>
                <Row>
                    <Col xs={12} md={8}>
                        <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>ชื่อ-สกุล</Form.Label>
                                <Form.Control type="text"
                                    name='name'
                                    {...register("name")}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    name='email'
                                    {...register("email")}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text"
                                    name='password'
                                    {...register("password")}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                สมัครสมาชิก
                            </Button>
                        </Form>
                        <hr />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register
