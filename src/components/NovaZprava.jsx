import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function NovaZprava() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN
    const [username, setUsername] = useState("")
    const [body, setBody] = useState("")
    const [errorCode, setErrorCode] = useState("");

    async function submit(e) {
        e.preventDefault()
        if (!body | !username) {
            setErrorCode("Všechna pole jsou povinná!");
            return
        }
        localStorage.setItem("username", username)

        const Rbody = { body }
        const Rusername = { username }

        const arr = [Rbody, Rusername]

        console.log(arr[1].username);

        const response = await fetch(`${serverDomain}drby`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(arr)
        })
        console.log(response);
        window.location = "/"

    }




    return <div>
        <title>Nová zpráva</title>

        <form onSubmit={(e) => submit(e)} action="" className='novaZprava'>
            <label htmlFor="username">Přezdívka <i>(nepovinná):</i></label><br />
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className='username' id='username' placeholder='Např. b0br123' />

            <div className='zprava'>
                <label htmlFor="body">Zpráva</label><br />
                <textarea value={body} onChange={e => setBody(e.target.value)} name="body" id="body" placeholder='Např. želvy jsou overrated'></textarea>
            </div>
            <button>Poslat</button>
            <h2>{errorCode}</h2>
        </form>
    </div>;
}

export default NovaZprava;
