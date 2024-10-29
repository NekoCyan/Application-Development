import { PATTERN, ResponseText } from '@/utils';
import { Password_Compare, Password_Hash } from '@/utils/Password';
import mongoose from 'mongoose';
import Counter from './Counter';
import { IUser, IUserMethods, IUserModel, IUserStatics } from './interfaces';

const UserSchema = new mongoose.Schema<
	IUser,
	IUserModel,
	IUserMethods,
	{},
	{},
	IUserStatics
>(
	{
		userId: {
			type: Number,
			unique: true,
		},
		password: {
			type: String,
			required: [true, ResponseText.Required('password')],
			minlength: [6, ResponseText.MinLength('password', 6)],
		},
		email: {
			type: String,
			required: [true, ResponseText.Required('email')],
			match: [PATTERN.EMAIL, ResponseText.Invalid('email')],
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
			default: '',
		},
		isPhoneVerified: {
			type: Boolean,
			default: false,
		},
		fullName: {
			type: String,
			required: [true, ResponseText.Required('fullName')],
		},
		address: {
			type: String,
			default: '',
		},
		country: {
			type: String,
			default: '',
		},
		city: {
			type: String,
			default: '',
		},
		zip: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			default: 'USER',
		},
		keySession: {
			type: String,
			default: '',
		},
		image: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	},
);

// methods.
UserSchema.method('comparePassword', async function (password: string): Promise<
	ReturnType<IUserMethods['comparePassword']>
> {
	return Password_Compare(password, this.password);
});
UserSchema.methods = {
	generateKeySession() {
		return Buffer.from(Date.now().toString()).toString('hex');
	},
	comparePassword(password) {
		return Password_Compare(password, this.password);
	},
};

// statics.
UserSchema.statics = {
	async findUserByCredentials(email, password) {
		const user = await this.findOne({ email: email.toLowerCase() });
		if (!user) throw new Error(ResponseText.InvalidEmailOrPassword);
		const isMatch = await user.comparePassword(password);
		if (!isMatch) throw new Error(ResponseText.InvalidEmailOrPassword);

		let returnObj = {
			userId: user.userId,
			email: user.email,
			phone: user.phone,
			fullName: user.fullName,
			role: user.role,
			keySession: user.keySession,
		};

		return returnObj;
	},
	async createUser(data) {
		if ([data.email, data.password, data.fullName].some((x) => !x))
			throw new Error(ResponseText.DataIsMissing);
		if (await this.exists({ email: data.email }))
			throw new Error(ResponseText.AlreadyExists('email'));

		return this.create({
			email: data.email,
			password: data.password,
			fullName: data.fullName,
		});
	},
	async isValidKeySession(userId, keySession) {
		return !!(await this.exists({ userId, keySession }));
	},
	async isAdmin(userId) {
		return !!(await this.exists({ userId, role: 'ADMIN' }));
	},
};

// middleware.
UserSchema.pre('save', async function (next): Promise<void> {
	const hashPass = async () => {
		this.password = await Password_Hash(this.password);
	};

	if (this.isNew) {
		this.userId = await Counter.getNextSequence(User, 'userId');
	}

	if (this.isModified('password')) await hashPass();
	if (this.isModified('email')) this.email = this.email.toLowerCase();

	if (this.isModified('password') || this.isModified('email')) {
		this.keySession = this.generateKeySession();
	}

	next();
});
UserSchema.pre('validate', function (next): void {
	const passwordLower = this.password.toLowerCase();
	const emailLower = this.email.toLowerCase();
	if (
		[
			emailLower.includes(passwordLower),
			passwordLower.includes(emailLower),
		].some((x) => x === true)
	)
		throw new Error(ResponseText.TooWeak('Password'));

	next();
});

const User =
	(mongoose.models.User as IUserModel) ||
	mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;
