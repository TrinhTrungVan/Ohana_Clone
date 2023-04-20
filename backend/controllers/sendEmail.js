import nodemailder from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'
import speakeasy from 'speakeasy'

//tao otp
const secret = speakeasy.generateSecret({ length: 20 })
const tokenOtp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32'
})


//email
const GOOGLE_MAILER_CLIENT_ID = '585092343933-5g54v9jh6gs1eoum3r3fo10tmq6bcovc.apps.googleusercontent.com'
const GOOGLE_MAILER_CLIENT_SECRET = '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'
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04y1OSrX0E1dgCgYIARAAGAQSNwF-L9Iruv7azkOGFhw6_-eK4ljG_uSZ_QuRKtn9y1dp6fJn-u4q42AkUez7i7lQ3jEhdxAYP4M'
const ADMIN_EMAIL_ADDRESS = 'quyenmeomeo111@gmail.com'

const myOAth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET)

myOAth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

const sendEmail = async (req, res) => {
    try {
        const { email } = req.body
        const subject = 'Ohana - Mã xác nhận đăng ký'
        const content = `Đây là mã xác nhận để hoàn tất quá trình đăng ký tài khoản trên Ohana: ${tokenOtp}`
        if (!email ) throw new Error('Please provide email!')
        const myAccessTokenObject = await myOAth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject?.token
        const transport = nodemailder.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        })
        const mailOptions = {
            to: email, // Gửi đến ai?
            subject: subject, // Tiêu đề email
            html: `<h3>${content}</h3>` // Nội dung email
        }
        // Gửi email
        await transport.sendMail(mailOptions)
        res.status(200).json(tokenOtp)
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error.message })
    }
}

export default sendEmail