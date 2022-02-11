import React, { useEffect, useState } from 'react';
import searchIcon from "./imgs/search.png"

function Home() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN
    const [data, setData] = useState([]);

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    }

    const typy = {
        0: "Jiné",
        1: "Názor",
        2: "Otázka",
        3: "Přiznání"
    }


    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await fetch(serverDomain + "drby");
                const jsonData = await response.json();
                setData(jsonData.reverse());
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

    function search(e) {
        e.preventDefault()
        console.log("search");
        console.log(e);
    }

    return <div>
        <title>Drby z bohunic</title>
        <h2>Nejnovější drby:</h2>
        <button className='new' onClick={() => window.location = "/nova"}>Napsat novou zprávu</button>

        <form onSubmit={e => search(e)} className="searchParent">
            <input type="search" placeholder='Hledat zprávu...' className='search' />
            <button><img className='searchIcon' src={searchIcon} alt="Hledat" /></button>
        </form>

        {data[0] ? data.map((d) => {
            return (
                <div title={`Zpráva ${d.id}`} key={d.id} className="drb">
                    <h5><i>{d.username || "Anonym"}</i></h5>
                    <h5 className='floatRight'>{typy[d.genre]}</h5>
                    <h1>{d.body}</h1>

                </div>
            )
        }) : <h1>Načítání...</h1>}

        <button onClick={() => window.scrollTo(0, 0)} style={{ opacity: `${scrollPosition / 10}%` }} className='goTopButton'>^</button>
        <footer>
            <p className='floatLeft'>Lukáš Odehnal 2022</p>
            <a className='floatRight' href="/feedback">feedback</a>
        </footer>
    </div>;
}

export default Home;
