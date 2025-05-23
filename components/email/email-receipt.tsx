import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
  Hr,
} from "@react-email/components";

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export interface OrderItem {
  name: string;
  qty: number;
  price: string;
  image: string;
}

export interface SmartBuyReceiptEmailProps {
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  shipping: string;
  tax: string;
  subtotal: string;
  total: string;
  status: string;
  supportUrl: string;
}

export const SmartBuyReceiptEmail: React.FC<SmartBuyReceiptEmailProps> = ({
  orderId,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  status,
  supportUrl,
}) => (
  <Html>
    <Head />
    <Preview>Order #{orderId} confirmed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logoText}>Smart Buy</Text>
          <div style={statusContainer}>
            <div style={statusDot}></div>
            <Text style={statusText}>{status || "Confirmed"}</Text>
          </div>
        </Section>

        <Section style={orderSection}>
          <Text style={orderTitle}>Order #{orderId}</Text>
          <Text style={orderDatex}>{formatDate(orderDate)}</Text>
        </Section>

        <Section style={itemsSection}>
          {items.map((item, i) => (
            <div key={i} style={i % 2 === 0 ? itemRowEven : itemRowOdd}>
              <div style={itemInfo}>
                <Text style={itemName}>{item.name}</Text>
                <Text style={itemDetails}>Qty {item.qty}</Text>
              </div>
              <Text style={itemPrice}>{item.price}</Text>
            </div>
          ))}
        </Section>

        <Hr style={divider} />

        <Section style={summarySection}>
          <div style={summaryRow}>
            <Text style={summaryLabel}>Subtotal</Text>
            <Text style={summaryValue}>{subtotal}</Text>
          </div>
          <div style={summaryRow}>
            <Text style={summaryLabel}>Shipping</Text>
            <Text style={summaryValue}>{shipping}</Text>
          </div>
          <div style={summaryRow}>
            <Text style={summaryLabel}>Tax</Text>
            <Text style={summaryValue}>{tax}</Text>
          </div>
          <div style={totalRow}>
            <Text style={totalLabel}>Total</Text>
            <Text style={totalValue}>{total}</Text>
          </div>
        </Section>

        <Hr style={divider} />

        <Section style={actionSection}>
          <Link href={supportUrl} style={actionButton}>
            Track Order
          </Link>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Questions? Reply to this email or contact{" "}
            <Link href="mailto:support@smartbuy.com" style={footerLink}>
              support@smartbuy.com
            </Link>
          </Text>
          <Text style={copyright}>© {new Date().getFullYear()} Smart Buy</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f8fafc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 20px",
};

const container = {
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  overflow: "hidden",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const header = {
  padding: "32px 32px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #f1f5f9",
  backgroundColor: "#fefefe",
};

const logoText = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#0f172a",
  margin: 0,
};

const statusContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#f0fdf4",
  padding: "6px 12px",
  borderRadius: "20px",
  border: "1px solid #dcfce7",
};

const statusDot = {
  width: "8px",
  height: "8px",
  backgroundColor: "#22c55e",
  borderRadius: "50%",
};

const statusText = {
  color: "#16a34a",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const orderSection = {
  padding: "24px 32px",
  borderBottom: "1px solid #f1f5f9",
  backgroundColor: "#fafbfc",
};

const orderTitle = {
  color: "#0f172a",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 4px",
  letterSpacing: "-0.025em",
};

const orderDatex = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "400",
  margin: "0",
};

const itemsSection = {
  padding: "24px 32px",
  backgroundColor: "#ffffff",
};

const itemRowEven = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "16px",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  border: "1px solid #f1f5f9",
};

const itemRowOdd = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "16px",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "#f8fafc",
  border: "1px solid #f1f5f9",
};

const itemInfo = {
  flex: "1",
  minWidth: "0",
};

const itemName = {
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "500",
  margin: "0 0 2px",
  lineHeight: "1.4",
};

const itemDetails = {
  color: "#64748b",
  fontSize: "13px",
  fontWeight: "400",
  margin: "0",
};

const itemPrice = {
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "600",
  margin: "0",
  textAlign: "right" as const,
  flexShrink: "0",
};

const divider = {
  margin: "0",
  borderColor: "#e2e8f0",
  borderWidth: "1px 0 0 0",
};

const summarySection = {
  padding: "24px 32px",
  backgroundColor: "#f8fafc",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

const summaryLabel = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "400",
  margin: "0",
};

const summaryValue = {
  color: "#0f172a",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "16px",
  paddingTop: "16px",
  borderTop: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  padding: "16px",
  borderRadius: "8px",
  marginLeft: "-16px",
  marginRight: "-16px",
};

const totalLabel = {
  color: "#0f172a",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const totalValue = {
  color: "#0f172a",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0",
};

const actionSection = {
  padding: "24px 32px",
  textAlign: "center" as const,
  borderTop: "1px solid #f1f5f9",
  backgroundColor: "#ffffff",
};

const actionButton = {
  display: "inline-block",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  transition: "background-color 0.2s ease",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
};

const footer = {
  padding: "24px 32px",
  textAlign: "center" as const,
  backgroundColor: "#f1f5f9",
  borderTop: "1px solid #e2e8f0",
};

const footerText = {
  color: "#64748b",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 12px",
};

const footerLink = {
  color: "#0f172a",
  textDecoration: "underline",
};

const copyright = {
  color: "#94a3b8",
  fontSize: "12px",
  margin: "0",
};
