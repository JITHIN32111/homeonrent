import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import control from '../../assets/img/control.png'
import logo from '../../assets/home3.png'
import dashboard from '../../assets/sellerDashboard/dashboard.png'
import order from '../../assets/sellerDashboard/order.png'
import property from '../../assets/sellerDashboard/property.png'
import review from '../../assets/sellerDashboard/review.png'
import scedule from '../../assets/sellerDashboard/scedule.png'
import  {useDispatch}  from 'react-redux';

function AdminAside() {
  const dispatch=useDispatch()
   

    const [isXlLg, setIsXlLg] = useState(false);
    useEffect(() => {
      const checkScreenSize = () => {
        const mediumDeviceWidth = 768;
        const isMediumDevice = window.innerWidth >= mediumDeviceWidth;
        setOpen(isMediumDevice);
        const xlLgDeviceWidth = 1268;
        const isXlLgDevice = window.innerWidth >= xlLgDeviceWidth;
        setIsXlLg(isXlLgDevice);
      };
  
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
  
      return () => {
        window.removeEventListener("resize", checkScreenSize);
      };
    }, []);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const Menus = [
      { title: "Dashboard", src: "/Admin/Home",img:dashboard },
      { title: "Requests", src: "/Admin/Home/Requests",img:property },
      { title: "Approved", src: "/Admin/Home/Approved", gap: true ,img:order},
      { title: "Provider List", src: "/Admin/Home/SellersList", gap: true ,img:review},

  
  
  
    
    ]
  return (
     <>
    <div className="grow md:flex ">
      
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        }    h-screen p-5  pt-8 relative duration-300`}
      >
       {isXlLg && (
          <img
            src={control}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple 
                       border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        )}
        <div className="flex  items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 w-24 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1 
            className={ ` gap-0 text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0" 
            }`}
          >
            HomeOnRent.in
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-900 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
              onClick={() => navigate(Menu.src)}
          >
             
              <img className="h-4 w-4" src={Menu.img} />
              <span className={`${!open && "hidden"} origin-left duration-200 `}>
                {Menu.title}
              </span>
              

            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen grow p-7">

     
   
            




      </div>
      
    </div>
    </>
  )
}

export default AdminAside



