import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { useCountries } from "@/features/auth/hooks/use-countries";

type CountryPickerProps = {
  onSelect: (code: string) => void;
};

const CountryPicker = ({ onSelect }: CountryPickerProps) => {
  const { data } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<{
    flag: string;
    dialCode: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!selectedCountry && data && data.length > 0) {
      const indonesia = data.find((c) => c.dialCode === "+62");
      if (indonesia) {
        setSelectedCountry(indonesia);
        onSelect(indonesia.dialCode);
      }
    }
  }, [data, onSelect]);

  const handleSelect = (country: { flag: string; dialCode: string }) => {
    setSelectedCountry(country); 
    onSelect(country.dialCode);
    setModalVisible(false);
  };

  return (
    <View className="w-1/4">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex flex-row items-center justify-center px-2 py-1 border border-[#CBCBCB] rounded-2xl mt-4 bg-gray-100"
      >
        {selectedCountry ? (
          <View className="flex flex-row items-center justify-center p-2">
            <Image
              source={{ uri: selectedCountry.flag }}
              style={{ width: 25, height: 25, marginRight: 10 }}
            />
            <Text>{selectedCountry.dialCode}</Text>
          </View>
        ) : (
          <Text>Memuat...</Text>
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.dialCode}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              key={`${item.dialCode}-${item.region}`}
              className="flex flex-row items-center p-3 border-b"
            >
              <Image
                source={{ uri: item.flag }}
                style={{ width: 30, height: 20, marginRight: 10 }}
              />
              <Text>{item.dialCode}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="p-4 bg-gray-200 text-center"
        >
          <Text>Tutup</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CountryPicker;
