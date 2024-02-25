const fetchData = async (json, setImage) => {
    console.log(json)
    try {
        const response = await fetch(
            'http://bitbox228.pythonanywhere.com/magnetic_field_plot',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'image/png',
                },
                body: json,
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const imageBlob = await response.blob();
        setImage(URL.createObjectURL(imageBlob));
    } catch (error) {
        console.error('Ошибка:', error);
    }
};


export default fetchData;
