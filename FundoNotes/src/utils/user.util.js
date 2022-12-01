/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '1032453795381-099eqj7fv5cn3ib4ebflrlvuf5sccfet.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Dmcp1IW5kEbCgYIARAAGAQSNwF-L9IrVMWSAfXSnSMW3KjB4W0tXw-MGjhNAH4WrnaOPtnKuqw6sI_JqXag7dlQfHIfgwvtdOU'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN })

export async function sendmail(Email){
try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'abhishinde572@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
    })

    const mailoption = {
        from: 'Abhishek <abhishinde572@gmail.com>',
        to: Email,
        subject: 'Forgot Password',
        text: 'You can Reset the Password',
       html: `<h1></h1>To reset a password ,<a href="http://localhost:4000/api/v1/users/resetPassword">Click Here</a></h1>`
    };

    const Result = await transport.sendMail(mailoption)
    return Result
}catch (error){
 return error;
}
}

// sendmail()
// .then(Result => console.log("Email Sent.....", Result))
// .catch((error) => console.log(error.message));

export async function sendMailToNewUser(EmailId, Firstname, Lastname) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'abhishinde572@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'Abhishek # <abhishinde572@gmail.com',
            to: EmailId,
            subject: 'Registration is Successfull',
            text: `Hi, ${Firstname} ${Lastname} the Registration for fundoo notes is successfull, you can login now !!!!!!!!!!`,

            html: `<h2>To login to fundoo notes, please <a href="http://localhost:4000/api/v1/users/logins">Click Here.....</a></h2>`
        };

        const result = await transport.sendMail(mailOptions)
        console.log('=========>>>>', result);
        return result;

    } catch (error) {
        return error;

    }
}