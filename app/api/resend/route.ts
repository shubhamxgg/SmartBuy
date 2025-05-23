import { SmartBuyReceiptEmail } from "@/components/email/email-receipt";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Email body:", body);
    const { data, error } = await resend.emails.send({
      from: "Smart Buy <onboarding@resend.dev>",
      to: ["shubhamxgg@gmail.com"],
      subject: "Your Smart Buy Order Confirmation",
      react: SmartBuyReceiptEmail({
        orderId: body.orderId,
        orderDate: body.orderDate,
        items: body.items,
        subtotal: body.subtotal,
        shipping: body.shipping,
        tax: "0",
        total: body.total,
        status: body.status,
        supportUrl: "http://support.smartbuy.com",
      }),
    });

    if (error) {
      console.log("Error sending email:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log("Error sending email:", error);
    return Response.json({ error }, { status: 500 });
  }
}
