export const handleResponse = (res, data, error) => {
  if (error) {
    res.send(error)
  } else {
    res.send(data);
  }
}