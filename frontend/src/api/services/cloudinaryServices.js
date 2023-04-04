const errImg =
    "https://res.cloudinary.com/trungvan1904/image/upload/v1677146545/ohana_clone/broken-image_xqpdvp.png";

export const uploadImage = async (base64Img) => {
    try {
        const CLOUD_API = "https://api.cloudinary.com/v1_1/trungvan1904/image/upload";
        let formData = {
            file: base64Img,
            upload_preset: "ohana_clone",
        };
        const res = await fetch(CLOUD_API, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "content-type": "application/json",
            },
        });
        const data = await res.json();
        return data.secure_url;
    } catch (e) {
        alert("An error occurred!");
        return errImg;
    }
};
