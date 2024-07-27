import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex items-center justify-center mx-56  gap-9 flex-col">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551] ">
          Discover Your Next Adventure with AI:
        </span>
        <div>Personalized Itineraries at Your Fingertips</div>
      </h1>
      <p className="text-gray-500 text-center text-xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, Its Free</Button>
      </Link>

      <img src="/landing.png" className="-mt-10" />
    </div>
  );
}

export default Hero;
