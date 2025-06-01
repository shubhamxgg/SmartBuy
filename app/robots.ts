import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account/",
        "/cart/",
        "/checkout/",
        "/admin/",
        "/admin/dashboard/",
        "/dashboard/",
        "/dashboard/orders/",
        "/dashboard/products/",
        "/dashboard/users/",
        "/dashboard/settings/",
        "/dashboard/analytics/",
        "/dashboard/reports/",
      ],
    },
    sitemap: "https://smartbuyx.netlify.app/sitemap.xml",
  };
}
