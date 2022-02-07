import React, { useEffect, useState } from 'react';

function Home() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN
    console.log(window.scrollY);
    const [data, setData] = useState([])

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    }


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

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
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

        <button onClick={() => window.scrollTo(0, 0)} style={{ opacity: `${scrollPosition / 10}%` }} className='goTopButton'>^</button>

    </div>;
}

export default Home;
