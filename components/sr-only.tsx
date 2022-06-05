import { PropsWithChildren } from 'react'

interface Properties {}

const SrOnly: React.ComponentType<PropsWithChildren<Properties>> = ({
  children,
}) => {
  return <span className="sr-only">{children}</span>
}

export default SrOnly
