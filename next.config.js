/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // ⚠️ Замени 'kristina-march8' на название своего GitHub-репозитория
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
