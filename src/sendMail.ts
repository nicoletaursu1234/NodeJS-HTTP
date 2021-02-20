import nodemailer from "nodemailer";

export default async (res, data, file?) => {
  const { to, subject, text } = data;

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASSWORD,
    },
  });

  try {
    if (!file) {
      await transporter.sendMail({
        from: "nicoletaursu1234@yahoo.com",
        to,
        subject,
        text,
      });
    } else {
      const { originalname, mimetype, size, buffer } = file;

      await transporter.sendMail({
        from: "nicoletaursu1234@yahoo.com",
        to,
        subject,
        text,
        attachments: [
          {
            filename: originalname,
            type: mimetype,
            size: size,
            content: buffer,
          },
        ],
      });
    }

    res.sendStatus(200);

    console.log("Email sent");
  } catch (e) {
    res.sendStatus(500);

    console.log("Email was not sent. ", e);
  }
};
