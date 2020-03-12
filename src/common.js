const api = 'https://increment-as-server.herokuapp.com'

const payload = (method, data) => {
  const token = localStorage.getItem('token')
  const authorization = `Bearer ${token}`
  return {
    headers: { authorization, 'content-type': 'application/json' },
    body: JSON.stringify(data),
    method,
    mode: 'cors'
  }
}
const request = async (url, method, body) => {
  const response = await fetch(`${api}/${url}`, payload(method, body))
  const content = await response.json()

  if (response.status != 200) {
    throw content
  }

  return content
}
