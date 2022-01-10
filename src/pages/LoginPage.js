import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';

const schema = yup.object({
    email: yup.string().required('อีเมลห้ามว่าง').email('รูปแบบอีเมลไม่ถูกต้อง'),
    password: yup.string().required('รหัสผ่านห้ามว่าง').min(3, 'รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป'),
}).required();

function LoginPage() {
    const { addToast } = useToasts();
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const apiUrl = 'https://api.codingthailand.com/api/login';
            const resp = await axios.post(apiUrl, {
                email: data.email,
                password: data.password
            });
            // console.log(resp)
            localStorage.setItem('token', JSON.stringify(resp.data));

            const urlProfile = 'https://api.codingthailand.com/api/profile';
            const respProfile = await axios.get(urlProfile, {
                headers: {
                    Authorization: 'Bearer ' + resp.data.access_token
                }
            });
            localStorage.setItem('profile', JSON.stringify(respProfile.data.data.user));

            addToast('เข้าระบบเรียบร้อยแล้ว', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 4000 });
            navigate(0)
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
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    name='email'
                                    value="ake@gmail.com"
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
                                    value="123456"
                                    {...register("password")}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                        <hr />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginPage
