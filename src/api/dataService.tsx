
export function getData(fromN: number, to: number, token: string | null): Promise<Response> {
  return fetch(
    token
      ? `https://f-test-02.glitch.me/data?from=${fromN}&to=${to}&token=${token}`
      : `https://f-test-02.glitch.me/data?from=${fromN}&to=${to}`
  );
}
