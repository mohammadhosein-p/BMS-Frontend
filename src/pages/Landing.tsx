import { useNavigate } from "react-router-dom";

function Landing() {
    const Navigate = useNavigate();

    return (
        <div className="w-full h-screen font-3xl flex flex-col place-self-center justify-center">
            <div className="flex gap-2 rounded-md place-self-center">
                <button
                    className="text-white bg-sky-600 rounded-md p-2 cursor-pointer"
                    onClick={() => {
                        Navigate("/temp");
                    }}
                >
                    Temp route
                </button>
            </div>
            <p className="text-center font-thin">سلام و درود</p>
            <p className="text-center font-extralight">سلام و درود</p>
            <p className="text-center font-light">سلام و درود</p>
            <p className="text-center font-normal">سلام و درود</p>
            <p className="text-center font-semibold">سلام و درود</p>
            <p className="text-center font-bold">سلام و درود</p>
            <p className="text-center font-extrabold">سلام و درود</p>
            <p className="text-center font-black">سلام و درود</p>
        </div>
    );
}

export default Landing;
