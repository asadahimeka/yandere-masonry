import { release } from '@himeka/release'

release({ gitAdd: true, gitTag: true }).catch((err) => {
  console.error(err)
})
