function sendEmail()
{
    //window.location.href = "mailto:person@med.umich.edu?subject=Fingertips Quiz Results&body=<h2>Hi,I found this website and thought you might like it http://www.geocities.com/wowhtml/</h2>";
}

function tempEmail(){
    let senderEmail = document.getElementById("senderEmail").value;
    let recipientEmail = document.getElementById("recipientEmail").value;
    let name = document.getElementById("nameInput").value;
    const TOKEN = "";


    Email.send({
        SecureToken : TOKEN,
        To : '',
        From : "",
        Subject : "Test Email",
        Body : "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
        }).then(
            message => alert("mail sent successfully")
        );
    

}