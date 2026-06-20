import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'burst.shopifycdn.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'sendbird.imgix.net' },
      { protocol: 'https', hostname: 'www.typingcore.com' }
    ]
  }
};

export default nextConfig;
