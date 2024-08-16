
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

const CustomerHeader = (props) => {

    const userStorage = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user'));
    const cartStorage = JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart'));
    const [user, setUser] = useState(userStorage ? userStorage : undefined);
    const [isSideMenuOpen, setMenu] = useState(false);
    const [cartNumber, setCartNumber] = useState(cartStorage?.length);
    const [cartItem, setCartItem] = useState(cartStorage);
    const router = useRouter();

    useEffect(() => {
        if (props.cartData) {
            console.log(props)
            if (cartNumber) {
                if (cartItem[0].festo_id != props.cartData.festo_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cartData]);
                    localStorage.setItem('cart', JSON.stringify([props.cartData]));
                }
                else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber + 1);
                    localStorage.setItem('cart', JSON.stringify(localCartItem))
                }
            }
            else {
                setCartNumber(1)
                setCartItem([props.cartData])
                localStorage.setItem('cart', JSON.stringify([props.cartData]))
            }


        }
    }, [cartItem, cartNumber, props, props.cartData])

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != props.removeCartData;
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem))
            if (localCartItem.length == 0) {
                localStorage.removeItem('cart');
            }
        }
    }, [])

    useEffect(()=>{

        if(props.removeCartData)
        {
            setCartItem([]);
            setCartNumber(0);
            localStorage.removeItem('cart');
        }
    },[props.removeCartData])

    const logout=()=>{
        localStorage.removeItem('user');
        router.push("/user-auth");
    }

    return (
        <div className="fixed w-full z-[1000] bg-gray-800">
            <div className="flex items-center h-[12vh] justify-between w-[80%] mx-auto">
                <div className="font-logo text-white text-[18px]">
                    <span className="text-[30px] md:text-[40px] text-yellow-400">
                        Ff
                    </span>
                    Fest-Food
                </div>
                <IoCloseSharp
                    onClick={() => setMenu(false)}
                    className={`mt-0 mb-8 text-3xl md:hidden text-white cursor-pointer ${isSideMenuOpen ? 'block' : 'hidden'}`}
                />
                <ul className="md:flex hidden items-center space-x-10">
                    <li>
                        <Link href="/" className="nav_link">Home</Link>
                    </li>
                    {
                        user ?
                            <>
                                <li>
                                    <Link href="/myprofile" className="nav_link">{user?.name}</Link>
                                </li>
                                <li>
                                    <button onClick={logout} className="nav_link">Logout</button>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link href="/user-auth" className="nav_link">Login</Link>
                                </li>
                                <li>
                                    <Link href="/user-auth" className="nav_link">SignUp</Link>
                                </li>
                            </>
                    }
                    <li>
                        <Link href={cartNumber ? "/cart" : "#"} className="nav_link">Cart({cartNumber ? cartNumber : 0})</Link>
                    </li>
                    <li>
                        <Link href="/restaurant" className="nav_link"> Add Restaurant</Link>
                    </li>
                    <li>
                        <Link href="/deliverypartner" className="nav_link">Delivery Partner</Link>
                    </li>

                </ul>
                <FiMenu
                    onClick={() => setMenu(true)}
                    className={`md:hidden text-3xl text-white ${isSideMenuOpen ? 'hidden' : 'block'}`}
                />
            </div>
            {/* Side menu for mobile view */}
            <div className={`fixed top-0 left-0 h-full w-full bg-gray-900 bg-opacity-90 z-50 transform ${isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <IoCloseSharp
                    onClick={() => setMenu(false)}
                    className="absolute top-4 right-4 text-3xl text-white cursor-pointer"
                />
                <ul className="flex flex-col items-center justify-center space-y-6 h-full text-white">
                    <li>
                        <Link href="/" className="nav_link" onClick={() => setMenu(false)}>Home</Link>
                    </li>
                    <li>
                        <Link href="#" className="nav_link" onClick={() => setMenu(false)}>Login</Link>
                    </li>
                    <li>
                        <Link href="#" className="nav_link" onClick={() => setMenu(false)}>SignUp</Link>
                    </li>
                    <li>
                        <Link href="#" className="nav_link" onClick={() => setMenu(false)}>Cart({cartNumber})</Link>
                    </li>
                    <li>
                        <Link href="#" className="nav_link" onClick={() => setMenu(false)}>Add Restaurant</Link>
                    </li>
                    <li>
                        <Link href="/deliverypartner" className="nav_link" onClick={() => setMenu(false)}>Delivery Partner</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CustomerHeader;