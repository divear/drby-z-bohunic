import React, { useEffect, useState } from 'react';

function Home() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN
    const [data, setData] = useState([]);
    const [backup, setBackup] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    }

    const typy = {
        0: "Jiné",
        1: "Názor💭",
        2: "Otázka❓",
        3: "Přiznání🗣",
        4: "Moudro🧠",
        5: "Přání✨",
        6: "Vtip😂",
        7: "Hláška📜"
    }


    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await fetch(serverDomain + "drby");
                const jsonData = await response.json();
                setData(jsonData);
                setBackup(jsonData.reverse());
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
        setSearchInput(e.target.value)

        const searched = backup.filter((d) => d.body.toLowerCase().includes(searchInput.toLowerCase()))



        if (!searched[0]) {
            setData([{
                body: "Nic nenalezeno 😭",
                id: 1,
                username: " "
            }])
        } else {
            setData(searched)
        }


    }

    return <div>
        <title>Drby z bohunic</title>
        <button className='new' onClick={() => window.location = "/nova"}>{window.innerWidth > 830 ? "Napsat novou zprávu" : "+"}</button>

        <div className="searchParent">
            <input value={searchInput} onChange={e => search(e)} type="search" placeholder='Hledat zprávu...' className='search' ></input>
        </div>

        {data[0] ? data.map((d) => {
            return (
                <div title={`Zpráva ${d.id}`} key={d.id} className="drb">
                    <h5 className='date'>{d.posted_date}</h5>
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
