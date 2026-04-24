import { render } from '@react-email/components'

export { ResetYourPasswordEmail } from './emails/reset-your-password'

/**
 * Render an email component with the given props
 * @example
 * import {renderEmail, PasswordUpdatedEmail} from '@repo/email-template'
 * const html = await renderEmail(ResetYourPasswordEmail, { name: 'hoang' });
 * ses.sendMail({
 *  to: 'hoang@gmail.com',
 *  subject: 'Reset your password',
 *  html,
 * })
 */
export async function renderEmail<T extends Record<string, any>>(
	Component: React.FC<T>,
	props: T
) {
	const html = await render(<Component {...props} />)
	return html
}
