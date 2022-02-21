import React, { useState } from 'react';

function NovaZprava() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN
    let [username, setUsername] = useState(localStorage.getItem("username") || "")
    let [body, setBody] = useState("")
    const [errorCode, setErrorCode] = useState("");
    const [genre, setGenre] = useState(0)

    function submit(e) {
        e.preventDefault()
        if (!body) {
            setErrorCode("Zpráva je povinná!");
            return
        } else if (body.length >= 3000) {
            setErrorCode("Zpráva je moc dlouhá")
            return
        } else if (username.length >= 255) {
            setErrorCode("Přezdívka je moc dlouhá")
            return
        }


        (async function () {



            const Rbody = { body };
            const Rusername = { username }
            const Rgenre = { genre }

            localStorage.setItem("username", username)


            const arr = [Rbody, Rusername, Rgenre]
            const response = await fetch(`${serverDomain}drby`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(arr)
            })
            window.location = "/"
        })();
    }

    return <div>
        <title>Nová zpráva</title>

        <form onSubmit={(e) => submit(e)} action="" className='novaZprava'>
            <label htmlFor="username">Přezdívka <i>(nepovinná):</i></label><br />
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className='username' id='username' placeholder='Např. b0br123' />
            <br />

            <div className='genre'>
                <label htmlFor="genre">Typ zprávy: </label>
                <select value={genre} onChange={e => setGenre(e.target.value)} name="genre" id="genre">
                    <option value="0">Jiné</option>
                    <option value="1">Názor💭</option>
                    <option value="2">Otázka❓</option>
                    <option value="3">Přiznání🗣</option>
                    <option value="4">Moudro🧠</option>
                    <option value="5">Přání✨</option>
                    <option value="6">Vtip😂</option>
                </select>
            </div>


            <div className='zprava'>
                <label htmlFor="body">Zpráva</label><br />
                <textarea value={body} onChange={e => setBody(e.target.value)} name="body" id="body" placeholder='Např. želvy jsou overrated' />
            </div>
            <button>Poslat</button>
            <h2 className='error'>{errorCode}</h2>
        </form>
    </div>;
}

export default NovaZprava;
