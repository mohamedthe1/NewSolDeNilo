import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { name, phone, email, message } = body;

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "wasettravel@outlook.com" }],
            subject: `New Contact Form Submission from ${name}`,
          },
        ],
        from: { email: "mohamedahmed33m11@gmail.com" }, // بريدك الموثق
        content: [
          {
            type: "text/html",
            value: `
              <html>
                <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
                  <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.1); padding:30px;">
                    <h2 style="color:#0066cc; text-align:center;">📩 New Contact Form Submission</h2>
                    <p><strong>👤 Name:</strong> ${name}</p>
                    <p><strong>📞 Phone:</strong> ${phone}</p>
                    <p><strong>✉️ Email:</strong> ${email}</p>
                    <p><strong>📝 Message:</strong></p>
                    <div style="background:#f9f9f9; border-left:4px solid #0066cc; padding:15px; border-radius:6px;">
                      ${message}
                    </div>
                    <hr />
                    <p style="font-size:12px; color:#888; text-align:center;">
                      ✨ This message was sent via WASET Travel Contact Form ✨
                    </p>
                  </div>
                </body>
              </html>
            `,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error sending email:", errorText);
      return NextResponse.json({ success: false, error: errorText }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
