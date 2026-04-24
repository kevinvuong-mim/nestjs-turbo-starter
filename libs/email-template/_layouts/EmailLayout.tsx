import { Body, Font, Head, Html, Section, Text, } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export const EmailLayout = ({ children, unsubscribeLink='#' }: { children: React.ReactNode, unsubscribeLink?: string }) => {

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Plus Jakarta Sans"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
            format: 'woff2',
          }}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Body
          className="bg-[#f2f3f8]"
        >
          {children}
          <Section className='text-center text-[#4B5565] text-sm my-10'>
            <Text className='mb-6 mt-0'>© AI Agent 2024. All rights reserved</Text>
            <Text className='text-xs text-[#4B5565] m-0'>
              You are receiving this email because you are a member of AI Agent.{' '}
              <a href={unsubscribeLink} className='text-[#2254F6] no-underline'>
                Unsubscribe
              </a>
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};
