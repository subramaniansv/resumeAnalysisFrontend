import React from "react";
import advresume from "../assets/advresume.jpg";
const AdvResume = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <p className="text-3xl font-bold text-black">
          Effortlessly Upload your Resume <br /> and Unlock New Career <br />{" "}
          Opportunities
        </p>
        <p className="text-slate-500 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus id
          illo voluptas, eos, alias reiciendis ad nulla fuga iusto, inventore
          molestiae nesciunt iste modi velit vitae itaque temporibus praesentium
          officia.
        </p>

        {/* Features */}
        <div className="flex flex-col lg:flex-row gap-5 mt-6">
          <div className="lg:w-1/2">
            <span className="font-bold text-lg">Easy Upload</span>
            <p className="text-slate-500">
              Effortlessly upload and update your resume in seconds.
            </p>
          </div>
          <div className="lg:w-1/2">
            <span className="font-bold text-lg">Smart Parsing</span>
            <p className="text-slate-500">
              Our AI-powered system extracts key details for better job
              matching.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="lg:w-1/2 flex justify-center">
        <img
          src={advresume}
          alt="Resume Upload Illustration"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default AdvResume;
