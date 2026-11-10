/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/rooms/deluxe-cottage',
        destination: '/rooms/deluxe-double-room',
        permanent: false,
      },
      {
        source: '/rooms/executive-suite',
        destination: '/rooms/executive-double-room',
        permanent: false,
      },
      {
        source: '/rooms/family-villa',
        destination: '/rooms/standard-double-room-fan',
        permanent: false,
      },
      {
        source: '/rooms/cottage-deluxe',
        destination: '/rooms/deluxe-double-room',
        permanent: false,
      },
      {
        source: '/rooms/cottage-suite',
        destination: '/rooms/executive-double-room',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
