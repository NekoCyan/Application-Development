import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult } from './ExternalDocument';

export interface BasicUserData {
	username: string;
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

	createdAt: Date;
	updatedAt: Date;
}
export type UserData = BasicUserData &
	EmailUserData &
	PhoneUserData &
	InformationUserData &
	CommonUserData;
export interface IUser extends UserData, DocumentResult<UserData>, Document {}
export interface IUserMethods {}
export interface IUserModel extends Model<IUser, {}, IUserMethods> {}
export type UserHydratedDocument = HydratedDocument<IUser, IUserMethods>;

