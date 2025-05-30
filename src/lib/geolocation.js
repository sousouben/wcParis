export const getUserLocation = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds
          maximumAge: 0 // Force fresh location
        }
      );
    } else {
      errorCallback(new Error("Geolocation is not supported by this browser."));
    }
  };