import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/aditya999/**',
      }
    ],
    domains: ["lh3.googleusercontent.com"],
  }
};

export default nextConfig;
