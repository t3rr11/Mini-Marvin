function getDate() {
  return `${new Date().toLocaleString()} -`;
}

export function saveLog(message: string) {
  console.log(`${getDate()} ${message}`);
}

export function saveWarning(message: string) {
  console.warn(`${getDate()} ${message}`);
}

export function saveError(message: string, error: Error) {
  console.error(`${getDate()} ${message}`, error);
}
