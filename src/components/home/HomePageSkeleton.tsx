function HomePageSkeleton() {
    return (
        <div className="h-screen bg-white p-4">
            <div className="flex flex-row-reverse gap-4 h-full">
                {/* Sidebar */}

                <aside className="hidden md:block w-[280px] rounded-3xl bg-neutral-100 animate-pulse" />

                {/* Main */}

                <main className="flex-1 flex flex-col gap-4">
                    {/* Header */}

                    <div className="h-20 rounded-3xl bg-neutral-100 animate-pulse" />

                    {/* Content */}

                    <div className="flex-1 rounded-3xl bg-neutral-100 animate-pulse" />
                </main>
            </div>
        </div>
    );
}

export default HomePageSkeleton;
