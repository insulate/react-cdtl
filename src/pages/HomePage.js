import React from 'react'
import { useQuery } from 'react-query'
import { Spinner } from 'react-bootstrap'

const HomePage = () => {

    // const { isLoading, error, data, isFetching } = useQuery('getData', () =>
    //     fetch('https://api.codingthailand.com/api/news?page=1').then(res =>
    //         res.json()
    //     )
    // )
    const query = useQuery("getData", () => {
        const controller = new AbortController();
        const signal = controller.signal;

        const promise = fetch(
            "https://api.codingthailand.com/api/news?page=1", {
            method: 'get',
            signal: signal
        }
        ).then((res) => res.json())

        //cancel request
        promise.cancel = () => controller.abort();

        return promise;
    })

    const { isLoading, error, data, isFetching } = query;

    if (isLoading === true) {
        return (
            <div className='text-center mt-5'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className='text-center mt-5'>
                <p >{JSON.stringify(error)}</p>
            </div>
        )
    }

    return (
        <>
            <main role="main">
                {/* Main jumbotron for a primary marketing message or call to action */}
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">ยินดีต้อนรับทุกคน</h1>
                        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                        <p><button className="btn btn-primary btn-lg">Learn more »</button></p>
                    </div>
                </div>
                <div className="container">
                    {/* Example row of columns */}
                    <div className="row">
                        {
                            data.data.map((news, index) => {
                                return (
                                    <div className="col-md-4">
                                        <h2>{news.topic}</h2>
                                        <p>{news.detail}</p>
                                        <p>หมวดหมู่: {news.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr />
                </div> {/* /container */}
            </main>
        </>
    )
}

export default HomePage
