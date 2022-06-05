import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'
import SrOnly from './sr-only'

interface Properties {
  pagesCount: number
}

interface LinkProperties {
  page: number
  count: number
}

const OuterIconLink: React.ComponentType<
  PropsWithChildren<
    LinkProperties & {
      position: 'left' | 'right'
    }
  >
> = ({ children, page, count, position }) => {
  return (
    <Link
      href={{
        query: {
          page,
          count,
        },
      }}
    >
      <a
        className={`${
          position === 'right' ? 'rounded-r-md' : 'rounded-l-md'
        } relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
      >
        {children}
      </a>
    </Link>
  )
}

const NavIconLink: React.ComponentType<PropsWithChildren<LinkProperties>> = ({
  children,
  page,
  count,
}) => {
  return (
    <Link
      href={{
        query: {
          page,
          count,
        },
      }}
    >
      <a className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
        {children}
      </a>
    </Link>
  )
}

const TextLink: React.ComponentType<LinkProperties> = ({ page, count }) => {
  return (
    <Link
      href={{
        query: {
          page,
          count,
        },
      }}
    >
      <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
        {page}
      </a>
    </Link>
  )
}

const ActiveLink: React.ComponentType<LinkProperties> = ({ page }) => {
  return (
    <a className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
      {page}
    </a>
  )
}

const Pagination: React.ComponentType<Properties> = ({ pagesCount }) => {
  const router = useRouter()

  const [ready, setReady] = useState(false)

  const page = Number.parseInt(router.query.page as string, 10)
  const count = Number.parseInt(router.query.count as string, 10)

  const currentPage = page || 1
  const usersCount = count || 10

  const beforeCurrent =
    currentPage === 1
      ? []
      : currentPage === pagesCount
      ? Array.from({ length: pagesCount - 1 < 3 ? pagesCount - 1 : 2 }).map(
          (_, index) => currentPage - 2 + index,
        )
      : [currentPage - 1]

  const afterCurrent =
    currentPage === pagesCount
      ? []
      : currentPage === 1
      ? Array.from({ length: pagesCount - 1 < 3 ? pagesCount - 1 : 2 }).map(
          (_, index) => currentPage + 1 + index,
        )
      : [currentPage + 1]

  useEffect(() => {
    if (router.isReady) {
      setReady(router.isReady)
    }
  }, [router, router.isReady, router.query.page])

  return (
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
      {ready && (
        <>
          <OuterIconLink position="left" count={usersCount} page={1}>
            <SrOnly>First</SrOnly>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M15.12 15.53 25 5.66a1 1 0 0 1 1.41 1.41l-9.06 9.06 8.8 8.8a1 1 0 0 1 0 1.41 1 1 0 0 1-1.42 0l-9.61-9.61a.85.85 0 0 1 0-1.2Z" />
              <path d="m5.54 15.53 9.88-9.87a1 1 0 1 1 1.41 1.41l-9.06 9.06 8.8 8.8a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-9.62-9.61a.85.85 0 0 1 0-1.2Z" />
            </svg>
          </OuterIconLink>

          <NavIconLink
            count={usersCount}
            page={currentPage < 2 ? 1 : currentPage - 1}
          >
            <SrOnly>Previous</SrOnly>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M12.7 5.3a1 1 0 0 1 0 1.4L9.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 0z" />
            </svg>
          </NavIconLink>

          {beforeCurrent.map((it) => (
            <TextLink key={it} count={usersCount} page={it} />
          ))}

          <ActiveLink count={usersCount} page={currentPage} />

          {afterCurrent.map((it) => (
            <TextLink key={it} count={usersCount} page={it} />
          ))}

          <NavIconLink
            count={usersCount}
            page={
              pagesCount && pagesCount > currentPage
                ? currentPage + 1
                : pagesCount
            }
          >
            <SrOnly>Next</SrOnly>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M7.3 14.7a1 1 0 0 1 0-1.4l3.3-3.3-3.3-3.3a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4 0z" />
            </svg>
          </NavIconLink>

          <OuterIconLink position="right" count={usersCount} page={pagesCount}>
            <SrOnly>Last</SrOnly>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M16.88 15.53 7 5.66a1 1 0 0 0-1.41 1.41l9.06 9.06-8.8 8.8a1 1 0 0 0 0 1.41 1 1 0 0 0 1.42 0l9.61-9.61a.85.85 0 0 0 0-1.2Z" />
              <path d="m26.46 15.53-9.88-9.87a1 1 0 0 0-1.41 1.41l9.06 9.06-8.8 8.8a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l9.62-9.61a.85.85 0 0 0 0-1.2Z" />
            </svg>
          </OuterIconLink>
        </>
      )}
    </nav>
  )
}

export default Pagination
