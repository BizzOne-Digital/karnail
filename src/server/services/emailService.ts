import nodemailer from 'nodemailer';
import { config } from '@/server/config';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: config.smtp.user
    ? {
        user: config.smtp.user,
        pass: config.smtp.pass,
      }
    : undefined,
});

const emailStyles = `
  body { font-family: 'Georgia', serif; background: #090807; color: #F4E6D0; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; background: #15110F; border: 1px solid #681923; }
  .header { background: #681923; padding: 30px; text-align: center; }
  .header h1 { color: #F4E6D0; margin: 0; font-size: 24px; }
  .content { padding: 30px; }
  .content p { line-height: 1.6; color: #DCC7AA; }
  .field { margin-bottom: 15px; }
  .field-label { color: #B78A4D; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
  .field-value { color: #F4E6D0; font-size: 16px; margin-top: 4px; }
  .footer { background: #090807; padding: 20px; text-align: center; font-size: 12px; color: #A89E92; }
  .accent { color: #9E2531; }
`;

function wrapEmail(content: string, title: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header"><h1>${title}</h1></div>
        <div class="content">${content}</div>
        <div class="footer">
          <p>Sukh D. H. Khokhar | Mystery Art & Visual Storytelling</p>
          <p><a href="mailto:Sukh2@live.com" style="color:#B78A4D">Sukh2@live.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  artworkOrService?: string;
  message: string;
  referenceNumber?: string;
}

export async function sendContactEmails(data: ContactEmailData): Promise<void> {
  if (!config.smtp.user) {
    console.log('SMTP not configured, skipping email send');
    return;
  }

  const adminContent = `
    <p>A new enquiry has been received:</p>
    ${data.referenceNumber ? `<div class="field"><div class="field-label">Reference</div><div class="field-value">${data.referenceNumber}</div></div>` : ''}
    <div class="field"><div class="field-label">Name</div><div class="field-value">${data.name}</div></div>
    <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
    ${data.phone ? `<div class="field"><div class="field-label">Phone</div><div class="field-value">${data.phone}</div></div>` : ''}
    <div class="field"><div class="field-label">Enquiry Type</div><div class="field-value">${data.enquiryType}</div></div>
    ${data.artworkOrService ? `<div class="field"><div class="field-label">Artwork/Service</div><div class="field-value">${data.artworkOrService}</div></div>` : ''}
    <div class="field"><div class="field-label">Message</div><div class="field-value">${data.message}</div></div>
  `;

  const customerContent = `
    <p>Dear ${data.name},</p>
    <p>Thank you for reaching out to Sukh D. H. Khokhar. Your enquiry has been received and will be reviewed shortly.</p>
    ${data.referenceNumber ? `<p>Your reference number is: <span class="accent">${data.referenceNumber}</span></p>` : ''}
    <p>We aim to respond within 48 hours.</p>
    <p>With warm regards,<br/>Sukh D. H. Khokhar</p>
  `;

  await Promise.all([
    transporter.sendMail({
      from: `"${config.smtp.user}" <${config.smtp.user}>`,
      to: config.adminNotificationEmail,
      subject: `New Enquiry: ${data.enquiryType} - ${data.name}`,
      html: wrapEmail(adminContent, 'New Enquiry Received'),
    }),
    transporter.sendMail({
      from: `"Sukh D. H. Khokhar" <${config.smtp.user}>`,
      to: data.email,
      subject: 'Thank you for your enquiry - Sukh D. H. Khokhar',
      html: wrapEmail(customerContent, 'Enquiry Received'),
    }),
  ]);
}

export async function sendOrderEmails(data: {
  referenceNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  items: { productTitle: string; quantity: number }[];
  message?: string;
}): Promise<void> {
  if (!config.smtp.user) {
    console.log('SMTP not configured, skipping email send');
    return;
  }

  const itemsList = data.items
    .map((item) => `<li>${item.productTitle} (Qty: ${item.quantity})</li>`)
    .join('');

  const adminContent = `
    <p>A new order request has been received:</p>
    <div class="field"><div class="field-label">Reference</div><div class="field-value">${data.referenceNumber}</div></div>
    <div class="field"><div class="field-label">Customer</div><div class="field-value">${data.customerName}</div></div>
    <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
    <div class="field"><div class="field-label">Items</div><ul>${itemsList}</ul></div>
    ${data.message ? `<div class="field"><div class="field-label">Message</div><div class="field-value">${data.message}</div></div>` : ''}
  `;

  const customerContent = `
    <p>Dear ${data.customerName},</p>
    <p>Thank you for your order request. We have received your enquiry and will be in touch shortly regarding availability and pricing.</p>
    <p>Your reference number is: <span class="accent">${data.referenceNumber}</span></p>
    <p>With warm regards,<br/>Sukh D. H. Khokhar</p>
  `;

  await Promise.all([
    transporter.sendMail({
      from: `"${config.smtp.user}" <${config.smtp.user}>`,
      to: config.adminNotificationEmail,
      subject: `New Order Request: ${data.referenceNumber}`,
      html: wrapEmail(adminContent, 'New Order Request'),
    }),
    transporter.sendMail({
      from: `"Sukh D. H. Khokhar" <${config.smtp.user}>`,
      to: data.email,
      subject: `Order Request Received - ${data.referenceNumber}`,
      html: wrapEmail(customerContent, 'Order Request Received'),
    }),
  ]);
}
