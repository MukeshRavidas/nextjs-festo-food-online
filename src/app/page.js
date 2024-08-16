
"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";

export default function Home() {

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();
  useEffect(() => {
    loadLocations();
    loadRestaurant();
  }, [])

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  }

  const loadRestaurant = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location
    }
    else if (params?.restaurant) {
      url = url + "restaurant?=" + params.restaurant
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result)
    }
  }
  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurant({ location: item })
  }

  return (
    <main >
      <div className="overflow-hidden">
        <CustomerHeader />
        <div className="main-page-banner">
          <h1 className="max-md:mt-40 md:mt-24 text-center text-3xl font-bold">Food Delivery App</h1>

          <div className="input-wraper">
            <form>
              <input type="text" value={selectedLocation} onClick={() => setShowLocation(true)} className="select-input text-black" placeholder="Select place"></input>
              <ul className="location-list">
                {
                  showLocation && locations.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <li onClick={() => handleListItem(item)} >{item}</li>
                  ))
                }
              </ul>
              <input type="text" onChange={(event)=>loadRestaurant({restaurant:event.target.value})} className="search-input" placeholder="Enter Food or Restaurant name"></input>
            </form>
          </div>
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div onClick={() => router.push("explore/" + item.name+"?id="+item._id)} className="restaurant-wraper">
              <div className="heading-wraper">
                <h1>{item.name}</h1>
                <h5>Contact :{item.contact}</h5>
              </div>
              <div className="address-wraper">
                <div>{item.city},</div>
                <div className="address">{item.address},Email:{item.email}</div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer/>
    </main>
  );
}
