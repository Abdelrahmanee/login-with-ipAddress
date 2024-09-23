function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Call your backend or a geolocation service to convert coordinates into an address
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    // You can then use these coordinates to get the address (in Step 2)
}

function getAddressFromCoordinates(lat, lng) {
    const apiKey = 'AIzaSyDdV6rSIr8_H00OKp71gcg-7cRSFUwT8Us';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const address = data.results[0].formatted_address;
                console.log('Address:', address);
                // You can now send this address to your backend (Step 3)
            } else {
                console.log('Geocoding failed:', data.status);
            }
        })
        .catch(error => console.error('Error:', error));
}

function sendAddressToBackend(addressData) {
    fetch('http://localhost:3000/api/v1/users/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Example of what the address data would look like
// const addressData = {
//     name: 'John Doe',
//     ipAddress: '192.168.1.1',  // You can capture IP server-side
//     address: {
//         street: '123 Main St',
//         city: 'New York',
//         state: 'NY',
//         country: 'USA',
//         postalCode: '10001'
//     }
// };

