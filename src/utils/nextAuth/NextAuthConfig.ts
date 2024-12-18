import User from '@/database/User';
import dbConnect from '@/lib/dbConnect';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const AuthConfig: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			type: 'credentials',
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			// The authorize function is called the first time a user signs in.
			async authorize(credentials) {
				await dbConnect();
				if (!credentials) throw new Error(`No paramaeters given.`);
				if (!credentials.email) throw new Error(`Email is required.`);
				if (!credentials.password)
					throw new Error(`Password is required.`);

				try {
					const UserData = await User.findUserByCredentials(
						credentials.email,
						credentials.password,
					);
					if (!UserData)
						throw new Error(`Email or Password is invalid.`);

					return {
						id: UserData.userId.toString(),
						fullName: UserData.fullName,
						email: UserData.email,
						phone: UserData.phone,
						keySession: UserData.keySession,
						role: UserData.role,
					} as any;
				} catch (err) {
					throw new Error(err as any);
				}
			},
		}),
	],
	callbacks: {
		async signIn(params) {
			const { user, account } = params;
			if (account?.provider === 'credentials') {
				return true;
			}

			return false;
		},
		async redirect({ url, baseUrl }) {
			const callbackUrl = new URL(url, baseUrl).searchParams.get(
				'callbackUrl',
			);
			return callbackUrl ?? baseUrl;
		},
		// https://reacthustle.com/blog/extend-user-session-nextauth-typescript
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.fullName = user.fullName;
				token.email = user.email;
				token.phone = user.phone;
				token.keySession = user.keySession;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			await dbConnect();

			/* Step 2: update the session.user based on the token object */
			if (token && session.user) {
				if (
					!(await User.isValidKeySession(
						parseInt(token.id),
						token.keySession,
					))
				)
					throw `${token.id} | must be re-authorized.`;

				session.user = token;
			}
			return session;
		},
	},
	session: {
		maxAge: 3 * 24 * 60 * 60, // 3 days
	},
	jwt: {
		maxAge: 3 * 24 * 60 * 60, // 3 days
	},
};

export default AuthConfig;
