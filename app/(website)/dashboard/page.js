import React, {Suspense} from "react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {Skeleton} from "@nextui-org/react";

const DashboardPage = async () => {
    return <section className="pt-12 px-4 space-y-4">
        <Suspense fallback={<WelcomeMessageFallback/>}>
            <WelcomeMsg/>
        </Suspense>
        <ProjectsList/>
    </section>
};
export default DashboardPage;

async function WelcomeMsg() {
    const session = await auth();
    const {user, email} = session
    console.log(user)
    if (!user) redirect("/")
    return <div class="flex w-full ">
        <h2 className="text-2xl font-extrabold ">
            Hi , {user?.email}
        </h2>
    </div>;
}

function WelcomeMessageFallback() {
    return <div class="flex w-full">
        <h2 className="text-2xl font-extrabold">
            <Skeleton class="w-[180px] h-[36px]"/>
            <Skeleton class="w-[150px] h-[36px]"/>
        </h2>
    </div>
}

async function ProjectsList() {
    const session = await auth();
    const {user, email} = session
    const project = await prisma.project.findMany({
        where: {
            createdById: user.email
        }
    })
    if (project.length === 0) {
        return <div class="flex w-full flex-col items-center pt-24 gap-5">
            No Project Listed
        </div>
    }
    return <>Project List</>
}
