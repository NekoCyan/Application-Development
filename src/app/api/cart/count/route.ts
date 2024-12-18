import Cart from '@/database/Cart';
import { ErrorResponse, Response } from '@/utils';
import { BEHandler } from '@/utils/BackendUtils';
import { Session } from 'next-auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const session = (await BEHandler({
			req: req,
		})) as Session;

		// const count = await Cart.aggregate([
		// 	{ $match: { userId: parseInt(session.user!.id) } },
		// 	{ $unwind: '$data' },
		// 	{ $group: { _id: null, dataCount: { $sum: 1 } } },
		// ]);
		// if (count.length === 0) return Response({ count: 0 });
		// else return Response({ count: count[0]?.dataCount ?? 0 });

		const count = await Cart.findOne({
			userId: parseInt(session.user!.id),
		});
		return Response({ count: count?.data.length ?? 0 });
	} catch (e: any) {
		return ErrorResponse(e);
	}
}
