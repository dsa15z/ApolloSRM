import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  message: string;
}

async function createHubSpotContact(data: ContactData) {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    console.log("HUBSPOT_API_KEY not configured — skipping HubSpot sync");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // Create the contact
  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({
      properties: {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        company: data.institution || undefined,
        hs_lead_status: "NEW",
        lifecyclestage: "lead",
      },
    }),
  });

  let contactId: string | undefined;

  if (response.ok) {
    const result = await response.json();
    contactId = result.id;
    console.log("HubSpot contact created:", contactId);
  } else if (response.status === 409) {
    // Contact already exists — update instead
    const error = await response.json();
    contactId = error.message?.match(/Existing ID: (\d+)/)?.[1];

    if (contactId) {
      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            properties: {
              firstname: data.firstName,
              lastname: data.lastName,
              phone: data.phone || undefined,
              company: data.institution || undefined,
            },
          }),
        }
      );

      if (updateResponse.ok) {
        console.log("HubSpot contact updated:", contactId);
      }
    }
  } else {
    const errorText = await response.text();
    throw new Error(`HubSpot contact API error (${response.status}): ${errorText}`);
  }

  // Create a note with the message, associated to the contact
  if (contactId && data.message) {
    const noteBody = `Website Contact Form Submission\n\nFrom: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nInstitution: ${data.institution || "Not provided"}\n\nMessage:\n${data.message}`;

    const noteResponse = await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
      method: "POST",
      headers,
      body: JSON.stringify({
        properties: {
          hs_timestamp: new Date().toISOString(),
          hs_note_body: noteBody,
        },
        associations: [
          {
            to: { id: contactId },
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 202,
              },
            ],
          },
        ],
      }),
    });

    if (noteResponse.ok) {
      console.log("HubSpot note created for contact:", contactId);
    } else {
      const noteError = await noteResponse.text();
      console.error("Failed to create HubSpot note:", noteError);
    }
  }
}

async function sendNotificationEmail(data: ContactData) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("RESEND_API_KEY not configured — skipping email notification");
    return;
  }

  const fromAddress = process.env.EMAIL_FROM || "ApolloSRM <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: "sales@apollosrm.com",
      reply_to: data.email,
      subject: `New Contact Form Submission — ${data.firstName} ${data.lastName}`,
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
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
                <td style="padding: 8px 0; font-size: 14px;">${data.phone ? `<a href="tel:${data.phone}" style="color: #2794EB;">${data.phone}</a>` : "Not provided"}</td>
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
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  console.log("Email sent via Resend:", result.id);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, institution, message } = body;

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

    const trimmedData: ContactData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      institution: (institution || "").trim(),
      message: message.trim(),
    };

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: trimmedData,
    });

    // Send email notification (non-blocking)
    sendNotificationEmail(trimmedData).catch((err) => {
      console.error("Failed to send notification email:", err);
    });

    // Create/update HubSpot contact + note (non-blocking)
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
