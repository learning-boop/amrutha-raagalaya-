import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The online trial-booking page was removed; send old links to the enquiry forms.
      { source: "/book-trial", destination: "/contact", permanent: true },
      // This post was published before its address was built from the title;
      // the original link may have been shared, so keep it working.
      { source: "/blog/untitled-2026-09-15-2", destination: "/blog/importance-of-music", permanent: true },
    ];
  },
  images: {
    // Photos uploaded through /admin are served from Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },
};

export default nextConfig;
