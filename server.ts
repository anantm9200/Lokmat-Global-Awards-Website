import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface LokmatEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  imageUrl: string;
  logoUrl?: string;
  videoUrl?: string;
  gallery?: string[];
  createdAt: number;
}

// Initial seed data for Lokmat Events
let events: LokmatEvent[] = [
  {
    id: "7",
    title: "Lokmat Digital Transformation Summit",
    date: "2026-09-10",
    location: "Bangalore, Karnataka",
    description: "A premier summit bringing together tech leaders, innovators, and policymakers to discuss the roadmap for India's digital future.",
    category: "Upcoming Summit",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    createdAt: Date.now() - 5000,
  },
  {
    id: "4",
    title: "Lokmat Global Youth Conclave",
    date: "2026-11-15",
    location: "New Delhi, India",
    description: "An interactive platform for the youth to engage with global leaders and discuss the future of technology, entrepreneurship, and sustainable growth.",
    category: "Upcoming Conclave",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    createdAt: Date.now() - 10000,
  },
  {
    id: "1",
    title: "Lokmat Global Economic Convention – Singapore, 2024",
    date: "2024",
    location: "Singapore",
    description: "Held at the Shangri-La Hotel, this edition marked the first Lokmat Global Economic Convention, evolving beyond an awards ceremony into a platform for dialogue. It brought together business leaders, policymakers, and innovators to discuss global economic trends, entrepreneurship, and social impact. The “convention” format enabled panel discussions, exchanges, and actionable insights, positioning Lokmat as not just a recogniser of excellence, but a facilitator of global economic thought leadership.",
    category: "Past Convention",
    imageUrl: "https://static.wixstatic.com/media/548938_e7d535855ae14a3eab331ff35834918c~mv2.jpg",
    logoUrl: "https://static.wixstatic.com/media/548938_d803581c573846a8bf97d7f6bf982637~mv2.png",
    videoUrl: "https://video.wixstatic.com/video/548938_7509a0a87488442ca70f19ff9821dc87/1080p/mp4/file.mp4",
    gallery: [
      "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
      "https://static.wixstatic.com/media/548938_c3071a65c719496794c0badcec2dfe63~mv2.jpg",
      "https://static.wixstatic.com/media/548938_bd414512485f4f8d829f43bf08dddcd7~mv2.jpg",
      "https://static.wixstatic.com/media/548938_4f37d9ddf20743fe9a52e3db9eacc36d~mv2.jpg",
      "https://static.wixstatic.com/media/548938_67cac5d58a9e41628c58f9bf88989ffe~mv2.jpg"
    ],
    createdAt: Date.now() - 60000,
  },
  {
    id: "dubai-2023",
    title: "Lokmat International Awards – Dubai, 2023",
    date: "2023",
    location: "Dubai",
    description: "The Dubai edition marked Lokmat’s global debut, transforming the awards into an international platform of prestige and influence. Hosted at the Grand Hyatt, it brought together leaders across sectors and geographies. Its defining strength was storytelling—each awardee’s journey was presented with narrative depth and visual richness. As the first international edition, it established a bold, inclusive vision, blending recognition with cross-cultural dialogue.",
    category: "Past Award",
    imageUrl: "https://static.wixstatic.com/media/548938_e27482ebd1ef499db675193aa77055e0~mv2.jpg",
    logoUrl: "https://static.wixstatic.com/media/548938_a60af7ec1b614f34a373233455bbd3d7~mv2.png",
    videoUrl: "https://video.wixstatic.com/video/548938_fe4a1e10b26b44e6bfde7aa94966bd3b/480p/mp4/file.mp4",
    gallery: [
      "https://static.wixstatic.com/media/548938_e27482ebd1ef499db675193aa77055e0~mv2.jpg",
      "https://static.wixstatic.com/media/548938_2f1808df0b0b4e80a0ba733650a0db15~mv2.jpg",
      "https://static.wixstatic.com/media/548938_6dd00c145aac47b6bdf40b683f982968~mv2.jpg",
      "https://static.wixstatic.com/media/548938_a14443078d4b410191b30a24d8839c04~mv2.jpg",
      "https://static.wixstatic.com/media/548938_ec71c951ee4a481fa68dcb6d95d01b33~mv2.jpg",
      "https://static.wixstatic.com/media/548938_7bb51081bba74cdf921b3bc4cb4935a0~mv2.jpg"
    ],
    createdAt: Date.now() - 65000,
  },
  {
    id: "hong-kong-macau-2025",
    title: "Lokmat One World Summit & Awards – Hong Kong, 2025",
    date: "2025",
    location: "Hong Kong",
    description: "This edition marked Lokmat’s strategic entry into the Greater China region, positioning the platform within a key global economic corridor. Hosted in Hong Kong, it brought together voices from India across business, policy, and industry, reflecting the country’s global outlook and ambitions. The convention emphasized presence and engagement, creating visibility for Indian leadership while fostering dialogue on international markets, cross-border opportunities, and the evolving role of India on the global stage.",
    category: "Past Summit & Awards",
    imageUrl: "https://static.wixstatic.com/media/548938_c154eed85ef3434684d993283d8b3f5c~mv2.jpg",
    logoUrl: "https://static.wixstatic.com/media/548938_b6ac96c297934e36b9e0d49f52e67036~mv2.png",
    videoUrl: "https://video.wixstatic.com/video/548938_a451c54c18a848bfb0c1862c682082fd/1080p/mp4/file.mp4",
    gallery: [
      "https://static.wixstatic.com/media/548938_c154eed85ef3434684d993283d8b3f5c~mv2.jpg",
      "https://static.wixstatic.com/media/548938_367cb30d4c8d4dea8166c59be45d0e9e~mv2.jpg",
      "https://static.wixstatic.com/media/548938_fab36fabbc74484b9d4f9a66702fef69~mv2.jpg",
      "https://static.wixstatic.com/media/548938_c24b4439409d464396d71f6de15c588c~mv2.jpeg",
      "https://static.wixstatic.com/media/548938_30e8b7fde488472a881490e41fe8e18a~mv2.jpg",
      "https://static.wixstatic.com/media/548938_8eae2d53c2e0476a8b9a9251a04a4c75~mv2.jpg"
    ],
    createdAt: Date.now() - 67000,
  },
  {
    id: "london-2025",
    title: "Lokmat Global Economic Convention – London, 2025",
    date: "2025",
    location: "London",
    description: "Held at The Savoy, London, this edition elevated the Lokmat Global Economic Convention to a wider global stage, building on its Singapore debut. It brought together influential voices from politics, business, and social impact, alongside prominent global Indian leaders, creating a powerful confluence of perspectives. The platform enabled meaningful dialogue on economic direction, leadership, and responsibility, while recognitions such as Bharat Bhushan, Kohinoor of India Award, Maharashtra Ratna  and Global Sakhi Award added ceremonial prestige and gravitas.",
    category: "Past Convention",
    imageUrl: "https://static.wixstatic.com/media/548938_01de16ecda2648ee8f744a76a35e1a11~mv2.jpg",
    logoUrl: "https://static.wixstatic.com/media/548938_f73683c6cb494dae9d199c55838ddf01~mv2.png",
    videoUrl: "https://video.wixstatic.com/video/548938_9fe3ce3c905f4b5697077579576aa818/1080p/mp4/file.mp4",
    gallery: [
      "https://static.wixstatic.com/media/548938_01de16ecda2648ee8f744a76a35e1a11~mv2.jpg",
      "https://static.wixstatic.com/media/548938_1a80b09511e349ce901734792adee261~mv2.jpg",
      "https://static.wixstatic.com/media/548938_df252ce18e1b452fa31ce152c358856a~mv2.jpg",
      "https://static.wixstatic.com/media/548938_aea6244b1b4647ab81f194a1e49b41cd~mv2.jpg",
      "https://static.wixstatic.com/media/548938_1024fa5c4e6b41709f36a98f7d398d3a~mv2.jpg",
      "https://static.wixstatic.com/media/548938_677525051cc843be800ff94bdefbc0ef~mv2.jpg"
    ],
    createdAt: Date.now() - 68000,
  },
  {
    id: "mauritius-2026",
    title: "Lokmat One World Summit and Awards – Mauritius, 2026",
    date: "2026",
    location: "Mauritius",
    description: "The presence of the President of Mauritius, H.E. Shri Dharambeer Gokhool, gave the Mauritius chapter of the Lokmat One World Summit and Awards 2026 distinguished national importance and reinforced its global stature. Set against the Indian Ocean backdrop of Le Méridien Ile Maurice, the summit brought together diplomats, policymakers, business leaders, innovators and changemakers for a powerful exchange of ideas. The edition celebrated global excellence while opening conversations around leadership, entrepreneurship, sustainability, governance and social impact, with the deep India–Mauritius relationship at its centre.",
    category: "Past Summit & Awards",
    imageUrl: "https://static.wixstatic.com/media/548938_8a8b58b24b154fc79c713dd1158851b4~mv2.jpeg",
    logoUrl: "https://static.wixstatic.com/media/548938_438b462f94964b7db67be6832c7f0c8a~mv2.jpeg",
    videoUrl: "https://video.wixstatic.com/video/548938_52570e309bdb42edac5e01f01a264d5f/1080p/mp4/file.mp4",
    gallery: [
      "https://static.wixstatic.com/media/548938_8a8b58b24b154fc79c713dd1158851b4~mv2.jpeg",
      "https://static.wixstatic.com/media/548938_47996f2b5c7c4322a9370207163f6ae9~mv2.jpg",
      "https://static.wixstatic.com/media/548938_d15934ba524141deb0779fc8cbd64bb7~mv2.jpg",
      "https://static.wixstatic.com/media/548938_36487db666ce4772b122191bf4705bd4~mv2.jpeg",
      "https://static.wixstatic.com/media/548938_f8722bcc71334f99ab0c8ba71131ad04~mv2.jpeg",
      "https://static.wixstatic.com/media/548938_ce25e5bac0fd4e2a9a1b872ea78a0c99~mv2.jpg"
    ],
    createdAt: Date.now() - 68500,
  },
  {
    id: "cairo-2026",
    title: "Lokmat One World Summit and Awards – Cairo, 2026",
    date: "2026",
    location: "Cairo",
    description: "Held in Cairo, this edition further strengthened the One World Summit vision, bringing together global leaders, innovators, and industry voices on a shared platform. It emphasized cross-industry dialogue and collaborative thinking, blending recognition with meaningful intellectual exchange. Set against a city rich in civilizational legacy, the summit underscored leadership, innovation, and societal impact, while setting the stage for future editions, including the upcoming Mauritius chapter.",
    category: "Past Summit & Awards",
    imageUrl: "https://static.wixstatic.com/media/548938_e7d3e1979a4744b79da66690874091b9~mv2.jpg",
    logoUrl: "https://static.wixstatic.com/media/548938_37c105393e5d487895641e750062cf92~mv2.png",
    videoUrl: "https://video.wixstatic.com/video/548938_52570e309bdb42edac5e01f01a264d5f/1080p/mp4/file.mp4",
    gallery: [
      "https://static.wixstatic.com/media/548938_e7d3e1979a4744b79da66690874091b9~mv2.jpg",
      "https://static.wixstatic.com/media/548938_e5cba0d41a6d4055abe0f39a47e999af~mv2.jpg",
      "https://static.wixstatic.com/media/548938_eded7d8862064d0a888ef87d52bc2c76~mv2.png",
      "https://static.wixstatic.com/media/548938_53279ca9f3904e328d12683065dd528c~mv2.png",
      "https://static.wixstatic.com/media/548938_81bedd4917ff4b0ba80bc7792410c7ff~mv2.jpeg",
      "https://static.wixstatic.com/media/548938_f9ebcf54aed4463aa32d1f48d261d109~mv2.jpeg"
    ],
    createdAt: Date.now() - 69000,
  },
  {
    id: "baku-2024",
    title: "Lokmat One World Summit and Awards – Baku, 2024",
    date: "2024-11-20",
    location: "Baku, Azerbaijan",
    description: "Hosted at the iconic Flame Towers, this was the first edition of the Lokmat One World Summit and Awards, built on the idea of uniting diverse leaders under one global vision. The “One World” philosophy emphasized collaboration across industries, cultures, and nations. Bringing together over 150 leaders, it blended recognition with discussions on sustainability, innovation, and progress, creating a platform where challenges and shared futures could be addressed collectively.",
    category: "Past Summit & Awards",
    imageUrl: "https://static.wixstatic.com/media/548938_31fa24f8914e4eb19bd3b336095f4a0b~mv2.jpg",
    logoUrl: "https://static.wixstatic.com/media/548938_a5d6be6c6d8e45638fcb7df2bd13c34a~mv2.png",
    videoUrl: "https://video.wixstatic.com/video/548938_acb9d7cf46164d29abd916abcbf3bae3/1080p/mp4/file.mp4",
    gallery: [
      "https://static.wixstatic.com/media/548938_31fa24f8914e4eb19bd3b336095f4a0b~mv2.jpg",
      "https://static.wixstatic.com/media/548938_7c6fc72928a346979bc09fc548fb6f2c~mv2.jpg",
      "https://static.wixstatic.com/media/548938_178658f08f6d487697300102e2df05ed~mv2.jpg",
      "https://static.wixstatic.com/media/548938_df3137aca94d4ffdb8ec6f3730c99f92~mv2.jpg",
      "https://static.wixstatic.com/media/548938_dcbacbf1445148c099f17fee8dcd08d1~mv2.png",
      "https://static.wixstatic.com/media/548938_e72e0a23d7194c1cb1497c0c0fc99b6c~mv2.jpg"
    ],
    createdAt: Date.now() - 70000,
  }
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  app.get("/api/events", (req, res) => {
    // Return sorted by creation date (newest first)
    const sortedEvents = [...events].sort((a, b) => b.createdAt - a.createdAt);
    res.json(sortedEvents);
  });

  app.post("/api/events", (req, res) => {
    const newEvent: LokmatEvent = {
      ...req.body,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now(),
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
  });

  const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || "milan.darda@lokmat.com";

  let resendClient: Resend | null = null;
  function getResendClient(): Resend | null {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      return null;
    }
    if (!resendClient) {
      resendClient = new Resend(apiKey.trim());
    }
    return resendClient;
  }

  function formatFieldKey(key: string): string {
    const map: Record<string, string> = {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      subject: "Subject / Topic",
      designation: "Designation",
      industry: "Industry / Organization",
      message: "Message Details",
      source: "Source Form",
      company: "Company / Organization",
    };
    if (map[key.toLowerCase()]) return map[key.toLowerCase()];
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
  }

  interface FormSubmissionRecord {
    id: string;
    formType: "Contact Form" | "Enquiry Form" | "Newsletter Subscription";
    recipient: string;
    submittedAt: string;
    timestamp: number;
    data: Record<string, any>;
    resendDelivered?: boolean;
    resendEmailId?: string;
    resendError?: string;
    smtpDelivered?: boolean;
  }

  const submissionsStore: FormSubmissionRecord[] = [];

  async function deliverSubmissionEmail({
    formType,
    data,
  }: {
    formType: "Contact Form" | "Enquiry Form" | "Newsletter Subscription";
    data: Record<string, any>;
  }) {
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const submissionId = "SUB-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const subject = `[Lokmat Global] New ${formType} from ${data.name || data.email || "Visitor"}`;

    // Generate clean text table
    const textTable = `
+-------------------------------------------------------------------------------+
| LOKMAT GLOBAL - FORM SUBMISSION DETAILS (TABULAR FORMAT)                      |
+-------------------------------------------------------------------------------+
| FIELD                          | SUBMITTED VALUE                              |
+--------------------------------+----------------------------------------------+
| Form Type                      | ${formType.padEnd(44)} |
| Destination Email              | ${TARGET_EMAIL.padEnd(44)} |
| Submission ID                  | ${submissionId.padEnd(44)} |
| Date & Time (IST)              | ${timestamp.padEnd(44)} |
${Object.entries(data)
  .map(([k, v]) => `| ${formatFieldKey(k).padEnd(30)} | ${String(v).replace(/\r?\n/g, " ").slice(0, 44).padEnd(44)} |`)
  .join("\n")}
+--------------------------------+----------------------------------------------+
FULL MESSAGE:
${data.message || "(None)"}
+-------------------------------------------------------------------------------+
`;

    // Generate clean, high-contrast HTML table
    const htmlTable = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        <!-- Branded Header -->
        <div style="background-color: #e40009; padding: 24px 30px; text-align: left;">
          <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
            Lokmat Global Events
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
            New ${formType} Submission
          </h1>
          <p style="color: #fee2e2; margin: 6px 0 0 0; font-size: 13px;">
            Target Recipient: <strong style="color: #ffffff; text-decoration: underline;">${TARGET_EMAIL}</strong>
          </p>
        </div>
        
        <div style="padding: 26px 30px;">
          <!-- Meta Notice Banner -->
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 14px 18px; margin-bottom: 22px;">
            <table style="width: 100%; font-size: 13px; color: #991b1b; border-collapse: collapse;">
              <tr>
                <td style="padding: 2px 0;"><strong>Submission ID:</strong> ${submissionId}</td>
                <td style="padding: 2px 0; text-align: right;"><strong>Time:</strong> ${timestamp}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 2px 0;"><strong>Destination:</strong> ${TARGET_EMAIL}</td>
              </tr>
            </table>
          </div>

          <!-- Tabular Data -->
          <h2 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">
            Submitted Form Information (Tabular Format)
          </h2>

          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; font-size: 14px; text-align: left; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background-color: #111827; color: #ffffff;">
                <th style="padding: 12px 16px; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; width: 34%; border-right: 1px solid #374151;">
                  Field Name
                </th>
                <th style="padding: 12px 16px; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">
                  Submitted Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 16px; font-weight: 600; color: #4b5563; border-right: 1px solid #e5e7eb;">Form Type</td>
                <td style="padding: 12px 16px; color: #111827; font-weight: 700;">${formType}</td>
              </tr>
              <tr style="background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 16px; font-weight: 600; color: #4b5563; border-right: 1px solid #e5e7eb;">Recipient Email</td>
                <td style="padding: 12px 16px; color: #e40009; font-weight: 700;">${TARGET_EMAIL}</td>
              </tr>
              <tr style="background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 16px; font-weight: 600; color: #4b5563; border-right: 1px solid #e5e7eb;">Submission Time</td>
                <td style="padding: 12px 16px; color: #111827;">${timestamp}</td>
              </tr>
              ${Object.entries(data).map(([key, val], index) => {
                const bg = index % 2 === 0 ? "#ffffff" : "#f9fafb";
                const label = formatFieldKey(key);
                const formattedVal = String(val ?? "").replace(/\r?\n/g, "<br/>");
                return `
                  <tr style="background-color: ${bg}; border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px 16px; font-weight: 600; color: #4b5563; border-right: 1px solid #e5e7eb; vertical-align: top;">
                      ${label}
                    </td>
                    <td style="padding: 12px 16px; color: #111827; font-weight: 500; vertical-align: top; line-height: 1.6;">
                      ${formattedVal || '<span style="color: #9ca3af; font-style: italic;">(Not Provided)</span>'}
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>

          <div style="margin-top: 24px; padding: 14px 18px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.5;">
              This notification was generated from the Lokmat Global web portal and routed to <strong>${TARGET_EMAIL}</strong> via <strong>Resend</strong>.
            </p>
          </div>
        </div>
      </div>
    `;

    console.log(`\n[EMAIL DISPATCH] Routing form submission to: ${TARGET_EMAIL}`);
    console.log(textTable);

    let resendDelivered = false;
    let resendEmailId: string | undefined = undefined;
    let resendError: string | undefined = undefined;

    // 1. Dispatch via Resend
    const resend = getResendClient();
    if (resend) {
      try {
        const fromAddress = process.env.RESEND_FROM_EMAIL || "Lokmat Global <onboarding@resend.dev>";
        const replyToEmail = data.email && typeof data.email === "string" && data.email.includes("@") ? data.email.trim() : undefined;

        console.log(`[RESEND DISPATCH] Attempting to send email via Resend to ${TARGET_EMAIL} from ${fromAddress}...`);
        const { data: resendData, error: sendError } = await resend.emails.send({
          from: fromAddress,
          to: [TARGET_EMAIL],
          replyTo: replyToEmail,
          subject,
          text: textTable,
          html: htmlTable,
        });

        if (resendData && resendData.id) {
          resendDelivered = true;
          resendEmailId = resendData.id;
          console.log(`[RESEND DISPATCH] Successfully delivered email via Resend! ID: ${resendData.id}`);
        } else if (sendError) {
          resendError = sendError.message;
          console.error(`[RESEND DISPATCH ERROR] Resend returned error:`, sendError);
        }
      } catch (err: any) {
        resendError = err?.message || String(err);
        console.error(`[RESEND DISPATCH EXCEPTION] Exception during Resend email delivery:`, err);
      }
    } else {
      console.log(`[RESEND DISPATCH NOTICE] RESEND_API_KEY is not configured. Email formatted in tabular layout and recorded in system store.`);
    }

    // 2. Secondary SMTP fallback if configured
    let smtpDelivered = false;
    if (!resendDelivered && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587", 10),
          secure: process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Lokmat Global" <${process.env.SMTP_USER}>`,
          to: TARGET_EMAIL,
          replyTo: data.email || undefined,
          subject,
          text: textTable,
          html: htmlTable,
        });
        smtpDelivered = true;
        console.log(`[SMTP DISPATCH] Successfully sent email to ${TARGET_EMAIL} via SMTP fallback.`);
      } catch (err) {
        console.error("[SMTP DISPATCH] SMTP delivery encountered error:", err);
      }
    }

    const record: FormSubmissionRecord = {
      id: submissionId,
      formType,
      recipient: TARGET_EMAIL,
      submittedAt: timestamp,
      timestamp: Date.now(),
      data,
      resendDelivered,
      resendEmailId,
      resendError,
      smtpDelivered,
    };
    submissionsStore.unshift(record);

    // Save to disk
    try {
      const dataDir = path.resolve(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(path.join(dataDir, "submissions.json"), JSON.stringify(submissionsStore, null, 2));
    } catch (err) {
      console.error("Error writing submissions to disk:", err);
    }

    return {
      success: true,
      submissionId,
      recipient: TARGET_EMAIL,
      timestamp,
      resendDelivered,
      resendEmailId,
      resendError,
      smtpDelivered,
      data,
    };
  }

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body || {};
      if (!name || !message) {
        return res.status(400).json({ error: "Name and message are required" });
      }
      const result = await deliverSubmissionEmail({
        formType: "Contact Form",
        data: {
          name: String(name).trim(),
          email: String(email || "Not Provided").trim(),
          phone: String(phone || "Not Provided").trim(),
          subject: String(subject || "General Inquiry").trim(),
          message: String(message).trim(),
        },
      });
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to process contact form" });
    }
  });

  // Enquiry modal submission
  app.post("/api/enquiry", async (req, res) => {
    try {
      const { name, email, phone, designation, industry, message } = req.body || {};
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }
      const result = await deliverSubmissionEmail({
        formType: "Enquiry Form",
        data: {
          name: String(name).trim(),
          email: String(email).trim(),
          phone: String(phone || "Not Provided").trim(),
          designation: String(designation || "Not Provided").trim(),
          industry: String(industry || "Not Provided").trim(),
          message: String(message || "No additional message").trim(),
        },
      });
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to process enquiry" });
    }
  });

  const subscribers: Array<{ email: string; date: number }> = [];

  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body || {};
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    const cleanEmail = email.trim();
    subscribers.push({ email: cleanEmail, date: Date.now() });

    const result = await deliverSubmissionEmail({
      formType: "Newsletter Subscription",
      data: {
        email: cleanEmail,
        source: "Footer Newsletter Form",
      },
    });

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      recipient: TARGET_EMAIL,
      submissionId: result.submissionId,
    });
  });

  app.get("/api/forms/submissions", (req, res) => {
    res.json({
      targetEmail: TARGET_EMAIL,
      count: submissionsStore.length,
      submissions: submissionsStore,
    });
  });

  const isProduction = process.env.NODE_ENV === "production" || process.argv.some(arg => arg.includes("server.cjs"));
  // Vite middleware for development
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback for direct URL page requests in development mode
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.originalUrl.startsWith("/api")) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
