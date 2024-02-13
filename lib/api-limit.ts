import { auth } from '@clerk/nextjs'

import prismadb from './prismadb'
import { MAX_FREE_COUNTS } from '@/constant'

export const incraseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return 0;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (userApiLimit?.userId) {
        await prismadb.userApiLimit.update({
            where: {
                userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        })
    }
    else {
        console.log('under the else portion prisma.')
        await prismadb.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        })
    }

};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    console.log("userApiLimit ====>", userApiLimit)

    if (!userApiLimit?.userId || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    }
    return false;
}

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) return 0 ;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });
    
    if(!userApiLimit) {
        return 0;
    }

    return userApiLimit.count;
}