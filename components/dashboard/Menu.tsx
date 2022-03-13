import Link from 'next/link'

const Menu = () => {
  return (
    <ul className="react-tabs__tab-list">
      <Link href="/dashboard">
        <a>
          <li className="react-tabs__tab react-tabs__tab--selected">GENERAL</li>
        </a>
      </Link>
      <li className="react-tabs__tab">COLLECTION</li>
      <li className="react-tabs__tab">PROFILE</li>
    </ul>
  )
}

export default Menu
