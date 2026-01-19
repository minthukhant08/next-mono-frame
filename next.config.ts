import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
	reactStrictMode: false,
	output: 'standalone',
	turbopack: {},
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve('./src')
		return config
	},
}

export default nextConfig
