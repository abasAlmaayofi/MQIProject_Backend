const nodeMailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

async function sendEmail(props) {
  const transporter = nodeMailer.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
    debug: true,
    logger: true,
  });
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "./emails/results.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();

  const template = handlebars.compile(source);
  const replacements = {
    name: props?.name,
    email: props?.email,
    q1: props?.questions[0],
    q2: props?.questions[1],
    q3: props?.questions[2],
    q4: props?.questions[3],
    q5: props?.questions[4],
    q6: props?.questions[5],
    q7: props?.questions[6],
    q8: props?.questions[7],
    q9: props?.questions[8],
    q10: props?.questions[9],
    q11: props?.questions[10],
    q12: props?.questions[11],
    q13: props?.questions[12],
    q14: props?.questions[13],
    q15: props?.questions[14],
    ansr1: props?.answers[0],
    ansr2: props?.answers[1],
    ansr3: props?.answers[2],
    ansr4: props?.answers[3],
    ansr5: props?.answers[4],
    ansr6: props?.answers[5],
    ansr7: props?.answers[6],
    ansr8: props?.answers[7],
    ansr9: props?.answers[8],
    ansr10: props?.answers[9],
    ansr11: props?.answers[10],
    ansr12: props?.answers[11],
    ansr13: props?.answers[12],
    ansr14: props?.answers[13],
    ansr15: props?.answers[14],
    crctAnsr1: props?.correctAnswers[0],
    crctAnsr2: props?.correctAnswers[1],
    crctAnsr3: props?.correctAnswers[2],
    crctAnsr4: props?.correctAnswers[3],
    crctAnsr5: props?.correctAnswers[4],
    crctAnsr6: props?.correctAnswers[5],
    crctAnsr7: props?.correctAnswers[6],
    crctAnsr8: props?.correctAnswers[7],
    crctAnsr9: props?.correctAnswers[8],
    crctAnsr10: props?.correctAnswers[9],
    crctAnsr11: props?.correctAnswers[10],
    crctAnsr12: props?.correctAnswers[11],
    crctAnsr13: props?.correctAnswers[12],
    crctAnsr14: props?.correctAnswers[13],
    crctAnsr15: props?.correctAnswers[14],
  };
  const htmlToSend = template(replacements);
  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_FROM,
    to: props.email,
    subject: "Results",
    html: htmlToSend,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
