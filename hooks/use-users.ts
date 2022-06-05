import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getToken, removeUserData } from '../common/user-helper'
import { useAppDispatch } from '../lib/store'
import { getUsers } from '../services/users'
import { setLoading } from '../slices/loading-slice'

export interface User {
  id: number
  name: string
  email: string
  status: boolean
  lastLogin: string
  created: string
}

export interface UsersResponse {
  pagesCount: number
  users: User[]
}

export type Parameters = {
  page: string
  count: string
}

const defaultPage = 1
const defaultCount = 10

const returnValidNumberQuery = (queryString: string) => {
  const query = Number.parseInt(queryString, 10)

  return queryString && (!query || query < 1) ? undefined : query
}

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [usersWithPagesCount, setUsersWithPagesCount] =
    useState<UsersResponse>()

  const fetchUsers = async () => {
    const token = getToken()

    if (!token) {
      router.push('/login')
    } else if (router.isReady) {
      const { page: currentPageString, count: usersCountString } =
        router.query as Parameters

      const currentPage = returnValidNumberQuery(currentPageString)
      const usersCount = returnValidNumberQuery(usersCountString)

      const query: Record<string, string> = {}

      if (currentPage === undefined) query.page = '1'

      if (usersCount === undefined) query.count = '10'

      if (Object.values(query).length > 0) {
        router.push({ query: { ...router.query, ...query } }, undefined, {
          shallow: true,
        })
      } else {
        const page = currentPage || defaultPage
        const count = usersCount || defaultCount

        dispatch(setLoading(true))

        const response = await getUsers(page, count, token)

        switch (response.status) {
          case 200:
            setUsersWithPagesCount(await response.json())
            break

          case 401:
            removeUserData()

            router.push('/login')
            break

          case 404:
            if (router.pathname !== '/' || router.query.page !== '1') {
              router.push('/')
            }

            break
        }

        dispatch(setLoading(false))
      }
    }
  }

  const triggerFetch = () => fetchUsers()

  useEffect(() => {
    fetchUsers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.isReady])

  return { ...usersWithPagesCount, triggerFetch }
}
