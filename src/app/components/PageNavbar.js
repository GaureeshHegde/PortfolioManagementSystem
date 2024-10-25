import Link from "next/link"

export default function PageNavbar() {
  const NavLink = ({ href, children }) => (<Link href={href?href:"/"} className="text-white font-bold hover:text-[#4ac1ff] transition-colors duration-200"> {children} </Link>)

  return (
       <div className="bg-gradient-to-r from-[#001f3f] to-black p-6"> 
           <div className="flex justify-between items-center"> 
               <Link href="/" className="text-[#4ac1ff] font-bold text-xl"> StockSavvy </Link> 
                   <div className="flex items-center space-x-4"> 
                       <NavLink href="/watchlist">Watchlist</NavLink> 
                       <NavLink href="/orders">Orders</NavLink> 
                       <NavLink href="/holdings">Holdings</NavLink> 
                       <NavLink href="/dashboard">Dashboard</NavLink> 
                       <NavLink href="/admin">Admin</NavLink> 
                    </div> 
            </div> 
      </div>)
};