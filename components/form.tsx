import { FormEventHandler, PropsWithChildren } from 'react'
import Button from './button'

interface Properties {
  submitText: string
  header: string
  onSubmit: FormEventHandler<HTMLFormElement>
  error?: string
}

const Form: React.ComponentType<PropsWithChildren<Properties>> = ({
  submitText,
  header,
  children,
  onSubmit,
  error,
}) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
        {header}
      </h2>

      {error && (
        <p className="m-0 mb-5 p-3 rounded-md bg-red-200 text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} action="#" method="POST">
        <div className="grid gap-3 mb-6">{children}</div>

        <Button full type="submit">
          {submitText}
        </Button>
      </form>
    </div>
  )
}

export default Form
