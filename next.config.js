const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; img-src 'self' data: blob: https://images.typeform.com https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com https://embed.typeform.com; font-src 'self' fonts.gstatic.com https://embed.typeform.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.live https://embed.typeform.com https://www.googletagmanager.com; connect-src 'self' https: https://www.google-analytics.com https://www.googletagmanager.com; frame-src 'self' https://form.typeform.com https://embed.typeform.com; frame-ancestors 'self';"
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  }
};

module.exports = nextConfig;
