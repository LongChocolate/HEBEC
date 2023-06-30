import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ImageProps,
  TouchableOpacity,
} from "react-native";
import { appStyle } from "@/styles/theme";
import { MEDIA_URL } from "../../../config";
import { ImageViewModal } from "../Modal/ImageViewModal";
import FastImage from 'react-native-fast-image'
import { isEqual } from "lodash";

interface EImageProps extends ImageProps {
  showZoom?: boolean;
  imageAutoLayout?: boolean;
  saveToLocalByLongPress?: boolean;
}

export const EImage = React.memo(({
  showZoom = false,
  imageAutoLayout = false,
  saveToLocalByLongPress = false,
  ...props
}: EImageProps) => {
  const [visibleImage, setVisibleImage] = useState(false);
  const [images, setImages] = useState([]);
  const [hideDefaultSource, setHideDefaultSource] = useState(false)
  const [layout, setLayout] = useState<{
    width: string | number;
    height: string | number;
  }>({ width: "100%", height: "100%" });

  useEffect(() => {
    (async () => {
      renderImage();
    })();
  }, [props.source]);

  const renderImage = () => {
    const source = props.source
    if (Array.isArray(source) || (typeof source == 'object' && typeof source.uri === "undefined")) {
      return null;
    }

    if (typeof source == 'object' && !source.uri?.includes("file:/")) {
      const arrCheck = ['https://', 'http://']
      let uri = MEDIA_URL + source.uri?.replace(MEDIA_URL, "");

      if (arrCheck.some(substring => source.uri?.includes(substring))) {
        uri = source.uri;
      }
      const resize: any = props.resizeMode;

      return (
        <View style={appStyle.image}>
          {!hideDefaultSource && <Image source={props.defaultSource} style={[appStyle.image, { position: 'absolute' }]} />}
          <FastImage
            style={appStyle.image}
            source={{ uri, priority: FastImage.priority.normal }}
            resizeMode={resize}
            onLoad={e => setHideDefaultSource(true)}
          />
        </View>

      )
    }

    return <Image {...props} style={appStyle.image} />
  };

  const handlePress = (item) => {
    if (typeof item !== "object") {
      setImages([{ url: "", props: { source: item } }]);
    } else if (item.uri.includes("file:/")) {
      setImages([{ url: item.uri }]);
    } else {
      setImages([{ url: MEDIA_URL + item.uri }]);
    }
    setVisibleImage(true);
  };

  const onClose = () => {
    setVisibleImage(false);
    setImages([]);
  };

  const _onLayout = (event) => {
    if (!imageAutoLayout) {
      return;
    }
    const containerWidth = event.nativeEvent.layout.width;
    let source: any = "";
    if (typeof props.source !== "object" || Array.isArray(props.source)) {
      source = props.source;
      const layout = Image.resolveAssetSource(source);
      return setLayout({
        width: containerWidth,
        height: (containerWidth * layout.height) / layout.width,
      });
    }

    if (props.source.uri.includes("file://")) {
      source = props.source.uri;
    } else {
      source = MEDIA_URL + props.source.uri;
    }

    Image.getSize(
      source,
      (width, height) => {
        setLayout({
          width: containerWidth,
          height: (containerWidth * height) / width,
        });
      },
      (err) => {
        setLayout({
          width: containerWidth,
          height: containerWidth,
        });
      }
    );
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!showZoom}
        onPress={() => handlePress(props.source)}
        style={layout}
        onLayout={_onLayout}
      >
        {renderImage()}
      </TouchableOpacity>

      <ImageViewModal
        visible={visibleImage}
        imageUrls={images}
        onClose={onClose}
        renderIndicator={() => null}
        saveToLocalByLongPress={saveToLocalByLongPress}
      />
    </>
  );
}, (prev, next) => isEqual(prev, next));
