const defaultConfig = {
    header: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    })
};

const baseFetchjson = (url, config = {}) =>
    fetch(url, { ...defaultConfig, ...config }).then((response) => {
        if (response.ok === false) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
    });

const fetchJson = (url, config = {}) =>
    baseFetchjson(url, config).then((json) => {
        // const { statusCode, statusMessage } = json;
        // if (json.statusCode !== 200) {
        //     const errorMessage =
        //         statusCode && statusMessage
        //             ? `${json.statusCode}: ${json.statusMessage}`
        //             : `Please contact support`;

        //     throw new Error(errorMessage);
        // }
        console.log(json);
        return json;
    });

export default fetchJson;
