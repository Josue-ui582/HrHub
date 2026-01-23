import { Link } from "react-router-dom"
import { Button } from "antd"

const Navbar = () => {
  return (
    <header className="w-full bg-gray-50 shadow-2xl h-[15vh]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h2 className="text-gray-950 font-bold text-3xl">HrHub</h2>

        <div className="flex gap-3">
          <Link to="/login">
            <Button type="default">Connexion</Button>
          </Link>

          <Link to="/register">
            <Button type="primary">Inscription</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar