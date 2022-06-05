import { useAppSelector } from '../lib/store'
import { selectLoading } from '../slices/loading-slice'
import css from '../styles/loading.module.css'

interface LoadingProperties {}

const Loading: React.ComponentType<LoadingProperties> = () => {
  const loading = useAppSelector(selectLoading)

  return <>{loading && <div className={css.loading}>loading...</div>}</>
}

export default Loading
