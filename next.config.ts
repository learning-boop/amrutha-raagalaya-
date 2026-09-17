import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The online trial-booking page was removed; send old links to the enquiry forms.
      { source: "/book-trial", destination: "/contact", permanent: true },
    ];
  },
  images: {
    // Photos uploaded through /admin are served from Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },
};

export default nextConfig;
