interface locationResponse {
  lat: number;
  lon: number;
}
type PromiseResolve<T> = (value: T | PromiseLike<T>) => void;
type PromiseReject = (error: string) => void;

function useLocation() {
  return new Promise(
    (resolve: PromiseResolve<locationResponse>, reject: PromiseReject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            } as locationResponse);
          },
          (err) => {
            reject("Geolocation is not supported");
          }
        );
      }
    }
  );
}

export default useLocation;
export type {locationResponse};
