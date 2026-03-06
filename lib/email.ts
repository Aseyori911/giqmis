import { Resend } from 'resend'

const resend = new Resend(process.env.emailKey)

export async function sendApplicationConfirmation({
  studentName,
  parentName,
  email,
  selectedCourses,
}: {
  studentName: string
  parentName: string
  email: string
  selectedCourses: string
}) {
  try {
    await resend.emails.send({
      from: 'GIQMIS Admissions <onboarding@resend.dev>',
      to: email,
      subject: 'Application Received – Gladtidings Institute',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Application Received</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">

                  <!-- Header -->
                  <tr>
                    <td style="background-color:#e67e22;padding:36px 40px;text-align:center;">
                      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:bold;letter-spacing:0.5px;">
                        GLADTIDINGS INSTITUTE
                      </h1>
                      <p style="color:#fff3e0;margin:6px 0 0;font-size:13px;">
                        For Qur'an Memorization & Islamic Studies for Females
                      </p>
                    </td>
                  </tr>

                  <!-- Green confirmation bar -->
                  <tr>
                    <td style="background-color:#27ae60;padding:14px 40px;text-align:center;">
                      <p style="color:#ffffff;margin:0;font-size:14px;font-weight:bold;">
                        ✅ Application Successfully Received
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">

                      <p style="color:#333333;font-size:16px;margin:0 0 10px;">
                        As-salāmu ʿalaykum wa rahmatullāhi wa barakātuh,
                      </p>
                      <p style="color:#333333;font-size:15px;margin:0 0 20px;">
                        Dear <strong>${parentName}</strong>,
                      </p>

                      <p style="color:#555555;font-size:15px;line-height:1.7;margin:0 0 20px;">
                        Bārak Allāhu fīkum. We are pleased to inform you that the enrollment application for
                        <strong>${studentName}</strong> has been successfully received by
                        <strong>Gladtidings Institute for Qur'an Memorization and Islamic Studies for Females</strong>.
                      </p>

                      <!-- Application summary box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff8f0;border:1px solid #f0c080;border-radius:8px;margin:0 0 24px;">
                        <tr>
                          <td style="padding:20px 24px;">
                            <p style="color:#b45309;font-size:13px;font-weight:bold;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.5px;">
                              Application Summary
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="color:#555;font-size:14px;padding:4px 0;width:140px;">Student Name:</td>
                                <td style="color:#222;font-size:14px;font-weight:bold;padding:4px 0;">${studentName}</td>
                              </tr>
                              <tr>
                                <td style="color:#555;font-size:14px;padding:4px 0;">Parent / Guardian:</td>
                                <td style="color:#222;font-size:14px;font-weight:bold;padding:4px 0;">${parentName}</td>
                              </tr>
                              <tr>
                                <td style="color:#555;font-size:14px;padding:4px 0;">Course(s) Applied:</td>
                                <td style="color:#222;font-size:14px;font-weight:bold;padding:4px 0;">${selectedCourses}</td>
                              </tr>
                              <tr>
                                <td style="color:#555;font-size:14px;padding:4px 0;">Status:</td>
                                <td style="padding:4px 0;">
                                  <span style="background-color:#fff3cd;color:#856404;font-size:12px;font-weight:bold;padding:2px 10px;border-radius:20px;border:1px solid #ffc107;">
                                    Under Review
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <p style="color:#555555;font-size:15px;line-height:1.7;margin:0 0 16px;">
                        Our admissions team will carefully review the application and get back to you
                        <strong>within 2–3 business days</strong> via WhatsApp or email with the next steps,
                        in shaa Allāh.
                      </p>

                      <p style="color:#555555;font-size:15px;line-height:1.7;margin:0 0 28px;">
                        If you have any questions in the meantime, please do not hesitate to reach out to us
                        on WhatsApp and we will be happy to assist you.
                      </p>

                      <!-- Divider -->
                      <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 24px;" />

                      <p style="color:#555555;font-size:14px;line-height:1.7;margin:0 0 6px;">
                        Jazākumullāhu khayran for choosing Gladtidings Institute. We look forward to
                        welcoming <strong>${studentName}</strong> into our community of learners, in shaa Allāh.
                      </p>

                      <p style="color:#333;font-size:14px;margin:20px 0 4px;">
                        Warm regards,
                      </p>
                      <p style="color:#e67e22;font-size:14px;font-weight:bold;margin:0;">
                        The Admissions Team
                      </p>
                      <p style="color:#888;font-size:13px;margin:2px 0 0;">
                        Gladtidings Institute for Qur'an Memorization & Islamic Studies
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#f9f9f9;border-top:1px solid #eeeeee;padding:20px 40px;text-align:center;">
                      <p style="color:#aaaaaa;font-size:12px;margin:0 0 4px;">
                        This is an automated email. Please do not reply directly to this message.
                      </p>
                      <p style="color:#aaaaaa;font-size:12px;margin:0;">
                        © ${new Date().getFullYear()} Gladtidings Institute for Qur'an Memorization & Islamic Studies for Females
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    })
  } catch (err) {
    // Don't block the application if email fails — just log it
    console.error('Email send error:', err)
  }
}