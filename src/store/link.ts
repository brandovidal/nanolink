import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { LinkProps as Link } from '@/interfaces/Link'

interface LinkState {
  data: Link[] | []
  store: (data: Link[]) => void
  clean: () => void
}

export const useLinkStore = create(
  devtools(
    persist<LinkState>(
      set => ({
        data: [],
        store: data => {
          set(() => ({ data }))
        },
        clean: () => {
          set({ data: [] })
        }
      }),
      { name: 'link' }
    )
  )
)
