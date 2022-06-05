import type { NextPage } from 'next'
import { ChangeEventHandler, forwardRef, useRef } from 'react'
import { getToken } from '../common/user-helper'
import Button from '../components/button'
import MainLayout from '../components/layouts/main-layout'
import Pagination from '../components/pagination'
import SrOnly from '../components/sr-only'
import Table from '../components/table'
import { useUsers } from '../hooks/use-users'
import { blockUsers, deleteUsers, unblockUsers } from '../services/users'

const SelectCheckbox = forwardRef<
  HTMLInputElement,
  { id?: number; onChange?: ChangeEventHandler<HTMLInputElement> }
>(({ id, onChange }, reference) => (
  <label htmlFor={`select-${id ?? 'all'}`} className="p-4">
    <SrOnly>Select {id ?? 'all'}</SrOnly>
    <input
      type="checkbox"
      name={`${id !== undefined ? `user` : ''}`}
      id={`select-${id ?? 'all'}`}
      ref={reference}
      onChange={onChange}
      value={id}
    />
  </label>
))

SelectCheckbox.displayName = 'SelectCheckbox'

const Home: NextPage = () => {
  const { users, pagesCount, triggerFetch } = useUsers()

  const formReference = useRef<HTMLFormElement>(null)
  const selectAllReference = useRef<HTMLInputElement>(null)
  const rowsReference = useRef<Record<string, HTMLInputElement | null>>({})

  const usersWithoutLast = users?.slice(0, -1)
  const lastUser = users?.at(-1)

  const setReference = (id: number, reference: HTMLInputElement | null) =>
    (rowsReference.current[id] = reference)

  const getSelectedUsers = (form: HTMLFormElement) =>
    new FormData(form)
      .getAll('user')
      .map((it) => Number.parseInt(it.toString()))

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (
    event_,
  ) => {
    for (const row of Object.values(rowsReference.current)) {
      if (row) {
        row.checked = event_.currentTarget.checked
      }
    }
  }

  const createHandleAction =
    (callback: (userIds: number[], token: string) => Promise<Response>) =>
    async () => {
      const token = getToken()
      if (formReference.current && token) {
        await callback(getSelectedUsers(formReference.current), token)
        triggerFetch()
      }
    }

  const handleBlock = createHandleAction(blockUsers)

  const handleUnblock = createHandleAction(unblockUsers)

  const handleDelete = createHandleAction(deleteUsers)

  return (
    <MainLayout>
      <form ref={formReference} className="mb-5">
        <div className="mb-5 flex gap-3">
          <Button onClick={handleBlock} color="red">
            Block
          </Button>

          <Button onClick={handleUnblock}>
            <SrOnly>Unblock</SrOnly>
            <svg
              className="w-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              viewBox="0 0 48 48"
            >
              <circle cx="24" cy="30" r="2" />
              <path d="M24 38a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6c0 .6-.4 1-1 1z" />
              <path d="M42 48H6V18h36v30zM8 46h32V20H8v26z" />
              <path d="M36 19h-2v-7a10 10 0 0 0-20 0h-2a12 12 0 0 1 24 0v7z" />
            </svg>
          </Button>

          <Button onClick={handleDelete}>
            <SrOnly>Delete</SrOnly>
            <svg
              className="w-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              viewBox="0 0 48 48"
            >
              <path d="M41 48H7V7h34v41zM9 46h30V9H9v37z" />
              <path d="M35 9H13V1h22v8zM15 7h18V3H15v4zM16 41a1 1 0 0 1-1-1V15a1 1 0 1 1 2 0v25c0 .6-.4 1-1 1zM24 41a1 1 0 0 1-1-1V15a1 1 0 1 1 2 0v25c0 .6-.4 1-1 1zM32 41a1 1 0 0 1-1-1V15a1 1 0 1 1 2 0v25c0 .6-.4 1-1 1z" />
              <path d="M0 7h48v2H0z" />
            </svg>
          </Button>
        </div>

        <Table>
          <thead>
            <tr>
              <Table.Header>
                <SelectCheckbox
                  onChange={handleCheckboxChange}
                  ref={selectAllReference}
                />
              </Table.Header>
              <Table.Header>Id</Table.Header>
              <Table.Header>Name</Table.Header>
              <Table.Header>Email</Table.Header>
              <Table.Header>Status</Table.Header>
              <Table.Header>Created</Table.Header>
              <Table.Header>Lastlogin</Table.Header>
            </tr>
          </thead>
          <tbody>
            {usersWithoutLast?.map((user) => (
              <tr key={user.id}>
                <Table.Data>
                  <SelectCheckbox
                    id={user.id}
                    ref={(reference) => setReference(user.id, reference)}
                  />
                </Table.Data>
                <Table.Data>{user.id}</Table.Data>
                <Table.Data>{user.name}</Table.Data>
                <Table.Data>{user.email}</Table.Data>
                <Table.Data>{user.status ? 'active' : 'blocked'}</Table.Data>
                <Table.Data>{user.created}</Table.Data>
                <Table.Data>{user.lastLogin}</Table.Data>
              </tr>
            ))}
            {lastUser && (
              <tr>
                <Table.DataLast>
                  <SelectCheckbox
                    id={lastUser.id}
                    ref={(reference) => setReference(lastUser.id, reference)}
                  />
                </Table.DataLast>
                <Table.DataLast>{lastUser.id}</Table.DataLast>
                <Table.DataLast>{lastUser.name}</Table.DataLast>
                <Table.DataLast>{lastUser.email}</Table.DataLast>
                <Table.DataLast>
                  {lastUser.status ? 'active' : 'blocked'}
                </Table.DataLast>
                <Table.DataLast>{lastUser.created}</Table.DataLast>
                <Table.DataLast>{lastUser.lastLogin}</Table.DataLast>
              </tr>
            )}
          </tbody>
        </Table>
      </form>

      <Pagination pagesCount={pagesCount ?? 1} />
    </MainLayout>
  )
}

export default Home
