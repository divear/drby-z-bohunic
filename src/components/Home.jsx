import React, { useEffect, useState } from 'react';

function Home() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN
    console.log(serverDomain);
    const [data, setData] = useState([])


    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await fetch(serverDomain + "drby");
                const jsonData = await response.json();
                setData(jsonData.reverse());
                console.log(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        getBlogs();
    }, [])

    return <div>
        <title>Drby z bohunic</title>
        <h2>Nejnovější drby:</h2>
        <button className='new' onClick={() => window.location = "/nova"}>Napsat novou zprávu</button>
        {data[0] ? data.map((d) => {
            return (
                <div title={`Zpráva ${d.id}`} key={d.id} className="drb">
                    <h5><i>{d.username || "Anonym"}</i></h5>
                    <h1>{d.body}</h1>

                </div>
            )
        }) : "Načítání..."}
    </div>;
}

export default Home;
