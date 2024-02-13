import Navbar from "@/components/Navbar"
import SideBar from "@/components/SideBar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
   const apiLimitCount = await getApiLimitCount()
   const isPro = await checkSubscription()

    return (
        <div className="h-full relative">
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
                <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout