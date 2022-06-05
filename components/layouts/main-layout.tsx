import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import SrOnly from '../sr-only'

interface Properties {}

const MainLayout: React.ComponentType<PropsWithChildren<Properties>> = ({
  children,
}) => {
  const router = useRouter()

  const [name, setName] = useState('')

  const modal = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const name = localStorage.getItem('name')

    if (name !== null) {
      setName(name)
    } else if (
      router.pathname !== '/login' &&
      router.pathname !== '/register'
    ) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleModal = () => {
    if (modal.current) {
      modal.current.classList.toggle('sr-only')
    }
  }

  const handleUserClick: MouseEventHandler<HTMLButtonElement> = () => {
    toggleModal()
  }

  const handleLogoutClick: MouseEventHandler<HTMLAnchorElement> = (event_) => {
    event_.preventDefault()

    localStorage.removeItem('name')
    localStorage.removeItem('token')

    router.push('/login')

    setName('')

    toggleModal()
  }

  return (
    <>
      <header className="flex justify-between items-center border-b-2 border-gray-300 h-20 mb-10">
        <Link href="/">
          <a className="whitespace-nowrap text-xl font-bold text-gray-500 hover:text-gray-900">
            Home
          </a>
        </Link>

        <div className="flex items-center justify-end relative">
          {name ? (
            <>
              <button
                onClick={handleUserClick}
                className="p-2 text-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                <SrOnly>Open user menu</SrOnly>
                {name}
              </button>

              <ul
                ref={modal}
                className="sr-only absolute right-0 mt-28 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <li>
                  <a
                    onClick={handleLogoutClick}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Register
                </a>
              </Link>
            </>
          )}
        </div>
      </header>

      {children}
    </>
  )
}

export default MainLayout
