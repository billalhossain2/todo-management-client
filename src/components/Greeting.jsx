import React from 'react'

const Greeting = ({user}) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;
if(currentHour >= 4 && currentHour < 12){
    greeting = "Good Morning"
}else if(currentHour >= 12 && currentHour <= 17){
    greeting = "Good Afternoon"
}else if(currentHour >= 18 && currentHour <= 20){
    greeting = "Good Evening"
}else{
    greeting = "Good Night"
}
  return (
    <div className="text-2xl font-semibold mb-5">
      {greeting}, {user}
    </div>
  )
}

export default Greeting