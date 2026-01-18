import './globals.css'
import SessionProvider from '@/providers/client-session-provider'
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	)
}
