/** @type {import('next').NextConfig} */
import MillionCompiler from "@million/lint";
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "plus.unsplash.com",
      "images.unsplash.com",
      "m.media-amazon.com",
      "loremflickr.com",
      "picsum.photos",
      "img.clerk.com",
    ],
  },
};

export default nextConfig;
// export default MillionCompiler.next({
//   rsc: true,
// })(nextConfig);
