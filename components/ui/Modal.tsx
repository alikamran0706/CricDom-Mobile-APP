import { Ionicons } from "@expo/vector-icons"
import type { ReactNode } from "react"
import { Modal as RNModal, TouchableOpacity, View } from "react-native"

interface ModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
  showCloseButton?: boolean
  animationType?: "slide" | "fade" | "none"
  transparent?: boolean
  customClass?: string
}

const Modal = ({
  visible,
  onClose,
  children,
  showCloseButton = true,
  animationType = "slide",
  transparent = true,
  customClass = "rounded-3xl max-w-sm w-full",
}: ModalProps) => {
  return (
    <RNModal visible={visible} animationType={animationType} transparent={transparent} onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className={`bg-white mx-4 relative ${customClass}`}>
          {showCloseButton && (
            <TouchableOpacity
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-100 items-center justify-center z-10"
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          )}
          {children}
        </View>
      </View>
    </RNModal>
  )
}

export default Modal
