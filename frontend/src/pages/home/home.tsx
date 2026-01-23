import { Button } from "antd"
import { Link } from "react-router-dom"
import Navbar from "../../components/layout/navbar"

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center h-[85vh] justify-center text-center px-4 py-24 bg-amber-100">
        <h1 className="text-4xl font-bold mb-4">
          Plateforme de gestion de présence
        </h1>

        <p className="text-gray-600 max-w-xl mb-8">
          Gérez facilement les heures d’arrivée et de départ de vos employés,
          consultez les historiques et suivez les performances de votre équipe.
        </p>

        <p className="text-gray-600 max-w-xl mb-8">
            chers employés, veuillez indiquer votre heure d'arrivée et de départ tous les jours et suivez votre historique de présence.
        </p>

        <div className="flex gap-4">
          <Link to="/login">
            <Button size="large" type="primary">
              Se connecter
            </Button>
          </Link>

          <Link to="/register">
            <Button size="large">
              Créer un compte
            </Button>
          </Link>
        </div>
      </main>
    </>
  )
}

export default Home