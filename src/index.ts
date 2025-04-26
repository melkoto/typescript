const v: unknown = 10
const obj: unknown = null
const val: unknown = 1
export function main() {}

// Example 1
const a: any = 10
const b: unknown = 10

const x: string = a
const y: string = b

// чтобы убрать ошибку, что переменная не используется
console.log(x, y)

a.trim() // runtime ошибка
b.trim() // ошибка компиляции

// Example 2
if (typeof v === 'string') {
  /* v: string */
}

export function greet(input: unknown) {
  if (typeof input === 'string') {
    console.log('Привет, ' + input.toUpperCase())
  } else if (typeof input === 'number') {
    console.log('Ваше число в квадрате: ' + input ** 2)
  } else if (typeof input === 'boolean') {
    console.log('Логическое значение:', input)
  } else {
    console.log('Неизвестный тип:', input)
  }
}

// Example 3
if (typeof obj === 'object' && obj !== null && 'id' in obj) {
  /* obj.id */
}

type User = { id: string; name: string; age?: number }

export function printUserInfo(data: unknown) {
  if (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  ) {
    const user = data as User
    console.log(`Пользователь ${user.name} (ID: ${user.id})`)
  } else {
    console.log('Это не User:', data)
  }
}

// Example 4
if (val instanceof Date) {
  /* val: Date */
}

// Пример 4.1
export class CustomError extends Error {
  code: number
  constructor(msg: string, code: number) {
    super(msg)
    this.code = code
  }
}

export function handleError(err: unknown) {
  if (err instanceof CustomError) {
    console.error(`CustomError ${err.code}: ${err.message}`)
  } else if (err instanceof Error) {
    console.error('Standard Error:', err.message)
  } else {
    console.error('Неизвестная ошибка:', err)
  }
}

// Example 4.2
export function parseDate(d: unknown) {
  if (d instanceof Date) {
    console.log('Год:', d.getFullYear())
  } else {
    console.log('Это не Date:', d)
  }
}

// Example 5
export function isBoolean(x: unknown): x is boolean {
  return typeof x === 'boolean'
}

/*
 * arr is number[] — type predicate:
 * «Если функция вернёт true, TypeScript считает arr типом number[].»
 */
export function isNumberArray(arr: unknown): arr is number[] {
  return Array.isArray(arr) && arr.every((i) => typeof i === 'number')
}

export function printSum(input: unknown) {
  if (isNumberArray(input)) {
    console.log(
      'Сумма:',
      input.reduce((a, b) => a + b, 0)
    )
  } else {
    console.log('Ожидали number[], получили:', input)
  }
}

// Example 6
async function fetchUserData(id: string): Promise<unknown> {
  const resp = await fetch(`/users/${id}`)
  return resp.json() // здесь мы не уверены в форме данных
}

// export type User = { id: string; name: string; age: number }

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    typeof (obj as any).id === 'string' &&
    'name' in obj &&
    typeof (obj as any).name === 'string' &&
    'age' in obj &&
    typeof (obj as any).age === 'number'
  )
}

export async function loadAndGreet(id: string) {
  const data = await fetchUserData(id)

  if (!isUser(data)) {
    throw new Error('Неверный формат User')
  }

  console.log(`Привет, ${data.name.toUpperCase()}!`)
}
