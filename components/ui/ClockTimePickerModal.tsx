import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Modal from "./Modal"

interface ClockTimePickerModalProps {
  visible: boolean
  onClose: () => void
  onTimeSelect: (time: string) => void
}

const ClockTimePickerModal = ({ visible, onClose, onTimeSelect }: ClockTimePickerModalProps) => {
  const [selectedMinute, setSelectedMinute] = useState(35)
  const [period, setPeriod] = useState("AM")

  const handleOk = () => {
    const hour = 10 // Fixed for demo
    const formattedTime = `${hour}:${selectedMinute.toString().padStart(2, "0")} ${period}`
    onTimeSelect(formattedTime)
  }

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false}>
      <View className="p-6">
        {/* Header */}
        <View className="bg-green-500 -mx-6 -mt-6 px-6 py-4 rounded-t-3xl">
          <Text className="text-white text-4xl font-bold">10:35</Text>
          <View className="flex-row mt-2">
            <TouchableOpacity
              className={`px-3 py-1 rounded ${period === "AM" ? "bg-white" : "bg-transparent"}`}
              onPress={() => setPeriod("AM")}
            >
              <Text className={period === "AM" ? "text-green-500 font-semibold" : "text-white"}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-3 py-1 rounded ml-2 ${period === "PM" ? "bg-white" : "bg-transparent"}`}
              onPress={() => setPeriod("PM")}
            >
              <Text className={period === "PM" ? "text-green-500 font-semibold" : "text-white"}>PM</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clock Interface */}
        <View className="items-center py-8">
          <View className="w-64 h-64 relative">
            {/* Clock Face */}
            <View className="w-full h-full bg-gray-100 rounded-full items-center justify-center">
              {/* Clock Numbers */}
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute, index) => {
                const angle = (index * 30 - 90) * (Math.PI / 180)
                const radius = 100
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <TouchableOpacity
                    key={minute}
                    className="absolute items-center justify-center"
                    style={{
                      left: 128 + x - 15,
                      top: 128 + y - 15,
                      width: 30,
                      height: 30,
                    }}
                    onPress={() => setSelectedMinute(minute)}
                  >
                    <Text
                      className={`text-lg ${selectedMinute === minute ? "text-green-600 font-bold" : "text-gray-600"}`}
                    >
                      {minute.toString().padStart(2, "0")}
                    </Text>
                  </TouchableOpacity>
                )
              })}

              {/* Clock Hand */}
              <View className="absolute w-1 bg-green-500 origin-bottom" style={{ height: 80, bottom: 128 }} />

              {/* Center Dot */}
              <View className="w-4 h-4 bg-green-500 rounded-full absolute" style={{ top: 124, left: 124 }}>
                <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center -m-2">
                  <Text className="text-white font-bold text-sm">{selectedMinute}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Ionicons name="keypad" size={24} color="#666" />
          </TouchableOpacity>
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-green-500 font-semibold text-lg">CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOk}>
              <Text className="text-green-500 font-semibold text-lg">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ClockTimePickerModal
