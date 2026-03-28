const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendInquiryEmail = async ({ name, email, phone, service, budget, message }) => {
  const adminMail = {
    from: `"PowerPluto Technologies" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Inquiry: ${service} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background: #7C3AED; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Project Inquiry</h1>
          <p style="color: #e0d7ff; margin: 4px 0 0;">PowerPluto Technologies</p>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0;">${service}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Budget</td><td style="padding: 8px 0;">${budget || 'Not specified'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; margin: 0 0 8px;">Message:</p>
          <p style="background: #f9fafb; padding: 16px; border-radius: 6px; margin: 0;">${message}</p>
        </div>
        <div style="background: #f9fafb; padding: 16px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} PowerPluto Technologies</p>
        </div>
      </div>
    `
  };

  // Auto-reply to client
  const clientMail = {
    from: `"PowerPluto Technologies" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We received your inquiry — PowerPluto Technologies`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background: #7C3AED; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Thank You, ${name}!</h1>
          <p style="color: #e0d7ff; margin: 4px 0 0;">We've received your inquiry</p>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to <strong>PowerPluto Technologies</strong>. We've received your inquiry regarding <strong>${service}</strong> and our team will review it shortly.</p>
          <p>You can expect to hear from us within <strong>24 business hours</strong>.</p>
          <p style="margin-top: 32px;">Best regards,<br/><strong>PowerPluto Technologies Team</strong></p>
        </div>
        <div style="background: #f9fafb; padding: 16px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} PowerPluto Technologies</p>
        </div>
      </div>
    `
  };

  await Promise.all([
    transporter.sendMail(adminMail),
    transporter.sendMail(clientMail)
  ]);
};
