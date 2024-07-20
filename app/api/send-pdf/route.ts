import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new IncomingForm();
  console.log(req);
  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      // Cast req to any to avoid type issues
      if (err) {
        console.error("Error parsing form:", err);
        return resolve(
          NextResponse.json({ error: "Error parsing form" }, { status: 500 })
        );
      }

      const file = files.pdf as formidable.File[];
      if (!file || file.length === 0) {
        return resolve(
          NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        );
      }

      const pdfFile = file[0];
      const pdfBuffer = fs.readFileSync(pdfFile.filepath);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.NEXT_PUBLIC_GMAIL_FROM,
          pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "gokhulb2001@gmail.com",
        to: "gokulbbs1@gmail.com",
        subject: "EMI Details Report",
        text: "Please find attached the EMI Details Report.",
        attachments: [
          {
            filename: "emi-details.pdf",
            content: pdfBuffer,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return resolve(
            NextResponse.json({ error: "Error sending email" }, { status: 500 })
          );
        }

        resolve(
          NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
          )
        );
      });
    });
  });
}
