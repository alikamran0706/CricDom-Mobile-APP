import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import Modal from "./Modal"

interface TimePickerModalProps {
  visible: boolean
  onClose: () => void
  onTimeSelect: (time: string) => void
}

const TimePickerModal = ({ visible, onClose, onTimeSelect }: TimePickerModalProps) => {
  const [hour, setHour] = useState("10")
  const [minute, setMinute] = useState("25")
  const [period, setPeriod] = useState("PM")

  const handleOk = () => {
    const formattedTime = `${hour}:${minute} ${period}`
    onTimeSelect(formattedTime)
  }

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false}>
      <View className="p-6">
        {/* Header */}
        <View className="bg-green-500 -mx-6 -mt-6 px-6 py-4 rounded-t-3xl">
          <Text className="text-white text-2xl font-bold">Set time</Text>
        </View>

        {/* Time Input */}
        <View className="py-8">
          <Text className="text-gray-800 text-lg font-semibold mb-4">Type in time</Text>

          <View className="flex-row items-center justify-center mb-8">
            <TextInput
              className="text-6xl font-light text-center w-20"
              value={hour}
              onChangeText={setHour}
              keyboardType="numeric"
              maxLength={2}
            />
            <Text className="text-6xl font-light mx-2">:</Text>
            <TextInput
              className="text-6xl font-light text-center w-20"
              value={minute}
              onChangeText={setMinute}
              keyboardType="numeric"
              maxLength={2}
            />

            <TouchableOpacity
              className="ml-8 bg-gray-100 px-4 py-2 rounded"
              onPress={() => setPeriod(period === "AM" ? "PM" : "AM")}
            >
              <Text className="text-lg font-semibold">{period}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500">hour</Text>
            <Text className="text-gray-500">minute</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-end space-x-4">
          <TouchableOpacity onPress={onClose}>
            <Text className="text-green-500 font-semibold text-lg">CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOk}>
            <Text className="text-green-500 font-semibold text-lg">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default TimePickerModal
