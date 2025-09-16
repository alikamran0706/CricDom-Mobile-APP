import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Platform } from "react-native";

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

type BottomSheetWrapperProps = {
  children: React.ReactNode;
  onClose?: () => void;
  maxDynamicHeight?: number;
  enableDynamicSizing?: boolean;
};

const BottomSheetWrapper = forwardRef<BottomSheetRef, BottomSheetWrapperProps>(
  ({ children, onClose, maxDynamicHeight = 600, enableDynamicSizing = true }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.expand(),
      close: () => sheetRef.current?.close(),
    }));

    return (
      <BottomSheet
        ref={sheetRef}
        index={-1}
        enablePanDownToClose
        onClose={onClose}
        enableDynamicSizing={enableDynamicSizing}
        keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
        // snapPoints={[maxDynamicHeight, 0]}
        keyboardBlurBehavior='restore'
        android_keyboardInputMode='adjustResize'
        maxDynamicContentSize={maxDynamicHeight}
        enableContentPanningGesture={false}
      >
        <BottomSheetView className="px-4 pb-6" style={{ minHeight: 100 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomSheetWrapper;
