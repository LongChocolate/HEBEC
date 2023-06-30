import React from "react";

import { Text } from "native-base";
import { View, Image, StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  MapViewProps,
  Polyline as PL,
  LatLng,
} from "react-native-maps";
import {
  SCREEN_WIDTH,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "@/styles/dimensions";
import { boxShadow } from "@/styles/boxShadow";
import { decodeDirection } from "@/utils/helper";
import { IAddress } from "@/store/locationStore";
import { CustomMarker } from "./components/CustomMarker";
import { PointCurrentLocationSvg } from "@/assets/svg/PointCurrentLocationSvg";
import { LocationSvg } from "@/assets/svg/LocationSvg";
import { appStyle, colors } from "@/styles/theme";
import { VehicleType } from "@/store/orderTransportStore";

interface IAppProps extends MapViewProps {
  children?: any;
  startLocation: LatLng;
  endLocation?: LatLng;
  carLocation?: LatLng;
  mapRef?: any;
  address?: string; // Địa chỉ trên label
  isShowGetLocation?: boolean;
  points?: string;
  typeStartMarker?: string;
  heading?: number;
  isShowCar?: boolean;
  carType?: string;
}

const MapLocation = ({
  children,
  startLocation,
  endLocation,
  carLocation,
  mapRef,
  points,
  isShowGetLocation = true,
  heading,
  isShowCar,
  carType,
  ...props
}: IAppProps) => {
  const arrDirection = points ? decodeDirection(points) : [];

  const renderCarIcon = () => {
    switch (carType) {
      case VehicleType.Car4:
      case VehicleType.Car7:
        return require("@/assets/images/icTaxi_Model.png");
      case VehicleType.Bike:
        return require("@/assets/images/icMotorbike_Model.png");
    }
  };

  return (
    <MapView
      style={styles.mapView}
      initialRegion={{
        ...startLocation,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      rotateEnabled={false}
      pitchEnabled={false}
      toolbarEnabled={false}
      loadingEnabled={true}
      zoomEnabled={true}
      {...props}
    >
      <CustomMarker
        coordinate={{
          latitude: startLocation.latitude,
          longitude: startLocation.longitude,
        }}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <PointCurrentLocationSvg />
      </CustomMarker>

      {endLocation && (
        <CustomMarker
          coordinate={{
            latitude: endLocation.latitude,
            longitude: endLocation.longitude,
          }}
          anchor={{ x: 0.5, y: 0.9 }}
        >
          <LocationSvg size={30} blue />
        </CustomMarker>
      )}

      {carLocation && isShowCar && (
        <CustomMarker
          coordinate={{
            latitude: carLocation.latitude,
            longitude: carLocation.longitude,
          }}
          rotation={heading}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={{ height: 80, aspectRatio: 1 / 1 }}>
            <Image
              source={renderCarIcon()}
              resizeMode={"cover"}
              style={appStyle.image}
            />
          </View>
        </CustomMarker>
      )}

      {points ? (
        <PL
          coordinates={arrDirection}
          strokeWidth={5}
          strokeColor={colors.primary}
        />
      ) : null}
    </MapView>
  );
};
export default React.memo(MapLocation);

const styles = StyleSheet.create({
  infoAddress: {
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    ...boxShadow("#0000000D", 3, 7, 12),
  },

  mapView: {
    width: SCREEN_WIDTH,
    aspectRatio: 1 / 1,
  },
});
