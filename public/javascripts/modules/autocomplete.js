function autocomplete(input, latInput, lngInput) {
    if(!input) return; //skip this from running if there's no address on the page
    const dropdown = new google.maps.places.Autocomplete(input);
}

export default autocomplete;
