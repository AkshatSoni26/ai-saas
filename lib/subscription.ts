import { auth } from "@clerk/nextjs"

import prismadb from '@/lib/prismadb'


const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
    
    const { userId } = auth()

    if (!userId) return false;

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeSubsciptionId: true,
            stripeCurrentPeriodId: true,
            stripeCustomerId: true,
            stripePriceId:true,
        },
    })

    if (!userSubscription) return false;

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodId?.getTime()! + DAY_IN_MS > Date.now()

    return !!isValid

}