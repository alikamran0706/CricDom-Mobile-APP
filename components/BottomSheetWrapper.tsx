import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

type BottomSheetWrapperProps = {
  children: ReactNode;
  snapPoints?: (string | number)[];
  onClose?: () => void;
};

const BottomSheetWrapper = forwardRef<BottomSheetRef, BottomSheetWrapperProps>(
  ({ children, snapPoints = ["40%", "90%"], onClose }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.expand(),
      close: () => sheetRef.current?.close(),
    }));

    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={memoizedSnapPoints}
          onClose={onClose}
          enablePanDownToClose
        >
          <BottomSheetView className="px-4 pb-6">
            {children}
          </BottomSheetView>
        </BottomSheet>
    );
  }
);

export default BottomSheetWrapper;
