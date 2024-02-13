import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe"


const settingUrl = absoluteUrl("/settings");

export async function GET() {
 try {

    const {userId} = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        return new NextResponse("Unauthorized", {status: 401})
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId:userId
        }
    })

    


    if (userSubscription?.stripeCurrentPeriodId) {
        // Redirect to the settings page if a subscription is active
        const striptSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId!,
            return_url: settingUrl,
        })
        return new NextResponse(JSON.stringify({url: striptSession.url}))
    }

    const stripeSession = await stripe.checkout.sessions.create({
        success_url:settingUrl,
        cancel_url:settingUrl,
        payment_method_types:["card"],
        mode:'subscription',
        billing_address_collection:'auto',
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                price_data: {
                    currency:"USD", 
                    product_data: {
                        name: "Genius Pro",
                        description: 'Unlimited Ai Generation',
                    },
                    unit_amount: 2000,
                    recurring: {
                        interval: 'month'
                    }
                },
                quantity: 1
            }
        ],
        metadata: {
            userId,
            
        },
    });

    // console.log("stripeSession ===>", stripeSession)

    return new NextResponse(JSON.stringify({url: stripeSession.url}));
    
 } catch (error) {
    console.log('[STRIPE_ERROR]', error)
    return new NextResponse("Inernal error", {status: 500})
 }   
}