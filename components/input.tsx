import { forwardRef, HTMLInputTypeAttribute } from 'react'

interface Properties {
  id: string
  label: string
  type?: HTMLInputTypeAttribute
  error?: string
}

const Input = forwardRef<HTMLInputElement, Properties>(
  ({ id, label, type = 'text', error, ...rest }, reference) => {
    return (
      <label htmlFor={id} className="text-base font-semibold text-gray-700">
        {label}

        <input
          ref={reference}
          id={id}
          name={id}
          type={type}
          autoComplete={id}
          className={`${
            error
              ? 'border-red-500 placeholder-red-400 text-red-900 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
          } mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10`}
          placeholder={label}
          {...rest}
        />

        <p className="m-0 mt-1 text-base font-semibold text-red-500">{error}</p>
      </label>
    )
  },
)

Input.displayName = 'Input'

export default Input
