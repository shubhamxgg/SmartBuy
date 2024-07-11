/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "plus.unsplash.com",
      "images.unsplash.com",
      "m.media-amazon.com",
      "loremflickr.com",
      "picsum.photos",
      "example.com",
    ],
  },
};

export default nextConfig;
