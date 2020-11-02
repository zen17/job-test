
export function getData(fromRange: number, toRange: number, token: string | null): Promise<Response> {
  return fetch(
    token
      ? `https://f-test-02.glitch.me/data?from=${fromRange}&to=${toRange}&token=${token}`
      : `https://f-test-02.glitch.me/data?from=${fromRange}&to=${toRange}`
  );
}
