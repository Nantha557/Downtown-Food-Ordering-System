import { useNavigate } from "react-router-dom";

import background from "../assets/background.png";

import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";
import img10 from "../assets/10.png";
import img11 from "../assets/11.png";
import img12 from "../assets/12.png";
import img13 from "../assets/13.png";
import img14 from "../assets/14.png";
import img15 from "../assets/15.png";
import img16 from "../assets/16.png";
import img17 from "../assets/17.png";

function DTCafeLanding() {

const navigate = useNavigate();


const categories = [

{ name: "Small Plates", image: img2 },

{ name: "Pizza", image: img3 },

{ name: "Sandwich", image: img4 },

{ name: "Pasta", image: img5 },

{ name: "Waffle", image: img6 },

{ name: "Burger", image: img7 },

{ name: "Tacos", image: img8 },

{ name: "Wraps", image: img9 },

{ name: "Quesadilla", image: img10 },

{ name: "Coffee & Tea", image: img11 },

{ name: "Croissant", image: img12 },

{ name: "Cakes", image: img13 },

{ name: "Dessert", image: img14 },

// Ice Cream doesn't exist in Excel ❌

{ name: "Fresh Juice", image: img16 },

{ name: "Smoothies", image: img17 },

];

return(

<div

className="min-h-screen relative overflow-hidden"


>
    
<div
className="
absolute
-top-20
-left-20

w-56
h-56

rounded-full
bg-[#F4D7B8]

opacity-30
blur-3xl
"
/>

<div
className="
absolute
bottom-0
right-0

w-64
h-64

rounded-full
bg-[#EBC193]

opacity-30
blur-3xl
"
/>

{/* Header */}

<div className="pt-8 pb-5">

    {/* Background */}

<div
className="absolute inset-0 -z-10"

style={{

background: `

radial-gradient(
circle at 15% 20%,
rgba(240,205,165,.28) 0%,
transparent 35%
),

radial-gradient(
circle at 85% 15%,
rgba(255,240,220,.55) 0%,
transparent 30%
),

radial-gradient(
circle at 50% 70%,
rgba(234,190,140,.22) 0%,
transparent 40%
),

radial-gradient(
circle at 80% 90%,
rgba(255,232,205,.45) 0%,
transparent 35%
),

linear-gradient(
180deg,
#fffdfb 0%,
#fff8f2 40%,
#fff4ec 75%,
#fff1e8 100%
)

`

}}

></div>

<button
onClick={() => navigate(-1)}
className="
absolute
left-5
top-6
text-3xl
text-gray-700
"
>

←

</button>

<div className="flex justify-center">

  <img
    src="/CAFE LOGO.png"
    alt="DT Cafe"
    className="
      w-44
      h-auto
      object-contain
    "
  />

</div>

<p

className="
mt-1
text-center
text-gray-500
font-semibold
text-lg
"

>

Freshly Made Warmly Served

</p>

</div>



{/* Categories */}

<div
className="
grid
grid-cols-3
gap-x-2
sm:gap-x-4
gap-y-8
px-3
sm:px-4
pb-10
"
>

{

categories.map((item)=>(

<div

key={item.name}

onClick={() =>

navigate(

"/dt-cafe/menu",

{

state:{

category:item.name

}

}

)

}

className="
flex
flex-col
items-center
cursor-pointer
transition
duration-300
hover:scale-105
"
>

<div

className="
w-24
h-24
sm:w-28
sm:h-28
rounded-full
bg-white
shadow-md
hover:shadow-xl
transition-all
duration-300
flex
items-center
justify-center
"

>

<img

src={item.image}

alt={item.name}

className="
w-20
h-20
sm:w-24
sm:h-24
object-contain
"

/>

</div>

<p

className="
text-sm
font-semibold
leading-tight
font-semibold
text-center
mt-2
leading-4
text-gray-700
"

>

{item.name}

</p>

</div>

))

}

</div>

</div>

);

}

export default DTCafeLanding;