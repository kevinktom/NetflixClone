export const fetchGenre = id => {
    return $.ajax({
        method: "get",
        url: `api/genres/${id}`,
    })
}