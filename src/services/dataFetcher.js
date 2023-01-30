var FormData = require('form-data');

const dataFetcher = async (url, formData) => {
    let bodyFormData = new FormData();

    for (const property in formData) {
        bodyFormData.append(property, formData[property]);
    }
    bodyFormData.append('fromsrc', 'web');
    // console.log(bodyFormData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}`, {
        method: 'post',
        body: bodyFormData
    });

    const data = await res.json();

    return data;
};
export default dataFetcher;
