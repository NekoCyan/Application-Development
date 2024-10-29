import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult } from './ExternalDocument';

export interface BasicUserData {
	password: string;
}
export interface EmailUserData {
	email: string;
	isEmailVerified: boolean;
}
export interface PhoneUserData {
	phone: string;
	isPhoneVerified: boolean;
}
export interface InformationUserData {
	fullName: string;
	address: string;
	country: string;
	city: string;
	zip: string;
}
export interface CommonUserData {
	userId: number;
	role: string;
	/**
	 * Profile picture.
	 */
	image: string;
	keySession: string;

	createdAt: Date;
	updatedAt: Date;
}
export type UserData = BasicUserData &
	EmailUserData &
	PhoneUserData &
	InformationUserData &
	CommonUserData;
export interface IUser extends UserData, DocumentResult<UserData>, Document {}
export interface IUserMethods {
	generateKeySession: () => string;
	comparePassword: (password: string) => Promise<boolean>;
}
export interface IUserStatics {
	findUserByCredentials: (
		this: IUserModel,
		email: string,
		password: string,
	) => Promise<UserDataForCredentials>;
	createUser: (
		this: IUserModel,
		data: Partial<UserData>,
	) => Promise<UserHydratedDocument>;
	isValidKeySession: (
		this: IUserModel,
		userId: number,
		keySession: string,
	) => Promise<boolean>;
	isAdmin: (this: IUserModel, userId: number) => Promise<boolean>;
}
export interface IUserModel
	extends Model<IUser, {}, IUserMethods>,
		IUserStatics {}
export type UserHydratedDocument = HydratedDocument<IUser, IUserMethods>;
export type UserDataForCredentials = Pick<
	UserData,
	'userId' | 'fullName' | 'email' | 'phone' | 'keySession' | 'role'
>;
