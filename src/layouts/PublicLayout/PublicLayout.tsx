import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
	return (
		<>
			<Toaster
				position="top-center"
				dir="rtl"
				closeButton
				toastOptions={{
					unstyled: true,
					className: "w-full flex justify-center",
				}}
			/>
			<Outlet />
		</>
	);
};

export default PublicLayout;
