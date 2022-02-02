import React, { useState } from 'react';

function NovaZprava() {
    const [username, setUsername] = useState("")
    const [body, setBody] = useState("")

    //todo: connect this to the backend

    return <div>
        <h1>Nová zpráva</h1>

        <form action="" className='novaZprava'>
            <label htmlFor="username">Přezdívka <i>(nepovinná):</i></label><br />
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className='username' id='username' placeholder='Např. b0br123' />

            <div className='zprava'>
                <label htmlFor="body">Zpráva</label><br />
                <textarea value={body} onChange={e => setBody(e.target.value)} name="body" id="body" placeholder='Např. želvy jsou overrated'></textarea>
            </div>
        </form>
    </div>;
}

export default NovaZprava;
