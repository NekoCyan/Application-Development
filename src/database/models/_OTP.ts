import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult } from './ExternalDocument';

export interface OTPData {
	userId: number;
	/**
	 * Such as email, phone...
	 */
	type: string;
	/**
	 * Verify code.
	 */
	code: string;
	/**
	 * Incase user want to verify via link.
	 */
	token: string;
	/**
	 * Number of fails when wrong email / phone.
	 */
	fails: number;

	createdAt: Date;
	expiredAt: Date;
}

export interface IOTP extends OTPData, DocumentResult<OTPData>, Document {}
export interface IOTPMethods {}
export interface IOTPModel extends Model<IOTP, {}, IOTPMethods> {}
export type OTPHydratedDocument = HydratedDocument<IOTP, IOTPMethods>;
