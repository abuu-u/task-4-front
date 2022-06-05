import { PropsWithChildren } from 'react'

interface Properties {}

const Header: React.ComponentType<PropsWithChildren<{}>> = ({ children }) => (
  <th className="border-b border-slate-500 font-semibold p-4 text-slate-800 text-left">
    {children}
  </th>
)

const Data: React.ComponentType<PropsWithChildren<{}>> = ({ children }) => (
  <td className="border-b border-slate-300 p-4 text-slate-700">{children}</td>
)

const DataLast: React.ComponentType<PropsWithChildren<{}>> = ({ children }) => (
  <td className="border-b border-slate-500 p-4 text-slate-700">{children}</td>
)

const Table: React.ComponentType<PropsWithChildren<Properties>> & {
  Header: typeof Header
  Data: typeof Data
  DataLast: typeof DataLast
} = ({ children }) => {
  return (
    <table className="border-collapse table-auto w-full text-md">
      {children}
    </table>
  )
}

Table.Header = Header
Table.Data = Data
Table.DataLast = DataLast

export default Table
