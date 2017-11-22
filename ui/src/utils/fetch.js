export const handleErrors = (response) => {
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
}