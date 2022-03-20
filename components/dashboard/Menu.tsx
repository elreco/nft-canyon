import Link from 'next/link'
import { useRouter } from 'next/router'

const Menu = () => {
  const router = useRouter()
  return (
    <ul className="react-tabs__tab-list">
      <Link href="/dashboard">
        <a>
          <li
            className={`react-tabs__tab react-tabs__tab${
              router.pathname == '/dashboard' ? '--selected' : ''
            }`}
          >
            GENERAL
          </li>
        </a>
      </Link>
      <Link href="/dashboard/content">
        <a>
          <li
            className={`react-tabs__tab react-tabs__tab${
              router.pathname == '/dashboard/content' ? '--selected' : ''
            }`}
          >
            CONTENT
          </li>
        </a>
      </Link>
      <Link href="/dashboard/collection">
        <a>
          <li
            className={`react-tabs__tab react-tabs__tab${
              router.pathname == '/dashboard/collection' ? '--selected' : ''
            }`}
          >
            COLLECTION
          </li>
        </a>
      </Link>
      <Link href="/dashboard/profile">
        <a>
          <li
            className={`react-tabs__tab react-tabs__tab${
              router.pathname == '/dashboard/profile' ? '--selected' : ''
            }`}
          >
            PROFILE
          </li>
        </a>
      </Link>
    </ul>
  )
}

export default Menu
