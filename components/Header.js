import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Client-side Refresh</a>
        </Link>
    </div>
)

export default Header
