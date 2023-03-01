const baseURL = process.env.BASE_URL;
const token = process.env.ACCESS_TOKEN_SECRET || "";

export const getData = async (url) => {
    const res = await fetch(`${baseURL}/api/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const result = await res.json();
    return result;
};

export const postData = async (url, data) => {
    const res = await fetch(`${baseURL}/api/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
};

export const putData = async (url, data) => {
    const res = await fetch(`${baseURL}/api/${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
};

export const patchData = async (url, data) => {
    const res = await fetch(`${baseURL}/api/${url}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
};

export const deleteData = async (url) => {
    const res = await fetch(`${baseURL}/api/${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        // body: data ? JSON.stringify(data) : null,
    });
    const result = await res.json();
    return result;
};
