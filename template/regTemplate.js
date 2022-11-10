const regTemplate = (name,email) =>{
    return `<div>
        <h1 style="color:slateblue;">Hi, ${name} Welcome to CMS-V1.0</h1>
        <article style="margin:auto;object-fit:cover;">
        <img src="https://thumbs.dreamstime.com/z/handshake-business-cartoon-vector-illustration-58574074.jpg" width="300" height="300"/>
        <h4>We are excited to have you get started with mail id=<span style="color:'orangered';"> ${email}</span>,your account is ready to use.</h4>
        </article>
    </div>`
}

module.exports = regTemplate