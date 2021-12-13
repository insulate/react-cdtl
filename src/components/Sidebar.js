import React, { useState, useEffect } from 'react'

const Sidebar = () => {
    // let fullname = 'John';
    const [fullName, setFullName] = useState('John');
    const [isShow, setIsShow] = useState(true);
    const changeName = () => {
        setFullName('Mary')
        setIsShow(!isShow)
    }

    // useEffect จะทำงานทุกครั้งที่ถูก re render
    useEffect(() => {
        console.log('sidebar useEffect')
    });
    // one time only ทำงานครั้งเดียว
    useEffect(() => {
        console.log('sidebar useEffect on time only')
    }, []);

    // จะเรียกใช้เฉพาะตอน fullName เปลี่ยนค่า
    useEffect(() => {
        console.log('sidebar useEffect fullname => ' + fullName)
    }, [fullName]);

    return (
        <>
            <h3>SideBar</h3>
            {
                isShow ? <p>Hello</p> : <p>World</p>
            }
            <p>Hello {fullName}</p>
            <button onClick={changeName}>Change Name</button>
        </>
    )
}

export default Sidebar
