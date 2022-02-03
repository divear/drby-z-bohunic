import React, { useState } from 'react';

function NovaZprava() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN
    const [username, setUsername] = useState(localStorage.getItem("username") || "")
    let [body, setBody] = useState("")
    const [errorCode, setErrorCode] = useState("");

    function submit(e) {
        e.preventDefault()
        if (!body) {
            setErrorCode("Zpráva je povinná!");
            return
        }



        (async function () {

            // removes any emojis from the string
            const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

            body = body.replace(emojiRegex, '');

            const Rbody = { body };
            const Rusername = { username }

            localStorage.setItem("username", username)


            const arr = [Rbody, Rusername]
            const response = await fetch(`${serverDomain}drby`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(arr)
            })
            console.log(response);
            window.location = "/"
        })();



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
            <h2 className='error'>{errorCode}</h2>
        </form>
    </div>;
}

export default NovaZprava;
