import React from 'react'
import axios from 'axios'

const AboutPage = () => {
    const [version, setVersion] = React.useState('');

    async function getData() {
        const resp = await axios.get('https://api.codingthailand.com/api/version');
        setVersion(resp.data.data.version);
    }

    React.useEffect(() => {
        // async function getData() {
        //     const resp = await axios.get('https://api.codingthailand.com/api/version');
        //     setVersion(resp.data.data.version);
        // }

        getData();
    }, []);
    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-12'>
                        <h2>About Us</h2>
                        {
                            version && (
                                <p>
                                    Backend Api Version: {version}
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPage
