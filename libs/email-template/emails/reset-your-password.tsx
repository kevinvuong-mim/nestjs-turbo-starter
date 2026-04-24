import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const ResetYourPasswordEmail = ({
  resetPasswordUrl = "https://www.google.com/",
  unsubscribeLink = "",
}: {
  resetPasswordUrl?: string;
  unsubscribeLink?: string;
}) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="m-0 p-0 font-['Plus_Jakarta_Sans',_Arial,_Helvetica,_sans-serif] text-[#121926]"
        style={{
          background: "linear-gradient(#2254F6 164px, #f2f3f8 0)",
        }}
      >
        {/* White box content */}
        <Container className="bg-white rounded-2xl max-w-[600px] mt-[100px] mx-auto p-10 text-left">
          {/* Title */}
          <Section className="text-center">
            <Text className="text-[32px] leading-[42px] font-semibold m-0">
              Forgot Your Password?
            </Text>
            <Text className="text-[32px] leading-[42px] font-semibold m-0">
              Let’s Reset It
            </Text>
          </Section>

          <Hr className="border-0 border-t border-[#2225291A] my-6" />

          {/* Body text */}
          <Section>
            <Text className="m-0 mb-4">
              It looks like you requested a password reset for your AI Agent account.
            </Text>
            <Text className="m-0 mb-6">
              To reset your password, click the button below.
            </Text>

            {/* Button */}
            <Section className="text-left mb-6">
              <Button
                href={resetPasswordUrl}
                className="bg-[#2254F6] text-white px-6 py-3 rounded-lg font-semibold text-[16px] no-underline inline-block"
              >
                Reset my password
              </Button>
            </Section>

            <Text className="m-0 mb-2">
              For your security, this link will expire in{" "}
              <span className="text-[#EB5146] font-semibold">15 minutes</span>.
            </Text>
            <Text className="m-0 mb-2">
              Please click the button before it expires.
            </Text>
            <Text className="m-0">
              Didn’t sign up for AI Agent? No worries — just ignore this email.
            </Text>
          </Section>
        </Container>

        {/* Footer */}
        <Section className="text-center text-[#4B5565] text-[14px] my-10">
          <Text className="m-0 mb-3">© AI Agent 2024. All rights reserved</Text>
          <Text className="m-0 text-[12px]">
            You are receiving this email because you are a member of AI Agent.{" "}
            <a href={unsubscribeLink} className="text-[#2254F6] no-underline">
              Unsubscribe
            </a>
          </Text>
        </Section>
      </Body>
    </Tailwind>
  </Html>
);

export default ResetYourPasswordEmail;