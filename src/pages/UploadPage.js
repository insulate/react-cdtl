import React from 'react'
import { Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
function UploadPage() {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            // console.log(data);
            let fileUpload = data.picture[0];
            const reader = new FileReader();
            reader.readAsDataURL(fileUpload);
            reader.onload = async (e) => {
                let base64Image = e.target.result;
                const urlApi = 'https://api.codingthailand.com/api/upload';
                const resp = await axios.post(urlApi, {
                    picture: base64Image
                });
                // alert(resp.data.data.message);
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 4000 });
                console.log(resp.data.data.url);
                // navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Container className='mt-4'>
                <Row>
                    <Col md={4}>
                        <h1>Upload File</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='form-group'>
                                <label>Example file input</label>
                                <input type="file" className="form-control-file" {...register("picture")} />
                            </div>
                            <button className='btn btn-primary' type='submit'>Upload...</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UploadPage
