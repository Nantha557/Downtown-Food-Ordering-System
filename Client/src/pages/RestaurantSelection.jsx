
import { useNavigate } from "react-router-dom";
import foodCourtLogo from "../assets/foodCourtLogo.jpeg";

function RestaurantSelection() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        relative
        overflow-x-hidden
        bg-gradient-to-b
        from-[#faf8f5]
        via-[#fffdfb]
        to-[#f5e9dc]
      "
    >
      {/* Background Decoration */}
      <div
        className="
          absolute -top-20 -right-20
          w-72 h-72 rounded-full
          bg-[#C89563]/15 blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute -bottom-20 -left-20
          w-72 h-72 rounded-full
          bg-orange-200/20 blur-3xl
          pointer-events-none
        "
      />

      {/* Header */}
      <div
        className="
          relative z-10
          bg-[#C89563]
          rounded-b-[35px]
          shadow-xl
          py-5 px-4 sm:px-6
          flex justify-center
        "
      >
        <img
          src="/Dowtown LOGO.png"
          alt="Downtown Business Hotel"
          className="w-56 sm:w-64 h-auto object-contain"
        />
      </div>

      {/* Body */}
      <div
        className="
          relative z-10
          w-full max-w-md
          mx-auto
          px-3
          mt-8 pb-10
        "
      >
        <h2
          className="
            text-lg sm:text-2xl
            font-bold
            text-center
            text-gray-800
            mb-5
          "
        >
          Choose Your Food Outlet for Room order
        </h2>

        {/* Two-column layout on all phone sizes */}
        <div className="grid grid-cols-2 gap-3 w-full">

          {/* Pavilion Restaurant */}
          <div
            onClick={() => navigate("/pavilion")}
            className="
              min-w-0 w-full
              bg-white/95 backdrop-blur-md
              border border-white/60
              rounded-2xl sm:rounded-3xl
              shadow-xl
              p-2 sm:p-4
              cursor-pointer
              transition-shadow duration-300
              hover:shadow-2xl
            "
          >
            <img
              src={foodCourtLogo}
              alt="Pavilion"
              className="
                w-14 h-14
                sm:w-24 sm:h-24
                rounded-full
                mx-auto shadow-lg
                object-cover
              "
            />

            <img
              src="/Pavilion Restaurant.png"
              alt="Pavilion Restaurant"
              className="
                w-full max-w-[144px]
                h-auto mx-auto object-contain
              "
            />

            {/* Pavilion Timings */}
            <div
              className="
                mt-3 sm:mt-4
                text-[10px] sm:text-[11px]
                text-gray-600
                space-y-2
              "
            >
              <p>
                🍳 Breakfast
                <span className="block pl-1 sm:pl-4">
                  7 AM - 10 AM
                </span>
              </p>

              <p>
                🍛 Lunch
                <span className="block pl-1 sm:pl-4">
                  1 PM - 3 PM
                </span>
              </p>

              <p>
                🍽 Dinner
                <span className="block pl-1 sm:pl-4">
                  7 PM - 10:30 PM
                </span>
              </p>
            </div>

            {/* Pavilion Contact */}
            <div
              className="
                mt-3 pt-3
                border-t border-[#C89563]/30
                space-y-2
              "
            >
              <p className="text-[10px] sm:text-[11px] font-semibold text-gray-800 break-words">
                ☎ Extension: 300
              </p>

              <a
                href="tel:+917550055488"
                onClick={(e) => e.stopPropagation()}
                className="
                  block
                  text-[10px] sm:text-[11px]
                  font-semibold text-[#A66D36]
                  hover:underline
                  break-words
                "
              >
                📞 +91 755 005 5488
              </a>
            </div>
          </div>

          {/* DT Cafe */}
          <div
            onClick={() => navigate("/dt-cafe")}
            className="
              min-w-0 w-full
              bg-white/95 backdrop-blur-md
              border border-white/60
              rounded-2xl sm:rounded-3xl
              shadow-xl
              p-2 sm:p-4
              cursor-pointer
              transition-shadow duration-300
              hover:shadow-2xl
            "
          >
            <img
              src={foodCourtLogo}
              alt="DT Cafe"
              className="
                w-14 h-14
                sm:w-24 sm:h-24
                rounded-full
                mx-auto shadow-lg
                object-cover
              "
            />

            <img
              src="/CAFE LOGO.png"
              alt="DT Cafe"
              className="
                w-full max-w-[112px]
                h-auto mx-auto object-contain
              "
            />

            {/* Cafe Items and Timings */}
            <div
              className="
                mt-3 sm:mt-4
                text-[10px] sm:text-[11px]
                text-gray-600
                space-y-2
              "
            >
              <p>☕ Coffee</p>
              <p>🥪 Snacks</p>
              <p>🍰 Desserts</p>

              <p className="text-green-600 font-semibold">
                🕒 11 AM - 11 PM
              </p>
            </div>

            {/* DT Cafe Contact */}
            <div
              className="
                mt-3 pt-3
                border-t border-[#C89563]/30
                space-y-2
              "
            >
              <p className="text-[10px] sm:text-[11px] font-semibold text-gray-800 break-words">
                ☎ Extension: 700
              </p>

              <a
                href="tel:+917550055015"
                onClick={(e) => e.stopPropagation()}
                className="
                  block
                  text-[10px] sm:text-[11px]
                  font-semibold text-[#A66D36]
                  hover:underline
                  break-words
                "
              >
                📞 +91 755 005 5015
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RestaurantSelection;