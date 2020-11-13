export const sort = (data) => {
  let sortedData = [...data]
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1
    } else {
      return 1
    }
  })
  return sortedData
}

export const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
