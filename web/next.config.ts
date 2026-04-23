import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // @azri/content is a local workspace package; transpile it from source.
  transpilePackages: ["@azri/content"],
  // Healthcare posture: conservative defaults. Tighten when real endpoints land.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default config;
