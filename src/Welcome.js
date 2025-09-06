
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Header from "../src/dashboard/pages/Layout/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { logindataen } = useSelector((state) => state?.aviator);
  const navigate = useNavigate();

  return (
    <div className="bg-custom-gradient !overflow-hidden !overflow-y-scroll">
      <Header />

      <div
        className="relative w-full h-[100vh] flex items-center justify-center text-center mt-20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(17,16,34,0.95)), url('https://t4.ftcdn.net/jpg/05/64/88/01/240_F_564880179_f8V4ZyluTjcLUFqSFr24UMdD7Ip0tdU1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white max-w-4xl mx-auto px-6">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Welcome to <span className="text-gold-color">bnbchainx.com</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            The future of{" "}
            <span className="text-gold-color">fully decentralized</span>{" "}
            blockchain-based plans, empowering you with transparency, trust, and
            next-level opportunities.
          </p>

          {/* Call-to-Action */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => logindataen && navigate("/dashboard")}
              className="px-6 py-3 rounded-xl bg-gold-color hover:bg-gold-color text-white font-bold shadow-lg"
            >
              Get Started
            </button>
            <button className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-200 text-gray-900 font-bold bg-white">
              Explore Plans
            </button>
          </div>

          {/* Extra Content */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gold-color mb-2">
                100% Decentralized
              </h3>
              <p className="text-gray-200 text-sm">
                No central authority. All transactions and plans are managed
                transparently on the blockchain.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gold-color mb-2">
                Fair & Secure
              </h3>
              <p className="text-gray-200 text-sm">
                Built with smart contracts to ensure fairness, immutability, and
                unmatched security for all users.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gold-color mb-2">
                Global Community
              </h3>
              <p className="text-gray-200 text-sm">
                Join a worldwide network of users enjoying decentralized income
                opportunities with bnbchainx.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
