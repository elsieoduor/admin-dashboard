/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // domains: [
      //   'placehold.co',
      //   'example.com',
      //   'another-example.com',
      //   'lh3.googleusercontent.com', 
      // ],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', 
        },
        {
          protocol: 'http',
          hostname: '**', 
        },
      ],
    },
  };
  
  export default nextConfig;
  