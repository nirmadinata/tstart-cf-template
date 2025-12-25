import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

type AdminInvitationProps = {
	inviteeName?: string;
	inviterName?: string;
	inviteLink?: string;
	companyName?: string;
};

export function AdminInvitation({
	inviteeName = "there",
	inviterName = "The Team",
	inviteLink = "https://example.com/accept-invite",
	companyName = "Our Company",
}: AdminInvitationProps) {
	return (
		<Html>
			<Head />
			<Preview>
				✨ You've been invited to join {companyName} as an admin
			</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* Header with gradient */}
					<Section style={header}>
						<Text style={headerEmoji}>🎉</Text>
						<Heading style={h1}>You're Invited!</Heading>
						<Text style={subtitle}>Join {companyName} as an Administrator</Text>
					</Section>

					{/* Main content card */}
					<Section style={card}>
						<Text style={greeting}>Hi {inviteeName},</Text>
						<Text style={text}>
							Great news! <strong>{inviterName}</strong> has invited you to join{" "}
							<strong>{companyName}</strong> with administrator privileges.
						</Text>
						<Text style={text}>
							As an admin, you'll have full access to manage and configure the
							platform.
						</Text>

						{/* Call to action button */}
						<Section style={buttonContainer}>
							<Button href={inviteLink} style={button}>
								Accept Invitation →
							</Button>
						</Section>

						{/* Secondary link */}
						<Text style={linkText}>
							Or copy this link:{" "}
							<Link href={inviteLink} style={link}>
								{inviteLink}
							</Link>
						</Text>
					</Section>

					{/* Footer */}
					<Section style={footerSection}>
						<Hr style={hr} />
						<Text style={footer}>
							This invitation was sent to you by {inviterName}. If you weren't
							expecting this, you can safely ignore this email.
						</Text>
						<Text style={footerSmall}>
							© {new Date().getFullYear()} {companyName}. All rights reserved.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

export default AdminInvitation;

// Styles
const main = {
	backgroundColor: "#f0f4f8",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
	padding: "20px 0",
};

const container = {
	margin: "0 auto",
	maxWidth: "600px",
};

const header = {
	backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	borderRadius: "16px 16px 0 0",
	padding: "48px 40px",
	textAlign: "center" as const,
};

const headerEmoji = {
	fontSize: "48px",
	margin: "0 0 16px 0",
	lineHeight: "1",
};

const h1 = {
	color: "#ffffff",
	fontSize: "32px",
	fontWeight: "700",
	margin: "0 0 8px 0",
	padding: "0",
	lineHeight: "1.2",
};

const subtitle = {
	color: "rgba(255, 255, 255, 0.9)",
	fontSize: "16px",
	fontWeight: "400",
	margin: "0",
	lineHeight: "1.5",
};

const card = {
	backgroundColor: "#ffffff",
	padding: "40px",
	borderRadius: "0 0 16px 16px",
	boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
};

const greeting = {
	color: "#1a202c",
	fontSize: "20px",
	fontWeight: "600",
	margin: "0 0 24px 0",
	lineHeight: "1.4",
};

const text = {
	color: "#4a5568",
	fontSize: "16px",
	lineHeight: "1.6",
	margin: "0 0 16px 0",
};

const buttonContainer = {
	margin: "32px 0",
	textAlign: "center" as const,
};

const button = {
	backgroundColor: "#667eea",
	borderRadius: "8px",
	color: "#ffffff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "inline-block",
	padding: "14px 32px",
	boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
	transition: "all 0.2s ease",
};

const linkText = {
	color: "#718096",
	fontSize: "14px",
	lineHeight: "1.5",
	margin: "24px 0 0 0",
	textAlign: "center" as const,
};

const link = {
	color: "#667eea",
	textDecoration: "none",
	fontWeight: "500",
	wordBreak: "break-all" as const,
};

const footerSection = {
	padding: "0 40px 40px",
};

const hr = {
	borderColor: "#e2e8f0",
	margin: "32px 0 24px 0",
	borderTop: "1px solid #e2e8f0",
};

const footer = {
	color: "#718096",
	fontSize: "14px",
	lineHeight: "1.6",
	margin: "0 0 16px 0",
	textAlign: "center" as const,
};

const footerSmall = {
	color: "#a0aec0",
	fontSize: "12px",
	lineHeight: "1.5",
	margin: "0",
	textAlign: "center" as const,
};
