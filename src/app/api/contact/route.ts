import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

async function createHubSpotContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  message: string;
}) {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    console.log("HUBSPOT_API_KEY not configured — skipping HubSpot sync");
    return;
  }

  // First try to create the contact
  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        company: data.institution || undefined,
        hs_lead_status: "NEW",
        lifecyclestage: "lead",
        message: data.message,
      },
    }),
  });

  if (response.ok) {
    const result = await response.json();
    console.log("HubSpot contact created:", result.id);
    return result.id;
  }

  // If contact already exists (409 conflict), update instead
  if (response.status === 409) {
    const error = await response.json();
    const existingId = error.message?.match(/Existing ID: (\d+)/)?.[1];

    if (existingId) {
      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            properties: {
              firstname: data.firstName,
              lastname: data.lastName,
              company: data.institution || undefined,
              message: data.message,
            },
          }),
        }
      );

      if (updateResponse.ok) {
        console.log("HubSpot contact updated:", existingId);
        return existingId;
      }
    }
  }

  const errorText = await response.text();
  throw new Error(`HubSpot API error (${response.status}): ${errorText}`);
}

async function sendNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  message: string;
}) {
  // Only send if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured — skipping email notification");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"ApolloSRM Website" <${fromAddress}>`,
    to: "sales@apollosrm.com",
    replyTo: data.email,
    subject: `New Contact Form Submission — ${data.firstName} ${data.lastName}`,
    text: [
      `New contact form submission from the ApolloSRM website:`,
      ``,
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Institution: ${data.institution || "Not provided"}`,
      ``,
      `Message:`,
      data.message,
      ``,
      `---`,
      `This email was sent automatically from apollosrm.com`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #031225; padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: #2794EB; margin: 0;">New Contact Form Submission</h2>
        </div>
        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name:</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #2794EB;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Institution:</td>
              <td style="padding: 8px 0; font-size: 14px;">${data.institution || "Not provided"}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px;">Message:</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
            Reply directly to this email to respond to ${data.firstName}.
          </p>
        </div>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, institution, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const trimmedData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      institution: (institution || "").trim(),
      message: message.trim(),
    };

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: trimmedData,
    });

    // Send email notification (non-blocking — don't fail the request if email fails)
    sendNotificationEmail(trimmedData).catch((err) => {
      console.error("Failed to send notification email:", err);
    });

    // Create/update HubSpot contact as a new lead (non-blocking)
    createHubSpotContact(trimmedData).catch((err) => {
      console.error("Failed to sync contact to HubSpot:", err);
    });

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
