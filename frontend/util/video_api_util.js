export const allvids = videos => {
    return $.ajax({
        method: "get",
        url: "api/videos",
        data: {videos}
    });
};

export const fetchVideo = id => {
    return $.ajax ({
        method: "get",
        url: `api/videos${id}`
    })
}