import { View, TextInput } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { inputIconColor, inputStyles } from "./inputStyles";
import { format } from "date-fns";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

type DateTimeInputProps = {
  date: Date;
  setDate: (value: Date) => void;
};

export default function DateTimeInput({ date, setDate }: DateTimeInputProps) {
  const timeInputRef = useRef<TextInput | null>(null);

  function showDateTimePicker(mode: "date" | "time") {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event) => {
        setDate(new Date(Number(event.nativeEvent.timestamp)));
        if (event.type === "set" && mode === "date") {
          timeInputRef.current?.focus();
        }
      },
      mode: mode,
      is24Hour: true,
    });
  }
  return (
    <View style={[inputStyles.inputIconView, { justifyContent: "flex-start" }]}>
      <View
        style={[
          inputStyles.inputIconView,
          { width: "50%", borderBottomWidth: 0 },
        ]}
      >
        <Ionicons name='calendar' size={20} color={inputIconColor} />
        <TextInput
          style={inputStyles.textInputStyle}
          value={format(date, "dd/MM/yyyy")}
          onFocus={() => showDateTimePicker("date")}
        />
      </View>
      <View
        style={[
          inputStyles.inputIconView,
          { paddingLeft: 15, borderBottomWidth: 0 },
        ]}
      >
        <Ionicons name='time' size={20} color={inputIconColor} />
        <TextInput
          ref={timeInputRef}
          style={inputStyles.textInputStyle}
          value={format(date, "HH:mm")}
          onFocus={() => showDateTimePicker("time")}
        />
      </View>
    </View>
  );
}
