require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (data) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // true for port 465, false for other ports
		auth: {
			user: process.env.EMAIL_APP,
			pass: process.env.EMAIL_APP_PASSWORD,
		},
	});

	const info = await transporter.sendMail({
		from: '"Albert 👻" <buiquangquy12823@gmail.com>', // sender address
		to: data.receiverEmail, // list of receivers
		subject: 'Thông tin đăng ký tài khoản Trekking Tour', // Subject line
		text: 'Hello world?', // plain text body
		html: getBodyHTMLEmail(data), // html body
	});
};

let getBodyHTMLEmail = (data) => {
	let result = '';
	if (language === 'vi') {
		result = `
			<h3>Xin chào ${data.patientName}</h3>

			<p>Bạn nhận được email này vì đã đăng ký tài khoản trên website Trekking Tour</p>
			<p> Vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục tạo tài khoản.</p>
			<div>
			<a href=${data.redirectLink} target='_blank'>Click here</a>
			</div>
			<div>Xin chân thành cám ơn</div>
		`;
	}
	return result;
};

module.exports = {
	sendSimpleEmail: sendSimpleEmail,
};
