interface APIProps<TBody = unknown> {
  APIEndPoint: string;
  body?: TBody;
}

export default async function GetAPI<TResponse = any, TBody = unknown>({
  APIEndPoint,
  body,
}: APIProps<TBody>) {
  // Get Host Name
  const isLocalhost = window.location.hostname === 'localhost';
  // Local endpoint
  const localEndPoint = `${import.meta.env.VITE_API_URL}:${
    import.meta.env.VITE_API_PORT
  }`;
  // Lan Endpoint
  const lanEndPoint = `${import.meta.env.VITE_LAN_API_URL}:${
    import.meta.env.VITE_LAN_API_PORT
  }`;

  // Convert End Point
  const baseUrl = isLocalhost ? localEndPoint : lanEndPoint;

  // Try API Call
  try {
    const res = await fetch(`${baseUrl}/api/${APIEndPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return await res.json();
  } catch (error) {
    console.log('Error with API Call', error);
  }
}
