const resend = require("../utils/resend");

async function sendVerificationEmail(email, username, token) {
    const verificationUrl =
        `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    try {

        console.log(resend);
       console.log(resend.emails);
       const {data,error} = await resend.emails.send({
        from: "InterviewPilot AI <onboarding@resend.dev>",
        to: email,
        subject: "Verify your InterviewPilot AI account",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px;">
            <h2 style="color:#2563eb;">InterviewPilot AI</h2>

            <p>Hi <strong>${username}</strong>,</p>

            <p>
                Thank you for creating your InterviewPilot AI account.
            </p>

            <p>
                Please verify your email address by clicking the button below.
            </p>

            <div style="margin:30px 0;">
                <a
                    href="${verificationUrl}"
                    style="
                        background:#2563eb;
                        color:white;
                        padding:12px 24px;
                        text-decoration:none;
                        border-radius:6px;
                        display:inline-block;
                    "
                >
                    Verify Email
                </a>
            </div>

            <p>This link expires in <strong>1 hour</strong>.</p>

            <p>
                If you didn't create this account, you can safely ignore this email.
            </p>

            <hr/>

            <small>
                © InterviewPilot AI
            </small>
        </div>
        `,
    });

     if (error) {

            console.error(error);

            throw new Error(error.message);
        }

        console.log("✅ Email Sent");

        console.log(data);

        return data;

    } catch (err) {

        console.error("❌ Resend Error");

        console.error(err);

        throw err;
    }
}

module.exports = {
    sendVerificationEmail,
};











































// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// async function sendEmail({ to, subject, html }) {
//     return transporter.sendMail({
//         from: `"InterviewPilot AI" <${process.env.EMAIL_USER}>`,
//         to,
//         subject,
//         html,
//     });
// }

// async function sendVerificationEmail(email, username, token) {
//     const verificationUrl =
//         `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

//     const html = `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px;">
//         <h2 style="color:#2563eb;">InterviewPilot AI</h2>

//         <p>Hi <strong>${username}</strong>,</p>

//         <p>
//             Thank you for creating your InterviewPilot AI account.
//         </p>

//         <p>
//             Please verify your email address by clicking the button below.
//         </p>

//         <div style="margin:30px 0;">
//             <a
//                 href="${verificationUrl}"
//                 style="
//                     background:#2563eb;
//                     color:white;
//                     padding:12px 24px;
//                     text-decoration:none;
//                     border-radius:6px;
//                     display:inline-block;
//                 "
//             >
//                 Verify Email
//             </a>
//         </div>

//         <p>This link will expire in <strong>1 hour</strong>.</p>

//         <p>
//             If you didn't create this account, you can safely ignore this email.
//         </p>

//         <hr/>

//         <small>
//             © InterviewPilot AI
//         </small>
//     </div>
//     `;

//     await sendEmail({
//         to: email,
//         subject: "Verify your InterviewPilot AI account",
//         html,
//     });
// }



// module.exports = {
//     sendVerificationEmail,
// };