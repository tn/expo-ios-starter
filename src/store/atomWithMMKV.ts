import {
  atomWithStorage,
  createJSONStorage,
  unstable_withStorageValidator,
} from 'jotai/utils'
import type { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage'

import { mmkvStorage } from '@/store/mmkv'

type Validator<T> = (value: unknown) => value is T

const getItem = (key: string) => {
  const value = mmkvStorage.getString(key)

  return value ?? null
}

const setItem = (key: string, value: string) => {
  mmkvStorage.set(key, value)
}

const removeItem = (key: string) => {
  mmkvStorage.remove(key)
}

const subscribe = (key: string, callback: (value: string | null) => void) => {
  const listener = mmkvStorage.addOnValueChangedListener(changedKey => {
    if (changedKey === key) {
      callback(getItem(key))
    }
  })

  return () => {
    listener.remove()
  }
}

export const atomWithMMKV = <T>(
  key: string,
  initialValue: T,
  validator?: Validator<T>,
) => {
  const baseStorage = createJSONStorage<unknown>(() => ({
    getItem,
    setItem,
    removeItem,
    subscribe,
  }))

  const storage: SyncStorage<T> = validator
    ? unstable_withStorageValidator(validator)(baseStorage)
    : (baseStorage as SyncStorage<T>)

  return atomWithStorage<T>(key, initialValue, storage, {
    getOnInit: true,
  })
}
