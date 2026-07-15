import { useNavigate } from "react-router-dom";
import foodCourtLogo from "../assets/foodCourtLogo.jpeg";

function RestaurantSelection() {

  const navigate = useNavigate();

  return (

    <div
      className="
      min-h-screen
      relative
      overflow-hidden

      bg-gradient-to-b
      from-[#faf8f5]
      via-[#fffdfb]
      to-[#f5e9dc]
      "
    >

      {/* Background Decoration */}

      <div
        className="
        absolute
        -top-20
        -right-20

        w-72
        h-72

        rounded-full

        bg-[#C89563]/15

        blur-3xl
        "
      />

      <div
        className="
        absolute
        -bottom-20
        -left-20

        w-72
        h-72

        rounded-full

        bg-orange-200/20

        blur-3xl
        "
      />

      {/* HEADER */}

      <div
        className="
        bg-[#C89563]
        rounded-b-[30px]
        shadow-xl

        py-5
        px-6
        "
      >

        <h1
          className="
          text-white
          text-5xl
          italic
          font-bold
          text-center
          leading-none
          "
        >
          Downtown
        </h1>

        <p
          className="
          text-white
          text-center
          text-2xl
          font-semibold
          mt-1
          "
        >
          Business Hotel
        </p>

      </div>

      {/* BODY */}

      <div className="relative z-10 px-6 mt-8">

        <h2
          className="
          text-2xl
          font-bold
          text-center
          text-gray-800
          "
        >
          Select Restaurant
        </h2>

        <p
          className="
          text-center
          text-gray-600
          mt-2
          mb-8
          "
        >
          Please choose your dining destination
        </p>

        <div
          className="
          flex
          justify-center
          gap-5
          "
        >

          {/* Pavilion */}

          <div

            onClick={() => navigate("/pavilion")}

            className="
            flex-1
            max-w-[160px]

            bg-white/95
            backdrop-blur-md

            border
            border-white/60

            rounded-3xl

            shadow-xl
            hover:shadow-2xl

            p-4

            cursor-pointer

            transition-all
            duration-300

            hover:scale-[1.03]
            hover:-translate-y-1
            "

          >

            <img

              src={foodCourtLogo}

              alt="Pavilion"

              className="
              w-24
              h-24

              rounded-full

              mx-auto

              shadow-lg
              "

            />

            <h3
              className="
              text-lg
              font-bold
              text-center
              mt-4
              "
            >
              Pavilion
            </h3>

            <div
              className="
              mt-4

              text-[11px]
              text-gray-600

              space-y-2
              "
            >

              <p className="whitespace-nowrap">
                🍳 Breakfast • 7 AM - 10 AM
              </p>

              <p className="whitespace-nowrap">
                🍛 Lunch • 12 PM - 3 PM
              </p>

              <p className="whitespace-nowrap">
                🍽 Dinner • 7 PM - 10:30 PM
              </p>

            </div>

          </div>

          {/* DT Cafe */}

          <div

            onClick={() => navigate("/dt-cafe")}

            className="
            flex-1
            max-w-[160px]

            bg-white/95
            backdrop-blur-md

            border
            border-white/60

            rounded-3xl

            shadow-xl
            hover:shadow-2xl

            p-4

            cursor-pointer

            transition-all
            duration-300

            hover:scale-[1.03]
            hover:-translate-y-1
            "

          >

            <img

              src={foodCourtLogo}

              alt="DT Cafe"

              className="
              w-24
              h-24

              rounded-full

              mx-auto

              shadow-lg
              "

            />

            <h3
              className="
              text-lg
              font-bold
              text-center
              mt-4
              "
            >
              DT Cafe
            </h3>

            <div
              className="
              mt-4

              text-[11px]
              text-gray-600

              space-y-2
              "
            >

              <p>☕ Coffee</p>

              <p>🥪 Snacks</p>

              <p>🍰 Desserts</p>

              <p
                className="
                text-green-600
                font-semibold
                whitespace-nowrap
                "
              >
                🕒 11 AM - 11 PM
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RestaurantSelection;