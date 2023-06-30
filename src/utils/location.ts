// import * as Location from 'expo-location';
// import { LatLng } from 'react-native-maps';
// import * as Permissions from "expo-permissions";
// import { Platform, Alert, Linking } from 'react-native';
// import { LATITUDE_DELTA, LONGITUDE_DELTA } from '@/styles/dimensions';

// export const getLocation = async (): Promise<LatLng> => {
//     try {
//         let { status } = await Permissions.askAsync(Permissions.LOCATION);
//         if (status !== "granted") {
//             if (Platform.OS === "ios") {
//                 Alert.alert(
//                     "Vui lòng bật dịch vụ định vị",
//                     "Điều này sẽ giúp cải thiện dịch vụ vận chuyển của chúng tôi",
//                     [
//                         { text: "Huỷ", onPress: () => { } },
//                         {
//                             text: "Cài đặt",
//                             onPress: () => Linking.openURL("app-settings:")
//                         }
//                     ]
//                 );
//             }

//             return {
//                 latitude: 10.797435,
//                 longitude: 106.68837,
//             }
//         } else {
//             let res = await Location.getCurrentPositionAsync()
//             let tmp: LatLng = {
//                 latitude: res.coords.latitude,
//                 longitude: res.coords.longitude
//             }
//             return tmp
//         }
//     } catch (error) { }

// }


// export function calcDistance(lat1, lon1, lat2, lon2): number {
//     var R = 6371; // km (change this constant to get miles)
//     var dLat = (lat2 - lat1) * Math.PI / 180;
//     var dLon = (lon2 - lon1) * Math.PI / 180;
//     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var d = R * c;
//     return Math.round(d);
// }


// export interface deltaCoords {
//     latitudeDelta: number,
//     longitudeDelta: number
// }

// export function getRegionForCoordinates(points: Array<LatLng>): deltaCoords {
//     // points should be an array of { latitude: X, longitude: Y }
//     let minX, maxX, minY, maxY;

//     // init first point
//     ((point) => {
//         minX = point.latitude;
//         maxX = point.latitude;
//         minY = point.longitude;
//         maxY = point.longitude;
//     })(points[0]);

//     // calculate rect
//     points.map((point) => {
//         minX = Math.min(minX, point.latitude);
//         maxX = Math.max(maxX, point.latitude);
//         minY = Math.min(minY, point.longitude);
//         maxY = Math.max(maxY, point.longitude);
//     });

//     const midX = (minX + maxX) / 2;
//     const midY = (minY + maxY) / 2;
//     const deltaX = (maxX - minX);
//     const deltaY = (maxY - minY);
//     const res: deltaCoords = {
//         latitudeDelta: deltaX,
//         longitudeDelta: deltaY
//     };
//     return res
// }