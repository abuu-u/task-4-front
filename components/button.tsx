import { MouseEventHandler, PropsWithChildren } from 'react'

const buttonColor = {
  red: ['bg-red-600', 'text-white', 'hover:bg-red-700', 'focus:ring-red-500'],
  indigo: [
    'bg-indigo-600',
    'text-white',
    'hover:bg-indigo-700',
    'focus:ring-indigo-500',
  ],
}

interface Properties {
  type?: 'button' | 'submit' | 'reset'
  color?: 'red' | 'indigo'
  full?: true
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.ComponentType<PropsWithChildren<Properties>> = ({
  type = 'button',
  color = 'indigo',
  full,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${full ? 'w-full' : ''} ${buttonColor[color].join(
        ' ',
      )} group relative flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {children}
    </button>
  )
}

export default Button
