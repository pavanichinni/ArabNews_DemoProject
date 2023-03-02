
export const apiHelper = async (url: string) => {
    let header = {}
    const response = await fetch(url, header)
    const data = await response.json()
    return data
}
